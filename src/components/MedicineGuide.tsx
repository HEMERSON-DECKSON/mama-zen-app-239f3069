import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Pill, Baby, Heart } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const MedicineGuide = () => {
  const babyMedicines = [
    {
      name: "Paracetamol (Tylenol Bebê)",
      use: "Febre e dor",
      dosage: "10-15mg/kg a cada 4-6 horas",
      warning: "Não exceder 5 doses em 24h. Consulte o pediatra para bebês com menos de 3 meses.",
      age: "0-2 anos"
    },
    {
      name: "Ibuprofeno (Alivium Bebê)",
      use: "Febre e inflamação",
      dosage: "5-10mg/kg a cada 6-8 horas",
      warning: "Não usar em bebês com menos de 6 meses. Dar com alimento.",
      age: "6+ meses"
    },
    {
      name: "Simeticona (Luftal Gotas)",
      use: "Gases e cólicas",
      dosage: "4-6 gotas após cada mamada",
      warning: "Seguro para recém-nascidos. Pode usar desde o primeiro dia.",
      age: "0+ meses"
    },
    {
      name: "Probióticos (Protexin, Floratil)",
      use: "Fortalecimento intestinal e cólicas",
      dosage: "Conforme orientação pediátrica",
      warning: "Ajuda na microbiota intestinal. Reduz cólicas.",
      age: "0+ meses"
    },
    {
      name: "Vitamina D (Adtil Gotas)",
      use: "Desenvolvimento ósseo",
      dosage: "400 UI (1 gota) por dia",
      warning: "Essencial para todos os bebês. Previne raquitismo.",
      age: "0+ meses"
    },
    {
      name: "Loratadina (Claritin Xarope)",
      use: "Alergias",
      dosage: "Conforme peso e idade",
      warning: "Apenas com prescrição médica.",
      age: "2+ anos"
    }
  ];

  const momMedicines = [
    {
      name: "Paracetamol",
      use: "Dor e febre (seguro na amamentação)",
      dosage: "500-1000mg a cada 6 horas",
      warning: "Seguro durante amamentação. Não exceder 4g/dia.",
      safe: true
    },
    {
      name: "Ibuprofeno",
      use: "Dor e inflamação pós-parto",
      dosage: "400-600mg a cada 6-8 horas",
      warning: "Seguro na amamentação. Tomar com alimento.",
      safe: true
    },
    {
      name: "Ferro (Sulfato Ferroso)",
      use: "Anemia pós-parto",
      dosage: "Conforme prescrição",
      warning: "Pode causar constipação. Tomar com vitamina C.",
      safe: true
    },
    {
      name: "Ômega 3 (DHA)",
      use: "Desenvolvimento cerebral do bebê",
      dosage: "1-2 cápsulas ao dia",
      warning: "Benéfico durante amamentação para o desenvolvimento do bebê.",
      safe: true
    },
    {
      name: "Vitaminas Pré-natais",
      use: "Suplementação durante amamentação",
      dosage: "1 comprimido ao dia",
      warning: "Continue tomando após o parto durante amamentação.",
      safe: true
    },
    {
      name: "Dipirona",
      use: "Dor intensa",
      dosage: "500mg a cada 6 horas",
      warning: "Evitar uso prolongado. Preferir paracetamol.",
      safe: false
    }
  ];

  const commonConditions = [
    {
      condition: "Cólica do Bebê",
      symptoms: "Choro intenso por mais de 3h, barriga rígida, pernas encolhidas",
      treatment: "Massagem abdominal, compressa morna, simeticona, probióticos",
      when: "Se persistir por mais de 1 semana ou febre"
    },
    {
      condition: "Assadura",
      symptoms: "Vermelhidão, irritação na área da fralda",
      treatment: "Trocar fralda frequentemente, pomada de óxido de zinco, banhos de sol",
      when: "Se aparecer feridas ou sangramento"
    },
    {
      condition: "Refluxo",
      symptoms: "Regurgitação frequente, desconforto após mamar",
      treatment: "Manter bebê em pé 20min após mamar, pequenas refeições frequentes",
      when: "Se o bebê não ganhar peso ou vomitar com força"
    },
    {
      condition: "Febre",
      symptoms: "Temperatura acima de 37.5°C",
      treatment: "Paracetamol, banho morno, manter hidratado",
      when: "Febre acima de 38°C em bebês com menos de 3 meses - IR IMEDIATAMENTE"
    },
    {
      condition: "Nariz Entupido",
      symptoms: "Dificuldade para respirar, roncos",
      treatment: "Soro fisiológico, umidificador, aspirador nasal",
      when: "Se houver febre alta ou dificuldade para mamar"
    },
    {
      condition: "Diarreia",
      symptoms: "Fezes líquidas frequentes",
      treatment: "Manter hidratação, continuar amamentação, soro caseiro",
      when: "Desidratação (boca seca, sem lágrimas, fraldas secas)"
    }
  ];

  return (
    <div className="space-y-4">
      <Card className="bg-gradient-to-br from-pink-50 to-purple-50 dark:from-pink-950/20 dark:to-purple-950/20 border-2 border-primary/20">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <Pill className="w-5 h-5 text-primary" />
            <CardTitle className="text-lg">Guia de Medicamentos</CardTitle>
          </div>
          <CardDescription className="text-xs">
            ⚠️ ATENÇÃO: Sempre consulte um pediatra antes de administrar qualquer medicamento ao seu bebê
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Medicamentos para Bebês */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <Baby className="w-5 h-5 text-primary" />
            <CardTitle className="text-base">Medicamentos para o Bebê</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="p-3 pt-0">
          <Accordion type="single" collapsible className="w-full">
            {babyMedicines.map((med, index) => (
              <AccordionItem key={index} value={`baby-med-${index}`}>
                <AccordionTrigger className="text-sm py-2 hover:no-underline">
                  <div className="flex items-center gap-2">
                    <Pill className="w-4 h-4 text-primary" />
                    <span className="font-semibold">{med.name}</span>
                    <Badge variant="secondary" className="text-[10px] px-1.5 py-0">{med.age}</Badge>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-xs space-y-2 pb-3">
                  <div>
                    <p className="font-semibold text-primary">Para que serve:</p>
                    <p>{med.use}</p>
                  </div>
                  <div>
                    <p className="font-semibold text-primary">Dosagem:</p>
                    <p>{med.dosage}</p>
                  </div>
                  <div className="bg-amber-50 dark:bg-amber-950/20 p-2 rounded-lg border border-amber-200 dark:border-amber-900">
                    <p className="font-semibold text-amber-700 dark:text-amber-400">⚠️ Importante:</p>
                    <p className="text-amber-900 dark:text-amber-300">{med.warning}</p>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>

      {/* Medicamentos para Mamãe */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-primary" />
            <CardTitle className="text-base">Medicamentos para a Mamãe</CardTitle>
          </div>
          <CardDescription className="text-xs">
            Medicamentos seguros durante a amamentação
          </CardDescription>
        </CardHeader>
        <CardContent className="p-3 pt-0">
          <Accordion type="single" collapsible className="w-full">
            {momMedicines.map((med, index) => (
              <AccordionItem key={index} value={`mom-med-${index}`}>
                <AccordionTrigger className="text-sm py-2 hover:no-underline">
                  <div className="flex items-center gap-2">
                    <Pill className="w-4 h-4 text-primary" />
                    <span className="font-semibold">{med.name}</span>
                    {med.safe ? (
                      <Badge className="text-[10px] px-1.5 py-0 bg-green-500">✓ Seguro</Badge>
                    ) : (
                      <Badge variant="destructive" className="text-[10px] px-1.5 py-0">⚠️ Cuidado</Badge>
                    )}
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-xs space-y-2 pb-3">
                  <div>
                    <p className="font-semibold text-primary">Para que serve:</p>
                    <p>{med.use}</p>
                  </div>
                  <div>
                    <p className="font-semibold text-primary">Dosagem:</p>
                    <p>{med.dosage}</p>
                  </div>
                  <div className={`p-2 rounded-lg border ${med.safe ? 'bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-900' : 'bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-900'}`}>
                    <p className={`font-semibold ${med.safe ? 'text-green-700 dark:text-green-400' : 'text-amber-700 dark:text-amber-400'}`}>
                      {med.safe ? '✓' : '⚠️'} Importante:
                    </p>
                    <p className={med.safe ? 'text-green-900 dark:text-green-300' : 'text-amber-900 dark:text-amber-300'}>
                      {med.warning}
                    </p>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>

      {/* Doenças Comuns */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Condições e Doenças Comuns</CardTitle>
          <CardDescription className="text-xs">
            Como identificar e tratar problemas comuns
          </CardDescription>
        </CardHeader>
        <CardContent className="p-3 pt-0">
          <Accordion type="single" collapsible className="w-full">
            {commonConditions.map((item, index) => (
              <AccordionItem key={index} value={`condition-${index}`}>
                <AccordionTrigger className="text-sm py-2 hover:no-underline">
                  <span className="font-semibold">{item.condition}</span>
                </AccordionTrigger>
                <AccordionContent className="text-xs space-y-2 pb-3">
                  <div>
                    <p className="font-semibold text-primary">Sintomas:</p>
                    <p>{item.symptoms}</p>
                  </div>
                  <div>
                    <p className="font-semibold text-primary">Tratamento em casa:</p>
                    <p>{item.treatment}</p>
                  </div>
                  <div className="bg-red-50 dark:bg-red-950/20 p-2 rounded-lg border border-red-200 dark:border-red-900">
                    <p className="font-semibold text-red-700 dark:text-red-400">🚨 Quando procurar médico:</p>
                    <p className="text-red-900 dark:text-red-300">{item.when}</p>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
};

export default MedicineGuide;