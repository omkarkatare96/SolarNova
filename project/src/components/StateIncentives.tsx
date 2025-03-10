import React, { useState } from 'react';
import { Search, ExternalLink, AlertCircle } from 'lucide-react';

const stateIncentives = {
  "Maharashtra": {
    subsidy: "40% for up to 3kW, 20% for 3-10kW",
    authority: "Maharashtra Energy Development Agency (MEDA)",
    website: "https://www.mahaurja.com",
    contact: "020-26614393",
    details: [
      "Net metering facility available",
      "Additional incentives for government buildings",
      "Fast-track approval process"
    ]
  },
  "Gujarat": {
    subsidy: "40% up to 3kW, 20% for 3-10kW",
    authority: "Gujarat Energy Development Agency (GEDA)",
    website: "https://geda.gujarat.gov.in",
    contact: "079-23257251",
    details: [
      "Special incentives for agricultural connections",
      "Relaxed regulations for industrial installations",
      "Additional benefits for residential users"
    ]
  },
  "Karnataka": {
    subsidy: "20% additional subsidy on MNRE rates",
    authority: "Karnataka Renewable Energy Development Ltd.",
    website: "https://kredl.karnataka.gov.in",
    contact: "080-22208109",
    details: [
      "Net metering for systems up to 500kW",
      "Banking facility available",
      "Special provisions for LT consumers"
    ]
  },
  "Tamil Nadu": {
    subsidy: "40% subsidy for domestic consumers",
    authority: "Tamil Nadu Energy Development Agency",
    website: "https://teda.in",
    contact: "044-24339608",
    details: [
      "Generation based incentives",
      "Net feed-in tariff mechanism",
      "Accelerated depreciation benefits"
    ]
  },
  "Rajasthan": {
    subsidy: "30% capital subsidy",
    authority: "Rajasthan Renewable Energy Corporation",
    website: "https://energy.rajasthan.gov.in",
    contact: "0141-2225859",
    details: [
      "Special desert policy benefits",
      "Land acquisition support",
      "Wheeling charges exemption"
    ]
  },
  "Kerala": {
    subsidy: "Up to 40% for residential",
    authority: "Agency for New and Renewable Energy Research and Technology",
    website: "https://anert.gov.in",
    contact: "0471-2338077",
    details: [
      "Interest subsidy on loans",
      "Additional local body incentives",
      "Smart grid integration support"
    ]
  },
  "Telangana": {
    subsidy: "30% capital subsidy for residential",
    authority: "Telangana State Renewable Energy Development Corporation",
    website: "https://tsredco.telangana.gov.in",
    contact: "040-23201502",
    details: [
      "Net metering for all consumer categories",
      "Industrial policy benefits",
      "Easy approval process"
    ]
  },
  "Madhya Pradesh": {
    subsidy: "Up to 40% for domestic installations",
    authority: "MP Urja Vikas Nigam",
    website: "https://www.mprenewable.nic.in",
    contact: "0755-2553595",
    details: [
      "Residential rooftop program",
      "Industrial park incentives",
      "Rural electrification benefits"
    ]
  }
};

export default function StateIncentives() {
  const [selectedState, setSelectedState] = useState("Maharashtra");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredStates = Object.keys(stateIncentives).filter(state =>
    state.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">State-wise Solar Incentives</h2>
        
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <div className="relative">
              <input
                type="text"
                placeholder="Search state..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            <div className="md:col-span-1 space-y-2">
              {filteredStates.map(state => (
                <button
                  key={state}
                  onClick={() => setSelectedState(state)}
                  className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                    selectedState === state
                      ? 'bg-yellow-500 text-white'
                      : 'hover:bg-gray-100'
                  }`}
                >
                  {state}
                </button>
              ))}
            </div>

            <div className="md:col-span-3">
              {selectedState && (
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="text-xl font-semibold mb-4">{selectedState} Solar Incentives</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <p className="font-medium text-gray-700">Subsidy</p>
                      <p className="text-gray-600">{stateIncentives[selectedState].subsidy}</p>
                    </div>
                    
                    <div>
                      <p className="font-medium text-gray-700">Implementing Authority</p>
                      <p className="text-gray-600">{stateIncentives[selectedState].authority}</p>
                    </div>
                    
                    <div>
                      <p className="font-medium text-gray-700">Key Benefits</p>
                      <ul className="list-disc list-inside text-gray-600 space-y-1">
                        {stateIncentives[selectedState].details.map((detail, index) => (
                          <li key={index}>{detail}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="flex justify-between items-center pt-4 border-t">
                      <div>
                        <p className="font-medium text-gray-700">Contact</p>
                        <p className="text-gray-600">{stateIncentives[selectedState].contact}</p>
                      </div>
                      
                      <a
                        href={stateIncentives[selectedState].website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-yellow-500 hover:text-yellow-600"
                      >
                        Visit Website
                        <ExternalLink className="h-4 w-4 ml-2" />
                      </a>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}