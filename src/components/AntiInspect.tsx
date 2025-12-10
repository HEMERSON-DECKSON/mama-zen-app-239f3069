import { useEffect } from 'react';
import { toast } from 'sonner';

const AntiInspect = () => {
  useEffect(() => {
    // Detecta se é mobile - não usar detecção de DevTools em mobile (causa falsos positivos)
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    
    // Mostrar toast de aviso apenas em desktop quando DevTools parece estar aberto
    const detectDevTools = () => {
      // Não detectar em mobile - a diferença de tamanho é causada pela barra de endereço
      if (isMobile) return;
      
      const threshold = 200; // Aumentado para evitar falsos positivos
      const widthThreshold = window.outerWidth - window.innerWidth > threshold;
      const heightThreshold = window.outerHeight - window.innerHeight > threshold;
      
      // Só mostrar se ambos os thresholds forem ultrapassados (mais preciso)
      if (widthThreshold && heightThreshold) {
        toast.error("⚠️ Poxa, o app demorou para eu fazer! Tentou inspecionar né? Tá querendo o quê? 🤔", {
          description: "Caso queira saber mais informações, entre em contato: suporte@mamaezen.com.br",
          duration: 10000,
          id: 'anti-inspect' // Evita múltiplos toasts
        });
      }
    };

    // Desabilitar botão direito - apenas em desktop
    const handleContextMenu = (e: MouseEvent) => {
      if (isMobile) return; // Mobile usa long-press para outras funções
      
      e.preventDefault();
      toast.error("⚠️ Poxa, o app demorou para eu fazer! Tentou inspecionar né? Tá querendo o quê? 🤔", {
        description: "Caso queira saber mais informações, entre em contato: suporte@mamaezen.com.br",
        duration: 5000,
        id: 'anti-inspect'
      });
    };

    // Desabilitar teclas de atalho - apenas em desktop
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isMobile) return;
      
      // F12
      if (e.key === 'F12') {
        e.preventDefault();
        toast.error("⚠️ Poxa, o app demorou para eu fazer! Tentou inspecionar né? Tá querendo o quê? 🤔", {
          description: "Caso queira saber mais informações, entre em contato: suporte@mamaezen.com.br",
          duration: 5000,
          id: 'anti-inspect'
        });
      }
      
      // Ctrl+Shift+I / Ctrl+Shift+J / Ctrl+Shift+C
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && 
          (e.key === 'I' || e.key === 'i' || e.key === 'J' || e.key === 'j' || e.key === 'C' || e.key === 'c')) {
        e.preventDefault();
        toast.error("⚠️ Poxa, o app demorou para eu fazer! Tentou inspecionar né? Tá querendo o quê? 🤔", {
          description: "Caso queira saber mais informações, entre em contato: suporte@mamaezen.com.br",
          duration: 5000,
          id: 'anti-inspect'
        });
      }

      // Ctrl+U (View Source)
      if ((e.ctrlKey || e.metaKey) && (e.key === 'U' || e.key === 'u')) {
        e.preventDefault();
        toast.error("⚠️ Poxa, o app demorou para eu fazer! Tentou inspecionar né? Tá querendo o quê? 🤔", {
          description: "Caso queira saber mais informações, entre em contato: suporte@mamaezen.com.br",
          duration: 5000,
          id: 'anti-inspect'
        });
      }
    };

    // Detectar console aberto - apenas em desktop
    let detectConsole: NodeJS.Timeout | null = null;
    if (!isMobile) {
      detectConsole = setInterval(detectDevTools, 2000);
    }

    // Adicionar event listeners
    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('keydown', handleKeyDown);

    // Limpar ao desmontar
    return () => {
      if (detectConsole) {
        clearInterval(detectConsole);
      }
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return null;
};

export default AntiInspect;
