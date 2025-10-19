export const medicineDataBR = {
  babyMedicines: [
    {
      name: "Paracetamol (Tylenol Bebê)",
      use: "Febre e dor",
      dosage: "10-15mg/kg a cada 4-6 horas",
      warning: "Não use em bebês menores de 3 meses sem orientação médica",
      age: "3+ meses"
    },
    {
      name: "Ibuprofeno (Alivium, Motrin)",
      use: "Febre, dor e inflamação",
      dosage: "5-10mg/kg a cada 6-8 horas",
      warning: "Não use em bebês menores de 6 meses",
      age: "6+ meses"
    },
    {
      name: "Dimeticona (Luftal, Mylicon)",
      use: "Gases e cólicas",
      dosage: "0,3ml a cada mamada (máximo 8x/dia)",
      warning: "Seguro desde o nascimento. Não substitui consulta médica se cólica persistir",
      age: "0+ meses"
    },
    {
      name: "Probióticos (Lactobacillus)",
      use: "Melhora flora intestinal e imunidade",
      dosage: "Conforme prescrição médica",
      warning: "Consulte pediatra antes de usar",
      age: "0+ meses"
    },
    {
      name: "Soro Fisiológico 0,9%",
      use: "Limpeza nasal",
      dosage: "2-3 gotas em cada narina antes das mamadas",
      warning: "Seguro e essencial. Sempre tenha em casa",
      age: "0+ meses"
    },
    {
      name: "Vitamina D3 (Adtil, Depura)",
      use: "Prevenção de raquitismo",
      dosage: "400 UI/dia (ou conforme pediatra)",
      warning: "Essencial nos primeiros anos de vida",
      age: "0+ meses"
    }
  ],
  momMedicines: [
    {
      name: "Paracetamol",
      use: "Febre e dor (dor de cabeça, dor no corpo)",
      dosage: "500-1000mg a cada 6-8 horas",
      warning: "Seguro durante amamentação",
      safe: true
    },
    {
      name: "Ibuprofeno",
      use: "Dor e inflamação",
      dosage: "200-400mg a cada 6-8 horas",
      warning: "Seguro em doses baixas durante amamentação",
      safe: true
    },
    {
      name: "Omeprazol",
      use: "Azia e refluxo",
      dosage: "20mg 1x ao dia",
      warning: "Geralmente seguro, consulte médico",
      safe: true
    },
    {
      name: "Vitaminas pré-natais",
      use: "Suplementação durante amamentação",
      dosage: "Conforme prescrição",
      warning: "Essencial para mãe e bebê",
      safe: true
    },
    {
      name: "Dipirona",
      use: "Febre e dor intensa",
      dosage: "500-1000mg a cada 6-8 horas",
      warning: "Evite uso prolongado. Seguro para amamentação em doses ocasionais",
      safe: true
    },
    {
      name: "Suplemento de Ferro",
      use: "Anemia pós-parto",
      dosage: "Conforme prescrição médica",
      warning: "Pode causar constipação. Tome com vitamina C",
      safe: true
    },
    {
      name: "Antibióticos (Amoxicilina, Cefalexina)",
      use: "Infecções",
      dosage: "Conforme prescrição",
      warning: "Sempre sob orientação médica. A maioria é segura durante amamentação",
      safe: true
    }
  ],
  commonConditions: [
    {
      condition: "Febre",
      symptoms: "Temperatura acima de 37,5°C axilar ou 38°C retal",
      treatment: "Banho morno, roupas leves, hidratação. Paracetamol ou Ibuprofeno se acima de 38°C",
      when: "Procure médico se: febre em bebês menores de 3 meses, febre persistente por mais de 3 dias, febre acima de 39°C"
    },
    {
      condition: "Cólicas",
      symptoms: "Choro intenso por 3+ horas, geralmente no final da tarde",
      treatment: "Massagem abdominal, compressa morna, posição aviãozinho, dimeticona",
      when: "Procure médico se: sangue nas fezes, vômitos persistentes, perda de peso"
    },
    {
      condition: "Assadura",
      symptoms: "Vermelhidão, irritação na área da fralda",
      treatment: "Troque fraldas frequentemente, limpe bem com água, use pomada com óxido de zinco, deixe sem fralda quando possível",
      when: "Procure médico se: feridas abertas, sangramento, infecção (pus)"
    },
    {
      condition: "Resfriado",
      symptoms: "Nariz escorrendo ou entupido, espirros, tosse leve",
      treatment: "Soro fisiológico no nariz, umidificador de ar, hidratação, elevação da cabeceira do berço",
      when: "Procure médico se: dificuldade para respirar, febre alta, não consegue mamar, sinais de desidratação"
    },
    {
      condition: "Refluxo",
      symptoms: "Golfadas frequentes após mamadas, irritabilidade",
      treatment: "Arrote bem o bebê, mantenha-o inclinado após mamar, mamadas menores e mais frequentes",
      when: "Procure médico se: vômitos em jato, perda de peso, sangue no vômito, choro excessivo"
    }
  ]
};

