import React from 'react';
import { Sun, Battery, Leaf, IndianRupee, Home, Shield } from 'lucide-react';

export default function Benefits() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Why Choose Solar Energy?</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover the advantages of switching to solar power and join thousands of
            satisfied customers in Solapur who are already saving with solar energy.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <BenefitCard
            icon={<IndianRupee className="h-12 w-12 text-yellow-500" />}
            title="Financial Benefits"
            description="Save up to 40% on electricity bills and get government subsidies for installation."
          />
          <BenefitCard
            icon={<Leaf className="h-12 w-12 text-green-500" />}
            title="Environmental Impact"
            description="Reduce your carbon footprint and contribute to a cleaner, greener future."
          />
          <BenefitCard
            icon={<Battery className="h-12 w-12 text-blue-500" />}
            title="Energy Independence"
            description="Generate your own electricity and reduce dependence on the grid."
          />
          <BenefitCard
            icon={<Shield className="h-12 w-12 text-purple-500" />}
            title="25-Year Warranty"
            description="Long-term performance guarantee with professional maintenance support."
          />
          <BenefitCard
            icon={<Home className="h-12 w-12 text-red-500" />}
            title="Property Value"
            description="Increase your property value with modern solar installation."
          />
          <BenefitCard
            icon={<Sun className="h-12 w-12 text-orange-500" />}
            title="Abundant Resource"
            description="Harness Solapur's 300+ sunny days for optimal energy generation."
          />
        </div>

        <div className="mt-16 bg-yellow-50 rounded-lg p-8">
          <h3 className="text-2xl font-bold text-center mb-6">
            Join the Solar Revolution
          </h3>
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div>
              <p className="text-3xl font-bold text-yellow-500 mb-2">5000+</p>
              <p className="text-gray-600">Happy Customers</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-yellow-500 mb-2">15MW+</p>
              <p className="text-gray-600">Power Generated</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-yellow-500 mb-2">₹2Cr+</p>
              <p className="text-gray-600">Customer Savings</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function BenefitCard({ icon, title, description }: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="p-6 bg-gray-50 rounded-lg hover:shadow-md transition-shadow">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}