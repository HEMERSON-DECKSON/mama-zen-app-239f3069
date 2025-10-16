import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Baby, Heart, Moon, Droplets, Wind, Smile, AlertCircle, Clock } from "lucide-react";

const guides = [
  {
    id: "burping",
    icon: Wind,
    title: "Como Fazer o Bebê Arrotar",
    description: "Técnicas eficazes para ajudar seu bebê a arrotar",
    content: `
      <h3 class="font-semibold text-lg mb-3">3 Técnicas Principais:</h3>
      
      <div class="space-y-4">
        <div class="bg-primary/5 p-4 rounded-lg">
          <h4 class="font-semibold mb-2">1. No Ombro</h4>
          <p>Coloque o bebê apoiado no seu ombro, com a barriguinha pressionando suavemente contra você. Dê leves tapinhas nas costas, de baixo para cima.</p>
          <p class="text-sm text-muted-foreground mt-2">⏱️ Duração: 5-10 minutos</p>
        </div>
        
        <div class="bg-primary/5 p-4 rounded-lg">
          <h4 class="font-semibold mb-2">2. Sentado no Colo</h4>
          <p>Sente o bebê no seu colo, incline-o levemente para frente apoiando o queixo com uma mão. Com a outra, faça movimentos circulares suaves nas costas.</p>
          <p class="text-sm text-muted-foreground mt-2">⏱️ Duração: 5-8 minutos</p>
        </div>
        
        <div class="bg-primary/5 p-4 rounded-lg">
          <h4 class="font-semibold mb-2">3. Deitado de Bruços</h4>
          <p>Deite o bebê de bruços no seu colo, com a cabeça levemente mais alta que o corpo. Faça massagens circulares suaves nas costas.</p>
          <p class="text-sm text-muted-foreground mt-2">⏱️ Duração: 3-5 minutos</p>
        </div>
      </div>
      
      <div class="mt-4 p-4 bg-amber-50 dark:bg-amber-950/20 rounded-lg border border-amber-200 dark:border-amber-800">
        <p class="text-sm"><strong>💡 Dica:</strong> Arrote o bebê no meio e no final da mamada. Isso previne cólicas e desconfortos.</p>
      </div>
    `
  },
  {
    id: "calming",
    icon: Heart,
    title: "Como Acalmar o Bebê",
    description: "Métodos comprovados para acalmar seu bebê chorando",
    content: `
      <h3 class="font-semibold text-lg mb-3">Os 5 S's do Dr. Karp:</h3>
      
      <div class="space-y-4">
        <div class="bg-primary/5 p-4 rounded-lg">
          <h4 class="font-semibold mb-2">1. Swaddle (Enrolar)</h4>
          <p>Enrole o bebê firmemente em uma manta, deixando apenas a cabeça de fora. Isso recria a sensação de segurança do útero.</p>
        </div>
        
        <div class="bg-primary/5 p-4 rounded-lg">
          <h4 class="font-semibold mb-2">2. Side/Stomach (De Lado/Barriga)</h4>
          <p>Segure o bebê de lado ou com a barriga para baixo no seu braço (sempre supervisionado). Nunca deixe dormir nesta posição.</p>
        </div>
        
        <div class="bg-primary/5 p-4 rounded-lg">
          <h4 class="font-semibold mb-2">3. Shush (Shhh)</h4>
          <p>Faça sons "shhh" alto e constante próximo ao ouvido do bebê. O ruído branco acalma imitando os sons do útero.</p>
        </div>
        
        <div class="bg-primary/5 p-4 rounded-lg">
          <h4 class="font-semibold mb-2">4. Swing (Balançar)</h4>
          <p>Balance o bebê com movimentos pequenos e rápidos, sempre apoiando bem a cabeça.</p>
        </div>
        
        <div class="bg-primary/5 p-4 rounded-lg">
          <h4 class="font-semibold mb-2">5. Suck (Sucção)</h4>
          <p>Ofereça o peito, chupeta ou dedo limpo para o bebê sugar. A sucção tem efeito calmante natural.</p>
        </div>
      </div>
      
      <div class="mt-4 p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
        <p class="text-sm"><strong>🎵 Combine com:</strong> Use a seção de sons calmantes do app para potencializar o efeito!</p>
      </div>
    `
  },
  {
    id: "sleep",
    icon: Moon,
    title: "Rotina de Sono do Bebê",
    description: "Estabeleça uma rotina de sono saudável",
    content: `
      <h3 class="font-semibold text-lg mb-3">Rotina Ideal de Sono:</h3>
      
      <div class="space-y-4">
        <div class="bg-primary/5 p-4 rounded-lg">
          <h4 class="font-semibold mb-2">🌅 18h30 - Banho Relaxante</h4>
          <p>Água morna, ambiente tranquilo, massagem suave com óleo de amêndoas ou próprio para bebês.</p>
        </div>
        
        <div class="bg-primary/5 p-4 rounded-lg">
          <h4 class="font-semibold mb-2">🍼 19h00 - Última Mamada</h4>
          <p>Amamente ou dê mamadeira em ambiente com luz baixa, sem estímulos.</p>
        </div>
        
        <div class="bg-primary/5 p-4 rounded-lg">
          <h4 class="font-semibold mb-2">📖 19h30 - Momento Calmo</h4>
          <p>Cante uma canção de ninar, conte história suave, ou apenas embale com carinho.</p>
        </div>
        
        <div class="bg-primary/5 p-4 rounded-lg">
          <h4 class="font-semibold mb-2">😴 20h00 - Hora de Dormir</h4>
          <p>Coloque o bebê no berço sonolento, mas ainda acordado. Ative o ruído branco se necessário.</p>
        </div>
      </div>
      
      <div class="mt-4 p-4 bg-purple-50 dark:bg-purple-950/20 rounded-lg border border-purple-200 dark:border-purple-800">
        <h4 class="font-semibold mb-2">💤 Sinais de Sono:</h4>
        <ul class="text-sm space-y-1 ml-4 list-disc">
          <li>Esfregar os olhos</li>
          <li>Bocejar</li>
          <li>Puxar a orelha</li>
          <li>Ficar irritado</li>
          <li>Perder interesse em brinquedos</li>
        </ul>
      </div>
    `
  },
  {
    id: "colic",
    icon: AlertCircle,
    title: "Cólicas: Prevenção e Alívio",
    description: "Como lidar com as temidas cólicas do bebê",
    content: `
      <h3 class="font-semibold text-lg mb-3">Técnicas de Alívio:</h3>
      
      <div class="space-y-4">
        <div class="bg-primary/5 p-4 rounded-lg">
          <h4 class="font-semibold mb-2">🤲 Massagem Abdominal</h4>
          <p>Com óleo de amêndoas morno, faça movimentos circulares suaves no sentido horário na barriguinha do bebê.</p>
          <p class="text-sm text-muted-foreground mt-2">Repita: 10 círculos, 3x ao dia</p>
        </div>
        
        <div class="bg-primary/5 p-4 rounded-lg">
          <h4 class="font-semibold mb-2">🚴 Bicicleta</h4>
          <p>Com o bebê deitado de costas, movimente suavemente as perninhas simulando pedalar. Isso ajuda a eliminar gases.</p>
          <p class="text-sm text-muted-foreground mt-2">Duração: 2-3 minutos</p>
        </div>
        
        <div class="bg-primary/5 p-4 rounded-lg">
          <h4 class="font-semibold mb-2">🔥 Compressa Morna</h4>
          <p>Coloque uma fralda morna (não quente!) sobre a barriguinha do bebê. O calor relaxa os músculos intestinais.</p>
        </div>
        
        <div class="bg-primary/5 p-4 rounded-lg">
          <h4 class="font-semibold mb-2">🤱 Posição da "Aviãozinho"</h4>
          <p>Deite o bebê de bruços sobre seu antebraço, com a cabecinha apoiada na sua mão. Balance suavemente.</p>
        </div>
      </div>
      
      <div class="mt-4 p-4 bg-red-50 dark:bg-red-950/20 rounded-lg border border-red-200 dark:border-red-800">
        <h4 class="font-semibold mb-2">⚠️ Quando Procurar o Pediatra:</h4>
        <ul class="text-sm space-y-1 ml-4 list-disc">
          <li>Choro intenso por mais de 3 horas consecutivas</li>
          <li>Febre acima de 37.8°C</li>
          <li>Vômitos persistentes</li>
          <li>Sangue nas fezes</li>
          <li>Bebê muito pálido ou roxo</li>
        </ul>
      </div>
    `
  },
  {
    id: "feeding",
    icon: Droplets,
    title: "Guia de Amamentação",
    description: "Tudo sobre amamentação bem-sucedida",
    content: `
      <h3 class="font-semibold text-lg mb-3">Pega Correta:</h3>
      
      <div class="space-y-4">
        <div class="bg-primary/5 p-4 rounded-lg">
          <h4 class="font-semibold mb-2">✅ Sinais de Boa Pega:</h4>
          <ul class="space-y-2 ml-4 list-disc">
            <li>Boca bem aberta, abocanhando a aréola (não só o bico)</li>
            <li>Lábios virados para fora (como peixinho)</li>
            <li>Queixo encostado no seio</li>
            <li>Nariz livre para respirar</li>
            <li>Sem dor ao amamentar</li>
          </ul>
        </div>
        
        <div class="bg-primary/5 p-4 rounded-lg">
          <h4 class="font-semibold mb-2">🕐 Frequência Ideal:</h4>
          <p><strong>0-3 meses:</strong> A cada 2-3 horas (8-12 vezes/dia)</p>
          <p><strong>3-6 meses:</strong> A cada 3-4 horas (6-8 vezes/dia)</p>
          <p><strong>6+ meses:</strong> A cada 4-5 horas + alimentação sólida</p>
        </div>
        
        <div class="bg-primary/5 p-4 rounded-lg">
          <h4 class="font-semibold mb-2">💧 Hidratação da Mãe:</h4>
          <p>Beba pelo menos 3 litros de água por dia. Mantenha sempre uma garrafa de água por perto durante as mamadas.</p>
        </div>
        
        <div class="bg-primary/5 p-4 rounded-lg">
          <h4 class="font-semibold mb-2">🥗 Alimentação da Mãe:</h4>
          <p>Dieta balanceada rica em proteínas, frutas, vegetais e gorduras saudáveis. Evite excesso de cafeína, álcool e alimentos muito condimentados.</p>
        </div>
      </div>
      
      <div class="mt-4 p-4 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-800">
        <p class="text-sm"><strong>📊 Dica:</strong> Use o tracker de amamentação do app para monitorar horários e duração!</p>
      </div>
    `
  },
  {
    id: "development",
    icon: Smile,
    title: "Marcos do Desenvolvimento",
    description: "O que esperar em cada fase",
    content: `
      <h3 class="font-semibold text-lg mb-3">Desenvolvimento por Idade:</h3>
      
      <div class="space-y-4">
        <div class="bg-primary/5 p-4 rounded-lg">
          <h4 class="font-semibold mb-2">👶 0-3 Meses</h4>
          <ul class="space-y-1 ml-4 list-disc text-sm">
            <li>Levanta a cabeça quando de bruços</li>
            <li>Segue objetos com os olhos</li>
            <li>Sorri socialmente</li>
            <li>Faz sons (arrulha)</li>
            <li>Reconhece rostos familiares</li>
          </ul>
        </div>
        
        <div class="bg-primary/5 p-4 rounded-lg">
          <h4 class="font-semibold mb-2">🍼 3-6 Meses</h4>
          <ul class="space-y-1 ml-4 list-disc text-sm">
            <li>Rola de barriga para cima</li>
            <li>Senta com apoio</li>
            <li>Pega objetos</li>
            <li>Ri alto</li>
            <li>Reconhece o próprio nome</li>
          </ul>
        </div>
        
        <div class="bg-primary/5 p-4 rounded-lg">
          <h4 class="font-semibold mb-2">🎈 6-9 Meses</h4>
          <ul class="space-y-1 ml-4 list-disc text-sm">
            <li>Senta sem apoio</li>
            <li>Engatinha ou arrasta</li>
            <li>Transfere objetos entre as mãos</li>
            <li>Balbucia sílabas (ma-ma, da-da)</li>
            <li>Estranha pessoas desconhecidas</li>
          </ul>
        </div>
        
        <div class="bg-primary/5 p-4 rounded-lg">
          <h4 class="font-semibold mb-2">🚼 9-12 Meses</h4>
          <ul class="space-y-1 ml-4 list-disc text-sm">
            <li>Fica em pé com apoio</li>
            <li>Dá os primeiros passos</li>
            <li>Faz pinça com dedos</li>
            <li>Diz primeiras palavras</li>
            <li>Entende comandos simples</li>
          </ul>
        </div>
      </div>
      
      <div class="mt-4 p-4 bg-indigo-50 dark:bg-indigo-950/20 rounded-lg border border-indigo-200 dark:border-indigo-800">
        <p class="text-sm"><strong>⚠️ Lembre-se:</strong> Cada bebê se desenvolve no seu próprio ritmo. Em caso de dúvidas, consulte sempre o pediatra.</p>
      </div>
    `
  },
  {
    id: "hygiene",
    icon: Droplets,
    title: "Higiene e Cuidados Diários",
    description: "Rotina de higiene completa para o bebê",
    content: `
      <h3 class="font-semibold text-lg mb-3">Rotina de Higiene:</h3>
      
      <div class="space-y-4">
        <div class="bg-primary/5 p-4 rounded-lg">
          <h4 class="font-semibold mb-2">🛁 Banho</h4>
          <p><strong>Frequência:</strong> 1-2 vezes ao dia (manhã energizante, noite relaxante)</p>
          <p><strong>Temperatura:</strong> 36-37°C (teste com o cotovelo)</p>
          <p><strong>Duração:</strong> 5-10 minutos</p>
          <p class="text-sm mt-2">Use sabonete neutro próprio para bebês, seque bem as dobrinhas.</p>
        </div>
        
        <div class="bg-primary/5 p-4 rounded-lg">
          <h4 class="font-semibold mb-2">🧷 Troca de Fraldas</h4>
          <p><strong>Frequência:</strong> A cada 2-3 horas ou quando sujar</p>
          <p class="text-sm mt-2">Limpe sempre de frente para trás (meninas), seque bem antes de colocar fralda nova. Use pomada preventiva.</p>
        </div>
        
        <div class="bg-primary/5 p-4 rounded-lg">
          <h4 class="font-semibold mb-2">👃 Limpeza Nasal</h4>
          <p>Use soro fisiológico 0,9% sempre que necessário. Pingue 2-3 gotas em cada narina antes das mamadas e antes de dormir.</p>
        </div>
        
        <div class="bg-primary/5 p-4 rounded-lg">
          <h4 class="font-semibold mb-2">👂 Ouvidos e Unhas</h4>
          <p><strong>Ouvidos:</strong> Limpe apenas a parte externa com algodão úmido</p>
          <p><strong>Unhas:</strong> Corte com tesoura própria para bebês, de preferência quando ele estiver dormindo</p>
        </div>
        
        <div class="bg-primary/5 p-4 rounded-lg">
          <h4 class="font-semibold mb-2">🦷 Cuidados com a Boca</h4>
          <p>Limpe a gengiva com gaze úmida após as mamadas. Quando nascerem os dentes, use dedeira de silicone ou escova macia.</p>
        </div>
      </div>
    `
  },
  {
    id: "safety",
    icon: AlertCircle,
    title: "Segurança do Bebê",
    description: "Dicas essenciais de segurança",
    content: `
      <h3 class="font-semibold text-lg mb-3">Checklist de Segurança:</h3>
      
      <div class="space-y-4">
        <div class="bg-primary/5 p-4 rounded-lg">
          <h4 class="font-semibold mb-2">🛏️ Sono Seguro</h4>
          <ul class="space-y-1 ml-4 list-disc text-sm">
            <li>Sempre de barriga para cima</li>
            <li>Colchão firme e sem travesseiro</li>
            <li>Sem mantas, cobertores soltos ou brinquedos no berço</li>
            <li>Temperatura ambiente: 20-22°C</li>
            <li>Berço próximo à cama dos pais (primeiros 6 meses)</li>
          </ul>
        </div>
        
        <div class="bg-primary/5 p-4 rounded-lg">
          <h4 class="font-semibold mb-2">🚗 Transporte</h4>
          <ul class="space-y-1 ml-4 list-disc text-sm">
            <li>Cadeirinha adequada para idade/peso</li>
            <li>Sempre no banco traseiro, de costas (até 1 ano)</li>
            <li>Cintos bem ajustados</li>
            <li>Nunca deixe o bebê sozinho no carro</li>
          </ul>
        </div>
        
        <div class="bg-primary/5 p-4 rounded-lg">
          <h4 class="font-semibold mb-2">🏠 Em Casa</h4>
          <ul class="space-y-1 ml-4 list-disc text-sm">
            <li>Protetores de tomada</li>
            <li>Grades em escadas</li>
            <li>Janelas e sacadas protegidas</li>
            <li>Produtos de limpeza fora do alcance</li>
            <li>Cantos de móveis protegidos</li>
          </ul>
        </div>
        
        <div class="bg-primary/5 p-4 rounded-lg">
          <h4 class="font-semibold mb-2">🍼 Alimentação</h4>
          <ul class="space-y-1 ml-4 list-disc text-sm">
            <li>Sempre teste a temperatura do leite</li>
            <li>Nunca aqueça mamadeira no micro-ondas</li>
            <li>Supervise todas as refeições</li>
            <li>Corte alimentos em pedaços pequenos (após 6 meses)</li>
          </ul>
        </div>
      </div>
      
      <div class="mt-4 p-4 bg-red-50 dark:bg-red-950/20 rounded-lg border border-red-200 dark:border-red-800">
        <h4 class="font-semibold mb-2">🚨 Números de Emergência:</h4>
        <p class="text-sm"><strong>SAMU:</strong> 192</p>
        <p class="text-sm"><strong>Bombeiros:</strong> 193</p>
        <p class="text-sm"><strong>Intoxicação:</strong> 0800 722 6001</p>
      </div>
    `
  }
];

