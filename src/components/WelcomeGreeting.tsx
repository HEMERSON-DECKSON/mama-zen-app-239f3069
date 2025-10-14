import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Sparkles, Moon, Sun, Sunset } from 'lucide-react';

interface WelcomeGreetingProps {
  userName?: string;
  onMoodSelect?: (mood: string) => void;
}

const WelcomeGreeting = ({ userName = "Letícia", onMoodSelect }: WelcomeGreetingProps) => {
  const [greeting, setGreeting] = useState({ text: '', icon: Sun, gradient: 'var(--gradient-morning)' });
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const hour = currentTime.getHours();
    
    if (hour >= 5 && hour < 12) {
      setGreeting({
        text: `Bom dia, ${userName}! 🌸`,
        icon: Sun,
        gradient: 'var(--gradient-morning)'
      });
    } else if (hour >= 12 && hour < 18) {
      setGreeting({
        text: `Boa tarde, ${userName}! ☀️`,
        icon: Sunset,
        gradient: 'var(--gradient-calm)'
      });
    } else {
      setGreeting({
        text: `Boa noite, ${userName}! 🌙`,
        icon: Moon,
        gradient: 'var(--gradient-evening)'
      });
    }
  }, [currentTime, userName]);

  const moods = [
    { emoji: '😊', label: 'Bem', value: 'good' },
    { emoji: '😌', label: 'Tranquila', value: 'calm' },
    { emoji: '😔', label: 'Cansada', value: 'tired' },
    { emoji: '😰', label: 'Ansiosa', value: 'anxious' },
    { emoji: '🤗', label: 'Feliz', value: 'happy' },
  ];

  const GreetingIcon = greeting.icon;

  return (
    <Card 
      className="relative overflow-hidden border-0 shadow-[var(--shadow-soft)]"
      style={{ background: greeting.gradient }}
    >
      <div className="relative z-10 p-8">
        <div className="flex items-center gap-3 mb-6">
          <GreetingIcon className="w-8 h-8 text-white drop-shadow-lg" />
          <h1 className="text-3xl font-bold text-white drop-shadow-lg">
            {greeting.text}
          </h1>
          <Sparkles className="w-6 h-6 text-white/80 animate-pulse" />
        </div>
        
        <div className="bg-white/30 backdrop-blur-sm rounded-2xl p-6 border border-white/40">
          <p className="text-white font-medium mb-4 text-lg">
            Como você está se sentindo agora, minha linda?
          </p>
          
          <div className="flex flex-wrap gap-3">
            {moods.map((mood) => (
              <button
                key={mood.value}
                onClick={() => onMoodSelect?.(mood.value)}
                className="flex flex-col items-center gap-2 px-6 py-3 bg-white/60 hover:bg-white/80 backdrop-blur-sm rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg border border-white/50"
              >
                <span className="text-3xl">{mood.emoji}</span>
                <span className="text-sm font-medium text-foreground">{mood.label}</span>
              </button>
            ))}
          </div>
        </div>

        <p className="text-white/90 text-sm mt-4 text-center font-medium">
          {currentTime.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
        </p>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute -top-20 -right-20 w-40 h-40 bg-white/20 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-white/20 rounded-full blur-3xl"></div>
    </Card>
  );
};

export default WelcomeGreeting;
