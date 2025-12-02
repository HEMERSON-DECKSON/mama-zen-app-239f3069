import { useState, useEffect, useRef } from 'react';

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

interface UseYouTubePlayerOptions {
  videoId: string;
  volume?: number;
  onReady?: () => void;
  onStateChange?: (state: number) => void;
}

export const useYouTubePlayer = () => {
  const [isAPIReady, setIsAPIReady] = useState(false);
  const [player, setPlayer] = useState<any>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const playerRef = useRef<any>(null);
  const containerRef = useRef<string>(`youtube-player-${Math.random().toString(36).substr(2, 9)}`);

  // Carrega a API do YouTube
  useEffect(() => {
    if (window.YT && window.YT.Player) {
      setIsAPIReady(true);
      return;
    }

    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);

    window.onYouTubeIframeAPIReady = () => {
      setIsAPIReady(true);
    };
  }, []);

  const initializePlayer = (options: UseYouTubePlayerOptions) => {
    console.log('initializePlayer chamado:', { isAPIReady, hasYT: !!window.YT, videoId: options.videoId });
    
    if (!isAPIReady || !window.YT) {
      console.warn('API não está pronta ainda');
      return;
    }

    // Destroi player anterior se existir
    if (playerRef.current) {
      try {
        playerRef.current.destroy();
      } catch (e) {
        console.error('Erro ao destruir player:', e);
      }
    }

    // Verifica se o container existe
    const container = document.getElementById(containerRef.current);
    if (!container) {
      console.error('Container não encontrado:', containerRef.current);
      return;
    }

    console.log('Criando player do YouTube...');
    const newPlayer = new window.YT.Player(container, {
      height: '1',
      width: '1',
      videoId: options.videoId,
      playerVars: {
        autoplay: 0, // Não usar autoplay - iOS bloqueia áudio
        controls: 0,
        disablekb: 1,
        fs: 0,
        modestbranding: 1,
        playsinline: 1,
        rel: 0,
        showinfo: 0,
        iv_load_policy: 3,
        loop: 1,
        playlist: options.videoId,
        origin: window.location.origin,
      },
      events: {
        onReady: (event: any) => {
          console.log('Player pronto!');
          // Garantir que não está mutado
          if (event.target.isMuted && event.target.isMuted()) {
            event.target.unMute();
          }
          event.target.setVolume(options.volume || 70);
          options.onReady?.();
          // Tocar imediatamente após ready (iniciado por clique do usuário)
          setTimeout(() => {
            event.target.playVideo();
            setIsPlaying(true);
          }, 100);
        },
        onStateChange: (event: any) => {
          const state = event.data;
          console.log('Estado do player mudou:', state);
          setIsPlaying(state === window.YT.PlayerState.PLAYING);
          options.onStateChange?.(state);
        },
        onError: (event: any) => {
          console.error('Erro no player do YouTube:', event.data);
        },
      },
    });

    playerRef.current = newPlayer;
    setPlayer(newPlayer);
  };

  const play = () => {
    if (playerRef.current) {
      playerRef.current.playVideo();
    }
  };

  const pause = () => {
    if (playerRef.current) {
      playerRef.current.pauseVideo();
    }
  };

  const stop = () => {
    if (playerRef.current) {
      playerRef.current.stopVideo();
    }
  };

  const setVolume = (volume: number) => {
    if (playerRef.current) {
      playerRef.current.setVolume(volume);
    }
  };

  const destroy = () => {
    if (playerRef.current) {
      try {
        playerRef.current.destroy();
      } catch (e) {
        console.error('Erro ao destruir player:', e);
      }
      playerRef.current = null;
      setPlayer(null);
      setIsPlaying(false);
    }
  };

  return {
    isAPIReady,
    player,
    isPlaying,
    containerRef: containerRef.current,
    initializePlayer,
    play,
    pause,
    stop,
    setVolume,
    destroy,
  };
};
