import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface Hospital {
  name: string;
  address: string;
  phone: string;
  lat: number;
  lng: number;
  distance: number;
  type: string;
  isPublic?: boolean;
  placeId: string;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { lat, lng } = await req.json();
    
    if (!lat || !lng) {
      throw new Error('Latitude and longitude are required');
    }

    const apiKey = Deno.env.get('GOOGLE_PLACES_API_KEY');
    if (!apiKey) {
      throw new Error('Google Places API key not configured');
    }

    console.log(`Searching for hospitals near ${lat}, ${lng}`);

    // Search for hospitals using Google Places API
    const searchUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=10000&type=hospital&key=${apiKey}&language=pt-BR`;
    
    const searchResponse = await fetch(searchUrl);
    const searchData = await searchResponse.json();

    if (searchData.status !== 'OK' && searchData.status !== 'ZERO_RESULTS') {
      console.error('Places API error:', searchData);
      throw new Error(`Google Places API error: ${searchData.status}`);
    }

    if (searchData.status === 'ZERO_RESULTS') {
      return new Response(
        JSON.stringify({ hospitals: [] }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log(`Found ${searchData.results.length} hospitals`);

    // Get detailed info for each hospital
    const hospitals: Hospital[] = await Promise.all(
      searchData.results.slice(0, 15).map(async (place: any) => {
        try {
          // Get place details including phone number
          const detailsUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${place.place_id}&fields=name,formatted_address,formatted_phone_number,international_phone_number,geometry,types&key=${apiKey}&language=pt-BR`;
          
          const detailsResponse = await fetch(detailsUrl);
          const detailsData = await detailsResponse.json();

          if (detailsData.status !== 'OK') {
            console.error(`Details error for ${place.name}:`, detailsData.status);
            return null;
          }

          const details = detailsData.result;
          
          // Calculate distance
          const R = 6371; // Earth radius in km
          const dLat = (details.geometry.location.lat - lat) * Math.PI / 180;
          const dLon = (details.geometry.location.lng - lng) * Math.PI / 180;
          const a = 
            Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(lat * Math.PI / 180) * Math.cos(details.geometry.location.lat * Math.PI / 180) *
            Math.sin(dLon/2) * Math.sin(dLon/2);
          const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
          const distance = R * c;

          // Determine if it's public (based on name patterns)
          const isPublic = 
            details.name.toLowerCase().includes('sus') ||
            details.name.toLowerCase().includes('público') ||
            details.name.toLowerCase().includes('municipal') ||
            details.name.toLowerCase().includes('estadual') ||
            details.name.toLowerCase().includes('federal') ||
            details.name.toLowerCase().includes('upa') ||
            details.name.toLowerCase().includes('unidade básica');

          return {
            name: details.name,
            address: details.formatted_address,
            phone: details.international_phone_number || details.formatted_phone_number || 'Não disponível',
            lat: details.geometry.location.lat,
            lng: details.geometry.location.lng,
            distance: Math.round(distance * 10) / 10,
            type: details.types.includes('hospital') ? 'hospital' : 'clinica',
            isPublic,
            placeId: place.place_id
          };
        } catch (error) {
          console.error(`Error fetching details for ${place.name}:`, error);
          return null;
        }
      })
    );

    // Filter out nulls and sort by distance
    const validHospitals = hospitals
      .filter((h): h is Hospital => h !== null)
      .sort((a, b) => a.distance - b.distance)
      .slice(0, 10);

    console.log(`Returning ${validHospitals.length} hospitals with details`);

    return new Response(
      JSON.stringify({ hospitals: validHospitals }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in get-nearby-hospitals function:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});
