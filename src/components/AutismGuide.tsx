import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Heart, Brain, Sparkles, Eye, Ear, Hand } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useCountry } from "@/contexts/CountryContext";
import { autismDataBR, autismDataUSA } from "@/data/autismData";

const AutismGuide = () => {
  const { isUSA } = useCountry();
  const data = isUSA ? autismDataUSA : autismDataBR;

  const earlySignsIcons = [Eye, Ear, Hand];
  const strategyColors = [
    "bg-blue-50 dark:bg-blue-950/20 border-blue-200",
    "bg-purple-50 dark:bg-purple-950/20 border-purple-200",
    "bg-green-50 dark:bg-green-950/20 border-green-200",
    "bg-pink-50 dark:bg-pink-950/20 border-pink-200",
    "bg-orange-50 dark:bg-orange-950/20 border-orange-200",
    "bg-indigo-50 dark:bg-indigo-950/20 border-indigo-200"
  ];

  return (
    <div className="space-y-4">
      <Card className="bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-blue-950/20 dark:via-purple-950/20 dark:to-pink-950/20 border-2 border-primary/20">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <Brain className="w-5 h-5 text-primary animate-pulse" />
            <CardTitle className="text-lg">{data.title}</CardTitle>
          </div>
          <CardDescription className="text-xs leading-relaxed">
            {data.description}
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Sinais Precoces */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <Eye className="w-5 h-5 text-primary" />
            <CardTitle className="text-base">{data.earlySignsTitle}</CardTitle>
          </div>
          <CardDescription className="text-xs">
            {data.earlySignsDescription}
          </CardDescription>
        </CardHeader>
        <CardContent className="p-3 pt-0 space-y-3">
          {data.earlySigns.map((item, index) => {
            const Icon = earlySignsIcons[index];
            return (
              <div key={index} className="bg-gradient-to-r from-primary/5 to-primary/10 p-3 rounded-lg border">
                <div className="flex items-center gap-2 mb-2">
                  <Icon className="w-4 h-4 text-primary" />
                  <Badge variant="secondary" className="text-xs">{item.age}</Badge>
                </div>
                <ul className="space-y-1 text-xs">
                  {item.signs.map((sign, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-primary mt-0.5">•</span>
                      <span>{sign}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
          <div className="bg-amber-50 dark:bg-amber-950/20 p-3 rounded-lg border border-amber-200">
            <p className="text-xs text-amber-900 dark:text-amber-300">
              {data.importantNote}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Estratégias */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            <CardTitle className="text-base">{data.strategiesTitle}</CardTitle>
          </div>
          <CardDescription className="text-xs">
            {data.strategiesDescription}
          </CardDescription>
        </CardHeader>
        <CardContent className="p-3 pt-0">
          <Accordion type="single" collapsible className="w-full">
            {data.strategies.map((strategy, index) => (
              <AccordionItem key={index} value={`strategy-${index}`}>
                <AccordionTrigger className="text-sm py-2 hover:no-underline">
                  <div className="text-left">
                    <p className="font-semibold">{strategy.title}</p>
                    <p className="text-xs text-muted-foreground">{strategy.description}</p>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-xs pb-3">
                  <div className={`p-3 rounded-lg border ${strategyColors[index]}`}>
                    <ul className="space-y-2">
                      {strategy.tips.map((tip, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-primary mt-0.5 font-bold">✓</span>
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
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-primary" />
            <CardTitle className="text-base">{data.resourcesTitle}</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="p-3 pt-0 space-y-3">
          {data.resources.map((resource, index) => (
            <div key={index} className="bg-gradient-to-r from-primary/5 to-primary/10 p-3 rounded-lg border">
              <h4 className="font-semibold text-sm mb-2 text-primary">{resource.title}</h4>
              <ul className="space-y-1.5 text-xs">
                {resource.items.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">💙</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-r from-pink-50 to-purple-50 dark:from-pink-950/20 dark:to-purple-950/20">
        <CardContent className="p-4">
          <p className="text-xs text-center leading-relaxed">
            {data.finalMessage}
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default AutismGuide;