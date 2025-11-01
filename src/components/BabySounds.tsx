import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { useState, useEffect } from "react";
import { Play, Pause, Volume2, Music } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useYouTubePlayer } from "@/hooks/useYouTubePlayer";

interface Sound {
  id: string;
  name: string;
  description: string;
  youtubeId: string;
  icon: string;
  quality: string;
}

const babySounds: Sound[] = [
  {
    id: "white-noise",
    name: "Ruído Branco",
    description: "Som contínuo que acalma o bebê",
    youtubeId: "nMfPqeZjc2c", // 10h White Noise 4K
    icon: "🌊",
    quality: "10h 4K"
  },
  {
    id: "rain",
    name: "Chuva Suave",
    description: "Som relaxante de chuva caindo",
    youtubeId: "mPZkdNFkNps", // 10h Rain Sounds 4K
    icon: "🌧️",
    quality: "10h 4K"
  },
  {
    id: "heartbeat",
    name: "Batimentos Cardíacos",
    description: "Lembra o útero materno",
    youtubeId: "tuAle-HTtqE", // 12h Heartbeat for Baby
    icon: "❤️",
    quality: "12h HD"
  },
  {
    id: "lullaby",
    name: "Canção de Ninar",
    description: "Melodia suave para dormir",
    youtubeId: "sgfMb2WycDo", // Vídeo especificado pelo usuário
    icon: "🎵",
    quality: "HD"
  },
  {
    id: "ocean",
    name: "Ondas do Mar",
    description: "Som tranquilo do oceano",
    youtubeId: "WHPEKLQID4U", // 12h Ocean Waves 4K
    icon: "🌊",
    quality: "12h 4K"
  },
  {
    id: "wind",
    name: "Vento Suave",
    description: "Brisa relaxante",
    youtubeId: "wzjWIxXBs_s", // 10h Wind Sounds 4K
    icon: "💨",
    quality: "10h 4K"
  }
];

export default function BabySounds() {
  const [currentSound, setCurrentSound] = useState<Sound | null>(null);
  const [volume, setVolume] = useState([70]);
  const { 
    isAPIReady, 
    isPlaying, 
    containerRef, 
    initializePlayer, 
    play, 
    pause, 
    stop: stopPlayer,
    setVolume: setPlayerVolume,
    destroy 
  } = useYouTubePlayer();

  useEffect(() => {
    return () => {
      destroy();
    };
  }, []);

  useEffect(() => {
    if (isPlaying) {
      setPlayerVolume(volume[0]);
    }
  }, [volume, isPlaying]);

  const handleSoundSelect = async (sound: Sound) => {
    if (currentSound?.id === sound.id) {
      // Toggle play/pause
      if (isPlaying) {
        pause();
      } else {
        play();
      }
    } else {
      // Troca de som
      setCurrentSound(sound);
      
      // Pequeno delay para garantir que o DOM está pronto
      setTimeout(() => {
        initializePlayer({
          videoId: sound.youtubeId,
          volume: volume[0],
          onReady: () => {
            toast({
              title: `🎵 ${sound.name}`,
              description: `${sound.description} - ${sound.quality}`,
            });
          },
        });
      }, 100);
    }
  };

  const handleStop = () => {
    stopPlayer();
    destroy();
    setCurrentSound(null);
    toast({
      title: "⏹️ Som parado",
      description: "Reprodução encerrada",
    });
  };

  const handleVolumeChange = (newVolume: number[]) => {
    setVolume(newVolume);
    setPlayerVolume(newVolume[0]);
  };

  return (
    <Card className="border-primary/20 shadow-lg">
      <CardHeader className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <Music className="w-5 h-5" />
          Sons Calmantes Premium
        </CardTitle>
        <CardDescription className="text-xs">
          Vídeos 4K do YouTube para acalmar e fazer o bebê dormir
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-4">
        {/* Container invisível para o player do YouTube */}
        <div id={containerRef} style={{ display: 'none' }} />

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
                <div className="text-[10px] opacity-70 mt-0.5">{sound.quality}</div>
              </div>
              {currentSound?.id === sound.id && isPlaying && (
                <div className="absolute top-1 right-1">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                </div>
              )}
            </Button>
          ))}
        </div>

        {currentSound && (
          <div className="space-y-3 p-3 rounded-lg bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xl">{currentSound.icon}</span>
                <div>
                  <p className="font-semibold text-sm">{currentSound.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {isPlaying ? "🎵 Tocando..." : "⏸️ Pausado"} • {currentSound.quality}
                  </p>
                </div>
              </div>
              <div className="flex gap-1.5">
                <Button
                  size="icon"
                  variant={isPlaying ? "default" : "outline"}
                  onClick={() => handleSoundSelect(currentSound)}
                  className="h-8 w-8"
                >
                  {isPlaying ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
                </Button>
                <Button
                  size="icon"
                  variant="outline"
                  onClick={handleStop}
                  className="h-8 w-8 text-xs"
                >
                  ⏹️
                </Button>
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <Volume2 className="w-3 h-3 text-muted-foreground" />
                <Slider
                  value={volume}
                  onValueChange={handleVolumeChange}
                  max={100}
                  step={1}
                  className="flex-1"
                />
                <span className="text-xs text-muted-foreground w-10 text-right">
                  {volume[0]}%
                </span>
              </div>
            </div>
          </div>
        )}

        <div className="mt-4 p-3 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
          <p className="text-xs">
            <strong>✨ Premium:</strong> Vídeos 4K de alta qualidade do YouTube, sem anúncios e sem travamentos. Som contínuo em background.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
