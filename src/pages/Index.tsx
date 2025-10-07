import { useState } from "react";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

const Index = () => {
  const [selectedCountry, setSelectedCountry] = useState<string>("Недралическая Империя");
  const [isOpen, setIsOpen] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  
  const countries = [
    { id: 1, name: "Недралическая Империя", available: true },
    { id: 2, name: "Блэрний", available: true },
    { id: 3, name: "Герцеговинск", available: true },
    { id: 4, name: "Галактическая Империя", available: true },
    { id: 5, name: "Кхмерэн", available: false, availableFrom: "1 января 2026" },
  ];

  const handleConfirm = () => {
    setConfirmed(true);
    setTimeout(() => {
      alert(`Добро пожаловать в ${selectedCountry}!`);
    }, 300);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f3460] via-[#16213e] to-[#0f1419] flex items-center justify-center p-4">
      <div className="w-full max-w-md animate-fade-in">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 tracking-wider">
            DEEPTUBE
          </h1>
          <p className="text-lg text-gray-300 font-light">
            Select Your Region
          </p>
        </div>

        <div className="space-y-4">
          <div className="relative">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="w-full bg-gradient-to-br from-card/80 to-secondary/40 backdrop-blur-sm border-2 border-primary/50 rounded-xl p-4 text-left transition-all duration-300 hover:border-primary hover:shadow-lg hover:shadow-primary/20"
            >
              <div className="flex items-center justify-between">
                <span className="text-white text-lg font-medium">{selectedCountry}</span>
                <Icon 
                  name={isOpen ? "ChevronUp" : "ChevronDown"} 
                  className="text-primary transition-transform duration-300" 
                  size={24} 
                />
              </div>
            </button>

            {isOpen && (
              <div className="absolute w-full mt-2 bg-card/95 backdrop-blur-md border-2 border-primary/30 rounded-xl overflow-hidden shadow-2xl z-50 animate-scale-in">
                {countries.map((country, index) => (
                  <button
                    key={country.id}
                    onClick={() => {
                      if (country.available) {
                        setSelectedCountry(country.name);
                        setIsOpen(false);
                      }
                    }}
                    disabled={!country.available}
                    className={`
                      w-full p-4 text-left transition-all duration-200 border-b border-primary/10 last:border-b-0 relative
                      ${country.available 
                        ? 'hover:bg-primary/20 cursor-pointer' 
                        : 'opacity-50 cursor-not-allowed'
                      }
                      ${selectedCountry === country.name 
                        ? 'bg-gradient-to-r from-primary/30 to-accent/20' 
                        : ''
                      }
                    `}
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-white font-medium">{country.name}</span>
                      {!country.available && (
                        <span className="text-xs bg-accent px-2 py-1 rounded-full text-white">
                          С {country.availableFrom}
                        </span>
                      )}
                      {selectedCountry === country.name && country.available && (
                        <Icon name="Check" className="text-accent" size={20} />
                      )}
                    </div>
                    {country.available && (
                      <div className="mt-2 h-0.5 bg-gradient-to-r from-primary via-blue-500 to-accent rounded-full"></div>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          <Button
            onClick={handleConfirm}
            disabled={confirmed}
            className={`
              w-full py-6 text-lg font-semibold transition-all duration-300
              bg-gradient-to-r from-primary via-blue-600 to-accent
              hover:shadow-2xl hover:shadow-accent/50 hover:scale-105
              ${confirmed ? 'opacity-50 cursor-not-allowed' : ''}
            `}
          >
            {confirmed ? (
              <span className="flex items-center justify-center gap-2">
                <Icon name="Check" size={24} />
                Подтверждено
              </span>
            ) : (
              'Подтвердить выбор'
            )}
          </Button>
        </div>

        <div className="mt-6 text-center text-sm text-gray-400">
          Выбранная страна: <span className="text-accent font-medium">{selectedCountry}</span>
        </div>
      </div>
    </div>
  );
};

export default Index;
