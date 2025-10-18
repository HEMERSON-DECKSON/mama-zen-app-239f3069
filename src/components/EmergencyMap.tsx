import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Navigation, Hospital, Stethoscope, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";

interface Location {
  lat: number;
  lng: number;
}

interface Emergency {
  name: string;
  type: "hospital" | "clinica" | "pronto-socorro";
  phone: string;
  address: string;
  distance?: number;
  lat?: number;
  lng?: number;
}

const EmergencyMap = () => {
  const [userLocation, setUserLocation] = useState<Location | null>(null);
  const [loading, setLoading] = useState(false);
  const [nearbyPlaces, setNearbyPlaces] = useState<Emergency[]>([]);

  // Dados de exemplo - em produção, usar API do Google Places ou similar
  const emergencyPlaces: Emergency[] = [
    {
      name: "Hospital e Maternidade São Luiz",
      type: "hospital",
      phone: "(11) 3040-6000",
      address: "R. Dr. Alceu de Campos Rodrigues, 229 - Vila Nova Conceição",
      lat: -23.5965,
      lng: -46.6740
    },
    {
      name: "Hospital Infantil Sabará",
      type: "hospital",
      phone: "(11) 3155-0200",
      address: "Av. Angélica, 1968 - Consolação",
      lat: -23.5494,
      lng: -46.6600
    },
    {
      name: "Hospital Albert Einstein",
      type: "hospital",
      phone: "(11) 2151-1233",
      address: "Av. Albert Einstein, 627 - Morumbi",
      lat: -23.5986,
      lng: -46.7158
    },
    {
      name: "Pronto-Socorro Infantil 24h",
      type: "pronto-socorro",
      phone: "(11) 3069-6000",
      address: "R. Vergueiro, 1421 - Paraíso",
      lat: -23.5732,
      lng: -46.6414
    },
    {
      name: "Clínica Pediátrica Crescer",
      type: "clinica",
      phone: "(11) 3885-9900",
      address: "Av. Paulista, 1765 - Bela Vista",
      lat: -23.5613,
      lng: -46.6563
    },
    {
      name: "Hospital da Criança e Maternidade",
      type: "hospital",
      phone: "(11) 2069-8800",
      address: "R. dos Otonis, 700 - Vila Clementino",
      lat: -23.5933,
      lng: -46.6411
    }
  ];

  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371; // Raio da Terra em km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  };

  const getLocation = () => {
    setLoading(true);
    
    if (!navigator.geolocation) {
      toast.error("Geolocalização não é suportada pelo seu navegador");
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const location = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        setUserLocation(location);
        
        // Calcular distâncias
        const placesWithDistance = emergencyPlaces.map(place => ({
          ...place,
          distance: calculateDistance(
            location.lat,
            location.lng,
            place.lat || 0,
            place.lng || 0
          )
        })).sort((a, b) => (a.distance || 0) - (b.distance || 0));
        
        setNearbyPlaces(placesWithDistance);
        setLoading(false);
        toast.success("📍 Localização obtida! Mostrando lugares mais próximos");
      },
      (error) => {
        console.error("Erro ao obter localização:", error);
        toast.error("Não foi possível obter sua localização. Mostrando todos os lugares.");
        setNearbyPlaces(emergencyPlaces);
        setLoading(false);
      }
    );
  };

  useEffect(() => {
    // Carregar lugares ao montar o componente
    setNearbyPlaces(emergencyPlaces);
  }, []);

  const openInMaps = (place: Emergency) => {
    const query = encodeURIComponent(place.address);
    const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${query}`;
    window.open(mapsUrl, '_blank');
  };

  const callPhone = (phone: string) => {
    window.location.href = `tel:${phone}`;
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "hospital":
        return <Hospital className="w-4 h-4" />;
      case "pronto-socorro":
        return <Stethoscope className="w-4 h-4" />;
      default:
        return <MapPin className="w-4 h-4" />;
    }
  };

  const getTypeBadge = (type: string) => {
    switch (type) {
      case "hospital":
        return <Badge className="text-[10px] px-1.5 py-0 bg-red-500">Hospital</Badge>;
      case "pronto-socorro":
        return <Badge className="text-[10px] px-1.5 py-0 bg-orange-500">Pronto-Socorro</Badge>;
      default:
        return <Badge className="text-[10px] px-1.5 py-0 bg-blue-500">Clínica</Badge>;
    }
  };

  return (
    <div className="space-y-4">
      <Card className="bg-gradient-to-br from-red-50 via-orange-50 to-pink-50 dark:from-red-950/20 dark:via-orange-950/20 dark:to-pink-950/20 border-2 border-red-300 dark:border-red-800">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <Hospital className="w-5 h-5 text-red-600 dark:text-red-400" />
            <CardTitle className="text-lg text-red-700 dark:text-red-400">Emergências</CardTitle>
          </div>
          <CardDescription className="text-xs leading-relaxed">
            🚨 Encontre hospitais e atendimentos pediátricos próximos a você
          </CardDescription>
        </CardHeader>
        <CardContent className="p-3 pt-0">
          <Button 
            onClick={getLocation} 
            disabled={loading}
            className="w-full"
            variant={userLocation ? "secondary" : "default"}
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Obtendo localização...
              </>
            ) : userLocation ? (
              <>
                <Navigation className="w-4 h-4" />
                Atualizar minha localização
              </>
            ) : (
              <>
                <MapPin className="w-4 h-4" />
                Encontrar lugares próximos
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* SAMU e Emergências */}
      <Card className="bg-red-500 dark:bg-red-900 text-white border-2 border-red-600">
        <CardContent className="p-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-bold text-sm">🚑 SAMU - Emergência</p>
                <p className="text-xs opacity-90">Atendimento médico de urgência</p>
              </div>
              <Button 
                onClick={() => callPhone("192")} 
                size="sm"
                className="bg-white text-red-600 hover:bg-red-50"
              >
                <Phone className="w-4 h-4" />
                192
              </Button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-bold text-sm">🚨 Bombeiros</p>
                <p className="text-xs opacity-90">Emergências e resgates</p>
              </div>
              <Button 
                onClick={() => callPhone("193")} 
                size="sm"
                className="bg-white text-red-600 hover:bg-red-50"
              >
                <Phone className="w-4 h-4" />
                193
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Lista de Hospitais e Clínicas */}
      <div className="space-y-2">
        <h3 className="text-sm font-semibold px-1">
          {userLocation ? "📍 Mais próximos de você:" : "🏥 Hospitais e Clínicas Pediátricas:"}
        </h3>
        {nearbyPlaces.map((place, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow">
            <CardContent className="p-3">
              <div className="space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      {getTypeIcon(place.type)}
                      <h4 className="font-semibold text-sm leading-tight">{place.name}</h4>
                    </div>
                    <div className="flex items-center gap-2 flex-wrap">
                      {getTypeBadge(place.type)}
                      {place.distance && (
                        <Badge variant="outline" className="text-[10px] px-1.5 py-0">
                          📏 {place.distance.toFixed(1)} km
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
                
                <p className="text-xs text-muted-foreground">{place.address}</p>
                
                <div className="flex gap-2">
                  <Button 
                    onClick={() => callPhone(place.phone)} 
                    size="sm" 
                    variant="default"
                    className="flex-1"
                  >
                    <Phone className="w-3 h-3" />
                    Ligar
                  </Button>
                  <Button 
                    onClick={() => openInMaps(place)} 
                    size="sm" 
                    variant="outline"
                    className="flex-1"
                  >
                    <Navigation className="w-3 h-3" />
                    Rotas
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20">
        <CardContent className="p-3">
          <p className="text-xs text-center leading-relaxed">
            <strong>💡 Dica:</strong> Salve os números de emergência na agenda do seu celular. 
            Em situações de emergência com bebês, cada segundo conta! 🚨
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default EmergencyMap;