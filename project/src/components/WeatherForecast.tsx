import React from 'react';
import { Cloud, Sun, Wind, Droplets } from 'lucide-react';

interface WeatherDay {
  day: string;
  temp: number;
  condition: 'sunny' | 'cloudy' | 'rainy';
  wind: number;
  precipitation: number;
}

const mockWeatherData: WeatherDay[] = [
  { day: 'Today', temp: 32, condition: 'sunny', wind: 12, precipitation: 0 },
  { day: 'Tomorrow', temp: 31, condition: 'cloudy', wind: 15, precipitation: 20 },
  { day: 'Wed', temp: 30, condition: 'rainy', wind: 18, precipitation: 60 },
  { day: 'Thu', temp: 33, condition: 'sunny', wind: 10, precipitation: 0 },
  { day: 'Fri', temp: 32, condition: 'sunny', wind: 11, precipitation: 0 },
  { day: 'Sat', temp: 31, condition: 'cloudy', wind: 14, precipitation: 30 },
  { day: 'Sun', temp: 30, condition: 'rainy', wind: 16, precipitation: 45 },
];

const getWeatherIcon = (condition: string) => {
  switch (condition) {
    case 'sunny':
      return <Sun className="h-8 w-8 text-yellow-500" />;
    case 'cloudy':
      return <Cloud className="h-8 w-8 text-gray-500" />;
    case 'rainy':
      return <Droplets className="h-8 w-8 text-blue-500" />;
    default:
      return <Sun className="h-8 w-8 text-yellow-500" />;
  }
};

export default function WeatherForecast() {
  return (
    <section className="py-8 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Weather Forecast</h2>
          <p className="text-gray-600">Solapur, Maharashtra</p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-7 gap-4">
          {mockWeatherData.map((day) => (
            <div key={day.day} className="bg-gray-50 rounded-lg p-4 text-center">
              <p className="font-medium mb-2">{day.day}</p>
              <div className="flex justify-center mb-2">
                {getWeatherIcon(day.condition)}
              </div>
              <p className="text-2xl font-bold mb-2">{day.temp}°C</p>
              <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
                <Wind className="h-4 w-4" />
                <span>{day.wind} km/h</span>
              </div>
              <div className="flex items-center justify-center space-x-2 text-sm text-gray-600 mt-1">
                <Droplets className="h-4 w-4" />
                <span>{day.precipitation}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}