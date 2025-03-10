import React from 'react';
import { Check } from 'lucide-react';

const panels = [
  {
    brand: 'Tata Power Solar',
    model: 'TP400H',
    power: '400W',
    efficiency: '19.8%',
    warranty: '25 years',
    price: '₹16,000',
    email: 'sales@tatapowersolar.com',
    features: [
      'Mono PERC Technology',
      'Anti-PID Performance',
      'Salt Mist Corrosion Resistant',
      'Made in India'
    ]
  },
  {
    brand: 'Havells',
    model: 'HSP380',
    power: '380W',
    efficiency: '19.2%',
    warranty: '25 years',
    price: '₹15,200',
    email: 'solar@havells.com',
    features: [
      'Half-cut Cell Technology',
      'Low Light Performance',
      'Heavy Wind Resistance',
      'Anti-reflective Coating'
    ]
  },
  {
    brand: 'Exide',
    model: 'Exide Solar 395',
    power: '395W',
    efficiency: '19.5%',
    warranty: '25 years',
    price: '₹15,800',
    email: 'solar@exide.com',
    features: [
      'Multi Busbar Technology',
      'High Temperature Performance',
      'Enhanced Durability',
      'Advanced EVA Encapsulation'
    ]
  },
  {
    brand: 'Waaree',
    model: 'WS410',
    power: '410W',
    efficiency: '20.2%',
    warranty: '25 years',
    price: '₹16,500',
    email: 'info@waaree.com',
    features: [
      'Bifacial Technology',
      'Higher Power Density',
      'Extreme Weather Resistant',
      'Smart Module Integration'
    ]
  },
  {
    brand: 'Adani Solar',
    model: 'AS405M',
    power: '405W',
    efficiency: '20.0%',
    warranty: '25 years',
    price: '₹16,200',
    email: 'solar@adani.com',
    features: [
      'Advanced PERC Technology',
      'Dual Glass Design',
      'Enhanced Shade Tolerance',
      'Made in India'
    ]
  },
  {
    brand: 'Luminous Solar',
    model: 'LS390M',
    power: '390W',
    efficiency: '19.6%',
    warranty: '25 years',
    price: '₹15,600',
    email: 'support@luminoussolar.com',
    features: [
      'High Efficiency Cells',
      'Excellent Low Light Performance',
      'PID Resistant',
      'Made in India'
    ]
  },
  {
    brand: 'Vikram Solar',
    model: 'Eldora Grand 400',
    power: '400W',
    efficiency: '19.9%',
    warranty: '25 years',
    price: '₹16,100',
    email: 'sales@vikramsolar.com',
    features: [
      'Mono PERC Technology',
      'High Power Density',
      'Excellent Reliability',
      'Made in India'
    ]
  }
];

export default function SolarPanels() {
  const handleGetQuote = (panel: typeof panels[0]) => {
    const subject = `Quote Request for ${panel.brand} ${panel.model}`;
    const body = `Hello,

I am interested in getting a quote for the following solar panel:

Brand: ${panel.brand}
Model: ${panel.model}
Power Rating: ${panel.power}
Efficiency: ${panel.efficiency}

Please provide detailed pricing and installation information.

Thank you.`;

    window.location.href = `mailto:${panel.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <section id="panels" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Compare Solar Panels</h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          {panels.map((panel) => (
            <div key={panel.model} className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{panel.brand}</h3>
                <p className="text-gray-500 mb-4">{panel.model}</p>
                
                <div className="space-y-4">
                  <div>
                    <p className="text-3xl font-bold text-yellow-500">{panel.power}</p>
                    <p className="text-sm text-gray-500">Rated Power</p>
                  </div>
                  
                  <div className="space-y-2">
                    <Spec label="Efficiency" value={panel.efficiency} />
                    <Spec label="Warranty" value={panel.warranty} />
                    <Spec label="Price" value={panel.price} />
                  </div>
                  
                  <div className="pt-4">
                    <p className="font-semibold mb-2">Key Features:</p>
                    <ul className="space-y-2">
                      {panel.features.map((feature) => (
                        <li key={feature} className="flex items-center">
                          <Check className="h-4 w-4 text-green-500 mr-2" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="p-4 bg-gray-50 border-t">
                <button 
                  onClick={() => handleGetQuote(panel)}
                  className="w-full bg-yellow-500 text-white py-2 rounded-lg hover:bg-yellow-600 transition-colors"
                >
                  Get Quote
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Spec({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between">
      <span className="text-gray-600">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}