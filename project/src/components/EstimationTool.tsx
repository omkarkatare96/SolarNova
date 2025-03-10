import React, { useState, useEffect } from 'react';
import { Calculator, Sun, Battery, IndianRupee, Download } from 'lucide-react';
import { Bar } from 'react-chartjs-2';
import jsPDF from 'jspdf';

interface PanelOption {
  wattage: number;
  size: number; // size in sqft
  efficiency: number;
}

const panelOptions: PanelOption[] = [
  { wattage: 300, size: 17.8, efficiency: 0.15 },
  { wattage: 400, size: 21.3, efficiency: 0.18 },
  { wattage: 550, size: 27.5, efficiency: 0.21 }
];

export default function EstimationTool() {
  const [inputs, setInputs] = useState({
    terraceArea: 500,
    selectedPanelWattage: 400,
    costPerKw: 50000,
    sunlightHours: 5,
    includeSubsidy: true
  });

  const [calculations, setCalculations] = useState({
    numberOfPanels: 0,
    systemCapacity: 0,
    totalCost: 0,
    monthlyGeneration: 0,
    monthlySavings: 0,
    subsidyAmount: 0,
    finalCost: 0,
    paybackPeriod: 0
  });

  const calculateEstimates = () => {
    const selectedPanel = panelOptions.find(p => p.wattage === inputs.selectedPanelWattage)!;
    const numberOfPanels = Math.floor(inputs.terraceArea / selectedPanel.size);
    const systemCapacity = (numberOfPanels * selectedPanel.wattage) / 1000;
    const totalCost = systemCapacity * inputs.costPerKw;
    
    // Calculate subsidy (40% for systems up to 3kW, 20% for 3-10kW)
    let subsidyAmount = 0;
    if (inputs.includeSubsidy) {
      if (systemCapacity <= 3) {
        subsidyAmount = totalCost * 0.4;
      } else if (systemCapacity <= 10) {
        subsidyAmount = (3 * inputs.costPerKw * 0.4) + ((systemCapacity - 3) * inputs.costPerKw * 0.2);
      } else {
        subsidyAmount = (3 * inputs.costPerKw * 0.4) + (7 * inputs.costPerKw * 0.2);
      }
    }

    const finalCost = totalCost - subsidyAmount;
    const monthlyGeneration = systemCapacity * inputs.sunlightHours * 30;
    const monthlySavings = monthlyGeneration * 8; // Assuming ₹8 per unit
    const paybackPeriod = finalCost / (monthlySavings * 12);

    setCalculations({
      numberOfPanels,
      systemCapacity,
      totalCost,
      monthlyGeneration,
      monthlySavings,
      subsidyAmount,
      finalCost,
      paybackPeriod
    });
  };

  useEffect(() => {
    calculateEstimates();
  }, [inputs]);

  const chartData = {
    labels: ['Initial Investment', 'Annual Savings', '5 Year Savings', '10 Year Savings'],
    datasets: [
      {
        label: 'Amount (₹)',
        data: [
          calculations.finalCost,
          calculations.monthlySavings * 12,
          calculations.monthlySavings * 12 * 5,
          calculations.monthlySavings * 12 * 10
        ],
        backgroundColor: [
          'rgba(239, 68, 68, 0.5)',
          'rgba(34, 197, 94, 0.5)',
          'rgba(34, 197, 94, 0.5)',
          'rgba(34, 197, 94, 0.5)'
        ],
        borderColor: [
          'rgb(239, 68, 68)',
          'rgb(34, 197, 94)',
          'rgb(34, 197, 94)',
          'rgb(34, 197, 94)'
        ],
        borderWidth: 1
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false
      },
      title: {
        display: true,
        text: 'Cost vs Savings Analysis'
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value: number) => `₹${(value/1000).toFixed(0)}K`
        }
      }
    }
  };

  const generatePDF = () => {
    const pdf = new jsPDF();
    
    // Title
    pdf.setFontSize(20);
    pdf.setTextColor(234, 179, 8);
    pdf.text('Solar Installation Estimate', 105, 20, { align: 'center' });
    
    // Input Parameters
    pdf.setFontSize(12);
    pdf.setTextColor(0);
    pdf.text('Input Parameters:', 20, 40);
    pdf.text(`Terrace Area: ${inputs.terraceArea} sq.ft.`, 30, 50);
    pdf.text(`Panel Wattage: ${inputs.selectedPanelWattage}W`, 30, 60);
    pdf.text(`Sunlight Hours: ${inputs.sunlightHours} hours/day`, 30, 70);
    pdf.text(`Cost per kW: ₹${inputs.costPerKw.toLocaleString()}`, 30, 80);
    
    // System Specifications
    pdf.text('System Specifications:', 20, 100);
    pdf.text(`Number of Panels: ${calculations.numberOfPanels}`, 30, 110);
    pdf.text(`System Capacity: ${calculations.systemCapacity.toFixed(2)} kW`, 30, 120);
    pdf.text(`Monthly Generation: ${calculations.monthlyGeneration.toFixed(0)} kWh`, 30, 130);
    
    // Financial Analysis
    pdf.text('Financial Analysis:', 20, 150);
    pdf.text(`Total Cost: ₹${calculations.totalCost.toLocaleString()}`, 30, 160);
    pdf.text(`Subsidy Amount: ₹${calculations.subsidyAmount.toLocaleString()}`, 30, 170);
    pdf.text(`Final Cost: ₹${calculations.finalCost.toLocaleString()}`, 30, 180);
    pdf.text(`Monthly Savings: ₹${calculations.monthlySavings.toLocaleString()}`, 30, 190);
    pdf.text(`Payback Period: ${calculations.paybackPeriod.toFixed(1)} years`, 30, 200);
    
    // Footer
    pdf.setFontSize(10);
    pdf.text('Note: This is an estimate. Actual values may vary based on local conditions.', 105, 270, { align: 'center' });
    
    pdf.save('solar-estimation-report.pdf');
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Solar Panel Cost Estimator</h2>
        
        <div className="grid md:grid-cols-2 gap-12">
          {/* Input Section */}
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Terrace Area (sq. ft.)
              </label>
              <input
                type="number"
                value={inputs.terraceArea}
                onChange={(e) => setInputs({ ...inputs, terraceArea: Number(e.target.value) })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Panel Wattage
              </label>
              <select
                value={inputs.selectedPanelWattage}
                onChange={(e) => setInputs({ ...inputs, selectedPanelWattage: Number(e.target.value) })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
              >
                {panelOptions.map(option => (
                  <option key={option.wattage} value={option.wattage}>
                    {option.wattage}W ({option.size} sq.ft.)
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Cost per kW (₹)
              </label>
              <input
                type="number"
                value={inputs.costPerKw}
                onChange={(e) => setInputs({ ...inputs, costPerKw: Number(e.target.value) })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Average Sunlight Hours per Day
              </label>
              <input
                type="number"
                value={inputs.sunlightHours}
                onChange={(e) => setInputs({ ...inputs, sunlightHours: Number(e.target.value) })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
            </div>
            
            <div className="flex items-center">
              <input
                type="checkbox"
                id="subsidy"
                checked={inputs.includeSubsidy}
                onChange={(e) => setInputs({ ...inputs, includeSubsidy: e.target.checked })}
                className="h-4 w-4 text-yellow-500 focus:ring-yellow-500 border-gray-300 rounded"
              />
              <label htmlFor="subsidy" className="ml-2 block text-sm text-gray-700">
                Include Government Subsidy
              </label>
            </div>
          </div>
          
          {/* Results Section */}
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <ResultCard
                icon={<Sun className="h-6 w-6 text-yellow-500" />}
                label="System Size"
                value={`${calculations.systemCapacity.toFixed(1)} kW`}
              />
              <ResultCard
                icon={<Battery className="h-6 w-6 text-green-500" />}
                label="Number of Panels"
                value={calculations.numberOfPanels.toString()}
              />
              <ResultCard
                icon={<Calculator className="h-6 w-6 text-blue-500" />}
                label="Monthly Generation"
                value={`${calculations.monthlyGeneration.toFixed(0)} kWh`}
              />
              <ResultCard
                icon={<IndianRupee className="h-6 w-6 text-purple-500" />}
                label="Monthly Savings"
                value={`₹${calculations.monthlySavings.toLocaleString()}`}
              />
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <Bar data={chartData} options={chartOptions} />
            </div>
          </div>
        </div>
        
        {/* Financial Summary */}
        <div className="mt-12 bg-gray-50 p-8 rounded-lg">
          <h3 className="text-xl font-semibold mb-6">Financial Summary</h3>
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <p className="text-sm text-gray-600">Total Cost</p>
              <p className="text-2xl font-bold">₹{(calculations.totalCost/100000).toFixed(1)}L</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Subsidy Amount</p>
              <p className="text-2xl font-bold text-green-600">₹{(calculations.subsidyAmount/100000).toFixed(1)}L</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Final Cost</p>
              <p className="text-2xl font-bold text-yellow-600">₹{(calculations.finalCost/100000).toFixed(1)}L</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Payback Period</p>
              <p className="text-2xl font-bold text-blue-600">{calculations.paybackPeriod.toFixed(1)} years</p>
            </div>
          </div>
          
          <button 
            onClick={generatePDF}
            className="mt-8 bg-yellow-500 text-white px-8 py-3 rounded-lg hover:bg-yellow-600 transition-colors flex items-center mx-auto"
          >
            <Download className="h-5 w-5 mr-2" />
            Download Detailed Report
          </button>
        </div>
      </div>
    </section>
  );
}

function ResultCard({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm">
      <div className="flex items-center space-x-3 mb-2">
        {icon}
        <span className="text-sm text-gray-600">{label}</span>
      </div>
      <p className="text-xl font-semibold">{value}</p>
    </div>
  );
}