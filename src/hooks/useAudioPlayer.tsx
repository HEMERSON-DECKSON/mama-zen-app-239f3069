import { useState, useRef, useCallback, useEffect } from 'react';

interface AudioPlayerState {
  isPlaying: boolean;
  currentVideoId: string | null;
  volume: number;
}

export const useAudioPlayer = () => {
  const [state, setState] = useState<AudioPlayerState>({
    isPlaying: false,
    currentVideoId: null,
    volume: 70,
  });
  
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

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

  const createIframe = useCallback((videoId: string, volume: number) => {
    // Remove iframe anterior se existir
    if (iframeRef.current) {
      iframeRef.current.src = '';
      iframeRef.current.remove();
      iframeRef.current = null;
    }

    const container = containerRef.current;
    if (!container) return;

    // Cria novo iframe com configurações otimizadas para iOS/Android
    const iframe = document.createElement('iframe');
    iframe.id = `yt-player-${Date.now()}`;
    iframe.allow = 'autoplay; encrypted-media; picture-in-picture';
    iframe.setAttribute('allowfullscreen', '');
    iframe.setAttribute('playsinline', '');
    iframe.style.cssText = 'width:1px;height:1px;position:absolute;opacity:0;pointer-events:none;';
    
    // URL otimizada para autoplay em mobile
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

    setState(prev => ({
      ...prev,
      isPlaying: true,
      currentVideoId: videoId,
    }));
  }, []);

  const play = useCallback((videoId: string) => {
    createIframe(videoId, state.volume);
  }, [createIframe, state.volume]);

  const pause = useCallback(() => {
    if (iframeRef.current) {
      // Pausa removendo a URL mas mantendo o iframe
      const currentSrc = iframeRef.current.src;
      if (currentSrc) {
        iframeRef.current.setAttribute('data-paused-src', currentSrc);
        iframeRef.current.src = '';
      }
      setState(prev => ({ ...prev, isPlaying: false }));
    }
  }, []);

  const resume = useCallback(() => {
    if (iframeRef.current) {
      const pausedSrc = iframeRef.current.getAttribute('data-paused-src');
      if (pausedSrc) {
        iframeRef.current.src = pausedSrc;
        setState(prev => ({ ...prev, isPlaying: true }));
      } else if (state.currentVideoId) {
        play(state.currentVideoId);
      }
    } else if (state.currentVideoId) {
      play(state.currentVideoId);
    }
  }, [state.currentVideoId, play]);

  const stop = useCallback(() => {
    if (iframeRef.current) {
      iframeRef.current.src = '';
      iframeRef.current.remove();
      iframeRef.current = null;
    }
    setState({
      isPlaying: false,
      currentVideoId: null,
      volume: state.volume,
    });
  }, [state.volume]);

  const setVolume = useCallback((volume: number) => {
    setState(prev => ({ ...prev, volume }));
    // YouTube iframe não suporta mudança de volume via JS sem API
    // O volume é aplicado quando um novo vídeo começa
  }, []);

  const togglePlayPause = useCallback(() => {
    if (state.isPlaying) {
      pause();
    } else {
      resume();
    }
  }, [state.isPlaying, pause, resume]);

  return {
    isPlaying: state.isPlaying,
    currentVideoId: state.currentVideoId,
    volume: state.volume,
    containerRef,
    play,
    pause,
    resume,
    stop,
    setVolume,
    togglePlayPause,
  };
};

export default useAudioPlayer;
