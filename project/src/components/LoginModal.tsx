import React, { useState } from 'react';
import { X, Eye, EyeOff, User, Mail, Lock, MapPin, Crop } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
  const { login, register } = useAuth();
  const { addNotification } = useNotification();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    location: '',
    farmSize: '',
    role: 'farmer' as 'farmer' | 'buyer' | 'verifier'
  });

  // Demo accounts for easy testing
  const demoAccounts = [
    { email: 'ramesh@example.com', password: 'farmer123', name: 'Ramesh Kumar', role: 'Farmer' },
    { email: 'priya@example.com', password: 'farmer123', name: 'Priya Sharma', role: 'Farmer' },
    { email: 'arjun@example.com', password: 'farmer123', name: 'Arjun Patel', role: 'Farmer' },
    { email: 'buyer@microsoft.com', password: 'buyer123', name: 'Microsoft Corp', role: 'Buyer' },
    { email: 'verifier@gramcredits.com', password: 'verifier123', name: 'Dr. Kavita Verma', role: 'Verifier' },
    { email: 'admin@gramcredits.com', password: 'admin123', name: 'Admin User', role: 'Admin' }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (isLogin) {
        const success = await login(formData.email, formData.password);
        if (success) {
          addNotification({
            type: 'success',
            title: 'Login Successful!',
            message: 'Welcome back to GramCredits platform.'
          });
          onClose();
        } else {
          addNotification({
            type: 'error',
            title: 'Login Failed',
            message: 'Invalid email or password. Please try again.'
          });
        }
      } else {
        const success = await register(formData, formData.password);
        if (success) {
          addNotification({
            type: 'success',
            title: 'Registration Successful!',
            message: 'Welcome to GramCredits! Your account has been created.'
          });
          onClose();
        } else {
          addNotification({
            type: 'error',
            title: 'Registration Failed',
            message: 'Email already exists or invalid data. Please try again.'
          });
        }
      }
    } catch (error) {
      addNotification({
        type: 'error',
        title: 'Error',
        message: 'Something went wrong. Please try again.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoLogin = async (email: string, password: string) => {
    setIsLoading(true);
    const success = await login(email, password);
    if (success) {
      addNotification({
        type: 'success',
        title: 'Demo Login Successful!',
        message: 'You are now logged in with a demo account.'
      });
      onClose();
    }
    setIsLoading(false);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex">
          {/* Left Side - Form */}
          <div className="flex-1 p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                {isLogin ? 'Welcome Back!' : 'Join GramCredits'}
              </h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLogin && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        placeholder="Enter your full name"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Role
                    </label>
                    <select
                      value={formData.role}
                      onChange={(e) => handleInputChange('role', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500"
                    >
                      <option value="farmer">Farmer</option>
                      <option value="buyer">Carbon Credit Buyer</option>
                      <option value="verifier">Project Verifier</option>
                    </select>
                  </div>

                  {formData.role === 'farmer' && (
                    <>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Location
                        </label>
                        <div className="relative">
                          <MapPin className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                          <input
                            type="text"
                            value={formData.location}
                            onChange={(e) => handleInputChange('location', e.target.value)}
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                            placeholder="e.g., Gujarat, India"
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Farm Size
                        </label>
                        <div className="relative">
                          <Crop className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                          <input
                            type="text"
                            value={formData.farmSize}
                            onChange={(e) => handleInputChange('farmSize', e.target.value)}
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                            placeholder="e.g., 2.5 acres"
                            required
                          />
                        </div>
                      </div>
                    </>
                  )}
                </>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Enter your password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-green-600 to-blue-600 text-white py-3 rounded-xl font-bold text-lg hover:from-green-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Processing...' : (isLogin ? 'Sign In' : 'Create Account')}
              </button>
            </form>

            <div className="mt-6 text-center">
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-green-600 hover:text-green-700 font-medium"
              >
                {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
              </button>
            </div>
          </div>

          {/* Right Side - Demo Accounts */}
          <div className="w-80 bg-gradient-to-br from-green-50 to-blue-50 p-8 border-l border-gray-200">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Demo Accounts</h3>
            <p className="text-sm text-gray-600 mb-6">
              Try the platform with these pre-configured accounts:
            </p>
            
            <div className="space-y-3">
              {demoAccounts.map((account, index) => (
                <div key={index} className="bg-white p-4 rounded-xl border border-gray-200 hover:shadow-md transition-all duration-300">
                  <div className="flex items-center justify-between mb-2">
                    <div className="font-medium text-gray-900">{account.name}</div>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      account.role === 'Farmer' ? 'bg-green-100 text-green-800' :
                      account.role === 'Buyer' ? 'bg-blue-100 text-blue-800' :
                      account.role === 'Verifier' ? 'bg-purple-100 text-purple-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {account.role}
                    </span>
                  </div>
                  <div className="text-xs text-gray-500 mb-3">
                    {account.email}
                  </div>
                  <button
                    onClick={() => handleDemoLogin(account.email, account.password)}
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-green-500 to-blue-500 text-white py-2 rounded-lg text-sm font-medium hover:from-green-600 hover:to-blue-600 transition-all duration-300 disabled:opacity-50"
                  >
                    Login as {account.role}
                  </button>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-xl">
              <div className="text-sm text-yellow-800">
                <strong>💡 Quick Tip:</strong> Each account type has different features and dashboards to showcase the platform's versatility.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;