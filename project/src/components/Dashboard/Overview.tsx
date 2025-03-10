import React from 'react';
import { Sun, Battery, Leaf, ArrowUpRight } from 'lucide-react';

interface OverviewProps {
  userProfile: {
    full_name: string;
    user_settings: {
      monthly_bill: number;
      roof_size: number;
      location: string;
    };
  } | null;
  isGuestMode?: boolean;
}

export default function Overview({ userProfile, isGuestMode = false }: OverviewProps) {
  const calculateSavings = () => {
    const monthlyBill = userProfile?.user_settings?.monthly_bill || 5000;
    const roofSize = userProfile?.user_settings?.roof_size || 600;
    const annualConsumption = monthlyBill * 12;
    const systemSize = (roofSize / 100) * 1.5;
    const annualGeneration = systemSize * 1600;
    const annualSavings = (annualGeneration * 8);
    const co2Reduction = annualGeneration * 0.82;

    return {
      monthlySavings: Math.round(annualSavings / 12),
      yearlyGeneration: Math.round(annualGeneration),
      co2Saved: Math.round(co2Reduction)
    };
  };

  const savings = calculateSavings();
  const location = userProfile?.user_settings?.location || 'Solapur';
  const name = isGuestMode ? 'Guest' : (userProfile?.full_name || 'User');

  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg p-8 text-white">
        <h2 className="text-2xl font-bold mb-2">
          Welcome back, {name}!
        </h2>
        <p className="opacity-90">
          Your solar system in {location} is performing well.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <StatCard
          icon={<Battery className="h-8 w-8 text-green-500" />}
          title="Monthly Savings"
          value={`₹${savings.monthlySavings.toLocaleString()}`}
          change="+12%"
        />
        <StatCard
          icon={<Sun className="h-8 w-8 text-yellow-500" />}
          title="Energy Generated"
          value={`${savings.yearlyGeneration.toLocaleString()} kWh`}
          change="+8%"
        />
        <StatCard
          icon={<Leaf className="h-8 w-8 text-green-600" />}
          title="CO2 Reduced"
          value={`${savings.co2Saved.toLocaleString()} kg`}
          change="+15%"
        />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <QuickAction
          title="Schedule Maintenance"
          description="Book your next panel cleaning"
          link="#"
        />
        <QuickAction
          title="View Reports"
          description="Check detailed performance analytics"
          link="#"
        />
        <QuickAction
          title="Update Goals"
          description="Track your sustainability targets"
          link="#"
        />
        <QuickAction
          title="Get Support"
          description="Contact our technical team"
          link="#"
        />
      </div>
    </div>
  );
}

function StatCard({ 
  icon, 
  title, 
  value, 
  change 
}: { 
  icon: React.ReactNode; 
  title: string; 
  value: string; 
  change: string;
}) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="flex items-center justify-between mb-4">
        {icon}
        <span className="text-green-500 text-sm font-medium">{change}</span>
      </div>
      <h3 className="text-gray-600 text-sm mb-1">{title}</h3>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
}

function QuickAction({ 
  title, 
  description, 
  link 
}: { 
  title: string; 
  description: string; 
  link: string;
}) {
  return (
    <a 
      href={link}
      className="block bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-semibold mb-1">{title}</h3>
          <p className="text-sm text-gray-600">{description}</p>
        </div>
        <ArrowUpRight className="h-5 w-5 text-yellow-500" />
      </div>
    </a>
  );
}