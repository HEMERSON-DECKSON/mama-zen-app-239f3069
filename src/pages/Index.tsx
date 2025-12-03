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

import SleepTracker from '@/components/SleepTracker';
import FeedingTracker from '@/components/FeedingTracker';
import MedicineGuide from '@/components/MedicineGuide';
import AutismGuide from '@/components/AutismGuide';
import EmergencyMap from '@/components/EmergencyMap';
import PharmacyMap from '@/components/PharmacyMap';
import NotificationCenter from '@/components/NotificationCenter';
import AntiInspect from '@/components/AntiInspect';
import { PregnancyTracker } from '@/components/PregnancyTracker';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Baby, Music, Calendar, BookOpen, Moon, Milk, Sparkles, Pill, Brain, MapPin, Instagram, ShoppingBag, Cross, Bell, Heart } from 'lucide-react';
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
      const sanitizedName = tempName
        .trim()
        .slice(0, 50)
        .replace(/[<>]/g, '');
      
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
        <DialogContent className="sm:max-w-md bg-card border-border">
          <DialogHeader>
            <DialogTitle className="text-2xl text-center text-foreground">
              {isUSA ? 'Welcome, Mom! 💝' : 'Bem-vinda, Mamãe! 💝'}
            </DialogTitle>
            <DialogDescription className="text-center text-base pt-2 text-muted-foreground">
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
              className="text-center text-lg bg-muted border-border text-foreground"
              autoFocus
              maxLength={50}
              minLength={2}
            />
            <Button 
              onClick={handleNameSubmit} 
              disabled={!tempName.trim()}
              className="w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white"
              size="lg"
            >
              {isUSA ? 'Start my journey 🌟' : 'Começar minha jornada 🌟'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <div className="min-h-screen bg-gradient-to-br from-[hsl(var(--bg-gradient-start))] via-[hsl(var(--bg-gradient-middle))] to-[hsl(var(--bg-gradient-end))] transition-colors duration-500">
        <div className="w-full max-w-md mx-auto p-4 space-y-6">
          {/* Header */}
          <div className="text-center space-y-2 animate-fade-in pt-2">
            <div className="flex items-center justify-center gap-2 mb-1">
              <Sparkles className="w-6 h-6 text-pink-400 animate-pulse" />
              <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
                {isUSA ? 'Mom Zen' : 'Mamãe Zen'}
              </h1>
              <Sparkles className="w-6 h-6 text-purple-400 animate-pulse" />
            </div>
            <p className="text-pink-200/80 text-sm font-medium px-4">
              {isUSA ? '✨ Premium motherhood app ✨' : '✨ App premium de maternidade ✨'}
            </p>
            <a 
              href="https://www.instagram.com/app_mamae_zen?igsh=bGlydG9udHp3aXhs" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-pink-300/70 hover:text-pink-300 transition-colors"
            >
              <Instagram className="w-5 h-5" />
              <span>@app_mamae_zen</span>
            </a>
            <div className="flex items-center justify-center gap-2 text-xs">
              <span className="px-3 py-1 rounded-full bg-gradient-to-r from-pink-500/30 to-purple-500/30 text-pink-200 font-semibold text-xs border border-pink-400/30">PREMIUM</span>
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
            <TabsList className="grid w-full grid-cols-4 gap-1 h-auto p-1.5 bg-gradient-to-r from-purple-900/50 via-pink-900/50 to-indigo-900/50 border border-pink-500/20 rounded-xl">
              <TabsTrigger value="guides" className="flex-col gap-1 py-2 px-1 text-xs text-pink-100 data-[state=active]:bg-gradient-to-br data-[state=active]:from-pink-500 data-[state=active]:to-purple-600 data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:shadow-pink-500/30 rounded-lg transition-all">
                <Baby className="w-4 h-4" />
                <span>{isUSA ? 'Guides' : 'Guias'}</span>
              </TabsTrigger>
              <TabsTrigger value="sounds" className="flex-col gap-1 py-2 px-1 text-xs text-pink-100 data-[state=active]:bg-gradient-to-br data-[state=active]:from-pink-500 data-[state=active]:to-purple-600 data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:shadow-pink-500/30 rounded-lg transition-all">
                <Music className="w-4 h-4" />
                <span>{isUSA ? 'Music' : 'Músicas'}</span>
              </TabsTrigger>
              <TabsTrigger value="medicine" className="flex-col gap-1 py-2 px-1 text-xs text-pink-100 data-[state=active]:bg-gradient-to-br data-[state=active]:from-pink-500 data-[state=active]:to-purple-600 data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:shadow-pink-500/30 rounded-lg transition-all">
                <Pill className="w-4 h-4" />
                <span>{isUSA ? 'Medicine' : 'Remédios'}</span>
              </TabsTrigger>
              <TabsTrigger value="emergency" className="flex-col gap-1 py-2 px-1 text-xs text-pink-100 data-[state=active]:bg-gradient-to-br data-[state=active]:from-pink-500 data-[state=active]:to-purple-600 data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:shadow-pink-500/30 rounded-lg transition-all">
                <MapPin className="w-4 h-4" />
                <span>{isUSA ? 'Emergency' : 'Emergência'}</span>
              </TabsTrigger>
            </TabsList>

            <TabsList className="grid w-full grid-cols-4 gap-1 h-auto p-1.5 mt-2 bg-gradient-to-r from-purple-900/50 via-pink-900/50 to-indigo-900/50 border border-pink-500/20 rounded-xl">
              <TabsTrigger value="notifications" className="flex-col gap-1 py-2 px-1 text-xs text-pink-100 data-[state=active]:bg-gradient-to-br data-[state=active]:from-pink-500 data-[state=active]:to-purple-600 data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:shadow-pink-500/30 rounded-lg transition-all">
                <Bell className="w-4 h-4" />
                <span>{isUSA ? 'Reminders' : 'Lembretes'}</span>
              </TabsTrigger>
              <TabsTrigger value="pharmacy" className="flex-col gap-1 py-2 px-1 text-xs text-pink-100 data-[state=active]:bg-gradient-to-br data-[state=active]:from-pink-500 data-[state=active]:to-purple-600 data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:shadow-pink-500/30 rounded-lg transition-all">
                <Cross className="w-4 h-4" />
                <span>{isUSA ? 'Pharmacy' : 'Farmácia'}</span>
              </TabsTrigger>
              <TabsTrigger value="pregnancy" className="flex-col gap-1 py-2 px-1 text-xs text-pink-100 data-[state=active]:bg-gradient-to-br data-[state=active]:from-pink-500 data-[state=active]:to-purple-600 data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:shadow-pink-500/30 rounded-lg transition-all">
                <Heart className="w-4 h-4" />
                <span>{isUSA ? 'Pregnancy' : 'Gravidez'}</span>
              </TabsTrigger>
              <TabsTrigger value="shop" className="flex-col gap-1 py-2 px-1 text-xs text-pink-100 data-[state=active]:bg-gradient-to-br data-[state=active]:from-pink-500 data-[state=active]:to-purple-600 data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:shadow-pink-500/30 rounded-lg transition-all">
                <ShoppingBag className="w-4 h-4" />
                <span>{isUSA ? 'Shop' : 'Lojinha'}</span>
              </TabsTrigger>
            </TabsList>

            <div className="mt-4">
              <TabsContent value="guides" className="mt-0 animate-fade-in"><PracticalGuides /></TabsContent>
              <TabsContent value="sounds" className="mt-0 animate-fade-in"><MusicPlayer /></TabsContent>
              <TabsContent value="medicine" className="mt-0 animate-fade-in"><MedicineGuide /></TabsContent>
              <TabsContent value="emergency" className="mt-0 animate-fade-in"><EmergencyMap /></TabsContent>
              <TabsContent value="notifications" className="mt-0 animate-fade-in"><NotificationCenter /></TabsContent>
              <TabsContent value="pharmacy" className="mt-0 animate-fade-in"><PharmacyMap /></TabsContent>
              <TabsContent value="pregnancy" className="mt-0 animate-fade-in"><PregnancyTracker /></TabsContent>
              <TabsContent value="shop" className="mt-0 animate-fade-in">
                <Card className="p-6 bg-gradient-to-br from-purple-900/40 to-pink-900/40 border-pink-500/20">
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-pink-300">
                      <ShoppingBag className="w-6 h-6" />
                      <h3 className="font-semibold text-xl">
                        {isUSA ? 'Mom Shop' : 'Lojinha da Mamãe'}
                      </h3>
                    </div>
                    
                    <p className="text-sm text-pink-200/70">
                      {isUSA 
                        ? 'Discover amazing products selected especially for you and your baby!'
                        : 'Descubra produtos incríveis selecionados especialmente para você e seu bebê!'}
                    </p>

                    <Button 
                      onClick={() => window.open('https://collshp.com/mamaezenshopping', '_blank')}
                      className="w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white font-semibold py-6 shadow-lg shadow-pink-500/30"
                      size="lg"
                    >
                      <ShoppingBag className="w-5 h-5 mr-2" />
                      {isUSA ? 'Visit Shop' : 'Visitar Lojinha'}
                    </Button>

                    <p className="text-xs text-center text-pink-300/60">
                      {isUSA 
                        ? '✨ Special products for moms and babies'
                        : '✨ Produtos especiais para mamães e bebês'}
                    </p>
                  </div>
                </Card>
              </TabsContent>
            </div>

            {/* Secondary Tabs - Collapsible */}
            <div className="mt-4 p-3 rounded-xl bg-gradient-to-br from-purple-900/30 to-indigo-900/30 border border-purple-500/20 shadow-lg">
              <details className="group">
                <summary className="cursor-pointer list-none flex items-center justify-between font-semibold text-sm text-pink-200">
                  <span>{isUSA ? '✨ More Premium Features' : '✨ Mais Recursos Premium'}</span>
                  <span className="transition group-open:rotate-180 text-pink-400">▼</span>
                </summary>
                <div className="mt-3 space-y-2">
                  <TabsList className="grid w-full grid-cols-2 gap-1 h-auto p-1.5 bg-purple-900/30 rounded-lg">
                    <TabsTrigger value="sleep" className="flex-col gap-1 py-2 text-xs text-pink-100 data-[state=active]:bg-gradient-to-br data-[state=active]:from-pink-500 data-[state=active]:to-purple-600 data-[state=active]:text-white rounded-lg">
                      <Moon className="w-4 h-4" />
                      <span>{isUSA ? 'Sleep' : 'Sono'}</span>
                    </TabsTrigger>
                    <TabsTrigger value="feeding" className="flex-col gap-1 py-2 text-xs text-pink-100 data-[state=active]:bg-gradient-to-br data-[state=active]:from-pink-500 data-[state=active]:to-purple-600 data-[state=active]:text-white rounded-lg">
                      <Milk className="w-4 h-4" />
                      <span>{isUSA ? 'Feed' : 'Mamar'}</span>
                    </TabsTrigger>
                    <TabsTrigger value="autism" className="flex-col gap-1 py-2 text-xs text-pink-100 data-[state=active]:bg-gradient-to-br data-[state=active]:from-pink-500 data-[state=active]:to-purple-600 data-[state=active]:text-white rounded-lg">
                      <Brain className="w-4 h-4" />
                      <span>{isUSA ? 'Autism' : 'Autismo'}</span>
                    </TabsTrigger>
                    <TabsTrigger value="routine" className="flex-col gap-1 py-2 text-xs text-pink-100 data-[state=active]:bg-gradient-to-br data-[state=active]:from-pink-500 data-[state=active]:to-purple-600 data-[state=active]:text-white rounded-lg">
                      <Calendar className="w-4 h-4" />
                      <span>{isUSA ? 'Routine' : 'Rotina'}</span>
                    </TabsTrigger>
                    <TabsTrigger value="ebook" className="flex-col gap-1 py-2 text-xs text-pink-100 data-[state=active]:bg-gradient-to-br data-[state=active]:from-pink-500 data-[state=active]:to-purple-600 data-[state=active]:text-white rounded-lg col-span-2">
                      <BookOpen className="w-4 h-4" />
                      <span>{isUSA ? 'E-book' : 'E-book'}</span>
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="sleep" className="mt-2"><SleepTracker /></TabsContent>
                  <TabsContent value="feeding" className="mt-2"><FeedingTracker /></TabsContent>
                  <TabsContent value="autism" className="mt-2"><AutismGuide /></TabsContent>
                  <TabsContent value="routine" className="mt-2"><RoutineCalendar /></TabsContent>
                  <TabsContent value="ebook" className="mt-2"><GuideLibrary /></TabsContent>
                </div>
              </details>
            </div>
          </Tabs>

          {/* Footer */}
          <div className="text-center space-y-2 pt-6 pb-4 border-t border-pink-500/20">
            <p className="text-xs text-pink-300/60">
              {isUSA ? '💝 Made with love for moms' : '💝 Feito com amor para mamães'}
            </p>
            <p className="text-xs font-semibold text-pink-200">
              © {new Date().getFullYear()} {isUSA ? 'Mom Zen Premium' : 'Mamãe Zen Premium'}
            </p>
            <p className="text-[10px] text-pink-300/50">
              {isUSA ? 'All rights reserved to' : 'Todos os direitos reservados a'}{' '}
              <span className="text-pink-400 font-semibold">Hemerson Deckson</span>
            </p>
            <p className="text-[10px] text-pink-300/50">
              {isUSA ? 'Developed with 💝 by' : 'Desenvolvido com 💝 por'}{' '}
              <span className="text-pink-400 font-semibold">Hemerson Deckson</span>
            </p>
            <Link to="/privacy">
              <Button variant="link" size="sm" className="text-[10px] h-auto p-0 text-pink-400 hover:text-pink-300">
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
