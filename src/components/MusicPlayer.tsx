import { useState, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Play, Pause, Search, Music, Volume2, X, Loader2, Library } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';

interface Track {
  id: string;
  title: string;
  artist: string;
  thumbnail?: string;
}

interface Sound {
  id: string;
  name: string;
  description: string;
  youtubeId: string;
  icon: string;
  quality: string;
}

const sleepTracks: Sound[] = [
  {
    id: 'white-noise',
    name: 'Ruído Branco',
    description: 'Som contínuo que acalma o bebê',
    youtubeId: 'nMfPqeZjc2c',
    icon: '🌊',
    quality: '10h 4K',
  },
  {
    id: 'rain',
    name: 'Chuva Suave',
    description: 'Som relaxante de chuva caindo',
    youtubeId: 'mPZkdNFkNps',
    icon: '🌧️',
    quality: '10h 4K',
  },
  {
    id: 'heartbeat',
    name: 'Para você mamãe',
    description: 'Melodia especial para o coração',
    youtubeId: 'P9nd2GbmLWU',
    icon: '❤️',
    quality: 'Premium HD',
  },
  {
    id: 'lullaby',
    name: 'Canção de Ninar',
    description: 'Melodia suave para dormir',
    youtubeId: 'sgfMb2WycDo',
    icon: '🎵',
    quality: 'HD',
  },
  {
    id: 'ocean',
    name: 'Ondas do Mar',
    description: 'Som tranquilo do oceano',
    youtubeId: 'WHPEKLQID4U',
    icon: '🌊',
    quality: '12h 4K',
  },
  {
    id: 'wind',
    name: 'Vento Suave',
    description: 'Brisa relaxante',
    youtubeId: 'wzjWIxXBs_s',
    icon: '💨',
    quality: '10h 4K',
  },
];

const buildEmbedUrl = (videoId: string) => {
  return `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=0&controls=0&modestbranding=1&rel=0&playsinline=1&enablejsapi=1`;
};

