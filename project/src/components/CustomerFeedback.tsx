import React from 'react';
import { Star, User, MapPin } from 'lucide-react';

const feedbacks = [
  {
    name: "Rajesh Patel",
    location: "Solapur Central",
    rating: 5,
    comment: "Excellent service! The solar installation has reduced our electricity bills by 60%. The team was professional and completed the work on time.",
    date: "2024-01-15",
    systemSize: "5kW"
  },
  {
    name: "Priya Sharma",
    location: "Hotgi Road",
    rating: 5,
    comment: "Very satisfied with the installation. The maintenance support is great, and the system is performing better than expected.",
    date: "2024-01-10",
    systemSize: "3kW"
  },
  {
    name: "Amit Deshmukh",
    location: "Vijapur Road",
    rating: 4,
    comment: "Good investment for long-term savings. The team helped us understand the system well.",
    date: "2024-01-05",
    systemSize: "4kW"
  },
  {
    name: "Sneha Patil",
    location: "Railway Lines",
    rating: 5,
    comment: "Outstanding service and support. The installation was quick and clean.",
    date: "2023-12-28",
    systemSize: "6kW"
  },
  {
    name: "Mohammed Khan",
    location: "Begum Peth",
    rating: 5,
    comment: "Best decision we made! The savings are real, and the service was excellent.",
    date: "2023-12-20",
    systemSize: "4.5kW"
  },
  {
    name: "Suresh Jadhav",
    location: "Pakni Road",
    rating: 4,
    comment: "Very professional team. They handled everything from permits to installation.",
    date: "2023-12-15",
    systemSize: "3.5kW"
  },
  {
    name: "Anjali Kulkarni",
    location: "Ashok Chowk",
    rating: 5,
    comment: "Excellent customer service and follow-up. The system is performing great!",
    date: "2023-12-10",
    systemSize: "5.5kW"
  },
  {
    name: "Vikram Singh",
    location: "Market Yard",
    rating: 5,
    comment: "Highly recommend their services. The installation was smooth and professional.",
    date: "2023-12-05",
    systemSize: "4kW"
  },
  {
    name: "Deepak Joshi",
    location: "Saat Rasta",
    rating: 4,
    comment: "Great experience overall. The team was knowledgeable and helpful.",
    date: "2023-11-30",
    systemSize: "3kW"
  },
  {
    name: "Meera Reddy",
    location: "Datta Nagar",
    rating: 5,
    comment: "Fantastic service from start to finish. Very happy with the results.",
    date: "2023-11-25",
    systemSize: "6kW"
  }
];

export default function CustomerFeedback() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">What Our Customers Say</h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {feedbacks.map((feedback, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="bg-yellow-100 rounded-full p-2">
                    <User className="h-6 w-6 text-yellow-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{feedback.name}</h3>
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin className="h-4 w-4 mr-1" />
                      {feedback.location}
                    </div>
                  </div>
                </div>
                <div className="flex">
                  {[...Array(feedback.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
              </div>
              
              <p className="text-gray-600 mb-4">{feedback.comment}</p>
              
              <div className="flex justify-between text-sm text-gray-500">
                <span>System Size: {feedback.systemSize}</span>
                <span>{feedback.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}