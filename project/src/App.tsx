import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import SolarPanels from './components/SolarPanels';
import EstimationTool from './components/EstimationTool';
import WeatherForecast from './components/WeatherForecast';
import PowerDashboard from './components/PowerDashboard';
import TodoList from './components/TodoList';
import LoginModal from './components/LoginModal';
import Benefits from './components/Benefits';
import SolarCalculator from './components/SolarCalculator';
import Resources from './components/Resources';
import StateIncentives from './components/StateIncentives';
import InstallerContacts from './components/InstallerContacts';
import { supabase } from './lib/supabase';
import FeedbackButton from './components/FeedbackButton';
import OnboardingTips from './components/OnboardingTips';
import InstallationGuide from './components/InstallationGuide';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [user, setUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [isGuestMode, setIsGuestMode] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setIsLoggedIn(!!session);
      setUser(session?.user || null);
      if (session?.user && !localStorage.getItem('onboarding_complete')) {
        setShowOnboarding(true);
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsLoggedIn(!!session);
      setUser(session?.user || null);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (user) {
      fetchUserProfile();
    } else {
      setUserProfile(null);
    }
  }, [user]);

  const fetchUserProfile = async () => {
    if (!user) return;

    const { data: profile, error } = await supabase
      .from('profiles')
      .select(`
        *,
        user_settings (*)
      `)
      .eq('id', user.id)
      .single();

    if (!error) {
      setUserProfile(profile);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setCurrentPage('home');
    setIsGuestMode(false);
  };

  const handleGuestMode = () => {
    setIsGuestMode(true);
    setShowLoginModal(false);
  };

  const completeOnboarding = () => {
    setShowOnboarding(false);
    localStorage.setItem('onboarding_complete', 'true');
  };

  const renderContent = () => {
    switch (currentPage) {
      case 'home':
        return (
          <>
            <Hero onStartPlanning={() => setCurrentPage('estimate')} onLogin={() => setShowLoginModal(true)} />
            <Benefits />
            <InstallationGuide />
            <SolarCalculator />
          </>
        );
      case 'estimate':
        return (
          <>
            <EstimationTool />
            <StateIncentives />
          </>
        );
      case 'dashboard':
        return isLoggedIn || isGuestMode ? (
          <>
            <PowerDashboard userProfile={userProfile} onProfileUpdate={fetchUserProfile} isGuestMode={isGuestMode} />
            <WeatherForecast />
            <TodoList />
          </>
        ) : (
          <div className="container mx-auto px-4 py-16 text-center">
            <h2 className="text-2xl font-bold mb-4">Please log in to view your dashboard</h2>
            <button
              onClick={() => setShowLoginModal(true)}
              className="bg-yellow-500 text-white px-6 py-2 rounded-lg hover:bg-yellow-600 transition-colors"
            >
              Log In
            </button>
          </div>
        );
      case 'panels':
        return <SolarPanels />;
      case 'resources':
        return <Resources />;
      case 'contact':
        return <InstallerContacts />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        isLoggedIn={isLoggedIn || isGuestMode}
        onLogin={() => setShowLoginModal(true)}
        onLogout={handleLogout}
        userProfile={userProfile}
        isGuestMode={isGuestMode}
      />
      <main>
        {renderContent()}
      </main>
      {showLoginModal && (
        <LoginModal 
          onClose={() => setShowLoginModal(false)}
          onLogin={() => {}}
          onGuestMode={handleGuestMode}
        />
      )}
      <FeedbackButton />
      {showOnboarding && (
        <OnboardingTips onComplete={completeOnboarding} />
      )}
    </div>
  );
}

export default App;