export default function PracticalGuides() {
  return (
    <Card className="border-primary/20 shadow-lg">
      <CardHeader className="bg-gradient-to-r from-primary/10 to-secondary/10 pb-3">
        <div className="flex items-center gap-2">
          <Baby className="w-6 h-6 text-primary" />
          <div>
            <CardTitle className="text-lg">Guias Práticos</CardTitle>
            <CardDescription className="text-xs">Cuidados essenciais para o bebê</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-4">
        <Accordion type="single" collapsible className="w-full space-y-2">
          {guides.map((guide) => {
            const Icon = guide.icon;
            return (
              <AccordionItem 
                key={guide.id} 
                value={guide.id}
                className="border rounded-lg px-3 bg-card/50 hover:bg-card/80 transition-colors"
              >
                <AccordionTrigger className="hover:no-underline py-3">
                  <div className="flex items-center gap-2 text-left">
                    <div className="p-1.5 rounded-full bg-primary/10 flex-shrink-0">
                      <Icon className="w-4 h-4 text-primary" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-semibold text-sm">{guide.title}</h3>
                      <p className="text-xs text-muted-foreground line-clamp-1">{guide.description}</p>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pt-2 pb-3">
                  <div 
                    className="prose prose-sm max-w-none dark:prose-invert text-xs"
                    dangerouslySetInnerHTML={{ __html: guide.content }}
                  />
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      </CardContent>
    </Card>
  );
}
