import { useState, useRef, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Play, Pause, SkipForward, SkipBack, Music, Volume2 } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { toast } from 'sonner';

const sleepTracks = [
  { 
    id: 1, 
    title: 'Chuva Suave na Floresta', 
    duration: '45:00', 
    category: 'Natureza',
    url: 'https://cdn.pixabay.com/download/audio/2022/03/10/audio_4a426a06d6.mp3'
  },
  { 
    id: 2, 
    title: 'Correnteza Tranquila', 
    duration: '30:00', 
    category: 'Natureza',
    url: 'https://cdn.pixabay.com/download/audio/2022/05/13/audio_88ef43c171.mp3'
  },
  { 
    id: 3, 
    title: 'Ondas do Mar Calmo', 
    duration: '60:00', 
    category: 'Natureza',
    url: 'https://cdn.pixabay.com/download/audio/2022/06/07/audio_9a7e2c6e2c.mp3'
  },
  { 
    id: 4, 
    title: 'Chuva com Trovoada Distante', 
    duration: '40:00', 
    category: 'Natureza',
    url: 'https://cdn.pixabay.com/download/audio/2021/08/09/audio_8c66df4173.mp3'
  },
  { 
    id: 5, 
    title: 'Riacho na Montanha', 
    duration: '50:00', 
    category: 'Natureza',
    url: 'https://cdn.pixabay.com/download/audio/2022/03/24/audio_2e3f6c1e2c.mp3'
  },
];

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [volume, setVolume] = useState([70]);
  const [progress, setProgress] = useState([0]);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const track = sleepTracks[currentTrack];

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume[0] / 100;
    }
  }, [volume]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.load();
      setProgress([0]);
      setIsPlaying(false);
    }
  }, [currentTrack]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateProgress = () => {
      const value = (audio.currentTime / audio.duration) * 100;
      setProgress([isNaN(value) ? 0 : value]);
    };

    const handleEnded = () => {
      handleNext();
    };

    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', updateProgress);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [currentTrack]);

  const handlePlayPause = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().catch((error) => {
        console.error('Erro ao reproduzir áudio:', error);
        toast.error('Erro ao reproduzir música. Tente novamente.');
      });
      setIsPlaying(true);
      toast.success(`🎵 Tocando: ${track.title}`);
    }
  };

  const handleNext = () => {
    setCurrentTrack((prev) => (prev + 1) % sleepTracks.length);
  };

  const handlePrevious = () => {
    setCurrentTrack((prev) => (prev - 1 + sleepTracks.length) % sleepTracks.length);
  };

  const handleProgressChange = (value: number[]) => {
    if (!audioRef.current) return;
    const time = (value[0] / 100) * audioRef.current.duration;
    audioRef.current.currentTime = time;
    setProgress(value);
  };

  const formatTime = (seconds: number) => {
    if (isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <Card className="overflow-hidden border-0 shadow-[var(--shadow-soft)] bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10">
      <audio ref={audioRef} src={track.url} preload="metadata" />
      <div className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <Music className="w-6 h-6 text-primary" />
          <h2 className="text-2xl font-bold text-foreground">Músicas para Dormir</h2>
        </div>

        {/* Current Track Display */}
        <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 mb-6 border border-white/40">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-20 h-20 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center shadow-lg">
              <Music className="w-10 h-10 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-foreground mb-1">{track.title}</h3>
              <p className="text-sm text-muted-foreground">{track.category} • {track.duration}</p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-4">
            <Slider
              value={progress}
              onValueChange={handleProgressChange}
              max={100}
              step={0.1}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground mt-2">
              <span>{formatTime(audioRef.current?.currentTime || 0)}</span>
              <span>{formatTime(audioRef.current?.duration || 0)}</span>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={handlePrevious}
              className="rounded-full hover:bg-primary/20"
            >
              <SkipBack className="w-5 h-5" />
            </Button>
            
            <Button
              size="icon"
              onClick={handlePlayPause}
              className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-secondary hover:shadow-[var(--shadow-glow)] transition-all duration-300"
            >
              {isPlaying ? (
                <Pause className="w-6 h-6 text-white" />
              ) : (
                <Play className="w-6 h-6 text-white ml-1" />
              )}
            </Button>
            
            <Button
              variant="ghost"
              size="icon"
              onClick={handleNext}
              className="rounded-full hover:bg-primary/20"
            >
              <SkipForward className="w-5 h-5" />
            </Button>
          </div>

          {/* Volume Control */}
          <div className="flex items-center gap-3 mt-6">
            <Volume2 className="w-5 h-5 text-muted-foreground" />
            <Slider
              value={volume}
              onValueChange={setVolume}
              max={100}
              step={1}
              className="flex-1"
            />
            <span className="text-sm text-muted-foreground w-12 text-right">{volume[0]}%</span>
          </div>
        </div>

        {/* Playlist */}
        <div className="space-y-2">
          <h3 className="text-sm font-semibold text-muted-foreground mb-3">PLAYLIST</h3>
          {sleepTracks.map((t, index) => (
            <button
              key={t.id}
              onClick={() => setCurrentTrack(index)}
              className={`w-full p-4 rounded-xl text-left transition-all duration-300 ${
                index === currentTrack
                  ? 'bg-primary/20 border-2 border-primary/40'
                  : 'bg-white/40 hover:bg-white/60 border border-transparent'
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-foreground">{t.title}</p>
                  <p className="text-sm text-muted-foreground">{t.category}</p>
                </div>
                <span className="text-sm text-muted-foreground">{t.duration}</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default MusicPlayer;
