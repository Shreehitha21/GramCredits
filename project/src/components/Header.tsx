import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Globe, User, Bell, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { useNotification } from '../context/NotificationContext';
import LoginModal from './LoginModal';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const { language, setLanguage, t } = useLanguage();
  const { notifications, removeNotification } = useNotification();
  const [showNotifications, setShowNotifications] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', auth: true, roles: ['farmer', 'buyer', 'verifier', 'admin'] },
    { name: 'Marketplace', href: '/marketplace', auth: true, roles: ['farmer', 'buyer', 'admin'] },
    { name: 'Verification', href: '/verification', auth: true, roles: ['farmer', 'verifier', 'admin'] },
    { name: 'Learning', href: '/learning', auth: true, roles: ['farmer', 'admin'] },
  ];

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
  };

  const canAccessRoute = (item: any) => {
    if (!item.auth) return true;
    if (!isAuthenticated) return false;
    return item.roles.includes(user?.role);
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'farmer': return 'bg-green-100 text-green-800';
      case 'buyer': return 'bg-blue-100 text-blue-800';
      case 'verifier': return 'bg-purple-100 text-purple-800';
      case 'admin': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <>
      <nav className="bg-white/90 backdrop-blur-md shadow-lg sticky top-0 z-40 border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="flex items-center space-x-3 group">
                <div className="w-10 h-10 bg-gradient-to-r from-green-600 to-blue-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Globe className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                  GramCredits
                </span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navigation.map((item) => (
                canAccessRoute(item) && (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                      isActive(item.href)
                        ? 'bg-gradient-to-r from-green-100 to-blue-100 text-green-700 shadow-md'
                        : 'text-gray-700 hover:text-green-600 hover:bg-gray-50'
                    }`}
                  >
                    {t(item.name)}
                  </Link>
                )
              ))}
              
              {/* Language Selector */}
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-green-500 bg-white/50 backdrop-blur-sm"
              >
                <option value="en">English</option>
                <option value="hi">हिंदी</option>
                <option value="bn">বাংলা</option>
                <option value="ta">தமிழ்</option>
              </select>

              {isAuthenticated ? (
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <button
                      onClick={() => setShowNotifications(!showNotifications)}
                      className="relative p-2 text-gray-600 hover:text-green-600 transition-colors"
                    >
                      <Bell className="w-5 h-5" />
                      {notifications.length > 0 && (
                        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                          {notifications.length}
                        </span>
                      )}
                    </button>
                    
                    {showNotifications && (
                      <div className="absolute right-0 top-12 w-80 bg-white rounded-lg shadow-xl border border-gray-200 z-50 max-h-96 overflow-y-auto">
                        <div className="p-4 border-b border-gray-200">
                          <h3 className="font-semibold text-gray-900">Notifications</h3>
                        </div>
                        {notifications.length > 0 ? (
                          <div className="divide-y divide-gray-200">
                            {notifications.map((notification) => (
                              <div key={notification.id} className="p-4 hover:bg-gray-50">
                                <div className="flex items-start justify-between">
                                  <div className="flex-1">
                                    <div className="font-medium text-gray-900 text-sm">
                                      {notification.title}
                                    </div>
                                    <div className="text-gray-600 text-xs mt-1">
                                      {notification.message}
                                    </div>
                                  </div>
                                  <button
                                    onClick={() => removeNotification(notification.id)}
                                    className="ml-2 text-gray-400 hover:text-gray-600"
                                  >
                                    <X className="w-4 h-4" />
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="p-4 text-center text-gray-500 text-sm">
                            No notifications
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                  <Link
                    to="/profile"
                    className="flex items-center space-x-3 text-gray-700 hover:text-green-600 transition-colors group"
                  >
                    <div className="text-2xl group-hover:scale-110 transition-transform duration-300">
                      {user?.avatar}
                    </div>
                    <div className="text-left">
                      <div className="text-sm font-medium">{user?.name}</div>
                      <div className={`text-xs px-2 py-1 rounded-full ${getRoleColor(user?.role || '')}`}>
                        {user?.role}
                      </div>
                    </div>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-2 bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2 rounded-xl text-sm hover:from-red-600 hover:to-red-700 transition-all duration-300 transform hover:scale-105"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>{t('Logout')}</span>
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setIsLoginModalOpen(true)}
                  className="bg-gradient-to-r from-green-600 to-blue-600 text-white px-6 py-2 rounded-xl text-sm font-medium hover:from-green-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-105"
                >
                  {t('Login')}
                </button>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-700 hover:text-green-600 p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-white/95 backdrop-blur-md border-t border-gray-200">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                canAccessRoute(item) && (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`block px-3 py-2 rounded-xl text-base font-medium transition-all duration-300 ${
                      isActive(item.href)
                        ? 'bg-gradient-to-r from-green-100 to-blue-100 text-green-700'
                        : 'text-gray-700 hover:text-green-600 hover:bg-gray-50'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {t(item.name)}
                  </Link>
                )
              ))}
              
              {isAuthenticated ? (
                <div className="pt-4 border-t border-gray-200">
                  <div className="flex items-center space-x-3 px-3 py-2">
                    <div className="text-2xl">{user?.avatar}</div>
                    <div>
                      <div className="font-medium text-gray-900">{user?.name}</div>
                      <div className={`text-xs px-2 py-1 rounded-full inline-block ${getRoleColor(user?.role || '')}`}>
                        {user?.role}
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-3 py-2 text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                  >
                    {t('Logout')}
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => {
                    setIsLoginModalOpen(true);
                    setIsMenuOpen(false);
                  }}
                  className="w-full bg-gradient-to-r from-green-600 to-blue-600 text-white px-3 py-2 rounded-xl text-base font-medium hover:from-green-700 hover:to-blue-700 transition-all duration-300"
                >
                  {t('Login')}
                </button>
              )}
            </div>
          </div>
        )}
      </nav>

      <LoginModal 
        isOpen={isLoginModalOpen} 
        onClose={() => setIsLoginModalOpen(false)} 
      />
    </>
  );
};

export default Header;