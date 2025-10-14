import { useState } from 'react';
import WelcomeGreeting from '@/components/WelcomeGreeting';
import MusicPlayer from '@/components/MusicPlayer';
import RoutineCalendar from '@/components/RoutineCalendar';
import GuideLibrary from '@/components/GuideLibrary';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Heart, Music, Calendar, BookOpen } from 'lucide-react';
import { toast } from 'sonner';

const Index = () => {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);

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
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-border shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center shadow-lg">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">Mamãe Saudável</h1>
                <p className="text-xs text-muted-foreground">Seu bem-estar é prioridade</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Greeting Section */}
        <div className="mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <WelcomeGreeting userName="Letícia" onMoodSelect={handleMoodSelect} />
        </div>

        {/* Tabs Navigation */}
        <Tabs defaultValue="routine" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8 h-auto bg-muted/50 p-1 rounded-2xl">
            <TabsTrigger 
              value="routine" 
              className="flex items-center gap-2 py-3 rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-md"
            >
              <Calendar className="w-4 h-4" />
              <span className="hidden sm:inline">Rotina</span>
            </TabsTrigger>
            <TabsTrigger 
              value="music" 
              className="flex items-center gap-2 py-3 rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-md"
            >
              <Music className="w-4 h-4" />
              <span className="hidden sm:inline">Músicas</span>
            </TabsTrigger>
            <TabsTrigger 
              value="guide" 
              className="flex items-center gap-2 py-3 rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-md"
            >
              <BookOpen className="w-4 h-4" />
              <span className="hidden sm:inline">Guia</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="routine" className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <RoutineCalendar />
          </TabsContent>

          <TabsContent value="music" className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <MusicPlayer />
          </TabsContent>

          <TabsContent value="guide" className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <GuideLibrary />
          </TabsContent>
        </Tabs>

        {/* Footer Message */}
        <div className="mt-12 text-center">
          <p className="text-sm text-muted-foreground italic">
            "Lembre-se: você é forte, capaz e está fazendo um trabalho maravilhoso!" 💝
          </p>
        </div>
      </main>
    </div>
  );
};

export default Index;
