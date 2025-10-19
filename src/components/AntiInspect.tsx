import { useEffect } from 'react';
import { toast } from 'sonner';

const AntiInspect = () => {
  useEffect(() => {
    // Detectar DevTools aberto
    const detectDevTools = () => {
      const threshold = 160;
      const widthThreshold = window.outerWidth - window.innerWidth > threshold;
      const heightThreshold = window.outerHeight - window.innerHeight > threshold;
      
      if (widthThreshold || heightThreshold) {
        toast.error("⚠️ Poxa, o app demorou para eu fazer! Tentou inspecionar né? Tá querendo o quê? 🤔", {
          description: "Caso queira saber mais informações, entre em contato: suporte@mamaezen.com.br",
          duration: 10000
        });
      }
    };

    // Desabilitar botão direito
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      toast.error("⚠️ Poxa, o app demorou para eu fazer! Tentou inspecionar né? Tá querendo o quê? 🤔", {
        description: "Caso queira saber mais informações, entre em contato: suporte@mamaezen.com.br",
        duration: 5000
      });
    };

    // Desabilitar teclas de atalho
    const handleKeyDown = (e: KeyboardEvent) => {
      // F12
      if (e.key === 'F12') {
        e.preventDefault();
        toast.error("⚠️ Poxa, o app demorou para eu fazer! Tentou inspecionar né? Tá querendo o quê? 🤔", {
          description: "Caso queira saber mais informações, entre em contato: suporte@mamaezen.com.br",
          duration: 5000
        });
      }
      
      // Ctrl+Shift+I / Ctrl+Shift+J / Ctrl+Shift+C
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && 
          (e.key === 'I' || e.key === 'i' || e.key === 'J' || e.key === 'j' || e.key === 'C' || e.key === 'c')) {
        e.preventDefault();
        toast.error("⚠️ Poxa, o app demorou para eu fazer! Tentou inspecionar né? Tá querendo o quê? 🤔", {
          description: "Caso queira saber mais informações, entre em contato: suporte@mamaezen.com.br",
          duration: 5000
        });
      }

      // Ctrl+U (View Source)
      if ((e.ctrlKey || e.metaKey) && (e.key === 'U' || e.key === 'u')) {
        e.preventDefault();
        toast.error("⚠️ Poxa, o app demorou para eu fazer! Tentou inspecionar né? Tá querendo o quê? 🤔", {
          description: "Caso queira saber mais informações, entre em contato: suporte@mamaezen.com.br",
          duration: 5000
        });
      }
    };

    // Detectar console aberto
    const detectConsole = setInterval(detectDevTools, 1000);

    // Adicionar event listeners
    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('keydown', handleKeyDown);

    // Limpar ao desmontar
    return () => {
      clearInterval(detectConsole);
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return null;
};

export default AntiInspect;
