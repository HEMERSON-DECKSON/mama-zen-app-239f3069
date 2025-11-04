import { useState, useEffect } from 'react';
import { Download, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCountry } from '@/contexts/CountryContext';
import { toast } from 'sonner';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

const InstallPrompt = () => {
  const { isUSA } = useCountry();
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) {
      const message = isUSA 
        ? 'To install: Open browser menu → "Install App" or "Add to Home Screen"' 
        : 'Para instalar: Abra o menu do navegador → "Instalar app" ou "Adicionar à tela inicial"';
      toast.info(message, { duration: 5000 });
      return;
    }

    deferredPrompt.prompt();
    
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === 'accepted') {
      const message = isUSA 
        ? 'App installed successfully! 🎉' 
        : 'App instalado com sucesso! 🎉';
      toast.success(message);
    }
    
    setDeferredPrompt(null);
  };

  return (
    <div className="animate-scale-in bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 p-[2px] rounded-xl shadow-lg">
      <div className="bg-white dark:bg-gray-900 rounded-xl p-4 relative">
        
        <div className="flex items-center gap-3">
          <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full flex items-center justify-center">
            <Download className="w-6 h-6 text-white" />
          </div>
          
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-sm mb-1">
              {isUSA ? 'Install Mom Zen' : 'Instalar Mamãe Zen'}
            </h3>
            <p className="text-xs text-muted-foreground">
              {isUSA 
                ? 'Access faster and easier from your home screen!' 
                : 'Acesse mais rápido e fácil direto da sua tela inicial!'}
            </p>
          </div>
        </div>
        
        <Button 
          onClick={handleInstallClick}
          className="w-full mt-3 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700"
          size="sm"
        >
          <Download className="w-4 h-4 mr-2" />
          {isUSA ? 'Install Now' : 'Instalar Agora'}
        </Button>
      </div>
    </div>
  );
};

export default InstallPrompt;
