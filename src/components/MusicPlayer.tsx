import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Play, Pause, SkipForward, SkipBack, Music, Volume2 } from 'lucide-react';
import { Slider } from '@/components/ui/slider';

const sleepTracks = [
  { id: 1, title: 'Chuva Suave', duration: '45:00', category: 'Natureza' },
  { id: 2, title: 'Ninar do Bebê', duration: '30:00', category: 'Melodias' },
  { id: 3, title: 'Ondas do Mar', duration: '60:00', category: 'Natureza' },
  { id: 4, title: 'Piano Relaxante', duration: '40:00', category: 'Melodias' },
  { id: 5, title: 'Floresta Encantada', duration: '50:00', category: 'Natureza' },
];

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [volume, setVolume] = useState([70]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleNext = () => {
    setCurrentTrack((prev) => (prev + 1) % sleepTracks.length);
  };

  const handlePrevious = () => {
    setCurrentTrack((prev) => (prev - 1 + sleepTracks.length) % sleepTracks.length);
  };

  const track = sleepTracks[currentTrack];

  return (
    <Card className="overflow-hidden border-0 shadow-[var(--shadow-soft)] bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10">
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
              value={[35]}
              max={100}
              step={1}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground mt-2">
              <span>15:30</span>
              <span>{track.duration}</span>
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
