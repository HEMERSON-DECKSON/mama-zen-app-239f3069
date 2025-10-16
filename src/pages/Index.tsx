import { useState, useEffect } from 'react';
import WelcomeGreeting from '@/components/WelcomeGreeting';
import MusicPlayer from '@/components/MusicPlayer';
import RoutineCalendar from '@/components/RoutineCalendar';
import GuideLibrary from '@/components/GuideLibrary';
import PracticalGuides from '@/components/PracticalGuides';
import BabySounds from '@/components/BabySounds';
import SleepTracker from '@/components/SleepTracker';
import FeedingTracker from '@/components/FeedingTracker';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Baby, Music, Calendar, BookOpen, Moon, Milk, Sparkles, Heart } from 'lucide-react';
import { toast } from 'sonner';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const Index = () => {
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
      setUserName(tempName.trim());
      localStorage.setItem('userName', tempName.trim());
      setShowNameDialog(false);
      toast.success(`Bem-vinda, ${tempName.trim()}! Sua jornada premium começa agora! 💝✨`);
    }
  };

  const handleMoodSelect = (mood: string) => {
    setSelectedMood(mood);
    
    const moodMessages: Record<string, string> = {
      good: 'Que ótimo! Continue assim, você está incrível! 💪',
      calm: 'Maravilhoso estar tranquila. Aproveite esse momento de paz. 🧘‍♀️',
      tired: 'Eu entendo, minha linda. Lembre-se de descansar sempre que possível. 💤',
      anxious: 'Respire fundo. Você está fazendo um trabalho incrível. Tudo vai ficar bem. 🌸',
      happy: 'Que alegria! Sua felicidade ilumina tudo ao redor! ✨',
    };

    toast.success(moodMessages[mood] || 'Obrigada por compartilhar!');
  };

  return (
    <>
      <Dialog open={showNameDialog} onOpenChange={setShowNameDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl text-center">Bem-vinda, Mamãe! 💝</DialogTitle>
            <DialogDescription className="text-center text-base pt-2">
              Informe o seu nome para que eu possa criar uma experiência especial para você
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-4 py-4">
            <Input
              placeholder="Digite seu nome..."
              value={tempName}
              onChange={(e) => setTempName(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleNameSubmit()}
              className="text-center text-lg"
              autoFocus
            />
            <Button 
              onClick={handleNameSubmit} 
              disabled={!tempName.trim()}
              className="w-full"
              size="lg"
            >
              Começar minha jornada 🌟
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-blue-900/20">
        <div className="container mx-auto p-4 md:p-8 space-y-8">
          {/* Header */}
          <div className="text-center space-y-2 animate-fade-in">
            <div className="flex items-center justify-center gap-3 mb-2">
              <Sparkles className="w-8 h-8 text-pink-500 animate-pulse" />
              <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
                Mamãe Zen
              </h1>
              <Sparkles className="w-8 h-8 text-purple-500 animate-pulse" />
            </div>
            <p className="text-muted-foreground text-lg md:text-xl font-medium">
              ✨ Seu app premium completo para maternidade saudável ✨
            </p>
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground flex-wrap">
              <span className="px-3 py-1 rounded-full bg-primary/10 text-primary font-semibold">PREMIUM</span>
              <span className="hidden sm:inline">•</span>
              <span>Guias Profissionais</span>
              <span className="hidden sm:inline">•</span>
              <span>Trackers Inteligentes</span>
            </div>
          </div>

          {/* Welcome */}
          {userName && (
            <div className="animate-scale-in">
              <WelcomeGreeting userName={userName} onMoodSelect={handleMoodSelect} />
            </div>
          )}

          {/* Tabs */}
          <Tabs defaultValue="guides" className="animate-fade-in">
            <TabsList className="grid w-full grid-cols-3 lg:grid-cols-7 gap-2">
              <TabsTrigger value="guides" className="gap-2"><Baby className="w-4 h-4" /><span className="hidden sm:inline">Guias</span></TabsTrigger>
              <TabsTrigger value="sounds" className="gap-2"><Heart className="w-4 h-4" /><span className="hidden sm:inline">Sons</span></TabsTrigger>
              <TabsTrigger value="sleep" className="gap-2"><Moon className="w-4 h-4" /><span className="hidden sm:inline">Sono</span></TabsTrigger>
              <TabsTrigger value="feeding" className="gap-2"><Milk className="w-4 h-4" /><span className="hidden sm:inline">Mamar</span></TabsTrigger>
              <TabsTrigger value="routine" className="gap-2"><Calendar className="w-4 h-4" /><span className="hidden sm:inline">Rotina</span></TabsTrigger>
              <TabsTrigger value="music" className="gap-2"><Music className="w-4 h-4" /><span className="hidden sm:inline">Músicas</span></TabsTrigger>
              <TabsTrigger value="ebook" className="gap-2"><BookOpen className="w-4 h-4" /><span className="hidden sm:inline">E-book</span></TabsTrigger>
            </TabsList>

            <TabsContent value="guides" className="space-y-6 mt-6"><PracticalGuides /></TabsContent>
            <TabsContent value="sounds" className="space-y-6 mt-6"><BabySounds /></TabsContent>
            <TabsContent value="sleep" className="space-y-6 mt-6"><SleepTracker /></TabsContent>
            <TabsContent value="feeding" className="space-y-6 mt-6"><FeedingTracker /></TabsContent>
            <TabsContent value="routine" className="space-y-6 mt-6"><RoutineCalendar /></TabsContent>
            <TabsContent value="music" className="space-y-6 mt-6"><MusicPlayer /></TabsContent>
            <TabsContent value="ebook" className="space-y-6 mt-6"><GuideLibrary /></TabsContent>
          </Tabs>

          {/* Footer */}
          <div className="text-center space-y-2 pt-8 pb-4 border-t">
            <p className="text-sm text-muted-foreground">💝 Feito com amor para todas as mamães incríveis</p>
            <p className="text-xs text-muted-foreground">App Premium Mamãe Zen • Todos os direitos reservados</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Index;
