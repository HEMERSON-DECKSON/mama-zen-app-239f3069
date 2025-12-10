import { useState, useRef, useEffect, useCallback } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Play, Pause, Search, Music, Volume2, X, Loader2, Library, Square } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { useCountry } from '@/contexts/CountryContext';

interface Track {
  id: string;
  title: string;
  artist: string;
  thumbnail?: string;
}

interface Sound {
  id: string;
  name: string;
  nameEN: string;
  description: string;
  youtubeId: string;
  icon: string;
  quality: string;
}

const sleepTracks: Sound[] = [
  {
    id: 'white-noise',
    name: 'Ruído Branco',
    nameEN: 'White Noise',
    description: 'Som contínuo que acalma o bebê',
    youtubeId: 'nMfPqeZjc2c',
    icon: '🌊',
    quality: '10h 4K',
  },
  {
    id: 'rain',
    name: 'Chuva Suave',
    nameEN: 'Gentle Rain',
    description: 'Som relaxante de chuva caindo',
    youtubeId: 'mPZkdNFkNps',
    icon: '🌧️',
    quality: '10h 4K',
  },
  {
    id: 'heartbeat',
    name: 'Para você mamãe',
    nameEN: 'For you mom',
    description: 'Melodia especial para o coração',
    youtubeId: 'P9nd2GbmLWU',
    icon: '❤️',
    quality: 'Premium HD',
  },
  {
    id: 'lullaby',
    name: 'Canção de Ninar',
    nameEN: 'Lullaby',
    description: 'Melodia suave para dormir',
    youtubeId: 'sgfMb2WycDo',
    icon: '🎵',
    quality: 'HD',
  },
  {
    id: 'ocean',
    name: 'Ondas do Mar',
    nameEN: 'Ocean Waves',
    description: 'Som tranquilo do oceano',
    youtubeId: 'WHPEKLQID4U',
    icon: '🌊',
    quality: '12h 4K',
  },
  {
    id: 'wind',
    name: 'Vento Suave',
    nameEN: 'Gentle Wind',
    description: 'Brisa relaxante',
    youtubeId: 'wzjWIxXBs_s',
    icon: '💨',
    quality: '10h 4K',
  },
];

