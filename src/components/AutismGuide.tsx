import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Heart, Brain, Sparkles, Eye, Ear, Hand } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const AutismGuide = () => {
  const earlySigns = [
    {
      age: "0-6 meses",
      signs: [
        "Pouco ou nenhum contato visual",
        "Não sorri quando você sorri",
        "Não responde ao nome",
        "Não demonstra interesse em rostos"
      ],
      icon: Eye
    },
    {
      age: "6-12 meses",
      signs: [
        "Não balbucia ou faz sons",
        "Não gesticula (acenar, apontar)",
        "Não demonstra interesse em brincadeiras sociais",
        "Não responde a sons"
      ],
      icon: Ear
    },
    {
      age: "12-24 meses",
      signs: [
        "Não fala palavras simples aos 16 meses",
        "Perde habilidades já adquiridas",
        "Não aponta para objetos de interesse",
        "Evita contato físico"
      ],
      icon: Hand
    }
  ];

  const strategies = [
    {
      title: "Comunicação Visual",
      description: "Use cartões com imagens para ajudar na comunicação",
      tips: [
        "Crie uma rotina visual com imagens das atividades do dia",
        "Use fotos da família e objetos familiares",
        "Mostre o que vai acontecer antes de fazer (banho, comida, etc)",
        "Tenha paciência - pode levar tempo para o bebê entender"
      ],
      color: "bg-blue-900/50 border-blue-500/50"
    },
    {
      title: "Ambiente Calmo",
      description: "Reduza estímulos sensoriais excessivos",
      tips: [
        "Diminua luzes muito fortes - use luz indireta",
        "Evite barulhos altos e repentinos",
        "Crie um cantinho calmo com poucos brinquedos",
        "Use música suave e sons da natureza",
        "Mantenha a temperatura confortável"
      ],
      color: "bg-purple-900/50 border-purple-500/50"
    },
    {
      title: "Rotina Estruturada",
      description: "Crianças autistas se sentem mais seguras com rotinas",
      tips: [
        "Tenha horários fixos para acordar, comer e dormir",
        "Avise com antecedência mudanças na rotina",
        "Use sempre a mesma ordem nas atividades",
        "Celebre pequenas conquistas com reforço positivo",
        "Seja consistente todos os dias"
      ],
      color: "bg-green-900/50 border-green-500/50"
    },
    {
      title: "Estimulação Sensorial",
      description: "Atividades que ajudam no desenvolvimento",
      tips: [
        "Massagens suaves antes de dormir",
        "Brincadeiras com texturas diferentes (macias, ásperas)",
        "Banhos relaxantes com temperatura ideal",
        "Brinquedos que fazem sons suaves",
        "Contato pele a pele sempre que possível"
      ],
      color: "bg-pink-900/50 border-pink-500/50"
    },
    {
      title: "Alimentação",
      description: "Crianças autistas podem ter seletividade alimentar",
      tips: [
        "Respeite as preferências - não force",
        "Introduza novos alimentos gradualmente",
        "Mantenha o ambiente calmo durante as refeições",
        "Use pratos com divisórias se não gostar de comidas misturadas",
        "Textura pode ser mais importante que sabor"
      ],
      color: "bg-orange-900/50 border-orange-500/50"
    },
    {
      title: "Sono",
      description: "Problemas de sono são comuns",
      tips: [
        "Rotina noturna sempre igual e previsível",
        "Quarto escuro, silencioso e confortável",
        "Evite telas 2 horas antes de dormir",
        "Use objetos de transição (naninha, cheirinho)",
        "Considere usar ruído branco ou sons relaxantes"
      ],
      color: "bg-indigo-900/50 border-indigo-500/50"
    }
  ];

  const resources = [
    {
      title: "Quando Procurar Avaliação",
      items: [
        "Se notar qualquer dos sinais precoces mencionados",
        "Se o bebê perdeu habilidades que já tinha",
        "Se você tem alguma preocupação sobre o desenvolvimento",
        "Quanto mais cedo o diagnóstico, melhor o prognóstico"
      ]
    },
    {
      title: "Profissionais que Podem Ajudar",
      items: [
        "Neuropediatra - diagnóstico e acompanhamento",
        "Terapeuta Ocupacional - desenvolvimento sensorial",
        "Fonoaudiólogo - comunicação e linguagem",
        "Psicólogo - comportamento e emoções",
        "Fisioterapeuta - desenvolvimento motor"
      ]
    },
    {
      title: "Apoio para os Pais",
      items: [
        "Grupos de apoio com outros pais autistas",
        "Terapia familiar pode ajudar toda a família",
        "Cuide da sua saúde mental - você não está sozinha",
        "Celebre cada conquista, por menor que seja",
        "Não compare seu filho com outras crianças"
      ]
    }
  ];

  return (
    <div className="space-y-4">
      <Card className="bg-gradient-to-br from-[#1e1b4b] via-[#581c87] to-[#831843] border-2 border-purple-500/30">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <Brain className="w-5 h-5 text-pink-400 animate-pulse" />
            <CardTitle className="text-lg text-white">Guia para Bebês Autistas</CardTitle>
          </div>
          <CardDescription className="text-xs leading-relaxed text-purple-200">
            💙 Informações e estratégias para apoiar o desenvolvimento de crianças no espectro autista. 
            Cada criança é única e especial! 🌈
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Sinais Precoces */}
      <Card className="bg-[#1e1b4b]/50 border-purple-500/30">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <Eye className="w-5 h-5 text-pink-400" />
            <CardTitle className="text-base text-white">Sinais Precoces por Idade</CardTitle>
          </div>
          <CardDescription className="text-xs text-purple-200">
            Identificação precoce pode fazer toda a diferença
          </CardDescription>
        </CardHeader>
        <CardContent className="p-3 pt-0 space-y-3">
          {earlySigns.map((item, index) => {
            const Icon = item.icon;
            return (
              <div key={index} className="bg-[#1e1b4b] p-3 rounded-lg border border-purple-500/30">
                <div className="flex items-center gap-2 mb-2">
                  <Icon className="w-4 h-4 text-pink-400" />
                  <Badge className="text-xs bg-pink-500/20 text-pink-300 border-pink-500/30">{item.age}</Badge>
                </div>
                <ul className="space-y-1 text-xs">
                  {item.signs.map((sign, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-purple-100">
                      <span className="text-pink-400 mt-0.5">•</span>
                      <span>{sign}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
          <div className="bg-amber-900/50 p-3 rounded-lg border border-amber-500/50">
            <p className="text-xs text-amber-200">
              <strong className="text-amber-300">⚠️ Importante:</strong> Estes são apenas sinais de alerta. Somente um profissional pode fazer o diagnóstico. 
              Se você notar alguns desses sinais, procure um neuropediatra.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Estratégias */}
      <Card className="bg-[#1e1b4b]/50 border-purple-500/30">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-pink-400" />
            <CardTitle className="text-base text-white">Estratégias de Apoio</CardTitle>
          </div>
          <CardDescription className="text-xs text-purple-200">
            Como ajudar seu bebê a se desenvolver e se sentir seguro
          </CardDescription>
        </CardHeader>
        <CardContent className="p-3 pt-0">
          <Accordion type="single" collapsible className="w-full">
            {strategies.map((strategy, index) => (
              <AccordionItem key={index} value={`strategy-${index}`} className="border-purple-500/30">
                <AccordionTrigger className="text-sm py-2 hover:no-underline">
                  <div className="text-left">
                    <p className="font-semibold text-white">{strategy.title}</p>
                    <p className="text-xs text-purple-300">{strategy.description}</p>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-xs pb-3">
                  <div className={`p-3 rounded-lg border ${strategy.color}`}>
                    <ul className="space-y-2">
                      {strategy.tips.map((tip, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-purple-100">
                          <span className="text-pink-400 mt-0.5 font-bold">✓</span>
                          <span>{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>

      {/* Recursos e Suporte */}
      <Card className="bg-[#1e1b4b]/50 border-purple-500/30">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-pink-400" />
            <CardTitle className="text-base text-white">Recursos e Suporte</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="p-3 pt-0 space-y-3">
          {resources.map((resource, index) => (
            <div key={index} className="bg-[#1e1b4b] p-3 rounded-lg border border-purple-500/30">
              <h4 className="font-semibold text-sm mb-2 text-pink-300">{resource.title}</h4>
              <ul className="space-y-1.5 text-xs">
                {resource.items.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-purple-100">
                    <span className="text-pink-400 mt-0.5">💙</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-r from-pink-900/50 to-purple-900/50 border-pink-500/30">
        <CardContent className="p-4">
          <p className="text-xs text-center leading-relaxed text-pink-200">
            <strong className="text-pink-300">💜 Lembre-se:</strong> Cada criança é única e se desenvolve no seu próprio ritmo. 
            O autismo não define seu filho - ele é uma criança maravilhosa com necessidades especiais. 
            Você está fazendo um trabalho incrível! 🌈✨
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default AutismGuide;
