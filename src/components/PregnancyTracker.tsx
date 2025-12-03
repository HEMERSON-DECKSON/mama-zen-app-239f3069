import { useState, useEffect, Suspense, lazy } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Calendar, Baby, Heart, ArrowLeft, ArrowRight, TrendingUp, Info, Loader2 } from 'lucide-react';
import { useCountry } from '@/contexts/CountryContext';

const Baby3D = lazy(() => import('./Baby3D'));

interface PregnancyData {
  lastPeriodDate: string;
  cycleLength: number;
}

const fetalDevelopmentData: Record<number, { 
  size: string; 
  weight: string; 
  description: string; 
  developments: string[];
  comparison: string;
}> = {
  4: {
    size: "0.4mm",
    weight: "< 1g",
    description: "O embrião está se implantando no útero. As células começam a se diferenciar.",
    developments: ["Implantação no útero", "Formação do saco gestacional", "Início da placenta"],
    comparison: "Semente de papoula"
  },
  5: {
    size: "2mm",
    weight: "< 1g",
    description: "O coração começa a se formar e o tubo neural está se desenvolvendo.",
    developments: ["Coração primitivo começa a bater", "Formação do tubo neural", "Início do sistema circulatório"],
    comparison: "Semente de gergelim"
  },
  6: {
    size: "5mm",
    weight: "< 1g",
    description: "Os brotos dos braços e pernas começam a aparecer.",
    developments: ["Brotos dos membros", "Desenvolvimento do cérebro", "Formação dos olhos"],
    comparison: "Lentilha"
  },
  7: {
    size: "1cm",
    weight: "< 1g",
    description: "O rosto começa a tomar forma com olhos e orelhas.",
    developments: ["Formação do rosto", "Dedos começam a se formar", "Fígado produz células sanguíneas"],
    comparison: "Mirtilo"
  },
  8: {
    size: "1.6cm",
    weight: "1g",
    description: "Todos os órgãos principais começaram a se formar. Os dedos estão se separando.",
    developments: ["Dedos separados", "Pálpebras se formando", "Orelhas externas"],
    comparison: "Framboesa"
  },
  9: {
    size: "2.3cm",
    weight: "2g",
    description: "O bebê começa a se mover, embora você ainda não sinta.",
    developments: ["Movimentos reflexos", "Órgãos genitais começam a se formar", "Ossos começam a endurecer"],
    comparison: "Uva"
  },
  10: {
    size: "3.1cm",
    weight: "4g",
    description: "Fase embrionária completa. Agora é oficialmente um feto!",
    developments: ["Transição para feto", "Unhas começam a crescer", "Rins funcionando"],
    comparison: "Kumquat"
  },
  11: {
    size: "4.1cm",
    weight: "7g",
    description: "O bebê pode abrir e fechar os punhos. A cabeça é metade do corpo.",
    developments: ["Movimentos mais coordenados", "Botões dentários", "Cabelo e unhas crescendo"],
    comparison: "Figo"
  },
  12: {
    size: "5.4cm",
    weight: "14g",
    description: "Reflexos estão se desenvolvendo. O bebê pode chupar o polegar.",
    developments: ["Reflexo de sucção", "Sistema digestivo pratica", "Medula óssea produz células"],
    comparison: "Limão"
  },
  13: {
    size: "7.4cm",
    weight: "23g",
    description: "As impressões digitais únicas estão se formando.",
    developments: ["Impressões digitais", "Cordas vocais se formando", "Intestinos no abdômen"],
    comparison: "Vagem de ervilha"
  },
  14: {
    size: "8.7cm",
    weight: "43g",
    description: "O bebê pode fazer expressões faciais!",
    developments: ["Expressões faciais", "Pode franzir a testa", "Órgãos genitais visíveis"],
    comparison: "Pêssego"
  },
  15: {
    size: "10.1cm",
    weight: "70g",
    description: "O bebê está formando papilas gustativas.",
    developments: ["Papilas gustativas", "Pele translúcida", "Pode sentir luz"],
    comparison: "Maçã"
  },
  16: {
    size: "11.6cm",
    weight: "100g",
    description: "Você pode começar a sentir os primeiros movimentos!",
    developments: ["Movimentos perceptíveis", "Sobrancelhas e cílios", "Sistema circulatório maduro"],
    comparison: "Abacate"
  },
  17: {
    size: "13cm",
    weight: "140g",
    description: "O bebê está praticando respirar líquido amniótico.",
    developments: ["Prática de respiração", "Gordura começando a se formar", "Audição se desenvolvendo"],
    comparison: "Pera"
  },
  18: {
    size: "14.2cm",
    weight: "190g",
    description: "O bebê pode ouvir sons de fora!",
    developments: ["Audição ativa", "Padrões de sono", "Bocejos frequentes"],
    comparison: "Batata doce"
  },
  19: {
    size: "15.3cm",
    weight: "240g",
    description: "Vernix (substância protetora) cobre a pele do bebê.",
    developments: ["Vernix protetor", "Neurônios em rápido crescimento", "Sentidos mais aguçados"],
    comparison: "Manga"
  },
  20: {
    size: "16.4cm",
    weight: "300g",
    description: "Metade da gravidez! O bebê engole líquido amniótico.",
    developments: ["Engole líquido amniótico", "Produz mecônio", "Cabelo (lanugo) no corpo"],
    comparison: "Banana"
  },
  22: {
    size: "27.8cm",
    weight: "430g",
    description: "O bebê responde a sons e pode reconhecer sua voz.",
    developments: ["Reconhece vozes", "Pálpebras se abrem", "Cérebro em rápido crescimento"],
    comparison: "Papaia"
  },
  24: {
    size: "30cm",
    weight: "600g",
    description: "Os pulmões estão se desenvolvendo rapidamente.",
    developments: ["Surfactante pulmonar", "Ciclos de sono REM", "Responde a estímulos"],
    comparison: "Espiga de milho"
  },
  26: {
    size: "35.6cm",
    weight: "760g",
    description: "O bebê abre os olhos e pode piscar!",
    developments: ["Olhos abertos", "Pode piscar", "Ondas cerebrais de sonho"],
    comparison: "Alface"
  },
  28: {
    size: "37.6cm",
    weight: "1kg",
    description: "O bebê pode sonhar! A visão está se desenvolvendo.",
    developments: ["Sonhos durante o sono", "Visão em desenvolvimento", "Pode diferenciar luz e escuro"],
    comparison: "Berinjela"
  },
  30: {
    size: "39.9cm",
    weight: "1.3kg",
    description: "O bebê está ganhando peso rapidamente.",
    developments: ["Ganho de peso acelerado", "Medula óssea produz sangue", "Unhas crescidas"],
    comparison: "Repolho"
  },
  32: {
    size: "42.4cm",
    weight: "1.7kg",
    description: "A pele está ficando menos enrugada à medida que ganha gordura.",
    developments: ["Pele mais lisa", "Pratica respiração", "Ossos totalmente formados"],
    comparison: "Jicama"
  },
  34: {
    size: "45cm",
    weight: "2.1kg",
    description: "O sistema nervoso central está amadurecendo.",
    developments: ["Sistema nervoso maduro", "Pulmões quase prontos", "Posição de cabeça para baixo"],
    comparison: "Melão cantaloupe"
  },
  36: {
    size: "47.4cm",
    weight: "2.6kg",
    description: "O bebê está perdendo o lanugo (pelos finos).",
    developments: ["Perde lanugo", "Ganha gordura", "Pronto para nascer em breve"],
    comparison: "Alface romana"
  },
  37: {
    size: "48.6cm",
    weight: "2.9kg",
    description: "Considerado termo completo! O bebê pode nascer a qualquer momento.",
    developments: ["Termo completo", "Órgãos maduros", "Pronto para o nascimento"],
    comparison: "Acelga"
  },
  38: {
    size: "49.8cm",
    weight: "3.1kg",
    description: "O bebê continua ganhando peso e desenvolvendo o cérebro.",
    developments: ["Cérebro em crescimento", "Reflexos prontos", "Coordenação melhorada"],
    comparison: "Alho-poró"
  },
  39: {
    size: "50.7cm",
    weight: "3.3kg",
    description: "Os pulmões estão completamente maduros.",
    developments: ["Pulmões maduros", "Sistema imune fortalecido", "Pronto para respirar"],
    comparison: "Melancia mini"
  },
  40: {
    size: "51.2cm",
    weight: "3.5kg",
    description: "Data prevista do parto! O bebê está pronto para conhecer você!",
    developments: ["Totalmente desenvolvido", "Pronto para nascer", "Aguardando o grande dia"],
    comparison: "Abóbora"
  }
};