const MusicPlayer = () => {
  const { isUSA } = useCountry();
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState([70]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Track[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showLibrary, setShowLibrary] = useState(true);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  // Textos traduzidos
  const texts = {
    title: isUSA ? 'Mom Zen Music' : 'Mamãe Zen Music',
    subtitle: isUSA ? 'Premium Player' : 'Player Premium',
    search: isUSA ? 'Search music or artist...' : 'Buscar música ou artista...',
    library: isUSA ? 'Library' : 'Biblioteca',
    results: isUSA ? 'Results' : 'Resultados',
    relaxingSounds: isUSA ? 'Relaxing Sounds' : 'Sons Relaxantes',
    resultsFor: isUSA ? 'Results for' : 'Resultados para',
    playing: isUSA ? 'Playing' : 'Tocando',
    stopped: isUSA ? '⏹️ Playback stopped' : '⏹️ Reprodução parada',
    premium: isUSA 
      ? 'Search and play any YouTube music without ads'
      : 'Pesquise e toque qualquer música do YouTube sem anúncios',
    searchError: isUSA ? 'Error searching music' : 'Erro ao buscar músicas',
    noResults: isUSA ? 'No music found' : 'Nenhuma música encontrada',
    typeToSearch: isUSA ? 'Type something to search' : 'Digite algo para pesquisar',
    found: isUSA ? 'Found' : 'Encontradas',
    musics: isUSA ? 'songs' : 'músicas',
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

    // Cria novo iframe otimizado para iOS/Android
    const iframe = document.createElement('iframe');
    iframe.id = `music-player-${Date.now()}`;
    iframe.allow = 'autoplay; encrypted-media; picture-in-picture';
    iframe.setAttribute('allowfullscreen', '');
    iframe.setAttribute('playsinline', '');
    iframe.style.cssText = 'width:1px;height:1px;position:absolute;opacity:0;pointer-events:none;';
    
    const params = new URLSearchParams({
      autoplay: '1',
      mute: '0',
      controls: '0',
      disablekb: '1',
      fs: '0',
      modestbranding: '1',
      playsinline: '1',
      rel: '0',
      showinfo: '0',
      iv_load_policy: '3',
      loop: '1',
      playlist: videoId,
      enablejsapi: '1',
      origin: window.location.origin,
    });

    iframe.src = `https://www.youtube.com/embed/${videoId}?${params.toString()}`;
    container.appendChild(iframe);
    iframeRef.current = iframe;
    setIsPlaying(true);
  }, []);

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      toast.error(texts.typeToSearch);
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
        toast.success(`${texts.found} ${data.results.length} ${texts.musics}`);
      } else {
        setSearchResults([]);
        toast.error(texts.noResults);
      }
    } catch (error) {
      console.error('Search error:', error);
      toast.error(texts.searchError);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  const playTrack = (track: Track) => {
    console.log('Playing:', track.title);
    setCurrentTrack(track);
    createPlayer(track.id);
    toast.success(`🎵 ${isUSA ? 'Playing' : 'Tocando'}: ${track.title}`);
  };

  const handleTrackSelect = (track: Track) => {
    playTrack(track);
  };

  const handleLibraryTrackSelect = (sound: Sound) => {
    const track: Track = {
      id: sound.youtubeId,
      title: isUSA ? sound.nameEN : sound.name,
      artist: sound.description,
    };
    playTrack(track);
  };

  const handlePlayPauseClick = () => {
    if (!currentTrack) return;

    if (isPlaying) {
      if (iframeRef.current) {
        iframeRef.current.src = '';
      }
      setIsPlaying(false);
    } else {
      createPlayer(currentTrack.id);
    }
  };

  const handleStop = () => {
    if (iframeRef.current) {
      iframeRef.current.src = '';
      iframeRef.current.remove();
      iframeRef.current = null;
    }
    setCurrentTrack(null);
    setIsPlaying(false);
    toast.success(texts.stopped);
  };

  return (
    <Card className="overflow-hidden border-0 shadow-xl bg-gradient-to-br from-purple-950/90 via-pink-950/90 to-blue-950/90">
      {/* Container do YouTube Player (invisível mas ativo) */}
      <div
        ref={containerRef}
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          width: '1px',
          height: '1px',
          opacity: 0,
          pointerEvents: 'none',
        }}
      />

      {/* Header */}
      <div className="bg-gradient-to-b from-black/40 to-transparent p-6 pb-4">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-500 to-purple-500 flex items-center justify-center shadow-lg">
            <Music className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">{texts.title}</h2>
            <p className="text-xs text-white/60">{texts.subtitle}</p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="flex gap-2">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
            <Input
              placeholder={texts.search}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              className="pl-10 pr-10 bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:bg-white/15 transition-all"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
              >
                <X className="w-3 h-3 text-white" />
              </button>
            )}
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
            {texts.library}
          </Button>
          {searchResults.length > 0 && (
            <Button
              variant={!showLibrary ? 'secondary' : 'ghost'}
              size="sm"
              onClick={() => setShowLibrary(false)}
              className="text-xs"
            >
              <Search className="w-3 h-3 mr-1" />
              {texts.results} ({searchResults.length})
            </Button>
          )}
        </div>
      </div>

      {/* Content Area */}
      <div className="p-4 pt-2">
        <ScrollArea className="h-[400px] pr-2">
          {showLibrary ? (
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-white/80 mb-2">{texts.relaxingSounds}</h3>
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
                        <p className="font-semibold text-white text-sm leading-tight">
                          {isUSA ? sound.nameEN : sound.name}
                        </p>
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
            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-white/80 mb-2">{texts.resultsFor} "{searchQuery}"</h3>
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
                    <Badge className="bg-green-500/20 text-green-400 text-xs">{texts.playing}</Badge>
                  )}
                </button>
              ))}
            </div>
          )}
        </ScrollArea>

        {/* Player Controls */}
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
                  <Square className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Volume Control */}
            <div className="flex items-center gap-3">
              <Volume2 className="w-4 h-4 text-white/60 flex-shrink-0" />
              <Slider
                value={volume}
                onValueChange={setVolume}
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
            <strong className="text-yellow-400">✨ Premium:</strong> {texts.premium}
          </p>
        </div>
      </div>
    </Card>
  );
};

export default MusicPlayer;
