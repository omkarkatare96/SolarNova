import React, { useState } from 'react';
import { Sun, Menu, LogIn, LogOut, User } from 'lucide-react';

interface HeaderProps {
  currentPage: string;
  setCurrentPage: (page: string) => void;
  isLoggedIn: boolean;
  onLogin: () => void;
  onLogout: () => void;
  userProfile: any;
  isGuestMode: boolean;
}

export default function Header({ 
  currentPage,
  setCurrentPage,
  isLoggedIn,
  onLogin,
  onLogout,
  userProfile,
  isGuestMode
}: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleNavClick = (page: string) => {
    setCurrentPage(page);
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <nav className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div 
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => handleNavClick('home')}
          >
            <Sun className="h-8 w-8 text-yellow-500" />
            <span className="text-xl font-bold">SolarNova</span>
          </div>
          
          <div className="flex items-center space-x-4">
            {isLoggedIn ? (
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center space-x-2 hover:bg-gray-100 px-3 py-2 rounded-lg"
                >
                  <User className="h-5 w-5" />
                  <span className="hidden md:block">
                    {isGuestMode ? 'Guest User' : (userProfile?.full_name || 'User')}
                  </span>
                </button>
                
                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1">
                    <button
                      onClick={() => {
                        handleNavClick('dashboard');
                        setShowUserMenu(false);
                      }}
                      className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      Dashboard
                    </button>
                    <button
                      onClick={() => {
                        onLogout();
                        setShowUserMenu(false);
                      }}
                      className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      <div className="flex items-center">
                        <LogOut className="h-4 w-4 mr-2" />
                        {isGuestMode ? 'Exit Guest Mode' : 'Logout'}
                      </div>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={onLogin}
                className="hidden md:flex items-center space-x-2 bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition-colors"
              >
                <LogIn className="h-5 w-5" />
                <span>Log In</span>
              </button>
            )}
            
            <button 
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu className="h-6 w-6" />
            </button>

            <div className="hidden md:flex space-x-6">
              <NavLink 
                active={currentPage === 'home'}
                onClick={() => handleNavClick('home')}
              >
                Home
              </NavLink>
              {isLoggedIn && (
                <NavLink 
                  active={currentPage === 'dashboard'}
                  onClick={() => handleNavClick('dashboard')}
                >
                  Dashboard
                </NavLink>
              )}
              <NavLink 
                active={currentPage === 'estimate'}
                onClick={() => handleNavClick('estimate')}
              >
                Estimate
              </NavLink>
              <NavLink 
                active={currentPage === 'panels'}
                onClick={() => handleNavClick('panels')}
              >
                Solar Panels
              </NavLink>
              <NavLink 
                active={currentPage === 'resources'}
                onClick={() => handleNavClick('resources')}
              >
                Resources
              </NavLink>
              <NavLink 
                active={currentPage === 'contact'}
                onClick={() => handleNavClick('contact')}
              >
                Contact
              </NavLink>
            </div>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden mt-4 space-y-2">
            <NavLink 
              mobile 
              active={currentPage === 'home'}
              onClick={() => handleNavClick('home')}
            >
              Home
            </NavLink>
            {isLoggedIn && (
              <NavLink 
                mobile 
                active={currentPage === 'dashboard'}
                onClick={() => handleNavClick('dashboard')}
              >
                Dashboard
              </NavLink>
            )}
            <NavLink 
              mobile 
              active={currentPage === 'estimate'}
              onClick={() => handleNavClick('estimate')}
            >
              Estimate
            </NavLink>
            <NavLink 
              mobile 
              active={currentPage === 'panels'}
              onClick={() => handleNavClick('panels')}
            >
              Solar Panels
            </NavLink>
            <NavLink 
              mobile 
              active={currentPage === 'resources'}
              onClick={() => handleNavClick('resources')}
            >
              Resources
            </NavLink>
            <NavLink 
              mobile 
              active={currentPage === 'contact'}
              onClick={() => handleNavClick('contact')}
            >
              Contact
            </NavLink>
            {!isLoggedIn ? (
              <button
                onClick={onLogin}
                className="w-full text-left py-2 text-gray-600 hover:text-yellow-500 transition-colors"
              >
                Log In
              </button>
            ) : (
              <button
                onClick={onLogout}
                className="w-full text-left py-2 text-gray-600 hover:text-yellow-500 transition-colors"
              >
                {isGuestMode ? 'Exit Guest Mode' : 'Log Out'}
              </button>
            )}
          </div>
        )}
      </nav>
    </header>
  );
}

function NavLink({ 
  children, 
  mobile = false,
  active = false,
  onClick
}: {
  children: React.ReactNode;
  mobile?: boolean;
  active?: boolean;
  onClick: () => void;
}) {
  const baseClasses = "cursor-pointer text-gray-600 hover:text-yellow-500 transition-colors";
  const activeClasses = active ? "text-yellow-500" : "";
  const mobileClasses = mobile ? "block py-2" : "";
  
  return (
    <span 
      onClick={onClick}
      className={`${baseClasses} ${activeClasses} ${mobileClasses}`}
    >
      {children}
    </span>
  );
}