const trimesterInfo = [
  { name: "1º Trimestre", weeks: "1-12", color: "from-pink-400 to-pink-600" },
  { name: "2º Trimestre", weeks: "13-26", color: "from-purple-400 to-purple-600" },
  { name: "3º Trimestre", weeks: "27-40", color: "from-indigo-400 to-indigo-600" }
];

export const PregnancyTracker = () => {
  const { isBrazil } = useCountry();
  const isPT = isBrazil;
  
  const [pregnancyData, setPregnancyData] = useState<PregnancyData | null>(null);
  const [showSetup, setShowSetup] = useState(true);
  const [lastPeriodDate, setLastPeriodDate] = useState('');
  const [cycleLength, setCycleLength] = useState(28);
  const [currentWeek, setCurrentWeek] = useState(4);
  const [showGrowthChart, setShowGrowthChart] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('pregnancyData');
    if (saved) {
      const data = JSON.parse(saved);
      setPregnancyData(data);
      setShowSetup(false);
      calculateCurrentWeek(data.lastPeriodDate);
    }
  }, []);

  const calculateCurrentWeek = (lmpDate: string) => {
    const lmp = new Date(lmpDate);
    const today = new Date();
    const diffTime = Math.abs(today.getTime() - lmp.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const weeks = Math.floor(diffDays / 7);
    setCurrentWeek(Math.min(Math.max(weeks, 4), 40));
  };

  const calculateDueDate = (lmpDate: string): Date => {
    const lmp = new Date(lmpDate);
    const dueDate = new Date(lmp);
    dueDate.setDate(dueDate.getDate() + 280); // 40 semanas
    return dueDate;
  };

  const handleSubmit = () => {
    if (!lastPeriodDate) return;
    
    const data: PregnancyData = {
      lastPeriodDate,
      cycleLength
    };
    
    localStorage.setItem('pregnancyData', JSON.stringify(data));
    setPregnancyData(data);
    setShowSetup(false);
    calculateCurrentWeek(lastPeriodDate);
  };

  const handleReset = () => {
    localStorage.removeItem('pregnancyData');
    setPregnancyData(null);
    setShowSetup(true);
    setLastPeriodDate('');
    setCycleLength(28);
  };

  const getWeekData = (week: number) => {
    const availableWeeks = Object.keys(fetalDevelopmentData).map(Number).sort((a, b) => a - b);
    const closestWeek = availableWeeks.reduce((prev, curr) => 
      Math.abs(curr - week) < Math.abs(prev - week) ? curr : prev
    );
    return fetalDevelopmentData[closestWeek];
  };

  const getTrimester = (week: number): number => {
    if (week <= 12) return 1;
    if (week <= 26) return 2;
    return 3;
  };

  const getDaysToGo = (): number => {
    if (!pregnancyData) return 0;
    const dueDate = calculateDueDate(pregnancyData.lastPeriodDate);
    const today = new Date();
    const diffTime = dueDate.getTime() - today.getTime();
    return Math.max(0, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));
  };

  const formatDate = (date: Date): string => {
    return date.toLocaleDateString(isPT ? 'pt-BR' : 'en-US', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const weekData = getWeekData(currentWeek);
  const trimester = getTrimester(currentWeek);

  // Gráfico de crescimento simplificado
  const GrowthChart = () => {
    const weeks = [8, 12, 16, 20, 24, 28, 32, 36, 40];
    const maxHeight = 150;
    
    return (
      <Card className="p-4 bg-white/10 backdrop-blur-sm border-white/20">
        <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
          <TrendingUp className="w-5 h-5" />
          {isPT ? 'Gráfico de Crescimento' : 'Growth Chart'}
        </h3>
        <div className="flex items-end justify-between gap-1 h-40">
          {weeks.map((week) => {
            const data = fetalDevelopmentData[week];
            const heightPercent = (week / 40) * 100;
            const isCurrentWeek = week === Math.round(currentWeek / 4) * 4;
            
            return (
              <div key={week} className="flex flex-col items-center flex-1">
                <div 
                  className={`w-full rounded-t-lg transition-all ${
                    isCurrentWeek 
                      ? 'bg-gradient-to-t from-pink-500 to-pink-300 shadow-lg shadow-pink-500/50' 
                      : 'bg-gradient-to-t from-purple-500/60 to-purple-300/60'
                  }`}
                  style={{ height: `${heightPercent}%` }}
                />
                <span className="text-xs text-white/70 mt-1">{week}</span>
              </div>
            );
          })}
        </div>
        <p className="text-center text-white/60 text-xs mt-2">
          {isPT ? 'Semanas de gestação' : 'Weeks of pregnancy'}
        </p>
      </Card>
    );
  };

  if (showSetup) {
    return (
      <div className="space-y-4">
        <Card className="p-6 bg-gradient-to-br from-pink-500/20 to-purple-500/20 backdrop-blur-sm border-white/20">
          <div className="text-center mb-6">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-pink-400 to-purple-500 flex items-center justify-center shadow-lg shadow-pink-500/30">
              <Baby className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-xl font-bold text-white mb-2">
              {isPT ? 'Acompanhe sua Gravidez' : 'Track Your Pregnancy'}
            </h2>
            <p className="text-white/70 text-sm">
              {isPT 
                ? 'Veja o desenvolvimento do seu bebê semana a semana'
                : 'See your baby\'s development week by week'}
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-white text-sm font-medium mb-2">
                {isPT 
                  ? 'Data do primeiro dia da última menstruação'
                  : 'First day of your last period'}
              </label>
              <input
                type="date"
                value={lastPeriodDate}
                onChange={(e) => setLastPeriodDate(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-pink-400"
              />
            </div>

            <div>
              <label className="block text-white text-sm font-medium mb-2">
                {isPT 
                  ? 'Duração do ciclo menstrual (dias)'
                  : 'Length of menstrual cycle (days)'}
              </label>
              <input
                type="number"
                value={cycleLength}
                onChange={(e) => setCycleLength(Number(e.target.value))}
                min={21}
                max={35}
                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-pink-400"
              />
            </div>

            <Button
              onClick={handleSubmit}
              disabled={!lastPeriodDate}
              className="w-full py-6 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white font-semibold rounded-xl shadow-lg shadow-pink-500/30 transition-all"
            >
              <Calendar className="w-5 h-5 mr-2" />
              {isPT ? 'Calcular' : 'Calculate'}
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <ScrollArea className="h-[calc(100vh-200px)]">
      <div className="space-y-4 pb-4">
        {/* Header com informações principais */}
        <Card className="p-4 bg-gradient-to-br from-pink-500/20 to-purple-500/20 backdrop-blur-sm border-white/20">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-white/70 text-xs">
                {isPT ? 'Data prevista do parto' : 'Estimated due date'}
              </p>
              <p className="text-white font-bold text-lg">
                {pregnancyData && formatDate(calculateDueDate(pregnancyData.lastPeriodDate))}
              </p>
            </div>
            <div className="text-right">
              <p className="text-white/70 text-xs">
                {isPT ? 'Faltam' : 'Days to go'}
              </p>
              <p className="text-white font-bold text-lg">
                {getDaysToGo()} {isPT ? 'dias' : 'days'}
              </p>
            </div>
          </div>

          {/* Trimestre */}
          <div className="flex gap-2 mb-4">
            {trimesterInfo.map((tri, index) => (
              <div 
                key={index}
                className={`flex-1 py-2 px-3 rounded-lg text-center transition-all ${
                  trimester === index + 1 
                    ? `bg-gradient-to-r ${tri.color} shadow-lg` 
                    : 'bg-white/10'
                }`}
              >
                <p className="text-white text-xs font-medium">{tri.name}</p>
                <p className="text-white/70 text-xs">{tri.weeks}</p>
              </div>
            ))}
          </div>

          <Button
            variant="outline"
            onClick={handleReset}
            className="w-full bg-white/10 border-white/20 text-white hover:bg-white/20"
          >
            {isPT ? 'Recalcular' : 'Recalculate'}
          </Button>
        </Card>

        {/* Ilustração 3D do bebê */}
        <Card className="p-4 border-2 border-purple-500/30 shadow-xl shadow-purple-500/10" style={{ background: 'linear-gradient(135deg, #1e1b4b 0%, #581c87 50%, #831843 100%)' }}>
          <Suspense fallback={
            <div className="w-full h-72 flex items-center justify-center rounded-2xl" style={{ background: 'linear-gradient(135deg, #1e1b4b 0%, #4c1d95 50%, #831843 100%)' }}>
              <div className="flex flex-col items-center gap-2">
                <Loader2 className="w-8 h-8 animate-spin text-pink-400" />
                <span className="text-white/70 text-sm">Carregando 3D...</span>
              </div>
            </div>
          }>
            <Baby3D week={currentWeek} />
          </Suspense>
          
          {/* Navegação entre semanas */}
          <div className="flex items-center justify-between mt-4">
            <Button
              variant="ghost"
              onClick={() => setCurrentWeek(Math.max(4, currentWeek - 1))}
              disabled={currentWeek <= 4}
              className="text-white hover:bg-white/10"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            
            <div className="text-center">
              <p className="text-white/70 text-xs">
                {isPT ? 'Idade do bebê' : "Baby's age"}
              </p>
              <p className="text-white font-bold text-xl">
                {currentWeek} {isPT ? 'semanas' : 'weeks'}
              </p>
            </div>
            
            <Button
              variant="ghost"
              onClick={() => setCurrentWeek(Math.min(40, currentWeek + 1))}
              disabled={currentWeek >= 40}
              className="text-white hover:bg-white/10"
            >
              <ArrowRight className="w-5 h-5" />
            </Button>
          </div>
        </Card>

        {/* Informações da semana */}
        <Card className="p-4 bg-white/10 backdrop-blur-sm border-white/20">
          <div className="flex items-center gap-2 mb-3">
            <Info className="w-5 h-5 text-pink-400" />
            <h3 className="text-white font-semibold">
              {isPT ? `Semana ${currentWeek}` : `Week ${currentWeek}`}
            </h3>
          </div>
          
          <div className="grid grid-cols-3 gap-3 mb-4">
            <div className="bg-white/10 rounded-lg p-3 text-center">
              <p className="text-white/60 text-xs">{isPT ? 'Tamanho' : 'Size'}</p>
              <p className="text-white font-bold">{weekData.size}</p>
            </div>
            <div className="bg-white/10 rounded-lg p-3 text-center">
              <p className="text-white/60 text-xs">{isPT ? 'Peso' : 'Weight'}</p>
              <p className="text-white font-bold">{weekData.weight}</p>
            </div>
            <div className="bg-white/10 rounded-lg p-3 text-center">
              <p className="text-white/60 text-xs">{isPT ? 'Comparação' : 'Compared to'}</p>
              <p className="text-white font-bold text-xs">{weekData.comparison}</p>
            </div>
          </div>

          <p className="text-white/80 text-sm mb-4">{weekData.description}</p>

          <div className="space-y-2">
            <p className="text-white font-medium text-sm">
              {isPT ? 'Desenvolvimentos desta fase:' : 'Developments at this stage:'}
            </p>
            {weekData.developments.map((dev, index) => (
              <div key={index} className="flex items-center gap-2">
                <Heart className="w-3 h-3 text-pink-400 flex-shrink-0" />
                <span className="text-white/80 text-sm">{dev}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Toggle gráfico de crescimento */}
        <Button
          variant="outline"
          onClick={() => setShowGrowthChart(!showGrowthChart)}
          className="w-full bg-white/10 border-white/20 text-white hover:bg-white/20"
        >
          <TrendingUp className="w-4 h-4 mr-2" />
          {showGrowthChart 
            ? (isPT ? 'Ocultar Gráfico' : 'Hide Chart')
            : (isPT ? 'Ver Gráfico de Crescimento' : 'View Growth Chart')}
        </Button>

        {showGrowthChart && <GrowthChart />}
      </div>
    </ScrollArea>
  );
};
