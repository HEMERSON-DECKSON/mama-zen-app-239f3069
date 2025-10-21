import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { X } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useCountry } from "@/contexts/CountryContext";

interface Sound {
  id: string;
  name: string;
  description: string;
  youtubeId: string;
  icon: string;
}

const babySoundsBR: Sound[] = [
  {
    id: "white-noise",
    name: "Ruído Branco",
    description: "Som contínuo que acalma o bebê",
    youtubeId: "nMfPqeZjc2c",
    icon: "🌊"
  },
  {
    id: "rain",
    name: "Chuva Suave",
    description: "Som relaxante de chuva caindo",
    youtubeId: "q76bMs-NwRk",
    icon: "🌧️"
  },
  {
    id: "heartbeat",
    name: "Batimentos Cardíacos",
    description: "Lembra o útero materno",
    youtubeId: "qYnA9wWFHLI",
    icon: "❤️"
  },
  {
    id: "lullaby",
    name: "Canção de Ninar",
    description: "Melodia suave para dormir",
    youtubeId: "sgfMb2WycDo",
    icon: "🎵"
  },
  {
    id: "ocean",
    name: "Ondas do Mar",
    description: "Som tranquilo do oceano",
    youtubeId: "bn9F19Hi1Lk",
    icon: "🌊"
  },
  {
    id: "wind",
    name: "Vento Suave",
    description: "Brisa relaxante",
    youtubeId: "wzjWIxXBs_s",
    icon: "💨"
  }
];

const babySoundsUSA: Sound[] = [
  {
    id: "white-noise",
    name: "White Noise",
    description: "Continuous sound that soothes baby",
    youtubeId: "nMfPqeZjc2c",
    icon: "🌊"
  },
  {
    id: "rain",
    name: "Gentle Rain",
    description: "Relaxing sound of falling rain",
    youtubeId: "q76bMs-NwRk",
    icon: "🌧️"
  },
  {
    id: "heartbeat",
    name: "Heartbeat",
    description: "Reminds of mother's womb",
    youtubeId: "qYnA9wWFHLI",
    icon: "❤️"
  },
  {
    id: "lullaby",
    name: "Lullaby",
    description: "Soft melody for sleeping",
    youtubeId: "sgfMb2WycDo",
    icon: "🎵"
  },
  {
    id: "ocean",
    name: "Ocean Waves",
    description: "Peaceful ocean sound",
    youtubeId: "bn9F19Hi1Lk",
    icon: "🌊"
  },
  {
    id: "wind",
    name: "Gentle Wind",
    description: "Relaxing breeze",
    youtubeId: "wzjWIxXBs_s",
    icon: "💨"
  }
];

export default function BabySounds() {
  const { isUSA } = useCountry();
  const babySounds = isUSA ? babySoundsUSA : babySoundsBR;
  const [currentSound, setCurrentSound] = useState<Sound | null>(null);

  const handleSoundSelect = (sound: Sound) => {
    setCurrentSound(sound);
    toast({
      title: `🎵 ${sound.name}`,
      description: sound.description
    });
  };

  const handleStop = () => {
    setCurrentSound(null);
  };

  return (
    <Card className="border-primary/20 shadow-lg">
      <CardHeader className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          🎵 {isUSA ? 'Calming Sounds' : 'Sons Calmantes'}
        </CardTitle>
        <CardDescription className="text-xs">
          {isUSA ? 'To soothe and help baby sleep' : 'Para acalmar e fazer o bebê dormir'}
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="grid grid-cols-3 gap-2 mb-4">
          {babySounds.map((sound) => (
            <Button
              key={sound.id}
              variant={currentSound?.id === sound.id ? "default" : "outline"}
              className="h-auto flex-col gap-1 p-3 relative text-xs"
              onClick={() => handleSoundSelect(sound)}
            >
              <span className="text-2xl">{sound.icon}</span>
              <div className="text-center">
                <div className="font-semibold text-xs leading-tight">{sound.name}</div>
              </div>
              {currentSound?.id === sound.id && (
                <div className="absolute top-1 right-1">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                </div>
              )}
            </Button>
          ))}
        </div>

        {currentSound && (
          <div className="space-y-3 p-3 rounded-lg bg-primary/5 border border-primary/20">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="text-xl">{currentSound.icon}</span>
                <p className="font-semibold text-sm">{currentSound.name}</p>
              </div>
              <Button
                size="icon"
                variant="ghost"
                onClick={handleStop}
                className="h-6 w-6"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
            
            <div className="aspect-video rounded-lg overflow-hidden">
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${currentSound.youtubeId}?autoplay=1&loop=1&playlist=${currentSound.youtubeId}`}
                title={currentSound.name}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        )}

        <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
          <p className="text-xs">
            <strong>💡 {isUSA ? 'Tip' : 'Dica'}:</strong> {isUSA ? 'Sounds between 50-70dB are ideal for soothing baby.' : 'Sons entre 50-70dB são ideais para acalmar o bebê.'}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
