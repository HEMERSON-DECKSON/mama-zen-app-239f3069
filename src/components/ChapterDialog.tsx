import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';

interface Chapter {
  id: number;
  title: string;
  subtitle: string;
  emoji: string;
}

interface ChapterDialogProps {
  chapter: Chapter | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const chapterContents: Record<number, string> = {
  1: `**Aceitando as Mudanças Pós-Parto**

Após o parto, seu corpo está se recuperando de um processo monumental. O útero se contrai, os hormônios flutuam e a fadiga se instala. É crucial entender que o corpo precisa de tempo para se curar.

• **Recuperação Uterina**: O útero leva cerca de 6 a 8 semanas para retornar ao seu tamanho pré-gravidez.
• **Flutuações Hormonais**: A queda dos hormônios da gravidez e o início da produção de prolactina (para amamentação) afetam o humor, a energia e o metabolismo.
• **Diástase dos Retos Abdominais**: É comum que os músculos abdominais se afastem. Exercícios específicos são necessários para ajudar na recuperação.

**Dica prática**: Tire um momento para olhar-se no espelho com gentileza. Reconheça a força e a beleza do seu corpo que gerou uma vida.`,

  2: `**A Importância da Nutrição Adequada**

Uma dieta balanceada é crucial para a recuperação pós-parto, para manter a energia, melhorar o humor e, para as mães que amamentam, garantir uma boa produção de leite.

**Montando um Plano Alimentar Nutritivo:**

• **Proteínas Magras**: Frango, peixe, ovos, leguminosas
• **Carboidratos Complexos**: Aveia, arroz integral, quinoa, batata doce
• **Gorduras Saudáveis**: Abacate, azeite, nozes, sementes
• **Vegetais e Frutas**: Variedade colorida para vitaminas e minerais
• **Hidratação**: Beba muita água sempre!`,

  3: `**A Indispensável Função da Água no Pós-Parto**

Seu corpo precisa de água para funcionar adequadamente, especialmente após o trauma do parto e durante a amamentação.

**Por que a água é essencial:**

• **Recuperação e Cicatrização**: Transporta nutrientes e oxigênio
• **Produção de Leite**: O leite materno é 88% água
• **Metabolismo**: Crucial para queima de gordura
• **Energia**: Desidratação causa fadiga

**Dica**: Beba um copo grande de água toda vez que amamentar o bebê!`,

  4: `**Amamentação e Perda de Peso**

A produção de leite materno é energeticamente exigente. O corpo pode queimar entre 300-500 calorias extras por dia!

**Maximizando os Benefícios:**

• Mantenha dieta equilibrada
• Hidratação constante
• Coma quando tiver fome
• Priorize o descanso
• Amamente sob demanda

**Lembre-se**: Nem toda mãe perde peso rapidamente com amamentação, e está tudo bem!`,

  5: `**Liberação Médica: O Primeiro Passo**

Não inicie exercícios sem liberação médica!

• **Parto Vaginal**: Geralmente 6 semanas
• **Cesariana**: 8-12 semanas
• **Complicações**: Pode ser mais tempo

**Primeiros Passos Seguros:**

• Caminhadas leves
• Exercícios do assoalho pélvico (Kegel)
• Respiração diafragmática
• Alongamentos suaves`,

  6: `**Foco no Core e Assoalho Pélvico**

Após a gravidez, o core está enfraquecido. Priorizar esses músculos é crucial!

**Exercícios Recomendados:**

• Exercícios Kegel
• Prancha modificada (em joelhos)
• Ponte (Glute Bridge)
• Caminhada progressiva
• Natação/hidroginástica

**Evite**: Abdominais tradicionais que causem abaulamento na barriga!`,

  7: `**O Que é Diástase?**

Separação dos músculos retos abdominais devido ao estiramento da linha alba durante a gravidez.

**Como Identificar:**

Deite-se, coloque dedos sobre o umbigo, levante a cabeça levemente. Se houver espaço entre os músculos (mais de 2 dedos), você tem diástase.

**Exercícios Seguros:**

• Respiração diafragmática
• Ativação do transverso abdominal
• Ponte
• Prancha em joelhos

**Consulte um fisioterapeuta pélvico!**`,

  8: `**Sono, Hormônios e Peso**

A privação de sono desregula hormônios que controlam o apetite e pode levar ao acúmulo de gordura.

**Estratégias Realistas:**

• Durma quando o bebê dormir
• Peça ajuda ao parceiro
• Crie ambiente propício
• Rotina relaxante
• Divida tarefas noturnas

**Lembre-se**: O sono não é egoísmo, é necessidade!`,

  9: `**Estresse, Hormônios e Ganho de Peso**

Cortisol elevado pode levar ao armazenamento de gordura abdominal e aumento do apetite.

**Estratégias de Gerenciamento:**

• Não busque perfeição
• Peça ajuda
• Conecte-se com outras mães
• Pequenos momentos de autocuidado
• Movimento leve
• Técnicas de relaxamento

**Busque apoio profissional se precisar!**`,

  10: `**Flexibilidade é a Chave**

A vida com bebê é imprevisível. O objetivo é um conjunto de hábitos adaptáveis.

**Estratégias para Construir Rotina:**

• Planejamento do dia seguinte
• Prepare o terreno (roupas, lanches)
• Aproveite sonecas do bebê
• Envolva o bebê nas atividades
• Divisão de tarefas
• Seja gentil consigo mesma

**Priorize 2-3 objetivos por dia!**`,

  11: `**Por Que a Balança Pode Enganar**

Flutuações de líquidos, volume de leite, construção muscular - tudo afeta o peso!

**Métricas Mais Significativas:**

• Medidas corporais
• Como as roupas servem
• Fotos de progresso
• Níveis de energia
• Força e resistência
• Qualidade do sono
• Bem-estar mental

**Foque em como você se sente, não apenas no número!**`,

  12: `**Superando Obstáculos**

**Fadiga**: Priorize sono, mini-sessões de movimento
**Falta de Tempo**: Planeje, delegue, micro-hábitos
**Motivação**: Seja gentil, metas pequenas, apoio social

**Lembre-se**: O progresso não é linear. Cada dia é nova oportunidade!`,

  13: `**Por Que o Apoio é Essencial**

Reduz estresse, reforça motivação, previne isolamento.

**Tipos de Apoio:**

• Parceiro/a - comunicação clara
• Familiares e amigos - seja específica
• Profissionais de saúde
• Comunidades de mães

**Despreze a ideia de "super-mãe" e priorize o autocuidado!**`,

  14: `**O Seu Corpo: Um Templo de Milagres**

Cada marca conta história de amor, força e vida.

**Autocuidado Além do Físico:**

• Momentos de quietude
• Hobbies e paixões
• Conexões sociais
• Roupas que agradam
• Digital detox
• Terapia se precisar

**Seu valor não está ligado ao seu peso!**`,

  15: `**Sustentabilidade a Longo Prazo**

Esta jornada é sobre criar hábitos saudáveis para a vida toda.

**Princípios Fundamentais:**

• Consistência, não perfeição
• Flexibilidade e adaptação
• Autocuidado contínuo
• Celebração de vitórias
• Comunidade de apoio

**Você é forte, capaz e está fazendo um trabalho maravilhoso! 💝**`
};

const ChapterDialog = ({ chapter, open, onOpenChange }: ChapterDialogProps) => {
  if (!chapter) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] bg-[#1e1b4b] border-purple-500/30">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3 text-2xl text-white">
            <span className="text-3xl">{chapter.emoji}</span>
            <div>
              <div>Capítulo {chapter.id}: {chapter.title}</div>
              <DialogDescription className="text-base mt-1 text-purple-200">
                {chapter.subtitle}
              </DialogDescription>
            </div>
          </DialogTitle>
        </DialogHeader>
        
        <ScrollArea className="h-full pr-4">
          <div className="prose prose-sm max-w-none">
            {chapterContents[chapter.id]?.split('\n\n').map((paragraph, idx) => {
              if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
                return (
                  <h3 key={idx} className="font-bold text-lg mt-4 mb-2 text-pink-300">
                    {paragraph.replace(/\*\*/g, '')}
                  </h3>
                );
              }
              if (paragraph.startsWith('•')) {
                const items = paragraph.split('\n•').map(item => item.trim().replace(/^•\s*/, ''));
                return (
                  <ul key={idx} className="list-disc pl-6 space-y-2 my-3">
                    {items.map((item, i) => (
                      <li key={i} className="text-purple-200">
                        {item.split('**').map((part, j) => 
                          j % 2 === 1 ? <strong key={j} className="text-white">{part}</strong> : part
                        )}
                      </li>
                    ))}
                  </ul>
                );
              }
              return (
                <p key={idx} className="text-purple-200 leading-relaxed mb-3">
                  {paragraph.split('**').map((part, i) => 
                    i % 2 === 1 ? <strong key={i} className="text-white">{part}</strong> : part
                  )}
                </p>
              );
            })}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default ChapterDialog;