const MusicPlayer = () => {
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [volume, setVolume] = useState([70]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Track[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showLibrary, setShowLibrary] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playerSrc, setPlayerSrc] = useState<string | null>(null);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      toast.error('Digite algo para pesquisar');
      return;
    }

    setIsSearching(true);
    setShowLibrary(false);

    try {
      const { data, error } = await supabase.functions.invoke('youtube-search', {
        body: { query: searchQuery },
      });

      if (error) throw error;

      if (data?.results && data.results.length > 0) {
        setSearchResults(data.results);
        toast.success(`Encontradas ${data.results.length} músicas`);
      } else {
        setSearchResults([]);
        toast.error('Nenhuma música encontrada');
      }
    } catch (error) {
      console.error('Search error:', error);
      toast.error('Erro ao buscar músicas');
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  const playTrack = (track: Track) => {
    console.log('Reproduzir via iframe:', track.title);
    setCurrentTrack(track);
    setPlayerSrc(buildEmbedUrl(track.id));
    setIsPlaying(true);
  };

  const handleTrackSelect = (track: Track) => {
    playTrack(track);
  };

  const handleLibraryTrackSelect = (sound: Sound) => {
    const track: Track = {
      id: sound.youtubeId,
      title: sound.name,
      artist: sound.description,
    };
    playTrack(track);
  };

  const handlePlayPauseClick = () => {
    if (!currentTrack) return;

    if (isPlaying) {
      // parar totalmente
      setIsPlaying(false);
      setPlayerSrc(null);
      if (iframeRef.current) {
        iframeRef.current.src = 'about:blank';
      }
    } else {
      // voltar a tocar do início
      playTrack(currentTrack);
    }
  };

  const handleStop = () => {
    setIsPlaying(false);
    setPlayerSrc(null);
    setCurrentTrack(null);
    if (iframeRef.current) {
      iframeRef.current.src = 'about:blank';
    }
    toast.success('⏹️ Reprodução parada');
  };

  const handleVolumeChange = (newVolume: number[]) => {
    setVolume(newVolume);
    // Volume real controlado pelo dispositivo do usuário
  };

  return (
    <Card className="overflow-hidden border-0 shadow-xl bg-gradient-to-br from-purple-950/90 via-pink-950/90 to-blue-950/90 dark:from-purple-950 dark:via-pink-950 dark:to-blue-950">
      {/* Player do YouTube em iframe oculto, mas ativo */}
      <iframe
        ref={iframeRef}
        src={playerSrc || undefined}
        title="Mamãe Zen Music Player"
        style={{ position: 'absolute', width: '1px', height: '1px', top: '-9999px', left: '-9999px', border: '0' }}
        allow="autoplay; encrypted-media; playsinline"
      />

      {/* Header - Estilo Spotify */}
      <div className="bg-gradient-to-b from-black/40 to-transparent p-6 pb-4">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-500 to-purple-500 flex items-center justify-center shadow-lg">
            <Music className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">Mamãe Zen Music</h2>
            <p className="text-xs text-white/60">Player Premium</p>
          </div>
        </div>

        {/* Search Bar - Premium */}
        <div className="flex gap-2">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
            <Input
              placeholder="Buscar música ou artista..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:bg-white/15 transition-all"
            />
          </div>
          <Button
            onClick={handleSearch}
            disabled={isSearching}
            className="bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white px-6"
          >
            {isSearching ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
          </Button>
        </div>

        {/* Toggle View */}
        <div className="flex gap-2 mt-3">
          <Button
            variant={showLibrary ? 'secondary' : 'ghost'}
            size="sm"
            onClick={() => setShowLibrary(true)}
            className="text-xs"
          >
            <Library className="w-3 h-3 mr-1" />
            Biblioteca
          </Button>
          {searchResults.length > 0 && (
            <Button
              variant={!showLibrary ? 'secondary' : 'ghost'}
              size="sm"
              onClick={() => setShowLibrary(false)}
              className="text-xs"
            >
              <Search className="w-3 h-3 mr-1" />
              Resultados ({searchResults.length})
            </Button>
          )}
        </div>
      </div>

      {/* Content Area */}
      <div className="p-4 pt-2">
        <ScrollArea className="h-[400px] pr-2">
          {showLibrary ? (
            /* Biblioteca - Grid de cards premium */
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-white/80 mb-2">Sons Relaxantes</h3>
              <div className="grid grid-cols-2 gap-2">
                {sleepTracks.map((sound) => (
                  <button
                    key={sound.id}
                    onClick={() => handleLibraryTrackSelect(sound)}
                    className={`
                      relative p-4 rounded-xl transition-all duration-300 text-left
                      ${currentTrack?.id === sound.youtubeId
                        ? 'bg-gradient-to-br from-pink-600/40 to-purple-600/40 shadow-lg scale-[1.02]'
                        : 'bg-white/5 hover:bg-white/10'
                      }
                    `}
                  >
                    <div className="flex flex-col gap-2">
                      <span className="text-3xl">{sound.icon}</span>
                      <div>
                        <p className="font-semibold text-white text-sm leading-tight">{sound.name}</p>
                        <p className="text-xs text-white/50 mt-1">{sound.quality}</p>
                      </div>
                    </div>
                    {currentTrack?.id === sound.youtubeId && isPlaying && (
                      <div className="absolute top-2 right-2">
                        <div className="flex gap-0.5">
                          <div className="w-1 h-4 bg-white rounded-full animate-[pulse_0.6s_ease-in-out_infinite]" />
                          <div className="w-1 h-4 bg-white rounded-full animate-[pulse_0.6s_ease-in-out_0.2s_infinite]" />
                          <div className="w-1 h-4 bg-white rounded-full animate-[pulse_0.6s_ease-in-out_0.4s_infinite]" />
                        </div>
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            /* Resultados da Busca - Lista estilo Spotify */
            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-white/80 mb-2">Resultados para "{searchQuery}"</h3>
              {searchResults.map((track) => (
                <button
                  key={track.id}
                  onClick={() => handleTrackSelect(track)}
                  className={`
                    w-full p-3 rounded-lg transition-all duration-200 flex items-center gap-3 text-left
                    ${currentTrack?.id === track.id
                      ? 'bg-gradient-to-r from-pink-600/30 to-purple-600/30'
                      : 'bg-white/5 hover:bg-white/10'
                    }
                  `}
                >
                  <div className="w-8 h-8 rounded bg-gradient-to-br from-pink-500 to-purple-500 flex items-center justify-center flex-shrink-0">
                    {currentTrack?.id === track.id && isPlaying ? (
                      <Pause className="w-4 h-4 text-white" />
                    ) : (
                      <Play className="w-4 h-4 text-white" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-white text-sm truncate">{track.title}</p>
                    <p className="text-xs text-white/50 truncate">{track.artist}</p>
                  </div>
                  {currentTrack?.id === track.id && isPlaying && (
                    <Badge className="bg-green-500/20 text-green-400 text-xs">Tocando</Badge>
                  )}
                </button>
              ))}
            </div>
          )}
        </ScrollArea>

        {/* Player Controls - Footer fixo estilo Spotify */}
        {currentTrack && (
          <div className="mt-4 p-4 rounded-xl bg-gradient-to-r from-pink-600/20 to-purple-600/20 backdrop-blur-sm border border-white/10">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-pink-500 to-purple-500 flex items-center justify-center flex-shrink-0">
                  <Music className="w-6 h-6 text-white" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-white text-sm truncate">{currentTrack.title}</p>
                  <p className="text-xs text-white/60 truncate">{currentTrack.artist}</p>
                </div>
              </div>
              <div className="flex gap-2 flex-shrink-0">
                <Button
                  size="icon"
                  onClick={handlePlayPauseClick}
                  className={`
                    h-10 w-10 rounded-full transition-all
                    ${isPlaying ? 'bg-white text-purple-900 hover:bg-white/90' : 'bg-white/20 text-white hover:bg-white/30'}
                  `}
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
                </Button>
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={handleStop}
                  className="h-10 w-10 text-white/60 hover:text-white hover:bg-white/10"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Volume Control */}
            <div className="flex items-center gap-3">
              <Volume2 className="w-4 h-4 text-white/60 flex-shrink-0" />
              <Slider
                value={volume}
                onValueChange={handleVolumeChange}
                max={100}
                step={1}
                className="flex-1"
              />
              <span className="text-xs text-white/60 w-10 text-right flex-shrink-0">{volume[0]}%</span>
            </div>
          </div>
        )}

        {/* Premium Badge */}
        <div className="mt-4 p-3 rounded-lg bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/20">
          <p className="text-xs text-white/80">
            <strong className="text-yellow-400">✨ Premium:</strong> Pesquise e toque qualquer música do YouTube sem anúncios
          </p>
        </div>
      </div>
    </Card>
  );
};

export default MusicPlayer;
