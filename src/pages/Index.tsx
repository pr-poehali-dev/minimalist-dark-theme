import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Icon from "@/components/ui/icon";

const Index = () => {
  const [selectedCountry, setSelectedCountry] = useState<string>("Недралическая Империя");
  const [selectedZone, setSelectedZone] = useState<string>("ОСЬ");
  const [isCountryOpen, setIsCountryOpen] = useState(false);
  const [isZoneOpen, setIsZoneOpen] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  
  const countries = [
    { id: 1, name: "Недралическая Империя", available: true, zone: "ОСЬ" },
    { id: 2, name: "Блэрний", available: true, zone: "НЗВ" },
    { id: 3, name: "Герцеговинск", available: true, zone: "НЗВ" },
    { id: 4, name: "Галактическая Империя", available: true, zone: "ОСЬ" },
    { id: 5, name: "Кхмерэн", available: false, availableFrom: "1 января 2026", zone: "ОСЬ" },
    { id: 6, name: "Другие страны ОСИ", available: false, availableFrom: null, isComingSoon: true, zone: "ОСЬ" },
    { id: 7, name: "Абзерстан", available: false, blocked: true, zone: null },
  ];

  const zones = [
    { 
      id: 1, 
      name: "ОСЬ", 
      countries: ["Недралическая Империя", "Галактическая Империя", "Кхмерэн (с 1 января 2026)"] 
    },
    { 
      id: 2, 
      name: "НЗВ", 
      countries: ["Герцеговинск", "Блэрний"] 
    },
  ];

  const filteredCountries = useMemo(() => {
    if (!searchQuery) return countries;
    return countries.filter(country => 
      country.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const handleConfirm = () => {
    setConfirmed(true);
    setTimeout(() => {
      alert(`Добро пожаловать в ${selectedCountry}! Зона: ${selectedZone}`);
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

        <div className="space-y-6">
          {/* ВЫБОР СТРАНЫ */}
          <div>
            <label className="text-gray-400 text-sm font-medium mb-2 block">
              ВЫБОР СТРАНЫ
            </label>
            <div className="relative">
              <button
                onClick={() => setIsCountryOpen(!isCountryOpen)}
                className="w-full bg-gradient-to-br from-card/80 to-secondary/40 backdrop-blur-sm border-2 border-primary/50 rounded-xl p-4 text-left transition-all duration-300 hover:border-primary hover:shadow-lg hover:shadow-primary/20"
              >
                <div className="flex items-center justify-between">
                  <span className="text-white text-lg font-medium">{selectedCountry}</span>
                  <Icon 
                    name={isCountryOpen ? "ChevronUp" : "ChevronDown"} 
                    className="text-primary transition-transform duration-300" 
                    size={24} 
                  />
                </div>
              </button>

              {isCountryOpen && (
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
                            if (country.zone) {
                              setSelectedZone(country.zone);
                            }
                            setIsCountryOpen(false);
                            setSearchQuery("");
                          }
                        }}
                        disabled={!country.available}
                        className={`
                          w-full p-4 text-left transition-all duration-200 border-b border-primary/10 last:border-b-0 relative
                          ${country.available 
                            ? 'hover:bg-primary/20 cursor-pointer' 
                            : 'cursor-not-allowed'
                          }
                          ${selectedCountry === country.name 
                            ? 'bg-gradient-to-r from-primary/30 to-accent/20' 
                            : ''
                          }
                          ${country.blocked ? 'opacity-70' : 'opacity-50'}
                        `}
                        style={{ animationDelay: `${index * 0.05}s` }}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-white font-medium">{country.name}</span>
                          {country.blocked && (
                            <span className="text-xs bg-destructive px-2 py-1 rounded-full text-white flex items-center gap-1">
                              <Icon name="Ban" size={12} />
                              Заблокирована
                            </span>
                          )}
                          {!country.available && country.availableFrom && !country.blocked && (
                            <span className="text-xs bg-accent px-2 py-1 rounded-full text-white">
                              С {country.availableFrom}
                            </span>
                          )}
                          {!country.available && !country.availableFrom && !country.blocked && country.isComingSoon && (
                            <span className="text-xs bg-primary/60 px-2 py-1 rounded-full text-white">
                              На подходе
                            </span>
                          )}
                          {!country.available && !country.availableFrom && !country.blocked && !country.isComingSoon && (
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
                </div>
              )}
            </div>
          </div>

          {/* ВЫБОР ЗОНЫ */}
          <div>
            <label className="text-gray-400 text-sm font-medium mb-2 block">
              ВЫБОР ЗОНЫ
            </label>
            <div className="relative">
              <button
                onClick={() => setIsZoneOpen(!isZoneOpen)}
                className="w-full bg-gradient-to-br from-[#1a1535] to-[#251a45] backdrop-blur-sm border-2 border-primary/30 rounded-xl p-4 text-left transition-all duration-300 hover:border-primary/50 hover:shadow-md"
              >
                <div className="flex items-center justify-between">
                  <span className="text-gray-300 text-lg font-medium">{selectedZone}</span>
                  <Icon 
                    name={isZoneOpen ? "ChevronUp" : "ChevronDown"} 
                    className="text-primary/70 transition-transform duration-300" 
                    size={24} 
                  />
                </div>
              </button>

              {isZoneOpen && (
                <div className="absolute w-full mt-2 bg-[#1a1535]/95 backdrop-blur-md border-2 border-primary/30 rounded-xl overflow-hidden shadow-2xl z-50 animate-scale-in">
                  {zones.map((zone, index) => (
                    <button
                      key={zone.id}
                      onClick={() => {
                        setSelectedZone(zone.name);
                        setIsZoneOpen(false);
                      }}
                      className={`
                        w-full p-4 text-left transition-all duration-200 border-b border-primary/10 last:border-b-0
                        hover:bg-primary/10 cursor-pointer
                        ${selectedZone === zone.name 
                          ? 'bg-gradient-to-r from-primary/20 to-accent/10' 
                          : ''
                        }
                      `}
                      style={{ animationDelay: `${index * 0.05}s` }}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-white font-semibold text-lg">{zone.name}</span>
                        {selectedZone === zone.name && (
                          <Icon name="Check" className="text-accent" size={20} />
                        )}
                      </div>
                      <div className="text-xs text-gray-400 space-y-1">
                        {zone.countries.map((country, i) => (
                          <div key={i} className="flex items-center gap-1">
                            <Icon name="MapPin" size={12} className="text-primary/60" />
                            <span>{country}</span>
                          </div>
                        ))}
                      </div>
                      {zone.name === "ОСЬ" && (
                        <div className="mt-2 text-xs text-primary/80 italic flex items-center gap-1">
                          <Icon name="Clock" size={12} />
                          Другие страны ОСИ на подходе!
                        </div>
                      )}
                      <div className="mt-2 h-0.5 bg-gradient-to-r from-primary/40 via-blue-500/40 to-accent/40 rounded-full"></div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <Button
            onClick={handleConfirm}
            disabled={confirmed}
            className={`
              w-full py-6 text-lg font-semibold transition-all duration-300
              bg-gradient-to-r from-[#3d1a4d] via-[#c2185b] to-[#1a0d24]
              hover:shadow-2xl hover:shadow-pink-900/50 hover:scale-105
              border border-pink-700/30
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

        <div className="mt-6 text-center text-sm text-gray-400 space-y-1">
          <div>Выбранная страна: <span className="text-accent font-medium">{selectedCountry}</span></div>
          <div>Зона: <span className="text-primary font-medium">{selectedZone}</span></div>
        </div>
      </div>
    </div>
  );
};

export default Index;