import React, { useState } from 'react';
import { Calculator, Sun, Leaf, IndianRupee, Download } from 'lucide-react';
import jsPDF from 'jspdf';

interface CalculatorInputs {
  monthlyBill: number;
  roofSize: number;
  location: string;
}

export default function SolarCalculator() {
  const [inputs, setInputs] = useState<CalculatorInputs>({
    monthlyBill: 5000,
    roofSize: 600,
    location: 'Solapur'
  });

  const calculateSavings = () => {
    const annualConsumption = inputs.monthlyBill * 12;
    const systemSize = (inputs.roofSize / 100) * 1.5;
    const panelCount = Math.ceil(systemSize * 1000 / 400); // Assuming 400W panels
    const inverterSize = Math.ceil(systemSize * 1.2); // 20% larger than system size
    const annualGeneration = systemSize * 1600;
    const systemCost = systemSize * 60000;
    const subsidy = systemCost * 0.4;
    const netCost = systemCost - subsidy;
    const annualSavings = (annualGeneration * 8);
    const paybackPeriod = netCost / annualSavings;
    const co2Reduction = annualGeneration * 0.82;
    const treesEquivalent = Math.round(co2Reduction / 20);

    return {
      systemSize,
      panelCount,
      inverterSize,
      annualGeneration,
      systemCost,
      subsidy,
      netCost,
      annualSavings,
      paybackPeriod,
      co2Reduction,
      treesEquivalent
    };
  };

  const results = calculateSavings();

  const generatePDF = () => {
    const pdf = new jsPDF();
    
    // Set font to Arial
    pdf.setFont("helvetica");
    
    // Add logo and title
    pdf.setFontSize(24);
    pdf.setTextColor(234, 179, 8);
    pdf.text('SolarNova', 105, 20, { align: 'center' });
    
    // Add decorative border
    pdf.setDrawColor(234, 179, 8);
    pdf.setLineWidth(0.5);
    pdf.rect(10, 10, 190, 277);
    
    // Add subtitle and date
    pdf.setFontSize(16);
    pdf.setTextColor(0, 0, 0);
    pdf.text('Solar System Estimation Report', 105, 35, { align: 'center' });
    pdf.setFontSize(10);
    pdf.text(`Generated on: ${new Date().toLocaleDateString()}`, 20, 45);
    
    // Customer Information Section
    pdf.setFontSize(16);
    pdf.setTextColor(234, 179, 8);
    pdf.text('Customer Information', 20, 60);
    pdf.setLineWidth(0.2);
    pdf.line(20, 62, 190, 62);
    
    pdf.setFontSize(12);
    pdf.setTextColor(0, 0, 0);
    const customerInfo = [
      `Location: ${inputs.location}`,
      `Monthly Electricity Bill: ₹${inputs.monthlyBill}`,
      `Available Roof Area: ${inputs.roofSize} sq. ft.`
    ];
    let y = 70;
    customerInfo.forEach(info => {
      pdf.text(info, 25, y);
      y += 8;
    });
    
    // System Specifications Section
    y += 10;
    pdf.setFontSize(16);
    pdf.setTextColor(234, 179, 8);
    pdf.text('Recommended System', 20, y);
    pdf.line(20, y + 2, 190, y + 2);
    
    pdf.setFontSize(12);
    pdf.setTextColor(0, 0, 0);
    const specifications = [
      `System Capacity: ${results.systemSize.toFixed(1)} kW`,
      `Number of Panels: ${results.panelCount} (400W each)`,
      `Inverter Size: ${results.inverterSize} kW`,
      `Estimated Annual Generation: ${results.annualGeneration.toFixed(0)} kWh`
    ];
    y += 10;
    specifications.forEach(spec => {
      pdf.text(spec, 25, y);
      y += 8;
    });
    
    // Financial Analysis Section
    y += 10;
    pdf.setFontSize(16);
    pdf.setTextColor(234, 179, 8);
    pdf.text('Financial Analysis', 20, y);
    pdf.line(20, y + 2, 190, y + 2);
    
    pdf.setFontSize(12);
    pdf.setTextColor(0, 0, 0);
    const financials = [
      `Total System Cost: ₹${(results.systemCost/100000).toFixed(1)}L`,
      `Government Subsidy: ₹${(results.subsidy/100000).toFixed(1)}L`,
      `Net Investment: ₹${(results.netCost/100000).toFixed(1)}L`,
      `Annual Savings: ₹${(results.annualSavings/1000).toFixed(0)}K`,
      `Payback Period: ${results.paybackPeriod.toFixed(1)} years`
    ];
    y += 10;
    financials.forEach(financial => {
      pdf.text(financial, 25, y);
      y += 8;
    });
    
    // Environmental Impact Section
    y += 10;
    pdf.setFontSize(16);
    pdf.setTextColor(234, 179, 8);
    pdf.text('Environmental Impact', 20, y);
    pdf.line(20, y + 2, 190, y + 2);
    
    pdf.setFontSize(12);
    pdf.setTextColor(0, 0, 0);
    y += 10;
    pdf.text(`CO₂ Reduction: ${results.co2Reduction.toFixed(0)} kg/year`, 25, y);
    y += 8;
    pdf.text(`Equivalent to ${results.treesEquivalent} trees planted`, 25, y);
    
    // Footer
    pdf.setFontSize(10);
    pdf.text('This is a preliminary estimate. Actual results may vary based on local conditions and final installation.', 105, 270, { align: 'center' });
    
    // Save the PDF
    pdf.save('SolarNova-Estimation-Report.pdf');
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Solar Savings Calculator</h2>
        
        <div className="grid md:grid-cols-2 gap-12">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Monthly Electricity Bill (₹)
              </label>
              <input
                type="number"
                value={inputs.monthlyBill}
                onChange={(e) => setInputs({ ...inputs, monthlyBill: Number(e.target.value) })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Roof Size (sq. ft.)
              </label>
              <input
                type="number"
                value={inputs.roofSize}
                onChange={(e) => setInputs({ ...inputs, roofSize: Number(e.target.value) })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Location
              </label>
              <input
                type="text"
                value={inputs.location}
                onChange={(e) => setInputs({ ...inputs, location: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <ResultCard
              icon={<Sun className="h-6 w-6 text-yellow-500" />}
              label="System Size"
              value={`${results.systemSize.toFixed(1)} kW`}
            />
            <ResultCard
              icon={<Calculator className="h-6 w-6 text-blue-500" />}
              label="Annual Generation"
              value={`${results.annualGeneration.toFixed(0)} kWh`}
            />
            <ResultCard
              icon={<IndianRupee className="h-6 w-6 text-green-500" />}
              label="Annual Savings"
              value={`₹${(results.annualSavings/1000).toFixed(1)}K`}
            />
            <ResultCard
              icon={<Leaf className="h-6 w-6 text-green-600" />}
              label="CO2 Reduction"
              value={`${results.co2Reduction.toFixed(0)} kg`}
            />
          </div>
        </div>
        
        <div className="mt-12 bg-white p-8 rounded-lg shadow-sm">
          <h3 className="text-xl font-semibold mb-6">Financial Summary</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <p className="text-sm text-gray-600">System Cost</p>
              <p className="text-2xl font-bold">₹{(results.systemCost/100000).toFixed(1)}L</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Government Subsidy</p>
              <p className="text-2xl font-bold text-green-600">₹{(results.subsidy/100000).toFixed(1)}L</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Payback Period</p>
              <p className="text-2xl font-bold text-yellow-600">{results.paybackPeriod.toFixed(1)} years</p>
            </div>
          </div>
          
          <div className="mt-8 flex justify-center space-x-4">
            <button 
              onClick={generatePDF}
              className="bg-yellow-500 text-white px-8 py-3 rounded-lg hover:bg-yellow-600 transition-colors flex items-center"
            >
              <Download className="h-5 w-5 mr-2" />
              Download Detailed Report
            </button>
            <button className="bg-yellow-500 text-white px-8 py-3 rounded-lg hover:bg-yellow-600 transition-colors">
              Get Installation Quote
            </button>
          </div>
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