import React, { useState } from 'react';
import { X, AlertCircle, UserCheck } from 'lucide-react';
import { supabase } from '../lib/supabase';
import SignupForm from './SignupForm';

interface LoginModalProps {
  onClose: () => void;
  onLogin: (email: string, password: string) => void;
  onGuestMode: () => void;
}

export default function LoginModal({ onClose, onGuestMode }: LoginModalProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [showResetPassword, setShowResetPassword] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const { error: authError } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (authError) throw authError;
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to log in');
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: window.location.origin
      });

      if (resetError) throw resetError;
      setError('Password reset instructions sent to your email');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to send reset email');
    } finally {
      setLoading(false);
    }
  };

  if (showSignup) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="relative">
          <button
            onClick={() => setShowSignup(false)}
            className="absolute -top-4 -right-4 text-gray-500 hover:text-gray-700 bg-white rounded-full p-1"
          >
            <X className="h-6 w-6" />
          </button>
          <SignupForm onClose={onClose} />
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">
            {showResetPassword ? 'Reset Password' : 'Log In'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg flex items-center">
            <AlertCircle className="h-5 w-5 mr-2" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={showResetPassword ? handleResetPassword : handleLogin} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
              required
            />
          </div>

          {!showResetPassword && (
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                required
              />
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-yellow-500 text-white py-2 rounded-lg hover:bg-yellow-600 transition-colors disabled:opacity-50"
          >
            {loading
              ? (showResetPassword ? 'Sending...' : 'Logging in...')
              : (showResetPassword ? 'Send Reset Instructions' : 'Log In')}
          </button>
        </form>

        <button
          onClick={onGuestMode}
          className="w-full mt-4 bg-gray-100 text-gray-700 py-2 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center"
        >
          <UserCheck className="h-5 w-5 mr-2" />
          Continue as Guest
        </button>

        <div className="mt-4 flex flex-col space-y-2">
          {!showResetPassword && (
            <button
              onClick={() => setShowResetPassword(true)}
              className="text-sm text-yellow-600 hover:text-yellow-700"
            >
              Forgot password?
            </button>
          )}

          {showResetPassword && (
            <button
              onClick={() => setShowResetPassword(false)}
              className="text-sm text-yellow-600 hover:text-yellow-700"
            >
              Back to login
            </button>
          )}

          <button
            onClick={() => setShowSignup(true)}
            className="text-sm text-yellow-600 hover:text-yellow-700"
          >
            Don't have an account? Sign up
          </button>
        </div>
      </div>
    </div>
  );
}