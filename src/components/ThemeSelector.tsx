import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/contexts/ThemeContext';
import { useCountry } from '@/contexts/CountryContext';
import { Palette } from 'lucide-react';
import { toast } from 'sonner';

const ThemeSelector = () => {
  const { themeColor, setThemeColor } = useTheme();
  const { isUSA } = useCountry();

  const handleThemeChange = (color: 'pink' | 'blue') => {
    setThemeColor(color);
    const message = isUSA 
      ? `${color === 'pink' ? 'Pink' : 'Blue'} theme activated! 💖`
      : `Tema ${color === 'pink' ? 'Rosa' : 'Azul'} ativado! 💖`;
    toast.success(message);
  };

  return (
    <Card className="p-4 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-primary/20">
      <div className="flex items-center gap-2 mb-3">
        <Palette className="w-5 h-5 text-primary" />
        <h3 className="font-bold text-sm">
          {isUSA ? 'Choose Theme' : 'Escolha o Tema'}
        </h3>
      </div>
      
      <div className="grid grid-cols-2 gap-2">
        <Button
          onClick={() => handleThemeChange('pink')}
          variant={themeColor === 'pink' ? 'default' : 'outline'}
          className={`${
            themeColor === 'pink' 
              ? 'bg-gradient-to-r from-pink-600 to-pink-500 hover:from-pink-700 hover:to-pink-600' 
              : 'border-pink-300 hover:bg-pink-50 hover:text-pink-600'
          }`}
          size="sm"
        >
          <span className="text-lg mr-2">💗</span>
          {isUSA ? 'Pink' : 'Rosa'}
        </Button>
        
        <Button
          onClick={() => handleThemeChange('blue')}
          variant={themeColor === 'blue' ? 'default' : 'outline'}
          className={`${
            themeColor === 'blue' 
              ? 'bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600' 
              : 'border-blue-300 hover:bg-blue-50 hover:text-blue-600'
          }`}
          size="sm"
        >
          <span className="text-lg mr-2">💙</span>
          {isUSA ? 'Blue' : 'Azul'}
        </Button>
      </div>
    </Card>
  );
};

export default ThemeSelector;
