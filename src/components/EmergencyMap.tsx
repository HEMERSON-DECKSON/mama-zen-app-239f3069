import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Navigation, Hospital, Stethoscope, Loader2, Building2 } from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { useCountry } from "@/contexts/CountryContext";

interface IPLocationData {
  city: string;
  region: string;
  country: string;
  latitude: number;
  longitude: number;
}

interface Location {
  lat: number;
  lng: number;
}

interface Emergency {
  name: string;
  type: "hospital" | "clinica" | "pronto-socorro" | "publico" | "particular";
  phone: string;
  address: string;
  distance?: number;
  lat?: number;
  lng?: number;
  isPublic?: boolean;
}

const EmergencyMap = () => {
  const { isUSA } = useCountry();
  const [userLocation, setUserLocation] = useState<Location | null>(null);
  const [loading, setLoading] = useState(false);
  const [nearbyPlaces, setNearbyPlaces] = useState<Emergency[]>([]);
  const [ipLocation, setIpLocation] = useState<IPLocationData | null>(null);

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

  const getIPLocation = async () => {
    try {
      const response = await fetch('https://ipapi.co/json/');
      const data = await response.json();
      return {
        city: data.city,
        region: data.region,
        country: data.country_name,
        latitude: data.latitude,
        longitude: data.longitude
      };
    } catch (error) {
      console.error("Erro ao obter localização por IP:", error);
      return null;
    }
  };

  const searchNearbyHospitals = async (lat: number, lng: number, city: string, region: string) => {
    try {
      // Usando Overpass API para buscar TODAS unidades de saúde próximas - GRATUITO!
      const radius = 10000; // 10km de raio
      const query = `
        [out:json][timeout:25];
        (
          node["amenity"="hospital"](around:${radius},${lat},${lng});
          way["amenity"="hospital"](around:${radius},${lat},${lng});
          node["amenity"="clinic"](around:${radius},${lat},${lng});
          way["amenity"="clinic"](around:${radius},${lat},${lng});
          node["amenity"="doctors"](around:${radius},${lat},${lng});
          way["amenity"="doctors"](around:${radius},${lat},${lng});
          node["healthcare"="hospital"](around:${radius},${lat},${lng});
          way["healthcare"="hospital"](around:${radius},${lat},${lng});
          node["healthcare"="clinic"](around:${radius},${lat},${lng});
          way["healthcare"="clinic"](around:${radius},${lat},${lng});
          node["healthcare"="centre"](around:${radius},${lat},${lng});
          way["healthcare"="centre"](around:${radius},${lat},${lng});
          node["healthcare"="doctor"](around:${radius},${lat},${lng});
          way["healthcare"="doctor"](around:${radius},${lat},${lng});
        );
        out center;
      `;
      
      const response = await fetch('https://overpass-api.de/api/interpreter', {
        method: 'POST',
        body: query
      });
      
      const data = await response.json();
      
      const healthUnits: Emergency[] = data.elements.map((element: any) => {
        const elementLat = element.lat || element.center?.lat;
        const elementLng = element.lon || element.center?.lon;
        const distance = calculateDistance(lat, lng, elementLat, elementLng);
        
        // Determinar tipo baseado nas tags
        let type: Emergency["type"] = "hospital";
        if (element.tags?.amenity === "clinic" || element.tags?.healthcare === "clinic") {
          type = "clinica";
        } else if (element.tags?.amenity === "doctors" || element.tags?.healthcare === "doctor") {
          type = "clinica";
        } else if (element.tags?.healthcare === "centre") {
          type = "pronto-socorro";
        }
        
        return {
          name: element.tags?.name || element.tags?.["name:en"] || "Unidade sem nome",
          type,
          phone: element.tags?.phone || element.tags?.["contact:phone"] || "Não disponível",
          address: `${element.tags?.["addr:street"] || ""} ${element.tags?.["addr:housenumber"] || ""}, ${city} - ${region}`.trim(),
          lat: elementLat,
          lng: elementLng,
          distance,
          isPublic: element.tags?.["healthcare:funding"] === "public" || 
                   element.tags?.operator?.toLowerCase().includes("sus") ||
                   element.tags?.operator?.toLowerCase().includes("público") ||
                   element.tags?.operator?.toLowerCase().includes("ubs") ||
                   element.tags?.name?.toLowerCase().includes("ubs")
        };
      }).filter((h: Emergency) => h.name !== "Unidade sem nome" && h.lat && h.lng);

      return healthUnits.sort((a, b) => (a.distance || 0) - (b.distance || 0)).slice(0, 15);
    } catch (error) {
      if (import.meta.env.DEV) {
        console.error("Erro ao buscar unidades de saúde:", error);
      }
      toast.error("Erro ao buscar unidades próximas");
      return [];
    }
  };

  const getLocation = async () => {
    setLoading(true);
    toast.info("🔍 Buscando hospitais da sua região...");
    
    try {
      // Primeiro, obter localização por IP
      const ipData = await getIPLocation();
      
      if (!ipData) {
        toast.error("Não foi possível obter sua localização por IP");
        setLoading(false);
        return;
      }
      
      setIpLocation(ipData);
      
      const location = {
        lat: ipData.latitude,
        lng: ipData.longitude
      };
      setUserLocation(location);
      
      // Buscar hospitais próximos baseado na localização do IP
      toast.info(`📍 Localização: ${ipData.city} - ${ipData.region}`);
      const hospitals = await searchNearbyHospitals(
        ipData.latitude, 
        ipData.longitude,
        ipData.city,
        ipData.region
      );
      
      if (hospitals.length > 0) {
        setNearbyPlaces(hospitals);
        toast.success(`✅ Encontradas ${hospitals.length} unidades de saúde em ${ipData.city}!`);
      } else {
        toast.warning("Nenhuma unidade encontrada próxima. Tente novamente.");
      }
      
    } catch (error) {
      console.error("Erro:", error);
      toast.error("Erro ao buscar hospitais. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Buscar localização automaticamente ao carregar
    getIPLocation().then(data => {
      if (data) {
        setIpLocation(data);
      }
    });
  }, []);

  const openInMaps = (place: Emergency) => {
    if (!place.lat || !place.lng) {
      const query = encodeURIComponent(place.address);
      const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${query}`;
      window.open(mapsUrl, '_blank');
      return;
    }

    const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);
    const isAndroid = /Android/i.test(navigator.userAgent);
    
    if (isIOS) {
      // iOS: usar URL universal do Google Maps que funciona tanto no app quanto no browser
      const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${place.lat},${place.lng}&travelmode=driving`;
      window.open(mapsUrl, '_blank');
    } else if (isAndroid) {
      // Android: tentar abrir no app do Google Maps primeiro
      const intentUrl = `google.navigation:q=${place.lat},${place.lng}`;
      window.location.href = intentUrl;
      // Fallback para browser após 1 segundo
      setTimeout(() => {
        const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${place.lat},${place.lng}&travelmode=driving`;
        window.open(mapsUrl, '_blank');
      }, 1000);
    } else {
      // Desktop: abrir direto no browser com rotas
      const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${place.lat},${place.lng}`;
      window.open(mapsUrl, '_blank');
    }
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

  const getTypeBadge = (place: Emergency) => {
    const badges = [];
    
    // Badge de tipo
    if (place.type === "hospital") {
      badges.push(<Badge key="type" className="text-[10px] px-1.5 py-0 bg-red-500">Hospital</Badge>);
    } else if (place.type === "pronto-socorro") {
      badges.push(<Badge key="type" className="text-[10px] px-1.5 py-0 bg-orange-500">Pronto-Socorro</Badge>);
    } else {
      badges.push(<Badge key="type" className="text-[10px] px-1.5 py-0 bg-blue-500">Clínica</Badge>);
    }
    
    // Badge de público/particular
    if (place.isPublic !== undefined) {
      badges.push(
        <Badge key="funding" variant="outline" className="text-[10px] px-1.5 py-0">
          {place.isPublic ? "🏥 Público" : "💼 Particular"}
        </Badge>
      );
    }
    
    return badges;
  };

  return (
    <div className="space-y-4">
      <Card className="bg-gradient-to-br from-red-50 via-orange-50 to-pink-50 dark:from-red-950/20 dark:via-orange-950/20 dark:to-pink-950/20 border-2 border-red-300 dark:border-red-800">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <Hospital className="w-5 h-5 text-red-600 dark:text-red-400" />
            <CardTitle className="text-lg text-red-700 dark:text-red-400">Todas as unidades de saúde próximas</CardTitle>
          </div>
          <CardDescription className="text-xs leading-relaxed">
            {ipLocation ? (
              <>📍 Sua região: <strong>{ipLocation.city} - {ipLocation.region}</strong></>
            ) : (
              <>Hospitais, clínicas, UBS e pronto-socorros em um só lugar</>
            )}
          </CardDescription>
        </CardHeader>
        <CardContent className="p-3 pt-0">
          <Button 
            onClick={getLocation} 
            disabled={loading}
            className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 shadow-lg hover:shadow-xl transition-all duration-300"
            size="lg"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Buscando unidades próximas...
              </>
            ) : userLocation ? (
              <>
                <Navigation className="w-4 h-4" />
                🚨 Atualizar localização
              </>
            ) : (
              <>
                <Hospital className="w-4 h-4" />
                🚨 Emergência - Ativar busca
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Emergency Numbers */}
      <Card className="bg-red-500 dark:bg-red-900 text-white border-2 border-red-600">
        <CardContent className="p-4">
          <div className="space-y-2">
            {isUSA ? (
              <>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-bold text-sm">🚑 Emergency Services</p>
                    <p className="text-xs opacity-90">Police, Fire, Medical</p>
                  </div>
                  <Button 
                    onClick={() => callPhone("911")} 
                    size="sm"
                    className="bg-white text-red-600 hover:bg-red-50"
                  >
                    <Phone className="w-4 h-4" />
                    911
                  </Button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-bold text-sm">☎️ Poison Control</p>
                    <p className="text-xs opacity-90">Poisoning emergencies</p>
                  </div>
                  <Button 
                    onClick={() => callPhone("1-800-222-1222")} 
                    size="sm"
                    className="bg-white text-red-600 hover:bg-red-50 text-[10px]"
                  >
                    <Phone className="w-3 h-3" />
                    Call
                  </Button>
                </div>
              </>
            ) : (
              <>
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
              </>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Lista de Hospitais e Clínicas */}
      <div className="space-y-2">
        {nearbyPlaces.length > 0 && (
          <div className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30 p-3 rounded-lg border border-blue-200 dark:border-blue-800">
            <h3 className="text-sm font-bold text-blue-900 dark:text-blue-100">
              {userLocation && ipLocation ? (
                <>📍 {nearbyPlaces.length} unidades encontradas em {ipLocation.city} - {ipLocation.region}</>
              ) : (
                <>🏥 Clique no botão acima para encontrar todas unidades de saúde próximas</>
              )}
            </h3>
          </div>
        )}
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
                      {getTypeBadge(place)}
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
                    onClick={() => openInMaps(place)} 
                    size="sm" 
                    variant="default"
                    className="w-full"
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