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
import { Sun, Battery, Leaf, AlertTriangle } from 'lucide-react';

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

export default function DemoReport() {
  // Sample data for demonstration
  const forecastData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Predicted Generation (kWh)',
        data: [45, 42, 48, 44, 46, 43, 47],
        borderColor: 'rgb(234, 179, 8)',
        backgroundColor: 'rgba(234, 179, 8, 0.2)',
        borderDash: [5, 5],
      }
    ]
  };

  const pastWeekData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Generated (kWh)',
        data: [42, 38, 45, 47, 44, 46, 48],
        borderColor: 'rgb(234, 179, 8)',
        backgroundColor: 'rgba(234, 179, 8, 0.5)',
      },
      {
        label: 'Used (kWh)',
        data: [38, 35, 40, 42, 39, 41, 43],
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
      }
    ]
  };

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
      }
    }
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Solar System Demo Report</h2>

        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* Forecast Card */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold mb-4">7-Day Generation Forecast</h3>
            <Line options={options} data={forecastData} />
            <div className="mt-4 p-4 bg-yellow-50 rounded-lg">
              <div className="flex items-center space-x-2">
                <Sun className="h-5 w-5 text-yellow-500" />
                <span className="text-sm text-yellow-700">
                  Optimal generation conditions expected on Wednesday
                </span>
              </div>
            </div>
          </div>

          {/* Past Week Performance */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold mb-4">Past Week Performance</h3>
            <Line options={options} data={pastWeekData} />
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div className="p-3 bg-green-50 rounded-lg">
                <p className="text-sm text-gray-600">Total Generated</p>
                <p className="text-xl font-bold text-green-600">310 kWh</p>
              </div>
              <div className="p-3 bg-blue-50 rounded-lg">
                <p className="text-sm text-gray-600">Money Saved</p>
                <p className="text-xl font-bold text-blue-600">₹2,480</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Battery Health */}
          <div className="md:col-span-2 bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold mb-4">Battery Storage Utilization</h3>
            <Bar options={options} data={batteryData} />
            <div className="mt-4 flex items-center space-x-2">
              <Battery className="h-5 w-5 text-green-500" />
              <span className="text-sm text-gray-600">Battery health: 95% - Optimal Condition</span>
            </div>
          </div>

          {/* Environmental Impact */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold mb-4">Environmental Impact</h3>
            <div className="space-y-4">
              <div className="p-4 bg-green-50 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <Leaf className="h-5 w-5 text-green-500" />
                  <span className="font-medium">CO₂ Reduction</span>
                </div>
                <p className="text-2xl font-bold text-green-600">248 kg</p>
                <p className="text-sm text-green-600">Equivalent to 12 trees planted</p>
              </div>
              
              <div className="p-4 bg-yellow-50 rounded-lg">
                <h4 className="font-medium mb-2">System Alerts</h4>
                <div className="flex items-center space-x-2 text-sm text-yellow-700">
                  <AlertTriangle className="h-4 w-4 text-yellow-500" />
                  <span>Panel cleaning recommended in 5 days</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}