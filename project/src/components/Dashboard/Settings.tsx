import React, { useState } from 'react';
import { Save, User, MapPin, Power } from 'lucide-react';
import { supabase } from '../../lib/supabase';

interface SettingsProps {
  userProfile: {
    id: string;
    full_name: string;
    email: string;
    user_settings: {
      monthly_bill: number;
      roof_size: number;
      location: string;
    };
  };
  onUpdate: () => void;
}

export default function Settings({ userProfile, onUpdate }: SettingsProps) {
  const [formData, setFormData] = useState({
    fullName: userProfile.full_name,
    email: userProfile.email,
    location: userProfile.user_settings.location,
    monthlyBill: userProfile.user_settings.monthly_bill,
    roofSize: userProfile.user_settings.roof_size
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      const { error: profileError } = await supabase
        .from('profiles')
        .update({
          full_name: formData.fullName,
          updated_at: new Date().toISOString()
        })
        .eq('id', userProfile.id);

      if (profileError) throw profileError;

      const { error: settingsError } = await supabase
        .from('user_settings')
        .update({
          location: formData.location,
          monthly_bill: formData.monthlyBill,
          roof_size: formData.roofSize,
          updated_at: new Date().toISOString()
        })
        .eq('user_id', userProfile.id);

      if (settingsError) throw settingsError;

      setMessage({ type: 'success', text: 'Profile updated successfully' });
      onUpdate();
    } catch (error) {
      setMessage({ 
        type: 'error', 
        text: error instanceof Error ? error.message : 'An error occurred'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <User className="h-5 w-5 mr-2" />
            Personal Information
          </h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                value={formData.fullName}
                onChange={e => setFormData({ ...formData, fullName: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                value={formData.email}
                disabled
                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50"
              />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <MapPin className="h-5 w-5 mr-2" />
            Location & System Details
          </h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Location
              </label>
              <input
                type="text"
                value={formData.location}
                onChange={e => setFormData({ ...formData, location: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Monthly Electricity Bill (₹)
                </label>
                <input
                  type="number"
                  value={formData.monthlyBill}
                  onChange={e => setFormData({ ...formData, monthlyBill: Number(e.target.value) })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Roof Size (sq. ft.)
                </label>
                <input
                  type="number"
                  value={formData.roofSize}
                  onChange={e => setFormData({ ...formData, roofSize: Number(e.target.value) })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
              </div>
            </div>
          </div>
        </div>

        {message.text && (
          <div className={`p-4 rounded-lg ${
            message.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
          }`}>
            {message.text}
          </div>
        )}

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="bg-yellow-500 text-white px-6 py-2 rounded-lg hover:bg-yellow-600 transition-colors disabled:opacity-50 flex items-center"
          >
            {loading ? 'Saving...' : (
              <>
                <Save className="h-5 w-5 mr-2" />
                Save Changes
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}