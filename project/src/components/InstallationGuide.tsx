import React from 'react';
import { Download, FileText, Book } from 'lucide-react';
import jsPDF from 'jspdf';

export default function InstallationGuide() {
  const generateInstallationGuide = () => {
    const pdf = new jsPDF();
    
    // Title
    pdf.setFontSize(24);
    pdf.setTextColor(234, 179, 8);
    pdf.text('Solar Installation Guide 2025', 105, 20, { align: 'center' });
    
    // Introduction
    pdf.setFontSize(14);
    pdf.setTextColor(0);
    pdf.text('Installation Process', 20, 40);
    pdf.setFontSize(12);
    pdf.text([
      '1. Site Assessment and Planning',
      '   • Roof inspection and structural analysis',
      '   • Solar potential evaluation',
      '   • System design and layout planning',
      '',
      '2. Permits and Documentation',
      '   • Local authority approvals',
      '   • Utility company permissions',
      '   • Net metering application',
      '',
      '3. Installation Steps',
      '   • Mounting structure installation',
      '   • Panel placement and wiring',
      '   • Inverter and battery setup',
      '   • System testing and commissioning'
    ], 20, 50);

    // Cost Estimation
    pdf.text('Cost Estimation Formulas', 20, 120);
    pdf.text([
      'System Size (kW) = Roof Area (sq.ft.) × 0.015',
      'Total Cost = System Size × Cost per kW',
      'Net Cost = Total Cost - Applicable Subsidy',
      '',
      'Example:',
      'For 500 sq.ft. roof area:',
      '• System Size = 500 × 0.015 = 7.5 kW',
      '• Total Cost = 7.5 × ₹50,000 = ₹3,75,000',
      '• Subsidy (40% up to 3kW, 20% for next 7kW)',
      '• Net Cost = ₹2,62,500'
    ], 20, 130);

    // Government Subsidy
    pdf.text('Government Subsidy Details (2025)', 20, 180);
    pdf.text([
      '• 40% subsidy for systems up to 3kW',
      '• 20% subsidy for systems between 3-10kW',
      '• Additional state-specific incentives',
      '• Net metering benefits',
      '• Tax benefits under Section 80EE'
    ], 20, 190);

    // Top Solar Companies
    pdf.text('Top Solar Companies Comparison', 20, 220);
    pdf.text([
      '1. Tata Power Solar',
      '   • Cost: ₹45,000-52,000/kW',
      '   • Warranty: 25 years',
      '',
      '2. Adani Solar',
      '   • Cost: ₹47,000-53,000/kW',
      '   • Warranty: 25 years',
      '',
      '3. Waaree Energies',
      '   • Cost: ₹44,000-50,000/kW',
      '   • Warranty: 25 years',
      '',
      '4. Luminous',
      '   • Cost: ₹46,000-51,000/kW',
      '   • Warranty: 25 years',
      '',
      '5. Havells',
      '   • Cost: ₹48,000-54,000/kW',
      '   • Warranty: 25 years'
    ], 20, 230);

    pdf.save('solar-installation-guide-2025.pdf');
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Solar Installation Guide</h2>
            <p className="text-lg text-gray-600">
              Transform your home with solar energy. Our comprehensive guide helps you understand the installation process,
              costs, and benefits of switching to solar power. Save up to 40% on electricity bills and contribute to a
              sustainable future.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <FileText className="h-6 w-6 text-yellow-500 mr-2" />
                Installation Manual Preview
              </h3>
              <ul className="space-y-3 text-gray-600">
                <li>• Complete installation process breakdown</li>
                <li>• Safety guidelines and best practices</li>
                <li>• Tools and equipment checklist</li>
                <li>• Maintenance and troubleshooting tips</li>
                <li>• Warranty and support information</li>
              </ul>
              <button
                onClick={generateInstallationGuide}
                className="mt-6 bg-yellow-500 text-white px-6 py-3 rounded-lg hover:bg-yellow-600 transition-colors flex items-center justify-center w-full"
              >
                <Download className="h-5 w-5 mr-2" />
                Download Installation Manual
              </button>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <Book className="h-6 w-6 text-yellow-500 mr-2" />
                Detailed Guide Contents
              </h3>
              <ul className="space-y-3 text-gray-600">
                <li>• Cost estimation formulas and examples</li>
                <li>• Government subsidy details (2025)</li>
                <li>• Top solar companies comparison</li>
                <li>• ROI calculations and benefits</li>
                <li>• Financing options and schemes</li>
              </ul>
              <button
                onClick={generateInstallationGuide}
                className="mt-6 bg-yellow-500 text-white px-6 py-3 rounded-lg hover:bg-yellow-600 transition-colors flex items-center justify-center w-full"
              >
                <Download className="h-5 w-5 mr-2" />
                Download Complete Guide
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}