import { useCountry } from '@/contexts/CountryContext';
import { Button } from '@/components/ui/button';
import { Globe } from 'lucide-react';
import { toast } from 'sonner';

const CountrySelector = () => {
  const { country, setCountry, isUSA, isBrazil } = useCountry();

  const handleCountryChange = (newCountry: 'brazil' | 'usa') => {
    if (country === newCountry) return;
    
    setCountry(newCountry);
    
    if (newCountry === 'usa') {
      toast.success('🇺🇸 Country changed to United States! All content is now in English.');
    } else {
      toast.success('🇧🇷 País alterado para Brasil! Todo o conteúdo agora está em português.');
    }
  };

  return (
    <div className="flex items-center justify-center gap-2 p-2 bg-card rounded-lg border border-primary/20 shadow-sm">
      <Globe className="w-4 h-4 text-primary" />
      <div className="flex gap-1">
        <Button
          size="sm"
          variant={isBrazil ? "default" : "outline"}
          onClick={() => handleCountryChange('brazil')}
          className="h-8 px-3 text-xs font-semibold"
        >
          🇧🇷 Brasil
        </Button>
        <Button
          size="sm"
          variant={isUSA ? "default" : "outline"}
          onClick={() => handleCountryChange('usa')}
          className="h-8 px-3 text-xs font-semibold"
        >
          🇺🇸 USA
        </Button>
      </div>
    </div>
  );
};

export default CountrySelector;
