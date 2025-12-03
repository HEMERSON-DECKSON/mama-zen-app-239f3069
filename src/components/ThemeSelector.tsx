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
    <Card className="p-4 bg-gradient-to-br from-purple-900/50 to-pink-900/50 border-pink-500/20">
      <div className="flex items-center gap-2 mb-3">
        <Palette className="w-5 h-5 text-pink-400" />
        <h3 className="font-bold text-sm text-pink-200">
          {isUSA ? 'Choose Theme' : 'Escolha o Tema'}
        </h3>
      </div>
      
      <div className="grid grid-cols-2 gap-2">
        <Button
          onClick={() => handleThemeChange('pink')}
          variant={themeColor === 'pink' ? 'default' : 'outline'}
          className={`${
            themeColor === 'pink' 
              ? 'bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white shadow-lg shadow-pink-500/30' 
              : 'border-pink-500/30 bg-purple-900/30 text-pink-200 hover:bg-purple-800/50 hover:text-pink-100'
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
              ? 'bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white shadow-lg shadow-indigo-500/30' 
              : 'border-purple-500/30 bg-purple-900/30 text-purple-200 hover:bg-purple-800/50 hover:text-purple-100'
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
