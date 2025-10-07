import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Icon from "@/components/ui/icon";

const Index = () => {
  const [selectedCountry, setSelectedCountry] = useState<string>("Недралическая Империя");
  const [isOpen, setIsOpen] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  
  const countries = [
    { id: 1, name: "Недралическая Империя", available: true },
    { id: 2, name: "Блэрний", available: true },
    { id: 3, name: "Герцеговинск", available: true },
    { id: 4, name: "Галактическая Империя", available: true },
    { id: 5, name: "Кхмерэн", available: false, availableFrom: "1 января 2026" },
    { id: 6, name: "Другие страны ОСИ", available: false, availableFrom: null },
  ];

  const blockedCountries = ["абзерстан", "Абзерстан", "АБЗЕРСТАН"];

  const filteredCountries = useMemo(() => {
    if (!searchQuery) return countries;
    return countries.filter(country => 
      country.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const isBlocked = useMemo(() => {
    return blockedCountries.some(blocked => 
      searchQuery.toLowerCase() === blocked.toLowerCase()
    );
  }, [searchQuery]);

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
                <div className="p-3 border-b border-primary/20">
                  <div className="relative">
                    <Icon 
                      name="Search" 
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" 
                      size={18} 
                    />
                    <Input
                      type="text"
                      placeholder="Поиск страны..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 bg-secondary/50 border-primary/30 text-white placeholder:text-gray-500 focus:border-primary"
                    />
                  </div>
                </div>

                <div className="max-h-64 overflow-y-auto">
                  {filteredCountries.length > 0 ? (
                    filteredCountries.map((country, index) => (
                      <button
                        key={country.id}
                        onClick={() => {
                          if (country.available) {
                            setSelectedCountry(country.name);
                            setIsOpen(false);
                            setSearchQuery("");
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
                          {!country.available && country.availableFrom && (
                            <span className="text-xs bg-accent px-2 py-1 rounded-full text-white">
                              С {country.availableFrom}
                            </span>
                          )}
                          {!country.available && !country.availableFrom && (
                            <span className="text-xs bg-muted px-2 py-1 rounded-full text-gray-400">
                              Недоступно
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
                    ))
                  ) : (
                    <div className="p-6 text-center text-gray-400">
                      Страны не найдены
                    </div>
                  )}
                </div>

                {isBlocked && (
                  <div className="p-4 bg-destructive/20 border-t-2 border-destructive/50 animate-fade-in">
                    <div className="flex items-start gap-2">
                      <Icon name="AlertCircle" className="text-destructive mt-0.5" size={20} />
                      <div>
                        <p className="text-destructive font-semibold text-sm">
                          Страна заблокирована
                        </p>
                        <p className="text-destructive/80 text-xs mt-1">
                          Эта страна заблокирована на территории Империи
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          <Button
            onClick={handleConfirm}
            disabled={confirmed}
            className={`
              w-full py-6 text-lg font-semibold transition-all duration-300
              bg-gradient-to-r from-[#2d1b69] via-[#4a2c85] to-[#1a1035]
              hover:shadow-2xl hover:shadow-primary/50 hover:scale-105
              border border-primary/30
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
