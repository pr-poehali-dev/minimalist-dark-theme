import { useState } from "react";
import { Card } from "@/components/ui/card";

const Index = () => {
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  
  const countries = [
    { id: 1, name: "Недралическая Империя", available: true },
    { id: 2, name: "Блэрний", available: true },
    { id: 3, name: "Герцеговинск", available: true },
    { id: 4, name: "Галактическая Империя", available: true },
    { id: 5, name: "Кхмерэн", available: false, availableFrom: "1 января 2026" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f3460] via-[#16213e] to-[#0f1419] flex items-center justify-center p-4">
      <div className="w-full max-w-4xl animate-fade-in">
        <div className="text-center mb-12">
          <h1 className="text-6xl md:text-7xl font-bold text-white mb-4 tracking-wider">
            DEEPTUBE
          </h1>
          <p className="text-xl text-gray-300 font-light">
            Select Your Region
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto">
          {countries.map((country, index) => (
            <Card
              key={country.id}
              onClick={() => country.available && setSelectedCountry(country.name)}
              className={`
                relative p-8 cursor-pointer transition-all duration-300 
                bg-gradient-to-br from-card/80 to-secondary/40 
                border-2 backdrop-blur-sm
                ${country.available 
                  ? 'hover:scale-105 hover:shadow-2xl border-primary/50 hover:border-primary' 
                  : 'opacity-60 cursor-not-allowed border-muted'
                }
                ${selectedCountry === country.name 
                  ? 'border-accent shadow-lg shadow-accent/50 scale-105' 
                  : ''
                }
                animate-scale-in
              `}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative z-10">
                <h3 className="text-2xl font-semibold text-white mb-2">
                  {country.name}
                </h3>
                
                {!country.available && (
                  <div className="absolute -top-2 -right-2 bg-accent text-white text-xs px-3 py-1 rounded-full font-medium">
                    С {country.availableFrom}
                  </div>
                )}
                
                {country.available && (
                  <div className="mt-4 h-1 bg-gradient-to-r from-primary via-blue-500 to-accent rounded-full"></div>
                )}
                
                {!country.available && (
                  <div className="mt-4 h-1 bg-gradient-to-r from-muted to-muted/50 rounded-full"></div>
                )}
              </div>
              
              {selectedCountry === country.name && (
                <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg animate-glow"></div>
              )}
            </Card>
          ))}
        </div>

        {selectedCountry && (
          <div className="mt-8 text-center animate-fade-in">
            <p className="text-lg text-gray-300">
              Выбрано: <span className="text-accent font-semibold">{selectedCountry}</span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
