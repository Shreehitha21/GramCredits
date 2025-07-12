import React from 'react';
import { Link } from 'react-router-dom';
import { Leaf, Users, TrendingUp, Shield, Smartphone, Globe, Award, Zap } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const HomePage = () => {
  const { t } = useLanguage();

  const features = [
    {
      icon: <Leaf className="w-8 h-8 text-green-600" />,
      title: 'AI-Powered Verification',
      description: 'Satellite and AI technology verify your environmental impact automatically'
    },
    {
      icon: <Shield className="w-8 h-8 text-blue-600" />,
      title: 'Blockchain Security',
      description: 'Transparent, tamper-proof carbon credit tracking on blockchain'
    },
    {
      icon: <Users className="w-8 h-8 text-purple-600" />,
      title: 'Global Marketplace',
      description: 'Connect with global buyers and trade carbon credits seamlessly'
    },
    {
      icon: <Smartphone className="w-8 h-8 text-orange-600" />,
      title: 'Local Language Support',
      description: 'WhatsApp, IVR, and mobile app access in your local language'
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-green-600" />,
      title: 'Earn While You Save',
      description: 'Generate income from your environmental conservation efforts'
    },
    {
      icon: <Globe className="w-8 h-8 text-blue-600" />,
      title: 'BECKN Integration',
      description: 'Interoperable ecosystem connecting all stakeholders'
    }
  ];

  const stats = [
    { value: '50,000+', label: 'Farmers Connected' },
    { value: '1.2M', label: 'Carbon Credits Generated' },
    { value: '₹15 Cr', label: 'Farmer Earnings' },
    { value: '95%', label: 'Verification Accuracy' }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-50 to-blue-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center mb-8">
              <div className="w-20 h-20 bg-green-600 rounded-full flex items-center justify-center">
                <Leaf className="w-10 h-10 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              {t('Empowering Farmers')} <br />
              <span className="text-green-600">{t('Protecting Planet')}</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              {t('Join thousands of farmers earning income from environmental conservation through AI-powered carbon credit verification and blockchain technology.')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/dashboard"
                className="bg-green-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-green-700 transition-all duration-300 transform hover:scale-105"
              >
                {t('Start Earning Today')}
              </Link>
              <Link
                to="/learning"
                className="bg-white text-green-600 px-8 py-4 rounded-lg text-lg font-semibold border-2 border-green-600 hover:bg-green-50 transition-all duration-300"
              >
                {t('Learn More')}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-green-600 mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600">{t(stat.label)}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t('Revolutionary Features')}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t('Advanced technology made simple for farmers to participate in the global carbon economy')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {t(feature.title)}
                </h3>
                <p className="text-gray-600">{t(feature.description)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t('How It Works')}
            </h2>
            <p className="text-xl text-gray-600">
              {t('Simple steps to start earning from your environmental efforts')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                step: '01',
                title: 'Register & Verify',
                description: 'Sign up and verify your farming activities through our AI system',
                icon: <Users className="w-8 h-8 text-green-600" />
              },
              {
                step: '02',
                title: 'Take Climate Action',
                description: 'Plant trees, adopt solar energy, or restore ecosystems',
                icon: <Leaf className="w-8 h-8 text-green-600" />
              },
              {
                step: '03',
                title: 'Get Verified',
                description: 'AI and satellite technology verify your environmental impact',
                icon: <Shield className="w-8 h-8 text-green-600" />
              },
              {
                step: '04',
                title: 'Earn Credits',
                description: 'Receive GramCredits and trade them in the global marketplace',
                icon: <Award className="w-8 h-8 text-green-600" />
              }
            ].map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  {step.icon}
                </div>
                <div className="text-sm font-bold text-green-600 mb-2">STEP {step.step}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{t(step.title)}</h3>
                <p className="text-gray-600">{t(step.description)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {t('Ready to Start Earning?')}
          </h2>
          <p className="text-xl text-green-100 mb-8">
            {t('Join thousands of farmers making a difference and earning income')}
          </p>
          <Link
            to="/dashboard"
            className="bg-white text-green-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 inline-flex items-center space-x-2"
          >
            <Zap className="w-5 h-5" />
            <span>{t('Get Started Now')}</span>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;