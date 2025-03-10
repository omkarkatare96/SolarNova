import React from 'react';
import { Line, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Zap, TrendingUp, AlertTriangle, Battery, Leaf } from 'lucide-react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

// Past 7 days data
const pastWeekData = {
  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  datasets: [
    {
      label: 'Energy Generated (kWh)',
      data: [42, 38, 45, 47, 44, 46, 48],
      borderColor: 'rgb(234, 179, 8)',
      backgroundColor: 'rgba(234, 179, 8, 0.5)',
      fill: true,
    },
    {
      label: 'Energy Consumed (kWh)',
      data: [38, 35, 40, 42, 39, 41, 43],
      borderColor: 'rgb(59, 130, 246)',
      backgroundColor: 'rgba(59, 130, 246, 0.5)',
      fill: true,
    }
  ]
};

// Forecast data for next 7 days
const forecastData = {
  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  datasets: [{
    label: 'Predicted Generation (kWh)',
    data: [45, 43, 46, 48, 44, 42, 45],
    borderColor: 'rgb(234, 179, 8)',
    backgroundColor: 'rgba(234, 179, 8, 0.2)',
    borderDash: [5, 5],
  }]
};

// Battery health data
const batteryData = {
  labels: ['12 AM', '4 AM', '8 AM', '12 PM', '4 PM', '8 PM'],
  datasets: [{
    label: 'Battery Level (%)',
    data: [85, 75, 65, 90, 95, 80],
    backgroundColor: 'rgba(34, 197, 94, 0.5)',
  }]
};

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Energy Overview'
    }
  }
};

const batteryOptions = {
  ...options,
  plugins: {
    ...options.plugins,
    title: {
      display: true,
      text: 'Battery Storage Utilization'
    }
  }
};

export default function EnergyInsights() {
  const environmentalImpact = {
    co2Saved: 2450, // kg
    treesEquivalent: 115,
    energySaved: 3200 // kWh
  };

  const anomalies = [
    {
      title: "Unusual Power Drop",
      description: "20% lower generation than expected at 2 PM",
      time: "2 hours ago",
      severity: "medium"
    },
    {
      title: "High Consumption Alert",
      description: "Consumption spike detected during off-peak hours",
      time: "5 hours ago",
      severity: "high"
    }
  ];

  return (
    <div className="space-y-8">
      {/* Past Week vs Forecast */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-6">Past 7 Days Performance</h2>
          <Line options={options} data={pastWeekData} />
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-6">Next 7 Days Forecast</h2>
          <Line options={options} data={forecastData} />
        </div>
      </div>

      {/* Battery Health & Environmental Impact */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-6">Battery Health & Storage</h2>
          <Bar options={batteryOptions} data={batteryData} />
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-6">Environmental Impact</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-green-50 rounded-lg">
              <div className="flex items-center space-x-3 mb-2">
                <Leaf className="h-6 w-6 text-green-500" />
                <span className="font-medium">CO₂ Saved</span>
              </div>
              <p className="text-2xl font-bold text-green-600">{environmentalImpact.co2Saved} kg</p>
              <p className="text-sm text-green-600">Equivalent to {environmentalImpact.treesEquivalent} trees planted</p>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg">
              <div className="flex items-center space-x-3 mb-2">
                <Battery className="h-6 w-6 text-blue-500" />
                <span className="font-medium">Energy Saved</span>
              </div>
              <p className="text-2xl font-bold text-blue-600">{environmentalImpact.energySaved} kWh</p>
              <p className="text-sm text-blue-600">Total energy conservation</p>
            </div>
          </div>
        </div>
      </div>

      {/* Anomaly Detection */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-xl font-semibold mb-6">System Alerts</h2>
        <div className="space-y-4">
          {anomalies.map((anomaly, index) => (
            <div key={index} className={`p-4 rounded-lg ${
              anomaly.severity === 'high' ? 'bg-red-50' : 'bg-yellow-50'
            }`}>
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold mb-1">{anomaly.title}</h3>
                  <p className="text-sm text-gray-600">{anomaly.description}</p>
                </div>
                <span className="text-sm text-gray-500">{anomaly.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}