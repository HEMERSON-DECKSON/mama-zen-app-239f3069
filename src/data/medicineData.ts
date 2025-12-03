export const medicineDataBR = {
  babyMedicines: [
    {
      name: "Paracetamol (Tylenol Bebê)",
      use: "Febre e dor",
      dosage: "10-15mg/kg a cada 4-6 horas",
      warning: "Não use em bebês menores de 3 meses sem orientação médica",
      age: "3+ meses",
      risks: "⚠️ OVERDOSE pode causar danos graves ao fígado, vômitos, dor abdominal e em casos extremos, insuficiência hepática. NUNCA dê mais que a dose recomendada. Se der dose errada, procure emergência IMEDIATAMENTE."
    },
    {
      name: "Ibuprofeno (Alivium, Motrin)",
      use: "Febre, dor e inflamação",
      dosage: "5-10mg/kg a cada 6-8 horas",
      warning: "Não use em bebês menores de 6 meses",
      age: "6+ meses",
      risks: "⚠️ Pode causar sangramento estomacal, úlceras e problemas renais. Em bebês desidratados, pode agravar desidratação. NUNCA dê com estômago vazio. Overdose pode causar vômitos, dor de barriga e convulsões."
    },
    {
      name: "Dimeticona (Luftal, Mylicon)",
      use: "Gases e cólicas",
      dosage: "0,3ml a cada mamada (máximo 8x/dia)",
      warning: "Seguro desde o nascimento. Não substitui consulta médica se cólica persistir",
      age: "0+ meses",
      risks: "⚠️ Medicamento considerado muito seguro, mas excesso pode causar diarreia. Se cólicas persistirem por mais de 3 horas, pode indicar problema mais sério - procure médico."
    },
    {
      name: "Probióticos (Lactobacillus)",
      use: "Melhora flora intestinal e imunidade",
      dosage: "Conforme prescrição médica",
      warning: "Consulte pediatra antes de usar",
      age: "0+ meses",
      risks: "⚠️ Geralmente seguro, mas em bebês com sistema imunológico comprometido pode causar infecções. Use apenas marcas confiáveis e armazene corretamente na geladeira."
    },
    {
      name: "Soro Fisiológico 0,9%",
      use: "Limpeza nasal",
      dosage: "2-3 gotas em cada narina antes das mamadas",
      warning: "Seguro e essencial. Sempre tenha em casa",
      age: "0+ meses",
      risks: "⚠️ Muito seguro, mas aplicação excessiva ou forçada pode irritar as mucosas. Nunca use soro caseiro - a concentração errada pode danificar as vias nasais do bebê."
    },
    {
      name: "Vitamina D3 (Adtil, Depura)",
      use: "Prevenção de raquitismo",
      dosage: "400 UI/dia (ou conforme pediatra)",
      warning: "Essencial nos primeiros anos de vida",
      age: "0+ meses",
      risks: "⚠️ OVERDOSE causa hipercalcemia: vômitos, constipação, fraqueza, perda de apetite, desidratação. Use APENAS a dosagem prescrita. Se administrar dose duplicada acidentalmente, consulte médico."
    }
  ],
  momMedicines: [
    {
      name: "Paracetamol",
      use: "Febre e dor (dor de cabeça, dor no corpo)",
      dosage: "500-1000mg a cada 6-8 horas",
      warning: "Seguro durante amamentação",
      safe: true,
      risks: "⚠️ Passa para o leite materno em pequenas quantidades. Overdose pode causar danos ao fígado. NUNCA exceda 4g/dia. Não combine com álcool."
    },
    {
      name: "Ibuprofeno",
      use: "Dor e inflamação",
      dosage: "200-400mg a cada 6-8 horas",
      warning: "Seguro em doses baixas durante amamentação",
      safe: true,
      risks: "⚠️ Pode causar gastrite, úlceras e problemas renais. Evite se tiver histórico de problemas estomacais. Não tome com estômago vazio. Uso prolongado não recomendado."
    },
    {
      name: "Omeprazol",
      use: "Azia e refluxo",
      dosage: "20mg 1x ao dia",
      warning: "Geralmente seguro, consulte médico",
      safe: true,
      risks: "⚠️ Uso prolongado pode diminuir absorção de vitamina B12, cálcio e magnésio. Pode causar diarreia e dor de cabeça. Não use por mais de 14 dias sem orientação médica."
    },
    {
      name: "Vitaminas pré-natais",
      use: "Suplementação durante amamentação",
      dosage: "Conforme prescrição",
      warning: "Essencial para mãe e bebê",
      safe: true,
      risks: "⚠️ Overdose de ferro pode causar constipação severa e náuseas. Excesso de vitamina A pode ser tóxico. Siga EXATAMENTE a dosagem prescrita."
    },
    {
      name: "Dipirona",
      use: "Febre e dor intensa",
      dosage: "500-1000mg a cada 6-8 horas",
      warning: "Evite uso prolongado. Seguro para amamentação em doses ocasionais",
      safe: true,
      risks: "⚠️ Pode causar queda de pressão arterial e, em casos raros, agranulocitose (queda severa de glóbulos brancos). Se tiver febre, calafrios ou feridas na boca após uso, procure emergência."
    },
    {
      name: "Suplemento de Ferro",
      use: "Anemia pós-parto",
      dosage: "Conforme prescrição médica",
      warning: "Pode causar constipação. Tome com vitamina C",
      safe: true,
      risks: "⚠️ Overdose de ferro é PERIGOSA - pode causar envenenamento. Guarde longe do alcance de crianças. Sintomas de overdose: dor abdominal severa, vômitos, diarreia com sangue."
    },
    {
      name: "Antibióticos (Amoxicilina, Cefalexina)",
      use: "Infecções",
      dosage: "Conforme prescrição",
      warning: "Sempre sob orientação médica. A maioria é segura durante amamentação",
      safe: true,
      risks: "⚠️ Pode causar diarreia no bebê através do leite. NUNCA pare o tratamento antes do tempo - isso cria bactérias resistentes. Se bebê tiver diarreia severa ou sangue nas fezes, consulte pediatra."
    }
  ],
  commonConditions: [
    {
      condition: "Febre",
      symptoms: "Temperatura acima de 37,5°C axilar ou 38°C retal",
      treatment: "Banho morno, roupas leves, hidratação. Paracetamol ou Ibuprofeno se acima de 38°C",
      when: "Procure médico se: febre em bebês menores de 3 meses, febre persistente por mais de 3 dias, febre acima de 39°C",
      risks: "🚨 RISCO GRAVE: Febre em bebês menores de 3 meses pode indicar infecção séria como meningite. NUNCA dê medicamentos para febre em recém-nascidos sem orientação médica. Convulsão febril pode ocorrer - se acontecer, deite o bebê de lado e procure emergência."
    },
    {
      condition: "Cólicas",
      symptoms: "Choro intenso por 3+ horas, geralmente no final da tarde",
      treatment: "Massagem abdominal, compressa morna, posição aviãozinho, dimeticona",
      when: "Procure médico se: sangue nas fezes, vômitos persistentes, perda de peso",
      risks: "🚨 RISCO GRAVE: Cólicas podem mascarar problemas sérios como intussuscepção intestinal (intestino que dobra sobre si mesmo) ou hérnia encarcerada. Se barriga estiver muito dura, bebê não fizer cocô, ou vomitar bile verde, VÁ À EMERGÊNCIA IMEDIATAMENTE."
    },
    {
      condition: "Assadura",
      symptoms: "Vermelhidão, irritação na área da fralda",
      treatment: "Troque fraldas frequentemente, limpe bem com água, use pomada com óxido de zinco, deixe sem fralda quando possível",
      when: "Procure médico se: feridas abertas, sangramento, infecção (pus)",
      risks: "🚨 RISCO GRAVE: Assadura não tratada pode evoluir para candidíase (infecção por fungo) ou infecção bacteriana. Se aparecerem bolhas, pus, ou a vermelhidão se espalhar, procure pediatra urgente. NUNCA use talco - pode causar problemas respiratórios."
    },
    {
      condition: "Resfriado",
      symptoms: "Nariz escorrendo ou entupido, espirros, tosse leve",
      treatment: "Soro fisiológico no nariz, umidificador de ar, hidratação, elevação da cabeceira do berço",
      when: "Procure médico se: dificuldade para respirar, febre alta, não consegue mamar, sinais de desidratação",
      risks: "🚨 RISCO GRAVE: Em bebês, resfriado pode evoluir rapidamente para bronquiolite ou pneumonia. Se bebê apresentar respiração rápida, afundamento das costelas ao respirar, lábios ou unhas roxas, OU parar de mamar - VÁ À EMERGÊNCIA IMEDIATAMENTE."
    },
    {
      condition: "Refluxo",
      symptoms: "Golfadas frequentes após mamadas, irritabilidade",
      treatment: "Arrote bem o bebê, mantenha-o inclinado após mamar, mamadas menores e mais frequentes",
      when: "Procure médico se: vômitos em jato, perda de peso, sangue no vômito, choro excessivo",
      risks: "🚨 RISCO GRAVE: Vômito em JATO (que sai com força) pode indicar estenose pilórica, que requer cirurgia urgente. Sangue no vômito pode indicar esofagite severa. Se bebê não estiver ganhando peso ou parecer desidratado, procure médico urgente."
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
      age: "3+ months",
      risks: "⚠️ OVERDOSE can cause severe liver damage, vomiting, abdominal pain and in extreme cases, liver failure. NEVER give more than recommended dose. If wrong dose given, seek emergency care IMMEDIATELY."
    },
    {
      name: "Ibuprofen (Motrin, Advil Infants')",
      use: "Fever, pain and inflammation",
      dosage: "5-10mg/kg every 6-8 hours",
      warning: "Do not use in babies under 6 months",
      age: "6+ months",
      risks: "⚠️ Can cause stomach bleeding, ulcers and kidney problems. In dehydrated babies, can worsen dehydration. NEVER give on empty stomach. Overdose can cause vomiting, stomach pain and seizures."
    },
    {
      name: "Simethicone (Mylicon, Gas-X)",
      use: "Gas and colic",
      dosage: "20mg (0.3ml) after each feeding (max 12x/day)",
      warning: "Safe from birth. See doctor if colic persists",
      age: "0+ months",
      risks: "⚠️ Generally very safe medication, but excess can cause diarrhea. If colic persists for more than 3 hours, may indicate more serious problem - see doctor."
    },
    {
      name: "Probiotics (Lactobacillus)",
      use: "Improves gut flora and immunity",
      dosage: "As prescribed by pediatrician",
      warning: "Consult pediatrician before use",
      age: "0+ months",
      risks: "⚠️ Generally safe, but in babies with compromised immune systems can cause infections. Use only trusted brands and store properly in refrigerator."
    },
    {
      name: "Saline Drops (Little Remedies)",
      use: "Nasal congestion relief",
      dosage: "2-3 drops in each nostril before feeding",
      warning: "Safe and essential. Always keep at home",
      age: "0+ months",
      risks: "⚠️ Very safe, but excessive or forced application can irritate mucous membranes. Never use homemade saline - wrong concentration can damage baby's nasal passages."
    },
    {
      name: "Vitamin D3",
      use: "Prevention of rickets",
      dosage: "400 IU/day (or as prescribed)",
      warning: "Essential in the first years of life",
      age: "0+ months",
      risks: "⚠️ OVERDOSE causes hypercalcemia: vomiting, constipation, weakness, loss of appetite, dehydration. Use ONLY prescribed dosage. If double dose given accidentally, consult doctor."
    },
    {
      name: "Gripe Water",
      use: "Colic and digestive discomfort",
      dosage: "As directed on package",
      warning: "Check ingredients. Some contain sugar or alcohol",
      age: "2+ weeks",
      risks: "⚠️ Some brands contain alcohol, sugar or sodium bicarbonate which can be harmful. Always check ingredients. Products with alcohol are NOT safe for babies."
    }
  ],
  momMedicines: [
    {
      name: "Acetaminophen (Tylenol)",
      use: "Fever and pain (headache, body aches)",
      dosage: "500-1000mg every 6-8 hours",
      warning: "Safe during breastfeeding",
      safe: true,
      risks: "⚠️ Passes to breast milk in small amounts. Overdose can cause liver damage. NEVER exceed 4g/day. Do not combine with alcohol."
    },
    {
      name: "Ibuprofen (Advil, Motrin)",
      use: "Pain and inflammation",
      dosage: "200-400mg every 6-8 hours",
      warning: "Safe in low doses during breastfeeding",
      safe: true,
      risks: "⚠️ Can cause gastritis, ulcers and kidney problems. Avoid if you have history of stomach problems. Don't take on empty stomach. Prolonged use not recommended."
    },
    {
      name: "Calcium Carbonate (Tums)",
      use: "Heartburn and acid reflux",
      dosage: "500-1000mg as needed",
      warning: "Safe during breastfeeding",
      safe: true,
      risks: "⚠️ Excessive use can cause constipation and kidney stones. Can interfere with absorption of other medications. Do not exceed recommended daily dose."
    },
    {
      name: "Prenatal Vitamins",
      use: "Supplementation during breastfeeding",
      dosage: "As prescribed",
      warning: "Essential for mom and baby",
      safe: true,
      risks: "⚠️ Iron overdose can cause severe constipation and nausea. Excess vitamin A can be toxic. Follow EXACTLY the prescribed dosage."
    },
    {
      name: "Stool Softener (Docusate)",
      use: "Postpartum constipation",
      dosage: "100-200mg twice daily",
      warning: "Safe during breastfeeding",
      safe: true,
      risks: "⚠️ Prolonged use can cause electrolyte imbalance. Not for long-term use. If constipation persists more than a week, consult doctor."
    },
    {
      name: "Iron Supplement",
      use: "Postpartum anemia",
      dosage: "As prescribed by doctor",
      warning: "May cause constipation. Take with vitamin C",
      safe: true,
      risks: "⚠️ Iron overdose is DANGEROUS - can cause poisoning. Keep away from children. Overdose symptoms: severe abdominal pain, vomiting, bloody diarrhea."
    },
    {
      name: "Antibiotics (Amoxicillin, Cephalexin)",
      use: "Infections",
      dosage: "As prescribed",
      warning: "Always under medical supervision. Most are safe during breastfeeding",
      safe: true,
      risks: "⚠️ Can cause diarrhea in baby through breast milk. NEVER stop treatment early - this creates resistant bacteria. If baby has severe diarrhea or blood in stool, consult pediatrician."
    }
  ],
  commonConditions: [
    {
      condition: "Fever",
      symptoms: "Temperature above 100.4°F (38°C) rectal",
      treatment: "Lukewarm bath, light clothing, hydration. Acetaminophen or Ibuprofen if above 100.4°F",
      when: "See doctor if: fever in babies under 3 months, persistent fever for more than 3 days, fever above 102.2°F (39°C)",
      risks: "🚨 SERIOUS RISK: Fever in babies under 3 months can indicate serious infection like meningitis. NEVER give fever medication to newborns without medical guidance. Febrile seizure can occur - if it happens, lay baby on side and seek emergency care."
    },
    {
      condition: "Colic",
      symptoms: "Intense crying for 3+ hours, usually in late afternoon",
      treatment: "Abdominal massage, warm compress, airplane position, simethicone drops",
      when: "See doctor if: blood in stool, persistent vomiting, weight loss",
      risks: "🚨 SERIOUS RISK: Colic can mask serious problems like intussusception (intestine folding on itself) or incarcerated hernia. If belly is very hard, baby hasn't had bowel movement, or is vomiting green bile, GO TO EMERGENCY IMMEDIATELY."
    },
    {
      condition: "Diaper Rash",
      symptoms: "Redness, irritation in diaper area",
      treatment: "Change diapers frequently, clean with water, use zinc oxide cream, allow diaper-free time",
      when: "See doctor if: open sores, bleeding, infection (pus)",
      risks: "🚨 SERIOUS RISK: Untreated diaper rash can develop into candidiasis (yeast infection) or bacterial infection. If blisters, pus appear, or redness spreads, see pediatrician urgently. NEVER use talcum powder - can cause respiratory problems."
    },
    {
      condition: "Common Cold",
      symptoms: "Runny or stuffy nose, sneezing, mild cough",
      treatment: "Saline drops in nose, humidifier, hydration, elevate crib mattress slightly",
      when: "See doctor if: difficulty breathing, high fever, can't feed, signs of dehydration",
      risks: "🚨 SERIOUS RISK: In babies, cold can quickly develop into bronchiolitis or pneumonia. If baby has rapid breathing, rib retractions when breathing, blue lips or nails, OR stops feeding - GO TO EMERGENCY IMMEDIATELY."
    },
    {
      condition: "Reflux",
      symptoms: "Frequent spitting up after feeding, irritability",
      treatment: "Burp baby well, keep upright after feeding, smaller more frequent feedings",
      when: "See doctor if: projectile vomiting, weight loss, blood in vomit, excessive crying",
      risks: "🚨 SERIOUS RISK: PROJECTILE vomiting (that comes out forcefully) may indicate pyloric stenosis, which requires urgent surgery. Blood in vomit may indicate severe esophagitis. If baby isn't gaining weight or seems dehydrated, see doctor urgently."
    },
    {
      condition: "Cradle Cap",
      symptoms: "Scaly, crusty patches on scalp",
      treatment: "Gentle massage with baby oil, wash with mild shampoo, use soft brush",
      when: "See doctor if: spreads to face or body, signs of infection, severe irritation",
      risks: "🚨 SERIOUS RISK: Usually harmless, but if it spreads beyond scalp or becomes red and oozing, may indicate seborrheic dermatitis or skin infection requiring medical treatment."
    }
  ]
};
