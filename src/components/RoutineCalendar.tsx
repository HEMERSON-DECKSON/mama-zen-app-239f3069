import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, CheckCircle2, Circle, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

interface RoutineItem {
  id: string;
  time: string;
  title: string;
  completed: boolean;
  category: 'morning' | 'afternoon' | 'evening' | 'night';
}

const RoutineCalendar = () => {
  const [routines, setRoutines] = useState<RoutineItem[]>([
    { id: '1', time: '07:00', title: 'Café da manhã nutritivo', completed: true, category: 'morning' },
    { id: '2', time: '09:00', title: 'Caminhada leve (15 min)', completed: true, category: 'morning' },
    { id: '3', time: '10:00', title: 'Hidratação - 2 copos de água', completed: false, category: 'morning' },
    { id: '4', time: '12:00', title: 'Almoço saudável', completed: false, category: 'afternoon' },
    { id: '5', time: '14:00', title: 'Descanso/Soneca', completed: false, category: 'afternoon' },
    { id: '6', time: '16:00', title: 'Lanche da tarde', completed: false, category: 'afternoon' },
    { id: '7', time: '18:00', title: 'Exercícios de assoalho pélvico', completed: false, category: 'evening' },
    { id: '8', time: '19:00', title: 'Jantar leve', completed: false, category: 'evening' },
    { id: '9', time: '21:00', title: 'Momento de relaxamento', completed: false, category: 'night' },
    { id: '10', time: '22:00', title: 'Rotina de sono', completed: false, category: 'night' },
  ]);

  const toggleComplete = (id: string) => {
    setRoutines(routines.map(r => 
      r.id === id ? { ...r, completed: !r.completed } : r
    ));
  };

  const categories = {
    morning: { label: 'Manhã', color: 'from-amber-200 to-orange-200' },
    afternoon: { label: 'Tarde', color: 'from-sky-200 to-blue-200' },
    evening: { label: 'Noitinha', color: 'from-purple-200 to-pink-200' },
    night: { label: 'Noite', color: 'from-indigo-300 to-purple-300' },
  };

  const completedCount = routines.filter(r => r.completed).length;
  const progress = (completedCount / routines.length) * 100;

  return (
    <Card className="border-0 shadow-[var(--shadow-soft)] bg-gradient-to-br from-card to-muted/20">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Calendar className="w-6 h-6 text-primary" />
            <h2 className="text-2xl font-bold text-foreground">Rotina Diária</h2>
          </div>
          <div className="text-right">
            <p className="text-sm text-muted-foreground">Progresso de Hoje</p>
            <p className="text-2xl font-bold text-primary">{completedCount}/{routines.length}</p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-6 bg-muted/50 rounded-full h-3 overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-primary via-secondary to-accent transition-all duration-500 rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Routines by Category */}
        <div className="space-y-6">
          {Object.entries(categories).map(([key, { label, color }]) => {
            const categoryRoutines = routines.filter(r => r.category === key);
            
            return (
              <div key={key}>
                <div className={cn(
                  "inline-flex items-center gap-2 px-4 py-2 rounded-full mb-3 bg-gradient-to-r",
                  color
                )}>
                  <Clock className="w-4 h-4" />
                  <span className="font-semibold text-sm">{label}</span>
                </div>
                
                <div className="space-y-2">
                  {categoryRoutines.map((routine) => (
                    <button
                      key={routine.id}
                      onClick={() => toggleComplete(routine.id)}
                      className={cn(
                        "w-full p-4 rounded-xl text-left transition-all duration-300 border-2",
                        routine.completed
                          ? "bg-primary/10 border-primary/30"
                          : "bg-white/60 border-white/40 hover:bg-white/80"
                      )}
                    >
                      <div className="flex items-center gap-4">
                        {routine.completed ? (
                          <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0" />
                        ) : (
                          <Circle className="w-6 h-6 text-muted-foreground flex-shrink-0" />
                        )}
                        
                        <div className="flex-1">
                          <p className={cn(
                            "font-medium",
                            routine.completed ? "text-muted-foreground line-through" : "text-foreground"
                          )}>
                            {routine.title}
                          </p>
                        </div>
                        
                        <span className="text-sm font-semibold text-muted-foreground">
                          {routine.time}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Motivational Message */}
        {progress === 100 && (
          <div className="mt-6 p-4 bg-gradient-to-r from-primary/20 to-accent/20 rounded-xl text-center border-2 border-primary/30">
            <p className="text-lg font-bold text-primary">
              🎉 Parabéns! Você completou todas as atividades de hoje! 🎉
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              Continue assim, você está arrasando! 💪
            </p>
          </div>
        )}
      </div>
    </Card>
  );
};

export default RoutineCalendar;
