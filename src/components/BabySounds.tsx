import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { useState, useRef, useEffect } from "react";
import { Play, Pause, Volume2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useCountry } from "@/contexts/CountryContext";

interface Sound {
  id: string;
  name: string;
  description: string;
  url: string;
  icon: string;
}

const babySoundsBR: Sound[] = [
  {
    id: "white-noise",
    name: "Ruído Branco",
    description: "Som contínuo que acalma o bebê",
    url: "https://cdn.pixabay.com/audio/2022/03/10/audio_4dd80e2fd6.mp3",
    icon: "🌊"
  },
  {
    id: "rain",
    name: "Chuva Suave",
    description: "Som relaxante de chuva caindo",
    url: "https://cdn.pixabay.com/audio/2022/03/12/audio_74d0e618db.mp3",
    icon: "🌧️"
  },
  {
    id: "heartbeat",
    name: "Batimentos Cardíacos",
    description: "Lembra o útero materno",
    url: "https://cdn.pixabay.com/audio/2023/10/03/audio_13af88aa3e.mp3",
    icon: "❤️"
  },
  {
    id: "lullaby",
    name: "Canção de Ninar",
    description: "Melodia suave para dormir",
    url: "https://cdn.pixabay.com/audio/2022/11/22/audio_1e5b3b493c.mp3",
    icon: "🎵"
  },
  {
    id: "ocean",
    name: "Ondas do Mar",
    description: "Som tranquilo do oceano",
    url: "https://cdn.pixabay.com/audio/2022/06/07/audio_b994e03c42.mp3",
    icon: "🌊"
  },
  {
    id: "wind",
    name: "Vento Suave",
    description: "Brisa relaxante",
    url: "https://cdn.pixabay.com/audio/2022/03/10/audio_2748e0cbd7.mp3",
    icon: "💨"
  }
];

const babySoundsUSA: Sound[] = [
  {
    id: "white-noise",
    name: "White Noise",
    description: "Continuous sound that soothes baby",
    url: "https://cdn.pixabay.com/audio/2022/03/10/audio_4dd80e2fd6.mp3",
    icon: "🌊"
  },
  {
    id: "rain",
    name: "Gentle Rain",
    description: "Relaxing sound of falling rain",
    url: "https://cdn.pixabay.com/audio/2022/03/12/audio_74d0e618db.mp3",
    icon: "🌧️"
  },
  {
    id: "heartbeat",
    name: "Heartbeat",
    description: "Reminds of mother's womb",
    url: "https://cdn.pixabay.com/audio/2023/10/03/audio_13af88aa3e.mp3",
    icon: "❤️"
  },
  {
    id: "lullaby",
    name: "Lullaby",
    description: "Soft melody for sleeping",
    url: "https://cdn.pixabay.com/audio/2022/11/22/audio_1e5b3b493c.mp3",
    icon: "🎵"
  },
  {
    id: "ocean",
    name: "Ocean Waves",
    description: "Peaceful ocean sound",
    url: "https://cdn.pixabay.com/audio/2022/06/07/audio_b994e03c42.mp3",
    icon: "🌊"
  },
  {
    id: "wind",
    name: "Gentle Wind",
    description: "Relaxing breeze",
    url: "https://cdn.pixabay.com/audio/2022/03/10/audio_2748e0cbd7.mp3",
    icon: "💨"
  }
];

export default function BabySounds() {
  const { isUSA } = useCountry();
  const babySounds = isUSA ? babySoundsUSA : babySoundsBR;
  const [currentSound, setCurrentSound] = useState<Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState([70]);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio();
      audioRef.current.loop = true;
    }

    const audio = audioRef.current;

    const handleEnded = () => setIsPlaying(false);
    const handleError = () => {
      toast({
        title: isUSA ? "Error loading sound" : "Erro ao carregar som",
        description: isUSA ? "Could not play this sound." : "Não foi possível reproduzir este som.",
        variant: "destructive"
      });
      setIsPlaying(false);
    };

    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('error', handleError);

    return () => {
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('error', handleError);
      audio.pause();
    };
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume[0] / 100;
    }
  }, [volume]);

  const handleSoundSelect = (sound: Sound) => {
    if (!audioRef.current) return;

    if (currentSound?.id === sound.id) {
      // Toggle play/pause
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play();
        setIsPlaying(true);
      }
    } else {
      // Change sound
      audioRef.current.pause();
      audioRef.current.src = sound.url;
      audioRef.current.load();
      audioRef.current.play();
      setCurrentSound(sound);
      setIsPlaying(true);
      
      toast({
        title: `🎵 ${sound.name}`,
        description: sound.description
      });
    }
  };

  const handleStop = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlaying(false);
      setCurrentSound(null);
    }
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
              {currentSound?.id === sound.id && isPlaying && (
                <div className="absolute top-1 right-1">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                </div>
              )}
            </Button>
          ))}
        </div>

        {currentSound && (
          <div className="space-y-3 p-3 rounded-lg bg-primary/5 border border-primary/20">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xl">{currentSound.icon}</span>
                <div>
                  <p className="font-semibold text-sm">{currentSound.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {isPlaying ? (isUSA ? "Playing..." : "Tocando...") : (isUSA ? "Paused" : "Pausado")}
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
                  onValueChange={setVolume}
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

        <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
          <p className="text-xs">
            <strong>💡 {isUSA ? 'Tip' : 'Dica'}:</strong> {isUSA ? 'Sounds between 50-70dB are ideal for soothing baby.' : 'Sons entre 50-70dB são ideais para acalmar o bebê.'}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
