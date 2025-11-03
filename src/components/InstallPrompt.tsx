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
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      
      // Verifica se o usuário já fechou o prompt antes
      const dismissed = localStorage.getItem('installPromptDismissed');
      if (!dismissed) {
        setShowPrompt(true);
      }
    };

    window.addEventListener('beforeinstallprompt', handler);

    // Verifica se já está instalado
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setShowPrompt(false);
    }

    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === 'accepted') {
      const message = isUSA 
        ? 'App installed successfully! 🎉' 
        : 'App instalado com sucesso! 🎉';
      toast.success(message);
    }
    
    setDeferredPrompt(null);
    setShowPrompt(false);
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    localStorage.setItem('installPromptDismissed', 'true');
  };

  if (!showPrompt) return null;

  return (
    <div className="animate-scale-in bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 p-[2px] rounded-xl shadow-lg">
      <div className="bg-white dark:bg-gray-900 rounded-xl p-4 relative">
        <Button
          variant="ghost"
          size="sm"
          onClick={handleDismiss}
          className="absolute top-2 right-2 h-6 w-6 p-0"
        >
          <X className="w-4 h-4" />
        </Button>
        
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
