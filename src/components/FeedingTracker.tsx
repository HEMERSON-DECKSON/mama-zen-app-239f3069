import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { Milk, Clock, TrendingUp } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface FeedingEntry {
  id: string;
  startTime: Date;
  endTime?: Date;
  duration?: number;
  type: 'breast-left' | 'breast-right' | 'bottle' | 'both-breasts';
  amount?: number;
}

export default function FeedingTracker() {
  const [feedingEntries, setFeedingEntries] = useState<FeedingEntry[]>([]);
  const [currentFeeding, setCurrentFeeding] = useState<FeedingEntry | null>(null);
  const [totalFeedingsToday, setTotalFeedingsToday] = useState(0);
  const [selectedType, setSelectedType] = useState<string>('breast-left');

  useEffect(() => {
    const stored = localStorage.getItem('feedingEntries');
    if (stored) {
      const parsed = JSON.parse(stored);
      setFeedingEntries(parsed.map((entry: any) => ({
        ...entry,
        startTime: new Date(entry.startTime),
        endTime: entry.endTime ? new Date(entry.endTime) : undefined
      })));
    }
  }, []);

  useEffect(() => {
    if (feedingEntries.length > 0) {
      localStorage.setItem('feedingEntries', JSON.stringify(feedingEntries));
      calculateTotalFeedings();
    }
  }, [feedingEntries]);

  const calculateTotalFeedings = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const todayEntries = feedingEntries.filter(entry => {
      const entryDate = new Date(entry.startTime);
      entryDate.setHours(0, 0, 0, 0);
      return entryDate.getTime() === today.getTime();
    });

    setTotalFeedingsToday(todayEntries.length);
  };

  const startFeeding = () => {
    const newEntry: FeedingEntry = {
      id: Date.now().toString(),
      startTime: new Date(),
      type: selectedType as any
    };
    setCurrentFeeding(newEntry);
    
    const typeNames = {
      'breast-left': 'Seio Esquerdo',
      'breast-right': 'Seio Direito',
      'both-breasts': 'Ambos os Seios',
      'bottle': 'Mamadeira'
    };
    
    toast({
      title: "🍼 Alimentação iniciada",
      description: `${typeNames[selectedType as keyof typeof typeNames]} - ${new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}`
    });
  };

  const endFeeding = () => {
    if (!currentFeeding) return;

    const endTime = new Date();
    const duration = Math.round((endTime.getTime() - currentFeeding.startTime.getTime()) / 1000 / 60);
    
    const completedEntry: FeedingEntry = {
      ...currentFeeding,
      endTime,
      duration
    };

    setFeedingEntries(prev => [completedEntry, ...prev]);
    setCurrentFeeding(null);

    toast({
      title: "✅ Alimentação registrada!",
      description: `Duração: ${duration} minutos`
    });
  };

  const formatTime = (date: Date) => {
    return new Date(date).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  };

  const getTypeIcon = (type: string) => {
    switch(type) {
      case 'breast-left': return '👈🤱';
      case 'breast-right': return '🤱👉';
      case 'both-breasts': return '🤱';
      case 'bottle': return '🍼';
      default: return '🍼';
    }
  };

  const getTypeName = (type: string) => {
    switch(type) {
      case 'breast-left': return 'Seio Esquerdo';
      case 'breast-right': return 'Seio Direito';
      case 'both-breasts': return 'Ambos os Seios';
      case 'bottle': return 'Mamadeira';
      default: return type;
    }
  };

  const todayEntries = feedingEntries.filter(entry => {
    const today = new Date();
    const entryDate = new Date(entry.startTime);
    return entryDate.toDateString() === today.toDateString();
  });

  const lastFeeding = todayEntries[0];
  const timeSinceLastFeeding = lastFeeding 
    ? Math.round((new Date().getTime() - new Date(lastFeeding.startTime).getTime()) / 1000 / 60)
    : null;

  return (
    <Card className="border-primary/20 shadow-lg">
      <CardHeader className="bg-gradient-to-r from-pink-500/10 to-rose-500/10 pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <Milk className="w-5 h-5" />
          Tracker de Amamentação
        </CardTitle>
        <CardDescription className="text-xs">
          Monitore as mamadas
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-4 space-y-4">
        {/* Stats */}
        <div className="grid grid-cols-2 gap-2">
          <div className="p-3 rounded-lg bg-primary/5 border border-primary/20">
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-1">
              <TrendingUp className="w-3 h-3" />
              Mamadas
            </div>
            <div className="text-lg font-bold">
              {totalFeedingsToday}
            </div>
          </div>
          <div className="p-3 rounded-lg bg-primary/5 border border-primary/20">
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-1">
              <Clock className="w-3 h-3" />
              Última
            </div>
            <div className="text-lg font-bold">
              {timeSinceLastFeeding !== null ? `${timeSinceLastFeeding}min` : '-'}
            </div>
          </div>
        </div>

        {/* Controls */}
        {currentFeeding ? (
          <div className="p-3 rounded-lg bg-pink-50 dark:bg-pink-950/20 border-2 border-pink-300 dark:border-pink-800 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-sm flex items-center gap-1.5">
                  {getTypeIcon(currentFeeding.type)} Mamando...
                </p>
                <p className="text-xs text-muted-foreground">
                  {getTypeName(currentFeeding.type)} - {formatTime(currentFeeding.startTime)}
                </p>
              </div>
              <div className="w-2 h-2 bg-pink-500 rounded-full animate-pulse" />
            </div>
            <Button onClick={endFeeding} className="w-full text-sm" size="sm">
              Terminou! Registrar
            </Button>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="space-y-1.5">
              <label className="text-xs font-medium">Tipo de Alimentação</label>
              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger className="text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="breast-left" className="text-xs">👈🤱 Seio Esquerdo</SelectItem>
                  <SelectItem value="breast-right" className="text-xs">🤱👉 Seio Direito</SelectItem>
                  <SelectItem value="both-breasts" className="text-xs">🤱 Ambos os Seios</SelectItem>
                  <SelectItem value="bottle" className="text-xs">🍼 Mamadeira</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button
              onClick={startFeeding}
              variant="default"
              size="sm"
              className="w-full text-sm"
            >
              <Milk className="w-4 h-4 mr-1.5" />
              Iniciar Alimentação
            </Button>
          </div>
        )}

        {/* History */}
        {todayEntries.length > 0 && (
          <div className="space-y-2">
            <h3 className="text-sm font-semibold flex items-center gap-1.5">
              📊 Hoje
            </h3>
            <div className="space-y-1.5 max-h-48 overflow-y-auto">
              {todayEntries.map((entry) => (
                <div
                  key={entry.id}
                  className="p-2 rounded-lg bg-card border flex items-center justify-between text-xs"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-base">{getTypeIcon(entry.type)}</span>
                    <div>
                      <p className="font-medium text-xs">
                        {getTypeName(entry.type)}
                      </p>
                      <p className="text-[10px] text-muted-foreground">
                        {formatTime(entry.startTime)} {entry.endTime && `- ${formatTime(entry.endTime)}`}
                      </p>
                    </div>
                  </div>
                  {entry.duration && (
                    <div className="text-xs font-semibold text-primary">
                      {entry.duration}min
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
          <p className="text-xs">
            <strong>💡 Dica:</strong> Recém-nascidos mamam a cada 2-3h. Alterne os seios.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
