import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { useState, useRef, useEffect, useCallback } from "react";
import { Play, Pause, Volume2, Music, Square, AlertCircle } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useCountry } from "@/contexts/CountryContext";

interface Sound {
  id: string;
  name: string;
  nameEN: string;
  description: string;
  descriptionEN: string;
  youtubeId: string;
  icon: string;
  quality: string;
}

const babySounds: Sound[] = [
  {
    id: "white-noise",
    name: "Ruído Branco",
    nameEN: "White Noise",
    description: "Som contínuo que acalma o bebê",
    descriptionEN: "Continuous sound that calms baby",
    youtubeId: "nMfPqeZjc2c",
    icon: "🌊",
    quality: "10h 4K"
  },
  {
    id: "rain",
    name: "Chuva Suave",
    nameEN: "Gentle Rain",
    description: "Som relaxante de chuva caindo",
    descriptionEN: "Relaxing rain falling sound",
    youtubeId: "mPZkdNFkNps",
    icon: "🌧️",
    quality: "10h 4K"
  },
  {
    id: "heartbeat",
    name: "Para você mamãe",
    nameEN: "For you mom",
    description: "Melodia especial para o coração",
    descriptionEN: "Special melody for the heart",
    youtubeId: "P9nd2GbmLWU",
    icon: "❤️",
    quality: "Premium HD"
  },
  {
    id: "lullaby",
    name: "Canção de Ninar",
    nameEN: "Lullaby",
    description: "Melodia suave para dormir",
    descriptionEN: "Soft melody for sleeping",
    youtubeId: "sgfMb2WycDo",
    icon: "🎵",
    quality: "HD"
  },
  {
    id: "ocean",
    name: "Ondas do Mar",
    nameEN: "Ocean Waves",
    description: "Som tranquilo do oceano",
    descriptionEN: "Peaceful ocean sound",
    youtubeId: "WHPEKLQID4U",
    icon: "🌊",
    quality: "12h 4K"
  },
  {
    id: "wind",
    name: "Vento Suave",
    nameEN: "Gentle Wind",
    description: "Brisa relaxante",
    descriptionEN: "Relaxing breeze",
    youtubeId: "wzjWIxXBs_s",
    icon: "💨",
    quality: "10h 4K"
  }
];

