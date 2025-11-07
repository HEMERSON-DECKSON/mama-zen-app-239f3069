import React, { createContext, useContext, useState, useEffect } from 'react';

export type Country = 'brazil' | 'usa';

interface CountryContextType {
  country: Country;
  setCountry: (country: Country) => void;
  isUSA: boolean;
  isBrazil: boolean;
}

const CountryContext = createContext<CountryContextType | undefined>(undefined);

export const CountryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [country, setCountryState] = useState<Country>(() => {
    const saved = localStorage.getItem('selectedCountry');
    return (saved as Country) || 'brazil';
  });

  useEffect(() => {
    // Detectar país apenas se não houver seleção salva
    const saved = localStorage.getItem('selectedCountry');
    if (!saved) {
      detectCountryByIP();
    }
  }, []);

  const detectCountryByIP = async () => {
    try {
      const response = await fetch('https://ipapi.co/json/');
      const data = await response.json();
      
      // Se for EUA, muda para inglês
      if (data.country_code === 'US') {
        setCountryState('usa');
        localStorage.setItem('selectedCountry', 'usa');
      } else {
        // Caso contrário, mantém português (padrão)
        setCountryState('brazil');
        localStorage.setItem('selectedCountry', 'brazil');
      }
    } catch (error) {
      // Em caso de erro, mantém português como padrão
      console.log('Could not detect country, using default');
    }
  };

  const setCountry = (newCountry: Country) => {
    setCountryState(newCountry);
    localStorage.setItem('selectedCountry', newCountry);
  };

  const isUSA = country === 'usa';
  const isBrazil = country === 'brazil';

  return (
    <CountryContext.Provider value={{ country, setCountry, isUSA, isBrazil }}>
      {children}
    </CountryContext.Provider>
  );
};

export const useCountry = () => {
  const context = useContext(CountryContext);
  if (context === undefined) {
    throw new Error('useCountry must be used within a CountryProvider');
  }
  return context;
};
