import React from 'react';
import { Phone, Mail, MapPin, Clock, Star } from 'lucide-react';

const installers = [
  {
    name: "SolarTech Solutions",
    address: "123 Datta Nagar, Solapur",
    phone: "+91 217 234 5678",
    email: "contact@solartech.com",
    rating: 4.8,
    hours: "Mon-Sat: 9:00 AM - 6:00 PM",
    experience: "10+ years"
  },
  {
    name: "Green Energy Systems",
    address: "45 Railway Lines, Solapur",
    phone: "+91 217 876 5432",
    email: "info@greenenergy.com",
    rating: 4.7,
    hours: "Mon-Sat: 9:30 AM - 7:00 PM",
    experience: "8+ years"
  },
  {
    name: "Sun Power Installations",
    address: "78 Market Yard, Solapur",
    phone: "+91 217 345 6789",
    email: "support@sunpower.com",
    rating: 4.9,
    hours: "Mon-Sat: 9:00 AM - 8:00 PM",
    experience: "12+ years"
  }
];

export default function InstallerContacts() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Certified Solar Installers in Solapur</h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {installers.map((installer, index) => (
            <div key={index} className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-2">{installer.name}</h3>
              
              <div className="flex items-center space-x-2 mb-4">
                <Star className="h-5 w-5 text-yellow-400 fill-current" />
                <span className="font-medium">{installer.rating}/5.0</span>
                <span className="text-gray-500">• {installer.experience}</span>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <MapPin className="h-5 w-5 text-gray-400 mt-1" />
                  <span>{installer.address}</span>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-gray-400" />
                  <a href={`tel:${installer.phone}`} className="text-yellow-600 hover:text-yellow-700">
                    {installer.phone}
                  </a>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-gray-400" />
                  <a href={`mailto:${installer.email}`} className="text-yellow-600 hover:text-yellow-700">
                    {installer.email}
                  </a>
                </div>
                
                <div className="flex items-start space-x-3">
                  <Clock className="h-5 w-5 text-gray-400 mt-1" />
                  <span>{installer.hours}</span>
                </div>
              </div>
              
              <button className="w-full mt-6 bg-yellow-500 text-white py-2 rounded-lg hover:bg-yellow-600 transition-colors">
                Request Quote
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}