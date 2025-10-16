import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { Moon, Sun, Clock, TrendingUp } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface SleepEntry {
  id: string;
  startTime: Date;
  endTime?: Date;
  duration?: number;
  type: 'night' | 'nap';
}

export default function SleepTracker() {
  const [sleepEntries, setSleepEntries] = useState<SleepEntry[]>([]);
  const [currentSleep, setCurrentSleep] = useState<SleepEntry | null>(null);
  const [totalSleepToday, setTotalSleepToday] = useState(0);

  useEffect(() => {
    const stored = localStorage.getItem('sleepEntries');
    if (stored) {
      const parsed = JSON.parse(stored);
      setSleepEntries(parsed.map((entry: any) => ({
        ...entry,
        startTime: new Date(entry.startTime),
        endTime: entry.endTime ? new Date(entry.endTime) : undefined
      })));
    }
  }, []);

  useEffect(() => {
    if (sleepEntries.length > 0) {
      localStorage.setItem('sleepEntries', JSON.stringify(sleepEntries));
      calculateTotalSleep();
    }
  }, [sleepEntries]);

  const calculateTotalSleep = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const todayEntries = sleepEntries.filter(entry => {
      const entryDate = new Date(entry.startTime);
      entryDate.setHours(0, 0, 0, 0);
      return entryDate.getTime() === today.getTime() && entry.duration;
    });

    const total = todayEntries.reduce((sum, entry) => sum + (entry.duration || 0), 0);
    setTotalSleepToday(total);
  };

  const startSleep = (type: 'night' | 'nap') => {
    const newEntry: SleepEntry = {
      id: Date.now().toString(),
      startTime: new Date(),
      type
    };
    setCurrentSleep(newEntry);
    toast({
      title: type === 'night' ? "🌙 Boa noite!" : "😴 Soneca iniciada",
      description: `Registrando início do sono às ${new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}`
    });
  };

  const endSleep = () => {
    if (!currentSleep) return;

    const endTime = new Date();
    const duration = Math.round((endTime.getTime() - currentSleep.startTime.getTime()) / 1000 / 60);
    
    const completedEntry: SleepEntry = {
      ...currentSleep,
      endTime,
      duration
    };

    setSleepEntries(prev => [completedEntry, ...prev]);
    setCurrentSleep(null);

    const hours = Math.floor(duration / 60);
    const minutes = duration % 60;

    toast({
      title: "✅ Sono registrado!",
      description: `Duração: ${hours}h ${minutes}min`
    });
  };

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}min`;
  };

  const formatTime = (date: Date) => {
    return new Date(date).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  };

  const todayEntries = sleepEntries.filter(entry => {
    const today = new Date();
    const entryDate = new Date(entry.startTime);
    return entryDate.toDateString() === today.toDateString();
  });

  return (
    <Card className="border-primary/20 shadow-lg">
      <CardHeader className="bg-gradient-to-r from-indigo-500/10 to-purple-500/10">
        <CardTitle className="text-2xl flex items-center gap-2">
          <Moon className="w-6 h-6" />
          Rastreador de Sono
        </CardTitle>
        <CardDescription>
          Monitore os padrões de sono do seu bebê
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6 space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
              <Clock className="w-4 h-4" />
              Sono Total Hoje
            </div>
            <div className="text-2xl font-bold">
              {formatDuration(totalSleepToday)}
            </div>
          </div>
          <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
              <TrendingUp className="w-4 h-4" />
              Sessões Hoje
            </div>
            <div className="text-2xl font-bold">
              {todayEntries.length}
            </div>
          </div>
        </div>

        {/* Controls */}
        {currentSleep ? (
          <div className="p-6 rounded-lg bg-blue-50 dark:bg-blue-950/20 border-2 border-blue-300 dark:border-blue-800 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-lg">
                  {currentSleep.type === 'night' ? '🌙 Dormindo...' : '😴 Soneca em andamento...'}
                </p>
                <p className="text-sm text-muted-foreground">
                  Início: {formatTime(currentSleep.startTime)}
                </p>
              </div>
              <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse" />
            </div>
            <Button onClick={endSleep} className="w-full" size="lg">
              Acordou! Registrar fim do sono
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            <Button
              onClick={() => startSleep('night')}
              variant="default"
              size="lg"
              className="h-auto py-6 flex-col gap-2"
            >
              <Moon className="w-8 h-8" />
              <div>
                <div className="font-semibold">Sono Noturno</div>
                <div className="text-xs opacity-80">Sono da noite</div>
              </div>
            </Button>
            <Button
              onClick={() => startSleep('nap')}
              variant="outline"
              size="lg"
              className="h-auto py-6 flex-col gap-2"
            >
              <Sun className="w-8 h-8" />
              <div>
                <div className="font-semibold">Soneca</div>
                <div className="text-xs opacity-80">Sono diurno</div>
              </div>
            </Button>
          </div>
        )}

        {/* History */}
        {todayEntries.length > 0 && (
          <div className="space-y-3">
            <h3 className="font-semibold flex items-center gap-2">
              📊 Registros de Hoje
            </h3>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {todayEntries.map((entry) => (
                <div
                  key={entry.id}
                  className="p-3 rounded-lg bg-card border flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    {entry.type === 'night' ? (
                      <Moon className="w-5 h-5 text-indigo-500" />
                    ) : (
                      <Sun className="w-5 h-5 text-amber-500" />
                    )}
                    <div>
                      <p className="font-medium text-sm">
                        {entry.type === 'night' ? 'Sono Noturno' : 'Soneca'}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {formatTime(entry.startTime)} - {entry.endTime ? formatTime(entry.endTime) : 'Em andamento'}
                      </p>
                    </div>
                  </div>
                  {entry.duration && (
                    <div className="text-sm font-semibold text-primary">
                      {formatDuration(entry.duration)}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="p-4 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-800">
          <p className="text-sm">
            <strong>💤 Meta recomendada:</strong> Recém-nascidos: 14-17h/dia | 3-6 meses: 12-15h/dia | 6-12 meses: 12-14h/dia
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
