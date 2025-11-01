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
    if (!isAPIReady || !window.YT) return;

    // Destroi player anterior se existir
    if (playerRef.current) {
      try {
        playerRef.current.destroy();
      } catch (e) {
        console.error('Erro ao destruir player:', e);
      }
    }

    const newPlayer = new window.YT.Player(containerRef.current, {
      height: '0',
      width: '0',
      videoId: options.videoId,
      playerVars: {
        autoplay: 1,
        controls: 0,
        disablekb: 1,
        fs: 0,
        modestbranding: 1,
        playsinline: 1,
        rel: 0,
        showinfo: 0,
        iv_load_policy: 3,
        loop: 1,
        playlist: options.videoId, // necessário para loop funcionar
      },
      events: {
        onReady: (event: any) => {
          event.target.setVolume(options.volume || 70);
          event.target.playVideo();
          options.onReady?.();
          setIsPlaying(true);
        },
        onStateChange: (event: any) => {
          const state = event.data;
          setIsPlaying(state === window.YT.PlayerState.PLAYING);
          options.onStateChange?.(state);
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
