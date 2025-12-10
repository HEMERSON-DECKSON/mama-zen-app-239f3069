import { useEffect } from 'react';

// Limite máximo de entradas por categoria
const MAX_ENTRIES = 100;

// Chaves de localStorage que devem ser limitadas
const LIMITED_KEYS = ['sleepEntries', 'feedingEntries', 'notifications'];

// Limpa dados antigos e limita o tamanho do cache
const cleanupCache = () => {
  try {
    LIMITED_KEYS.forEach(key => {
      const stored = localStorage.getItem(key);
      if (stored) {
        try {
          const data = JSON.parse(stored);
          if (Array.isArray(data) && data.length > MAX_ENTRIES) {
            // Mantém apenas as últimas MAX_ENTRIES
            const trimmed = data.slice(0, MAX_ENTRIES);
            localStorage.setItem(key, JSON.stringify(trimmed));
            console.log(`Cache cleanup: ${key} trimmed from ${data.length} to ${trimmed.length} entries`);
          }
        } catch (e) {
          console.error(`Error parsing ${key}:`, e);
        }
      }
    });
  } catch (error) {
    console.error('Cache cleanup error:', error);
  }
};

// Limpa players de YouTube órfãos
const cleanupYouTubePlayers = () => {
  try {
    // Remove iframes de YouTube que possam estar órfãos
    const iframes = document.querySelectorAll('iframe[src*="youtube"]');
    iframes.forEach(iframe => {
      const parent = iframe.parentElement;
      if (parent && (parent.style.opacity === '0' || parent.style.display === 'none')) {
        iframe.remove();
      }
    });
  } catch (error) {
    console.error('YouTube cleanup error:', error);
  }
};

// Função para limpar tudo ao sair do app
const handleVisibilityChange = () => {
  if (document.visibilityState === 'hidden') {
    cleanupYouTubePlayers();
    // Salvar estado atual antes de sair
    sessionStorage.setItem('lastCleanup', Date.now().toString());
  }
};

// Função para limpar ao fechar/recarregar
const handleBeforeUnload = () => {
  cleanupYouTubePlayers();
  cleanupCache();
};

export const useCacheCleanup = () => {
  useEffect(() => {
    // Limpa cache na inicialização
    cleanupCache();
    
    // Limpa players órfãos
    cleanupYouTubePlayers();

    // Adiciona listeners
    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('beforeunload', handleBeforeUnload);
    window.addEventListener('pagehide', handleBeforeUnload);

    // Cleanup periódico a cada 5 minutos
    const interval = setInterval(() => {
      cleanupCache();
      cleanupYouTubePlayers();
    }, 5 * 60 * 1000);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('pagehide', handleBeforeUnload);
      clearInterval(interval);
    };
  }, []);
};

export default useCacheCleanup;
