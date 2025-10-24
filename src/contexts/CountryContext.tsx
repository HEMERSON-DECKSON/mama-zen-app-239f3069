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
