import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { Milk, Clock, TrendingUp } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useCountry } from "@/contexts/CountryContext";

interface FeedingEntry {
  id: string;
  startTime: Date;
  endTime?: Date;
  duration?: number;
  type: 'breast-left' | 'breast-right' | 'bottle' | 'both-breasts';
  amount?: number;
}

const MAX_ENTRIES = 100;

export default function FeedingTracker() {
  const { isUSA } = useCountry();
  const [feedingEntries, setFeedingEntries] = useState<FeedingEntry[]>([]);
  const [currentFeeding, setCurrentFeeding] = useState<FeedingEntry | null>(null);
  const [totalFeedingsToday, setTotalFeedingsToday] = useState(0);
  const [selectedType, setSelectedType] = useState<string>('breast-left');

  // Textos traduzidos
  const texts = {
    title: isUSA ? 'Feeding Tracker' : 'Tracker de Amamentação',
    description: isUSA ? 'Monitor feedings' : 'Monitore as mamadas',
    feedings: isUSA ? 'Feedings' : 'Mamadas',
    last: isUSA ? 'Last' : 'Última',
    nursing: isUSA ? 'Nursing...' : 'Mamando...',
    start: isUSA ? 'Start Feeding' : 'Iniciar Alimentação',
    finish: isUSA ? 'Done! Register' : 'Terminou! Registrar',
    today: isUSA ? '📊 Today' : '📊 Hoje',
    feedingType: isUSA ? 'Feeding Type' : 'Tipo de Alimentação',
    tip: isUSA 
      ? '💡 Tip: Newborns feed every 2-3h. Alternate breasts.'
      : '💡 Dica: Recém-nascidos mamam a cada 2-3h. Alterne os seios.',
    feedingStarted: isUSA ? '🍼 Feeding started' : '🍼 Alimentação iniciada',
    feedingRecorded: isUSA ? '✅ Feeding recorded!' : '✅ Alimentação registrada!',
    duration: isUSA ? 'Duration: ' : 'Duração: ',
    minutes: isUSA ? ' minutes' : ' minutos',
  };

  const typeNames = {
    'breast-left': isUSA ? 'Left Breast' : 'Seio Esquerdo',
    'breast-right': isUSA ? 'Right Breast' : 'Seio Direito',
    'both-breasts': isUSA ? 'Both Breasts' : 'Ambos os Seios',
    'bottle': isUSA ? 'Bottle' : 'Mamadeira'
  };

  useEffect(() => {
    try {
      const stored = localStorage.getItem('feedingEntries');
      if (stored) {
        const parsed = JSON.parse(stored);
        const entries = parsed.slice(0, MAX_ENTRIES).map((entry: any) => ({
          ...entry,
          startTime: new Date(entry.startTime),
          endTime: entry.endTime ? new Date(entry.endTime) : undefined
        }));
        setFeedingEntries(entries);
      }
    } catch (error) {
      console.error('Error loading feeding entries:', error);
      localStorage.removeItem('feedingEntries');
    }
  }, []);

  useEffect(() => {
    if (feedingEntries.length > 0) {
      try {
        const toStore = feedingEntries.slice(0, MAX_ENTRIES);
        localStorage.setItem('feedingEntries', JSON.stringify(toStore));
        calculateTotalFeedings();
      } catch (error) {
        console.error('Error saving feeding entries:', error);
      }
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
    
    const locale = isUSA ? 'en-US' : 'pt-BR';
    toast({
      title: texts.feedingStarted,
      description: `${typeNames[selectedType as keyof typeof typeNames]} - ${new Date().toLocaleTimeString(locale, { hour: '2-digit', minute: '2-digit' })}`
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

    setFeedingEntries(prev => [completedEntry, ...prev].slice(0, MAX_ENTRIES));
    setCurrentFeeding(null);

    toast({
      title: texts.feedingRecorded,
      description: `${texts.duration}${duration}${texts.minutes}`
    });
  };

  const formatTime = (date: Date) => {
    const locale = isUSA ? 'en-US' : 'pt-BR';
    return new Date(date).toLocaleTimeString(locale, { hour: '2-digit', minute: '2-digit' });
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
    return typeNames[type as keyof typeof typeNames] || type;
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
    <Card className="border-pink-500/20 shadow-lg bg-gradient-to-br from-purple-900/40 to-pink-900/40">
      <CardHeader className="bg-gradient-to-r from-pink-500/20 to-rose-500/20 pb-3">
        <CardTitle className="text-lg flex items-center gap-2 text-white">
          <Milk className="w-5 h-5 text-pink-400" />
          {texts.title}
        </CardTitle>
        <CardDescription className="text-xs text-pink-200/70">
          {texts.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-4 space-y-4">
        {/* Stats */}
        <div className="grid grid-cols-2 gap-2">
          <div className="p-3 rounded-lg bg-[#1e1b4b] border border-purple-500/30">
            <div className="flex items-center gap-1.5 text-xs text-pink-200/70 mb-1">
              <TrendingUp className="w-3 h-3" />
              {texts.feedings}
            </div>
            <div className="text-lg font-bold text-white">
              {totalFeedingsToday}
            </div>
          </div>
          <div className="p-3 rounded-lg bg-[#1e1b4b] border border-purple-500/30">
            <div className="flex items-center gap-1.5 text-xs text-pink-200/70 mb-1">
              <Clock className="w-3 h-3" />
              {texts.last}
            </div>
            <div className="text-lg font-bold text-white">
              {timeSinceLastFeeding !== null ? `${timeSinceLastFeeding}min` : '-'}
            </div>
          </div>
        </div>

        {/* Controls */}
        {currentFeeding ? (
          <div className="p-3 rounded-lg bg-[#1e1b4b] border-2 border-pink-400/50 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-sm flex items-center gap-1.5 text-white">
                  {getTypeIcon(currentFeeding.type)} {texts.nursing}
                </p>
                <p className="text-xs text-pink-200/70">
                  {getTypeName(currentFeeding.type)} - {formatTime(currentFeeding.startTime)}
                </p>
              </div>
              <div className="w-2 h-2 bg-pink-400 rounded-full animate-pulse" />
            </div>
            <Button onClick={endFeeding} className="w-full text-sm bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white" size="sm">
              {texts.finish}
            </Button>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-pink-200">{texts.feedingType}</label>
              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger className="text-xs bg-[#1e1b4b] border-purple-500/30 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-[#1e1b4b] border-purple-500/30">
                  <SelectItem value="breast-left" className="text-xs text-white">👈🤱 {typeNames['breast-left']}</SelectItem>
                  <SelectItem value="breast-right" className="text-xs text-white">🤱👉 {typeNames['breast-right']}</SelectItem>
                  <SelectItem value="both-breasts" className="text-xs text-white">🤱 {typeNames['both-breasts']}</SelectItem>
                  <SelectItem value="bottle" className="text-xs text-white">🍼 {typeNames['bottle']}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button
              onClick={startFeeding}
              size="sm"
              className="w-full text-sm bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white"
            >
              <Milk className="w-4 h-4 mr-1.5" />
              {texts.start}
            </Button>
          </div>
        )}

        {/* History */}
        {todayEntries.length > 0 && (
          <div className="space-y-2">
            <h3 className="text-sm font-semibold flex items-center gap-1.5 text-white">
              {texts.today}
            </h3>
            <div className="space-y-1.5 max-h-48 overflow-y-auto">
              {todayEntries.map((entry) => (
                <div
                  key={entry.id}
                  className="p-2 rounded-lg bg-[#1e1b4b] border border-purple-500/20 flex items-center justify-between text-xs"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-base">{getTypeIcon(entry.type)}</span>
                    <div>
                      <p className="font-medium text-xs text-white">
                        {getTypeName(entry.type)}
                      </p>
                      <p className="text-[10px] text-pink-200/60">
                        {formatTime(entry.startTime)} {entry.endTime && `- ${formatTime(entry.endTime)}`}
                      </p>
                    </div>
                  </div>
                  {entry.duration && (
                    <div className="text-xs font-semibold text-pink-400">
                      {entry.duration}min
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="p-3 bg-[#1e1b4b] rounded-lg border border-blue-500/30">
          <p className="text-xs text-blue-300">
            <strong>{texts.tip}</strong>
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
