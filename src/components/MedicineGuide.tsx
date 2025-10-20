import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Pill, Baby, Heart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useCountry } from "@/contexts/CountryContext";
import { medicineDataBR, medicineDataUSA } from "@/data/medicineData";

const MedicineGuide = () => {
  const { isUSA } = useCountry();
  const data = isUSA ? medicineDataUSA : medicineDataBR;
  const { babyMedicines, momMedicines, commonConditions } = data;

  return (
    <div className="space-y-4">
      <Card className="bg-gradient-to-br from-pink-50 to-purple-50 dark:from-pink-950/20 dark:to-purple-950/20 border-2 border-primary/20">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <Pill className="w-5 h-5 text-primary" />
            <CardTitle className="text-lg">{isUSA ? 'Medicine Guide' : 'Guia de Medicamentos'}</CardTitle>
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