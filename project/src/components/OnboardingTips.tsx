import React, { useState } from 'react';
import { X, ArrowRight, ArrowLeft } from 'lucide-react';

interface OnboardingTipsProps {
  onComplete: () => void;
}

const OnboardingTips: React.FC<OnboardingTipsProps> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);

  const tips = [
    {
      title: 'Welcome to SolarSense',
      description: 'Let get you started with managing your solar energy system.',
      image: 'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&q=80&w=1000'
    },
    {
      title: 'Track Your Energy',
      description: 'Monitor your solar generation and consumption in real-time from your dashboard.',
      image: 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&q=80&w=1000'
    },
    {
      title: 'Set Your Goals',
      description: 'Define and track your sustainability goals to maximize your impact.',
      image: 'https://images.unsplash.com/photo-1591267990532-e5bdb1b0ceb8?auto=format&fit=crop&q=80&w=1000'
    },
    {
      title: 'Stay Informed',
      description: 'Access educational resources and state incentives to make the most of your investment.',
      image: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?auto=format&fit=crop&q=80&w=1000'
    }
  ];

  const handleNext = () => {
    if (currentStep < tips.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full mx-4">
        <div className="relative">
          <button
            onClick={onComplete}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 z-10"
          >
            <X className="h-6 w-6" />
          </button>
          
          <img
            src={tips[currentStep].image}
            alt={tips[currentStep].title}
            className="w-full h-48 object-cover rounded-t-lg"
          />
          
          <div className="p-6">
            <h3 className="text-2xl font-bold mb-2">{tips[currentStep].title}</h3>
            <p className="text-gray-600 mb-6">{tips[currentStep].description}</p>
            
            <div className="flex items-center justify-between">
              <button
                onClick={handlePrevious}
                className={`flex items-center ${
                  currentStep === 0 ? 'invisible' : ''
                }`}
              >
                <ArrowLeft className="h-5 w-5 mr-2" />
                Previous
              </button>
              
              <div className="flex space-x-2">
                {tips.map((_, index) => (
                  <div
                    key={index}
                    className={`h-2 w-2 rounded-full ${
                      index === currentStep ? 'bg-yellow-500' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
              
              <button
                onClick={handleNext}
                className="flex items-center text-yellow-500 font-medium"
              >
                {currentStep === tips.length - 1 ? 'Get Started' : 'Next'}
                <ArrowRight className="h-5 w-5 ml-2" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingTips;