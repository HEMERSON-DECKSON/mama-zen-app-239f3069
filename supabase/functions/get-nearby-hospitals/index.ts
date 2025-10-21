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

    // Use Places API (New) - Text Search
    const searchUrl = 'https://places.googleapis.com/v1/places:searchText';
    
    const searchResponse = await fetch(searchUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Goog-Api-Key': apiKey,
        'X-Goog-FieldMask': 'places.id,places.displayName,places.formattedAddress,places.internationalPhoneNumber,places.nationalPhoneNumber,places.location,places.types'
      },
      body: JSON.stringify({
        textQuery: 'hospital pediatrico',
        locationBias: {
          circle: {
            center: {
              latitude: lat,
              longitude: lng
            },
            radius: 10000.0
          }
        },
        languageCode: 'pt-BR',
        maxResultCount: 15
      })
    });

    const searchData = await searchResponse.json();

    if (!searchData.places || searchData.places.length === 0) {
      console.log('No hospitals found');
      return new Response(
        JSON.stringify({ hospitals: [] }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log(`Found ${searchData.places.length} hospitals`);

    // Process each hospital
    const hospitals: Hospital[] = searchData.places.map((place: any) => {
        try {
          const details = place;
          
          // Calculate distance
          const placeLat = details.location.latitude;
          const placeLng = details.location.longitude;
          const R = 6371; // Earth radius in km
          const dLat = (placeLat - lat) * Math.PI / 180;
          const dLon = (placeLng - lng) * Math.PI / 180;
          const a = 
            Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(lat * Math.PI / 180) * Math.cos(placeLat * Math.PI / 180) *
            Math.sin(dLon/2) * Math.sin(dLon/2);
          const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
          const distance = R * c;

          const displayName = details.displayName?.text || 'Hospital';
          
          // Determine if it's public (based on name patterns)
          const isPublic = 
            displayName.toLowerCase().includes('sus') ||
            displayName.toLowerCase().includes('público') ||
            displayName.toLowerCase().includes('municipal') ||
            displayName.toLowerCase().includes('estadual') ||
            displayName.toLowerCase().includes('federal') ||
            displayName.toLowerCase().includes('upa') ||
            displayName.toLowerCase().includes('unidade básica');

          return {
            name: displayName,
            address: details.formattedAddress || 'Endereço não disponível',
            phone: details.internationalPhoneNumber || details.nationalPhoneNumber || 'Não disponível',
            lat: placeLat,
            lng: placeLng,
            distance: Math.round(distance * 10) / 10,
            type: details.types?.includes('hospital') ? 'hospital' : 'clinica',
            isPublic,
            placeId: details.id
          };
        } catch (error) {
          console.error(`Error processing hospital:`, error);
          return null;
        }
      });

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
