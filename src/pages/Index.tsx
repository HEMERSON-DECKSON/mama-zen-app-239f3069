import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCountry } from '@/contexts/CountryContext';
import WelcomeGreeting from '@/components/WelcomeGreeting';
import CountrySelector from '@/components/CountrySelector';
import ThemeSelector from '@/components/ThemeSelector';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import MusicPlayer from '@/components/MusicPlayer';
import RoutineCalendar from '@/components/RoutineCalendar';
import GuideLibrary from '@/components/GuideLibrary';
import PracticalGuides from '@/components/PracticalGuides';
import BabySounds from '@/components/BabySounds';
import SleepTracker from '@/components/SleepTracker';
import FeedingTracker from '@/components/FeedingTracker';
import MedicineGuide from '@/components/MedicineGuide';
import AutismGuide from '@/components/AutismGuide';
import EmergencyMap from '@/components/EmergencyMap';
import PharmacyMap from '@/components/PharmacyMap';
import AntiInspect from '@/components/AntiInspect';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Baby, Music, Calendar, BookOpen, Moon, Milk, Sparkles, Heart, Pill, Brain, MapPin, Instagram, ShoppingBag, Cross } from 'lucide-react';
import { toast } from 'sonner';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';

const Index = () => {
  const { isUSA } = useCountry();
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [userName, setUserName] = useState<string>('');
  const [tempName, setTempName] = useState<string>('');
  const [showNameDialog, setShowNameDialog] = useState<boolean>(false);

  useEffect(() => {
    const savedName = localStorage.getItem('userName');
    if (savedName) {
      setUserName(savedName);
    } else {
      setShowNameDialog(true);
    }
  }, []);

  const handleNameSubmit = () => {
    if (tempName.trim()) {
      // Validação e sanitização do nome
      const sanitizedName = tempName
        .trim()
        .slice(0, 50) // Limite de 50 caracteres
        .replace(/[<>]/g, ''); // Remove caracteres perigosos
      
      if (sanitizedName.length < 2) {
        const message = isUSA 
          ? 'Name must have at least 2 characters'
          : 'O nome deve ter pelo menos 2 caracteres';
        toast.error(message);
        return;
      }

      setUserName(sanitizedName);
      localStorage.setItem('userName', sanitizedName);
      setShowNameDialog(false);
      const message = isUSA 
        ? `Welcome, ${sanitizedName}! Your premium journey starts now! 💝✨`
        : `Bem-vinda, ${sanitizedName}! Sua jornada premium começa agora! 💝✨`;
      toast.success(message);
    }
  };

  const handleMoodSelect = (mood: string) => {
    setSelectedMood(mood);
    
    const moodMessagesBR: Record<string, string> = {
      good: 'Que ótimo! Continue assim, você está incrível! 💪',
      calm: 'Maravilhoso estar tranquila. Aproveite esse momento de paz. 🧘‍♀️',
      tired: 'Eu entendo, minha linda. Lembre-se de descansar sempre que possível. 💤',
      anxious: 'Respire fundo. Você está fazendo um trabalho incrível. Tudo vai ficar bem. 🌸',
      happy: 'Que alegria! Sua felicidade ilumina tudo ao redor! ✨',
    };

    const moodMessagesUSA: Record<string, string> = {
      good: 'That\'s great! Keep it up, you\'re amazing! 💪',
      calm: 'Wonderful to feel calm. Enjoy this moment of peace. 🧘‍♀️',
      tired: 'I understand, dear. Remember to rest whenever possible. 💤',
      anxious: 'Take a deep breath. You\'re doing an incredible job. Everything will be okay. 🌸',
      happy: 'How joyful! Your happiness brightens everything around! ✨',
    };

    const messages = isUSA ? moodMessagesUSA : moodMessagesBR;
    const defaultMsg = isUSA ? 'Thanks for sharing!' : 'Obrigada por compartilhar!';
    toast.success(messages[mood] || defaultMsg);
  };

  return (
    <>
      <AntiInspect />
      <Dialog open={showNameDialog} onOpenChange={setShowNameDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl text-center">
              {isUSA ? 'Welcome, Mom! 💝' : 'Bem-vinda, Mamãe! 💝'}
            </DialogTitle>
            <DialogDescription className="text-center text-base pt-2">
              {isUSA 
                ? 'Enter your name so I can create a special experience for you'
                : 'Informe o seu nome para que eu possa criar uma experiência especial para você'}
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-4 py-4">
            <Input
              placeholder={isUSA ? "Enter your name..." : "Digite seu nome..."}
              value={tempName}
              onChange={(e) => setTempName(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleNameSubmit()}
              className="text-center text-lg"
              autoFocus
              maxLength={50}
              minLength={2}
            />
            <Button 
              onClick={handleNameSubmit} 
              disabled={!tempName.trim()}
              className="w-full"
              size="lg"
            >
              {isUSA ? 'Start my journey 🌟' : 'Começar minha jornada 🌟'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <div className="min-h-screen bg-gradient-to-br from-[hsl(var(--bg-gradient-start))] via-[hsl(var(--bg-gradient-middle))] to-[hsl(var(--bg-gradient-end))] dark:from-gray-900 dark:via-purple-900/20 dark:to-blue-900/20 transition-colors duration-500">
        <div className="w-full max-w-md mx-auto p-4 space-y-6">
          {/* Header */}
          <div className="text-center space-y-2 animate-fade-in pt-2">
            <div className="flex items-center justify-center gap-2 mb-1">
              <Sparkles className="w-6 h-6 text-pink-500 animate-pulse" />
              <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
                {isUSA ? 'Mom Zen' : 'Mamãe Zen'}
              </h1>
              <Sparkles className="w-6 h-6 text-purple-500 animate-pulse" />
            </div>
            <p className="text-muted-foreground text-sm font-medium px-4">
              {isUSA ? '✨ Premium motherhood app ✨' : '✨ App premium de maternidade ✨'}
            </p>
            <a 
              href="https://www.instagram.com/app_mamae_zen?igsh=bGlydG9udHp3aXhs" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-pink-600 transition-colors"
            >
              <Instagram className="w-5 h-5" />
              <span>@app_mamae_zen</span>
            </a>
            <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
              <span className="px-2 py-1 rounded-full bg-primary/10 text-primary font-semibold text-xs">PREMIUM</span>
            </div>
          </div>

          {/* Theme Selector */}
          <div className="animate-fade-in">
            <ThemeSelector />
          </div>

          {/* Country Selector */}
          <div className="animate-fade-in">
            <CountrySelector />
          </div>

          {/* Welcome */}
          {userName && (
            <div className="animate-scale-in">
              <WelcomeGreeting userName={userName} onMoodSelect={handleMoodSelect} />
            </div>
          )}

          {/* Tabs */}
          <Tabs defaultValue="guides" className="animate-fade-in">
            <TabsList className="grid w-full grid-cols-4 gap-1 h-auto p-1">
              <TabsTrigger value="guides" className="flex-col gap-1 py-2 px-1 text-xs">
                <Baby className="w-4 h-4" />
                <span>{isUSA ? 'Guides' : 'Guias'}</span>
              </TabsTrigger>
              <TabsTrigger value="sounds" className="flex-col gap-1 py-2 px-1 text-xs">
                <Heart className="w-4 h-4" />
                <span>{isUSA ? 'Sounds' : 'Sons'}</span>
              </TabsTrigger>
              <TabsTrigger value="medicine" className="flex-col gap-1 py-2 px-1 text-xs">
                <Pill className="w-4 h-4" />
                <span>{isUSA ? 'Medicine' : 'Remédios'}</span>
              </TabsTrigger>
              <TabsTrigger value="emergency" className="flex-col gap-1 py-2 px-1 text-xs">
                <MapPin className="w-4 h-4" />
                <span>{isUSA ? 'Emergency' : 'Emergência'}</span>
              </TabsTrigger>
            </TabsList>

            <TabsList className="grid w-full grid-cols-4 gap-1 h-auto p-1 mt-2">
              <TabsTrigger value="pharmacy" className="flex-col gap-1 py-2 px-1 text-xs">
                <Cross className="w-4 h-4" />
                <span>{isUSA ? 'Pharmacy' : 'Farmácia'}</span>
              </TabsTrigger>
              <TabsTrigger value="shop" className="flex-col gap-1 py-2 px-1 text-xs">
                <ShoppingBag className="w-4 h-4" />
                <span>{isUSA ? 'Shop' : 'Lojinha'}</span>
              </TabsTrigger>
            </TabsList>

            <div className="mt-4">
              <TabsContent value="guides" className="mt-0"><PracticalGuides /></TabsContent>
              <TabsContent value="sounds" className="mt-0"><BabySounds /></TabsContent>
              <TabsContent value="medicine" className="mt-0"><MedicineGuide /></TabsContent>
              <TabsContent value="emergency" className="mt-0"><EmergencyMap /></TabsContent>
              <TabsContent value="pharmacy" className="mt-0"><PharmacyMap /></TabsContent>
              <TabsContent value="shop" className="mt-0">
                <Card className="p-6 bg-gradient-to-br from-pink-50 to-purple-50 dark:from-pink-950/20 dark:to-purple-950/20 border-pink-200 dark:border-pink-800">
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-pink-700 dark:text-pink-300">
                      <ShoppingBag className="w-6 h-6" />
                      <h3 className="font-semibold text-xl">
                        {isUSA ? 'Mom Shop' : 'Lojinha da Mamãe'}
                      </h3>
                    </div>
                    
                    <p className="text-sm text-muted-foreground">
                      {isUSA 
                        ? 'Discover amazing products selected especially for you and your baby!'
                        : 'Descubra produtos incríveis selecionados especialmente para você e seu bebê!'}
                    </p>

                    <Button 
                      onClick={() => window.open('https://collshp.com/mamaezenshopping', '_blank')}
                      className="w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white font-semibold py-6"
                      size="lg"
                    >
                      <ShoppingBag className="w-5 h-5 mr-2" />
                      {isUSA ? 'Visit Shop' : 'Visitar Lojinha'}
                    </Button>

                    <p className="text-xs text-center text-muted-foreground">
                      {isUSA 
                        ? '✨ Special products for moms and babies'
                        : '✨ Produtos especiais para mamães e bebês'}
                    </p>
                  </div>
                </Card>
              </TabsContent>
            </div>

            {/* Secondary Tabs - Collapsible */}
            <div className="mt-4 p-3 rounded-lg bg-card border border-primary/20 shadow-md">
              <details className="group">
                <summary className="cursor-pointer list-none flex items-center justify-between font-semibold text-sm">
                  <span>{isUSA ? '✨ More Premium Features' : '✨ Mais Recursos Premium'}</span>
                  <span className="transition group-open:rotate-180">▼</span>
                </summary>
                <div className="mt-3 space-y-2">
                  <TabsList className="grid w-full grid-cols-2 gap-1 h-auto p-1">
                    <TabsTrigger value="sleep" className="flex-col gap-1 py-2 text-xs">
                      <Moon className="w-4 h-4" />
                      <span>{isUSA ? 'Sleep' : 'Sono'}</span>
                    </TabsTrigger>
                    <TabsTrigger value="feeding" className="flex-col gap-1 py-2 text-xs">
                      <Milk className="w-4 h-4" />
                      <span>{isUSA ? 'Feed' : 'Mamar'}</span>
                    </TabsTrigger>
                    <TabsTrigger value="autism" className="flex-col gap-1 py-2 text-xs">
                      <Brain className="w-4 h-4" />
                      <span>{isUSA ? 'Autism' : 'Autismo'}</span>
                    </TabsTrigger>
                    <TabsTrigger value="routine" className="flex-col gap-1 py-2 text-xs">
                      <Calendar className="w-4 h-4" />
                      <span>{isUSA ? 'Routine' : 'Rotina'}</span>
                    </TabsTrigger>
                    <TabsTrigger value="music" className="flex-col gap-1 py-2 text-xs">
                      <Music className="w-4 h-4" />
                      <span>{isUSA ? 'Music' : 'Músicas'}</span>
                    </TabsTrigger>
                    <TabsTrigger value="ebook" className="flex-col gap-1 py-2 text-xs">
                      <BookOpen className="w-4 h-4" />
                      <span>{isUSA ? 'E-book' : 'E-book'}</span>
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="sleep" className="mt-2"><SleepTracker /></TabsContent>
                  <TabsContent value="feeding" className="mt-2"><FeedingTracker /></TabsContent>
                  <TabsContent value="autism" className="mt-2"><AutismGuide /></TabsContent>
                  <TabsContent value="routine" className="mt-2"><RoutineCalendar /></TabsContent>
                  <TabsContent value="music" className="mt-2"><MusicPlayer /></TabsContent>
                  <TabsContent value="ebook" className="mt-2"><GuideLibrary /></TabsContent>
                </div>
              </details>
            </div>
          </Tabs>

          {/* Footer */}
          <div className="text-center space-y-2 pt-6 pb-4 border-t">
            <p className="text-xs text-muted-foreground">
              {isUSA ? '💝 Made with love for moms' : '💝 Feito com amor para mamães'}
            </p>
            <p className="text-xs font-semibold">
              © {new Date().getFullYear()} {isUSA ? 'Mom Zen Premium' : 'Mamãe Zen Premium'}
            </p>
            <p className="text-[10px] text-muted-foreground">
              {isUSA ? 'All rights reserved to' : 'Todos os direitos reservados a'}{' '}
              <span className="text-primary font-semibold">Hemerson Deckson</span>
            </p>
            <p className="text-[10px] text-muted-foreground">
              {isUSA ? 'Developed with 💝 by' : 'Desenvolvido com 💝 por'}{' '}
              <span className="text-primary font-semibold">Hemerson Deckson</span>
            </p>
            <Link to="/privacy">
              <Button variant="link" size="sm" className="text-[10px] h-auto p-0">
                {isUSA ? 'Privacy Policy' : 'Política de Privacidade'}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Index;