export default function BabySounds() {
  const { isUSA } = useCountry();
  const [currentSound, setCurrentSound] = useState<Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState([70]);
  const [showPlayer, setShowPlayer] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  // Detecta iOS
  useEffect(() => {
    const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    setIsIOS(iOS);
  }, []);

  // Textos traduzidos
  const texts = {
    title: isUSA ? 'Soothing Sounds momzen' : 'Sons Calmantes mamaezen',
    description: isUSA 
      ? 'Premium high-quality audio to calm and help baby sleep'
      : 'Áudios premium em alta qualidade para acalmar e fazer o bebê dormir',
    playing: isUSA ? '🎵 Playing...' : '🎵 Tocando...',
    paused: isUSA ? '⏸️ Paused' : '⏸️ Pausado',
    stopped: isUSA ? '⏹️ Stopped' : '⏹️ Parado',
    premium: isUSA 
      ? '✨ momzen Premium: High-quality audio, continuous playback without interruptions. Perfect for creating a calm environment.'
      : '✨ mamaezen Premium: Áudios em alta qualidade, reprodução contínua sem interrupções. Perfeito para criar um ambiente tranquilo.',
    iosTip: isUSA
      ? '📱 iPhone: If sound doesn\'t play, tap the player below and press play on the video'
      : '📱 iPhone: Se o som não tocar, toque no player abaixo e aperte play no vídeo',
  };

  // Limpa iframe ao desmontar
  useEffect(() => {
    return () => {
      if (iframeRef.current) {
        iframeRef.current.src = '';
        iframeRef.current.remove();
        iframeRef.current = null;
      }
    };
  }, []);

  const createPlayer = useCallback((videoId: string) => {
    const container = containerRef.current;
    if (!container) return;

    // Remove iframe anterior
    if (iframeRef.current) {
      iframeRef.current.src = '';
      iframeRef.current.remove();
      iframeRef.current = null;
    }

    // Cria novo iframe
    const iframe = document.createElement('iframe');
    iframe.id = `sound-player-${Date.now()}`;
    iframe.allow = 'autoplay; encrypted-media; picture-in-picture; fullscreen';
    iframe.setAttribute('allowfullscreen', 'true');
    iframe.setAttribute('playsinline', 'true');
    iframe.setAttribute('frameborder', '0');
    
    // Para iOS, mostramos um player pequeno visível para o usuário poder interagir
    if (isIOS) {
      iframe.style.cssText = 'width:100%;height:60px;border-radius:8px;';
      setShowPlayer(true);
    } else {
      iframe.style.cssText = 'width:1px;height:1px;position:absolute;opacity:0;pointer-events:none;';
      setShowPlayer(false);
    }
    
    // Parâmetros otimizados para mobile
    const params = new URLSearchParams({
      autoplay: '1',
      mute: '0',
      controls: isIOS ? '1' : '0', // iOS precisa de controles visíveis
      playsinline: '1',
      rel: '0',
      modestbranding: '1',
      loop: '1',
      playlist: videoId,
      enablejsapi: '1',
      origin: window.location.origin,
    });

    // Usar youtube-nocookie para melhor privacidade
    iframe.src = `https://www.youtube-nocookie.com/embed/${videoId}?${params.toString()}`;
    container.appendChild(iframe);
    iframeRef.current = iframe;
    setIsPlaying(true);
  }, [isIOS]);

  const handleSoundSelect = (sound: Sound) => {
    if (currentSound?.id === sound.id) {
      // Toggle play/pause
      if (isPlaying) {
        if (iframeRef.current) {
          iframeRef.current.src = '';
        }
        setIsPlaying(false);
        setShowPlayer(false);
      } else {
        createPlayer(sound.youtubeId);
      }
    } else {
      // Troca de som
      setCurrentSound(sound);
      createPlayer(sound.youtubeId);
      
      const name = isUSA ? sound.nameEN : sound.name;
      const desc = isUSA ? sound.descriptionEN : sound.description;
      toast({
        title: `🎵 ${name}`,
        description: `${desc} - ${sound.quality}`,
      });
    }
  };

  const handleStop = () => {
    if (iframeRef.current) {
      iframeRef.current.src = '';
      iframeRef.current.remove();
      iframeRef.current = null;
    }
    setCurrentSound(null);
    setIsPlaying(false);
    setShowPlayer(false);
    toast({
      title: texts.stopped,
      description: isUSA ? "Playback ended" : "Reprodução encerrada",
    });
  };

  const getSoundName = (sound: Sound) => isUSA ? sound.nameEN : sound.name;

  return (
    <Card className="border-pink-500/20 shadow-lg bg-gradient-to-br from-purple-900/40 to-pink-900/40">
      <CardHeader className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 pb-3">
        <CardTitle className="text-lg flex items-center gap-2 text-white">
          <Music className="w-5 h-5 text-pink-400" />
          {texts.title}
        </CardTitle>
        <CardDescription className="text-xs text-pink-200/70">
          {texts.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-4">
        {/* Container para o player - visível no iOS */}
        <div
          ref={containerRef}
          className={showPlayer ? 'mb-4 rounded-lg overflow-hidden' : ''}
          style={showPlayer ? {} : {
            position: 'fixed',
            bottom: 0,
            left: 0,
            width: '1px',
            height: '1px',
            opacity: 0,
            pointerEvents: 'none',
          }}
        />

        {/* Dica para iOS */}
        {isIOS && currentSound && (
          <div className="mb-4 p-2 rounded-lg bg-blue-500/20 border border-blue-500/30 flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-blue-200">{texts.iosTip}</p>
          </div>
        )}

        <div className="grid grid-cols-3 gap-2 mb-4">
          {babySounds.map((sound) => (
            <Button
              key={sound.id}
              variant={currentSound?.id === sound.id ? "default" : "outline"}
              className={`h-auto flex-col gap-1 p-3 relative text-xs transition-all ${
                currentSound?.id === sound.id 
                  ? 'bg-gradient-to-br from-pink-500 to-purple-600 text-white border-0 shadow-lg shadow-pink-500/30' 
                  : 'border-purple-500/30 text-pink-200 hover:bg-purple-500/20 hover:text-white'
              }`}
              onClick={() => handleSoundSelect(sound)}
            >
              <span className="text-2xl">{sound.icon}</span>
              <div className="text-center">
                <div className="font-semibold text-xs leading-tight">{getSoundName(sound)}</div>
                <div className="text-[10px] opacity-70 mt-0.5">{sound.quality}</div>
              </div>
              {currentSound?.id === sound.id && isPlaying && (
                <div className="absolute top-1 right-1">
                  <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                </div>
              )}
            </Button>
          ))}
        </div>

        {currentSound && (
          <div className="space-y-3 p-3 rounded-lg bg-[#1e1b4b] border border-purple-500/30">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xl">{currentSound.icon}</span>
                <div>
                  <p className="font-semibold text-sm text-white">{getSoundName(currentSound)}</p>
                  <p className="text-xs text-pink-200/70">
                    {isPlaying ? texts.playing : texts.paused} • {currentSound.quality}
                  </p>
                </div>
              </div>
              <div className="flex gap-1.5">
                <Button
                  size="icon"
                  className={`h-8 w-8 ${
                    isPlaying 
                      ? 'bg-white text-purple-900 hover:bg-white/90' 
                      : 'bg-gradient-to-r from-pink-500 to-purple-500 text-white hover:from-pink-600 hover:to-purple-600'
                  }`}
                  onClick={() => handleSoundSelect(currentSound)}
                >
                  {isPlaying ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
                </Button>
                <Button
                  size="icon"
                  variant="outline"
                  onClick={handleStop}
                  className="h-8 w-8 border-purple-500/30 text-pink-200 hover:bg-purple-500/20"
                >
                  <Square className="w-3 h-3" />
                </Button>
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <Volume2 className="w-3 h-3 text-pink-200/70" />
                <Slider
                  value={volume}
                  onValueChange={setVolume}
                  max={100}
                  step={1}
                  className="flex-1"
                />
                <span className="text-xs text-pink-200/70 w-10 text-right">
                  {volume[0]}%
                </span>
              </div>
            </div>
          </div>
        )}

        <div className="mt-4 p-3 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 rounded-lg border border-yellow-500/20">
          <p className="text-xs text-yellow-200">
            <strong className="text-yellow-400">✨</strong> {texts.premium}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
