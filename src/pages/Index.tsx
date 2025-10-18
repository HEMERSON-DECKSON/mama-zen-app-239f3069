import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import WelcomeGreeting from '@/components/WelcomeGreeting';
import { Button } from '@/components/ui/button';
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Baby, Music, Calendar, BookOpen, Moon, Milk, Sparkles, Heart, Pill, Brain, MapPin } from 'lucide-react';
import { toast } from 'sonner';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';

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
        <div className="w-full max-w-md mx-auto p-4 space-y-6">
          {/* Header */}
          <div className="text-center space-y-2 animate-fade-in pt-2">
            <div className="flex items-center justify-center gap-2 mb-1">
              <Sparkles className="w-6 h-6 text-pink-500 animate-pulse" />
              <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
                Mamãe Zen
              </h1>
              <Sparkles className="w-6 h-6 text-purple-500 animate-pulse" />
            </div>
            <p className="text-muted-foreground text-sm font-medium px-4">
              ✨ App premium de maternidade ✨
            </p>
            <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
              <span className="px-2 py-1 rounded-full bg-primary/10 text-primary font-semibold text-xs">PREMIUM</span>
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
            <TabsList className="grid w-full grid-cols-4 gap-1 h-auto p-1">
              <TabsTrigger value="guides" className="flex-col gap-1 py-2 px-1 text-xs">
                <Baby className="w-4 h-4" />
                <span>Guias</span>
              </TabsTrigger>
              <TabsTrigger value="sounds" className="flex-col gap-1 py-2 px-1 text-xs">
                <Heart className="w-4 h-4" />
                <span>Sons</span>
              </TabsTrigger>
              <TabsTrigger value="medicine" className="flex-col gap-1 py-2 px-1 text-xs">
                <Pill className="w-4 h-4" />
                <span>Remédios</span>
              </TabsTrigger>
              <TabsTrigger value="emergency" className="flex-col gap-1 py-2 px-1 text-xs">
                <MapPin className="w-4 h-4" />
                <span>Emergência</span>
              </TabsTrigger>
            </TabsList>

            <div className="mt-4">
              <TabsContent value="guides" className="mt-0"><PracticalGuides /></TabsContent>
              <TabsContent value="sounds" className="mt-0"><BabySounds /></TabsContent>
              <TabsContent value="medicine" className="mt-0"><MedicineGuide /></TabsContent>
              <TabsContent value="emergency" className="mt-0"><EmergencyMap /></TabsContent>
            </div>

            {/* Secondary Tabs - Collapsible */}
            <div className="mt-4 p-3 rounded-lg bg-card border border-primary/20 shadow-md">
              <details className="group">
                <summary className="cursor-pointer list-none flex items-center justify-between font-semibold text-sm">
                  <span>✨ Mais Recursos Premium</span>
                  <span className="transition group-open:rotate-180">▼</span>
                </summary>
                <div className="mt-3 space-y-2">
                  <TabsList className="grid w-full grid-cols-2 gap-1 h-auto p-1">
                    <TabsTrigger value="sleep" className="flex-col gap-1 py-2 text-xs">
                      <Moon className="w-4 h-4" />
                      <span>Sono</span>
                    </TabsTrigger>
                    <TabsTrigger value="feeding" className="flex-col gap-1 py-2 text-xs">
                      <Milk className="w-4 h-4" />
                      <span>Mamar</span>
                    </TabsTrigger>
                    <TabsTrigger value="autism" className="flex-col gap-1 py-2 text-xs">
                      <Brain className="w-4 h-4" />
                      <span>Autismo</span>
                    </TabsTrigger>
                    <TabsTrigger value="routine" className="flex-col gap-1 py-2 text-xs">
                      <Calendar className="w-4 h-4" />
                      <span>Rotina</span>
                    </TabsTrigger>
                    <TabsTrigger value="music" className="flex-col gap-1 py-2 text-xs">
                      <Music className="w-4 h-4" />
                      <span>Músicas</span>
                    </TabsTrigger>
                    <TabsTrigger value="ebook" className="flex-col gap-1 py-2 text-xs">
                      <BookOpen className="w-4 h-4" />
                      <span>E-book</span>
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
            <p className="text-xs text-muted-foreground">💝 Feito com amor para mamães</p>
            <p className="text-xs font-semibold">© {new Date().getFullYear()} Mamãe Zen Premium</p>
            <p className="text-[10px] text-muted-foreground">
              Todos os direitos reservados a <span className="text-primary font-semibold">Hemerson Deckson</span>
            </p>
            <p className="text-[10px] text-muted-foreground">
              Desenvolvido com 💝 por <span className="text-primary font-semibold">Hemerson Deckson</span> com{" "}
              <a 
                href="https://lovable.dev" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:underline font-semibold"
              >
                Lovable.dev
              </a>
            </p>
            <Link to="/privacy">
              <Button variant="link" size="sm" className="text-[10px] h-auto p-0">
                Política de Privacidade
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Index;