export const medicineDataUSA = {
  babyMedicines: [
    {
      name: "Acetaminophen (Tylenol Infants')",
      use: "Fever and pain",
      dosage: "10-15mg/kg every 4-6 hours",
      warning: "Do not use in babies under 3 months without medical advice",
      age: "3+ months"
    },
    {
      name: "Ibuprofen (Motrin, Advil Infants')",
      use: "Fever, pain and inflammation",
      dosage: "5-10mg/kg every 6-8 hours",
      warning: "Do not use in babies under 6 months",
      age: "6+ months"
    },
    {
      name: "Simethicone (Mylicon, Gas-X)",
      use: "Gas and colic",
      dosage: "20mg (0.3ml) after each feeding (max 12x/day)",
      warning: "Safe from birth. See doctor if colic persists",
      age: "0+ months"
    },
    {
      name: "Probiotics (Lactobacillus)",
      use: "Improves gut flora and immunity",
      dosage: "As prescribed by pediatrician",
      warning: "Consult pediatrician before use",
      age: "0+ months"
    },
    {
      name: "Saline Drops (Little Remedies)",
      use: "Nasal congestion relief",
      dosage: "2-3 drops in each nostril before feeding",
      warning: "Safe and essential. Always keep at home",
      age: "0+ months"
    },
    {
      name: "Vitamin D3",
      use: "Prevention of rickets",
      dosage: "400 IU/day (or as prescribed)",
      warning: "Essential in the first years of life",
      age: "0+ months"
    },
    {
      name: "Gripe Water",
      use: "Colic and digestive discomfort",
      dosage: "As directed on package",
      warning: "Check ingredients. Some contain sugar or alcohol",
      age: "2+ weeks"
    }
  ],
  momMedicines: [
    {
      name: "Acetaminophen (Tylenol)",
      use: "Fever and pain (headache, body aches)",
      dosage: "500-1000mg every 6-8 hours",
      warning: "Safe during breastfeeding",
      safe: true
    },
    {
      name: "Ibuprofen (Advil, Motrin)",
      use: "Pain and inflammation",
      dosage: "200-400mg every 6-8 hours",
      warning: "Safe in low doses during breastfeeding",
      safe: true
    },
    {
      name: "Calcium Carbonate (Tums)",
      use: "Heartburn and acid reflux",
      dosage: "500-1000mg as needed",
      warning: "Safe during breastfeeding",
      safe: true
    },
    {
      name: "Prenatal Vitamins",
      use: "Supplementation during breastfeeding",
      dosage: "As prescribed",
      warning: "Essential for mom and baby",
      safe: true
    },
    {
      name: "Stool Softener (Docusate)",
      use: "Postpartum constipation",
      dosage: "100-200mg twice daily",
      warning: "Safe during breastfeeding",
      safe: true
    },
    {
      name: "Iron Supplement",
      use: "Postpartum anemia",
      dosage: "As prescribed by doctor",
      warning: "May cause constipation. Take with vitamin C",
      safe: true
    },
    {
      name: "Antibiotics (Amoxicillin, Cephalexin)",
      use: "Infections",
      dosage: "As prescribed",
      warning: "Always under medical supervision. Most are safe during breastfeeding",
      safe: true
    }
  ],
  commonConditions: [
    {
      condition: "Fever",
      symptoms: "Temperature above 100.4°F (38°C) rectal",
      treatment: "Lukewarm bath, light clothing, hydration. Acetaminophen or Ibuprofen if above 100.4°F",
      when: "See doctor if: fever in babies under 3 months, persistent fever for more than 3 days, fever above 102.2°F (39°C)"
    },
    {
      condition: "Colic",
      symptoms: "Intense crying for 3+ hours, usually in late afternoon",
      treatment: "Abdominal massage, warm compress, airplane position, simethicone drops",
      when: "See doctor if: blood in stool, persistent vomiting, weight loss"
    },
    {
      condition: "Diaper Rash",
      symptoms: "Redness, irritation in diaper area",
      treatment: "Change diapers frequently, clean with water, use zinc oxide cream, allow diaper-free time",
      when: "See doctor if: open sores, bleeding, infection (pus)"
    },
    {
      condition: "Common Cold",
      symptoms: "Runny or stuffy nose, sneezing, mild cough",
      treatment: "Saline drops in nose, humidifier, hydration, elevate crib mattress slightly",
      when: "See doctor if: difficulty breathing, high fever, can't feed, signs of dehydration"
    },
    {
      condition: "Reflux",
      symptoms: "Frequent spitting up after feeding, irritability",
      treatment: "Burp baby well, keep upright after feeding, smaller more frequent feedings",
      when: "See doctor if: projectile vomiting, weight loss, blood in vomit, excessive crying"
    },
    {
      condition: "Cradle Cap",
      symptoms: "Scaly, crusty patches on scalp",
      treatment: "Gentle massage with baby oil, wash with mild shampoo, use soft brush",
      when: "See doctor if: spreads to face or body, signs of infection, severe irritation"
    }
  ]
};
