import { useState, useEffect } from 'react';
import { MapPin, Navigation, Search, Loader2 } from 'lucide-react';
import { useCountry } from '@/contexts/CountryContext';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { Badge } from '@/components/ui/badge';

interface Pharmacy {
  id: string;
  name: string;
  address: string;
  distance?: number;
  lat: number;
  lng: number;
}

const PharmacyMap = () => {
  const { isUSA } = useCountry();
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [pharmacies, setPharmacies] = useState<Pharmacy[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    getCurrentLocation();
  }, []);

  const getCurrentLocation = () => {
    setLoading(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setUserLocation(location);
          searchNearbyPharmacies(location);
        },
        (error) => {
          console.error('Error getting location:', error);
          const message = isUSA 
            ? 'Could not get your location. Please enable location services.'
            : 'Não foi possível obter sua localização. Por favor, habilite os serviços de localização.';
          toast.error(message);
          setLoading(false);
        }
      );
    } else {
      const message = isUSA 
        ? 'Geolocation is not supported by your browser'
        : 'Geolocalização não é suportada pelo seu navegador';
      toast.error(message);
      setLoading(false);
    }
  };

  const searchNearbyPharmacies = async (location: { lat: number; lng: number }) => {
    setLoading(true);
    try {
      const searchTerm = isUSA ? 'pharmacy' : 'farmácia';
      const query = searchQuery || searchTerm;
      
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=20&lat=${location.lat}&lon=${location.lng}&bounded=1&viewbox=${location.lng - 0.1},${location.lat - 0.1},${location.lng + 0.1},${location.lat + 0.1}`
      );
      
      if (!response.ok) throw new Error('Search failed');
      
      const data = await response.json();
      
      const pharmacyList: Pharmacy[] = data
        .filter((place: any) => {
          const displayName = place.display_name.toLowerCase();
          return displayName.includes('farm') || displayName.includes('pharm') || displayName.includes('drog');
        })
        .map((place: any) => {
          const lat = parseFloat(place.lat);
          const lng = parseFloat(place.lon);
          const distance = calculateDistance(location.lat, location.lng, lat, lng);
          
          return {
            id: place.place_id,
            name: place.display_name.split(',')[0],
            address: place.display_name,
            distance,
            lat,
            lng,
          };
        })
        .sort((a: Pharmacy, b: Pharmacy) => (a.distance || 0) - (b.distance || 0))
        .slice(0, 10);
      
      setPharmacies(pharmacyList);
      
      if (pharmacyList.length === 0) {
        const message = isUSA 
          ? 'No pharmacies found nearby. Try searching for a specific area.'
          : 'Nenhuma farmácia encontrada próxima. Tente buscar por uma área específica.';
        toast.info(message);
      } else {
        const message = isUSA 
          ? `Found ${pharmacyList.length} pharmacies nearby`
          : `Encontradas ${pharmacyList.length} farmácias próximas`;
        toast.success(message);
      }
    } catch (error) {
      console.error('Error searching pharmacies:', error);
      const message = isUSA 
        ? 'Error searching for pharmacies. Please try again.'
        : 'Erro ao buscar farmácias. Por favor, tente novamente.';
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
    const R = 6371;
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  const toRad = (value: number): number => {
    return (value * Math.PI) / 180;
  };

  const openInMaps = (pharmacy: Pharmacy) => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${pharmacy.lat},${pharmacy.lng}`;
    window.open(url, '_blank');
  };

  const handleSearch = () => {
    if (userLocation) {
      searchNearbyPharmacies(userLocation);
    } else {
      getCurrentLocation();
    }
  };

  return (
    <div className="space-y-4">
      <Card className="p-4 bg-gradient-to-br from-green-50 to-teal-50 dark:from-green-950/20 dark:to-teal-950/20 border-green-200 dark:border-green-800">
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-green-700 dark:text-green-300">
            <MapPin className="w-5 h-5" />
            <h3 className="font-semibold text-lg">
              {isUSA ? 'Find Nearby Pharmacies' : 'Encontrar Farmácias Próximas'}
            </h3>
          </div>
          
          <p className="text-sm text-muted-foreground">
            {isUSA 
              ? 'Find pharmacies near you quickly and safely'
              : 'Encontre farmácias próximas a você de forma rápida e segura'}
          </p>

          <div className="flex gap-2">
            <Input
              placeholder={isUSA ? "Search for area or pharmacy..." : "Buscar por área ou farmácia..."}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              className="flex-1"
            />
            <Button 
              onClick={handleSearch}
              disabled={loading}
              size="icon"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
            </Button>
          </div>

          {!userLocation && !loading && (
            <Button 
              onClick={getCurrentLocation}
              className="w-full"
              variant="outline"
            >
              <MapPin className="w-4 h-4 mr-2" />
              {isUSA ? 'Enable Location' : 'Ativar Localização'}
            </Button>
          )}
        </div>
      </Card>

      {loading && (
        <Card className="p-8">
          <div className="flex flex-col items-center justify-center gap-3">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
            <p className="text-sm text-muted-foreground">
              {isUSA ? 'Searching for pharmacies...' : 'Buscando farmácias...'}
            </p>
          </div>
        </Card>
      )}

      {!loading && pharmacies.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-semibold text-muted-foreground">
              {isUSA ? `${pharmacies.length} pharmacies found` : `${pharmacies.length} farmácias encontradas`}
            </h4>
          </div>
          
          {pharmacies.map((pharmacy) => (
            <Card 
              key={pharmacy.id}
              className="p-4 hover:shadow-lg transition-all duration-200 border-l-4 border-l-green-500"
            >
              <div className="space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-sm line-clamp-2">
                      {pharmacy.name}
                    </h4>
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                      {pharmacy.address}
                    </p>
                  </div>
                </div>
                
                {pharmacy.distance && (
                  <Badge variant="secondary" className="text-xs">
                    {pharmacy.distance.toFixed(1)} km
                  </Badge>
                )}
                
                <div className="flex gap-2">
                  <Button 
                    onClick={() => openInMaps(pharmacy)} 
                    size="sm" 
                    variant="default"
                    className="w-full"
                  >
                    <Navigation className="w-3 h-3" />
                    {isUSA ? 'Get Directions' : 'Rotas'}
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {!loading && pharmacies.length === 0 && userLocation && (
        <Card className="p-8">
          <div className="text-center space-y-2">
            <MapPin className="w-12 h-12 mx-auto text-muted-foreground opacity-50" />
            <p className="text-sm text-muted-foreground">
              {isUSA 
                ? 'No pharmacies found. Try a different search.'
                : 'Nenhuma farmácia encontrada. Tente uma busca diferente.'}
            </p>
          </div>
        </Card>
      )}
    </div>
  );
};

export default PharmacyMap;
