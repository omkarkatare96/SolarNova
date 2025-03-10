import React, { useState } from 'react';
import Overview from './Dashboard/Overview';
import EnergyInsights from './Dashboard/EnergyInsights';
import GoalsTracker from './Dashboard/GoalsTracker';
import Settings from './Dashboard/Settings';

interface PowerDashboardProps {
  userProfile: any;
  onProfileUpdate: () => void;
  isGuestMode?: boolean;
}

export default function PowerDashboard({ userProfile, onProfileUpdate, isGuestMode = false }: PowerDashboardProps) {
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'insights', label: 'Energy Insights' },
    { id: 'goals', label: 'Goals Tracker' },
    { id: 'settings', label: 'Settings' }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return <Overview userProfile={userProfile} isGuestMode={isGuestMode} />;
      case 'insights':
        return <EnergyInsights />;
      case 'goals':
        return <GoalsTracker />;
      case 'settings':
        return isGuestMode ? (
          <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold mb-4">Guest Mode</h3>
            <p className="text-gray-600 mb-4">Settings are not available in guest mode. Please create an account to access this feature.</p>
          </div>
        ) : (
          <Settings userProfile={userProfile} onUpdate={onProfileUpdate} />
        );
      default:
        return null;
    }
  };

  return (
    <section className="py-8 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="mb-6 border-b">
          <div className="flex overflow-x-auto">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 font-medium text-sm whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'text-yellow-500 border-b-2 border-yellow-500'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {renderContent()}
      </div>
    </section>
  );
}