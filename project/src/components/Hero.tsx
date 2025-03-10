import React, { useEffect, useState } from 'react';
import { ArrowRight, Sun, Battery, IndianRupee, LogIn } from 'lucide-react';

interface HeroProps {
  onStartPlanning: () => void;
  onLogin: () => void;
}

export default function Hero({ onStartPlanning, onLogin }: HeroProps) {
  const [opacity, setOpacity] = useState(1);
  const backgroundImages = [
    'https://static.contractors-corp.com/media/_versions_jpg/article/Solar_Energy_Contractor_gGbn__v1200x1200__.jpg',
    'https://etimg.etb2bimg.com/photo/105752021.cms',
    'https://etimg.etb2bimg.com/photo/104876574.cms',
    'https://cdn.greenmatch.co.uk/cdn-cgi/image/format=auto/2/2022/10/solar-energy.jpg'
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setOpacity(0);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative min-h-screen">
      {/* Background Slider */}
      <div className="absolute inset-0 bg-black">
        {backgroundImages.map((image, index) => (
          <div
            key={index}
            className="absolute inset-0 bg-cover bg-center animate-fade-in-out"
            style={{
              backgroundImage: `url(${image})`,
              animation: `fadeInOut 15s infinite ${index * 5}s`
            }}
          >
            <div className="absolute inset-0 bg-black bg-opacity-50" />
          </div>
        ))}
      </div>

      <div className="relative">
        <div className="container mx-auto px-4 py-16 md:py-24">
          {/* Hero Title with Animation */}
          <div 
            className="text-center mb-12 transition-opacity duration-2000"
            style={{ opacity }}
          >
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
              SolarNova: The Solar System Planner
            </h1>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="text-white">
              <div className="mb-6">
                <h2 className="text-4xl md:text-5xl font-bold mb-4">
                  Go Solar, Save Energy
                </h2>
                <p className="text-xl text-yellow-400 font-semibold">
                  Power your future with sustainable energy
                </p>
              </div>
              <p className="text-lg mb-8 text-gray-200">
                Transform your home with our smart solar solutions. Reduce your carbon footprint
                and save up to 40% on electricity bills with state-of-the-art solar installations
                in Solapur.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={onStartPlanning}
                  className="bg-yellow-500 text-white px-6 py-3 rounded-lg flex items-center justify-center hover:bg-yellow-600 transition-colors"
                >
                  Start Planning <ArrowRight className="ml-2 h-5 w-5" />
                </button>
                <button 
                  onClick={onLogin}
                  className="border border-white text-white px-6 py-3 rounded-lg flex items-center justify-center hover:bg-white hover:text-gray-900 transition-colors"
                >
                  <LogIn className="mr-2 h-5 w-5" />
                  Log In
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-6">
              <StatCard 
                icon={<Sun className="h-8 w-8 text-yellow-500" />}
                title="Clean Energy"
                description="100% renewable solar power"
              />
              <StatCard 
                icon={<Battery className="h-8 w-8 text-green-500" />}
                title="40% Savings"
                description="On electricity bills"
              />
              <StatCard 
                icon={<IndianRupee className="h-8 w-8 text-blue-500" />}
                title="Government Aid"
                description="40% subsidy available"
              />
              <StatCard 
                icon={<Sun className="h-8 w-8 text-orange-500" />}
                title="25 Years"
                description="Performance warranty"
              />
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeInOut {
          0%, 33% { opacity: 1; }
          45%, 88% { opacity: 0; }
          100% { opacity: 1; }
        }
        .transition-opacity {
          transition: opacity 2s ease-out;
        }
      `}</style>
    </div>
  );
}

function StatCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="bg-white bg-opacity-90 backdrop-blur-sm p-6 rounded-xl shadow-lg hover:transform hover:scale-105 transition-all">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}