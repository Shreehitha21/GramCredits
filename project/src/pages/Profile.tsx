import React, { useState } from 'react';
import { User, Edit, Save, Phone, MapPin, Award, TrendingUp, Globe } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';

const Profile = () => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || 'Ramesh Kumar',
    email: user?.email || 'ramesh@example.com',
    phone: '+91 9876543210',
    location: 'Gujarat, India',
    farmSize: '2.5 acres',
    preferredLanguage: 'Hindi',
    whatsappNumber: '+91 9876543210',
    bio: 'Progressive farmer working towards sustainable agriculture and environmental conservation.'
  });

  const stats = [
    { label: 'Total Credits Earned', value: '2,450', color: 'green' },
    { label: 'Projects Completed', value: '12', color: 'blue' },
    { label: 'Environmental Impact', value: '15.2 tons CO2', color: 'purple' },
    { label: 'Income Generated', value: '₹35,000', color: 'yellow' },
  ];

  const recentProjects = [
    {
      title: 'Solar Panel Installation',
      date: '2024-01-15',
      credits: 300,
      status: 'completed',
      impact: '2.5 tons CO2 saved'
    },
    {
      title: 'Organic Farming Transition',
      date: '2024-01-10',
      credits: 150,
      status: 'completed',
      impact: '1.8 tons CO2 saved'
    },
    {
      title: 'Water Conservation System',
      date: '2024-01-08',
      credits: 120,
      status: 'verified',
      impact: '1.2 tons CO2 saved'
    }
  ];

  const achievements = [
    { title: 'Early Adopter', icon: '🌱', date: '2023-12-01' },
    { title: 'Solar Pioneer', icon: '☀️', date: '2024-01-15' },
    { title: 'Organic Champion', icon: '🌾', date: '2024-01-20' },
    { title: 'Water Warrior', icon: '💧', date: '2024-01-25' },
  ];

  const handleSave = () => {
    setIsEditing(false);
    // Here you would typically save to backend
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Information */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">{t('Profile Information')}</h2>
                <button
                  onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                  className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  {isEditing ? <Save className="w-4 h-4" /> : <Edit className="w-4 h-4" />}
                  <span>{isEditing ? t('Save') : t('Edit')}</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('Full Name')}
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                    />
                  ) : (
                    <div className="text-gray-900">{formData.name}</div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('Email')}
                  </label>
                  {isEditing ? (
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                    />
                  ) : (
                    <div className="text-gray-900">{formData.email}</div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('Phone Number')}
                  </label>
                  {isEditing ? (
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                    />
                  ) : (
                    <div className="text-gray-900">{formData.phone}</div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('Location')}
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={formData.location}
                      onChange={(e) => handleInputChange('location', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                    />
                  ) : (
                    <div className="text-gray-900">{formData.location}</div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('Farm Size')}
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={formData.farmSize}
                      onChange={(e) => handleInputChange('farmSize', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                    />
                  ) : (
                    <div className="text-gray-900">{formData.farmSize}</div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('Preferred Language')}
                  </label>
                  {isEditing ? (
                    <select
                      value={formData.preferredLanguage}
                      onChange={(e) => handleInputChange('preferredLanguage', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                    >
                      <option value="Hindi">हिंदी</option>
                      <option value="English">English</option>
                      <option value="Bengali">বাংলা</option>
                      <option value="Tamil">தமிழ்</option>
                    </select>
                  ) : (
                    <div className="text-gray-900">{formData.preferredLanguage}</div>
                  )}
                </div>
              </div>

              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('Bio')}
                </label>
                {isEditing ? (
                  <textarea
                    value={formData.bio}
                    onChange={(e) => handleInputChange('bio', e.target.value)}
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                  />
                ) : (
                  <div className="text-gray-900">{formData.bio}</div>
                )}
              </div>
            </div>

            {/* Recent Projects */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                {t('Recent Projects')}
              </h3>
              <div className="space-y-4">
                {recentProjects.map((project, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${
                        project.status === 'completed' ? 'bg-green-500' : 'bg-yellow-500'
                      }`}></div>
                      <div>
                        <div className="font-medium text-gray-900">{project.title}</div>
                        <div className="text-sm text-gray-500">{project.date}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-green-600">+{project.credits}</div>
                      <div className="text-xs text-gray-500">{project.impact}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Achievements */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                {t('Achievements')}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {achievements.map((achievement, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <div className="text-2xl">{achievement.icon}</div>
                    <div>
                      <div className="font-medium text-gray-900">{achievement.title}</div>
                      <div className="text-sm text-gray-500">{achievement.date}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Profile Avatar */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center">
              <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="w-12 h-12 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{formData.name}</h3>
              <div className="flex items-center justify-center space-x-2 text-gray-600 mb-2">
                <MapPin className="w-4 h-4" />
                <span className="text-sm">{formData.location}</span>
              </div>
              <div className="flex items-center justify-center space-x-2 text-gray-600">
                <Phone className="w-4 h-4" />
                <span className="text-sm">{formData.phone}</span>
              </div>
            </div>

            {/* Stats */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                {t('Performance Stats')}
              </h3>
              <div className="space-y-4">
                {stats.map((stat, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="text-sm text-gray-600">{t(stat.label)}</div>
                    <div className={`font-semibold text-${stat.color}-600`}>{stat.value}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                {t('Quick Actions')}
              </h3>
              <div className="space-y-3">
                <button className="w-full text-left px-4 py-3 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="w-4 h-4 text-green-600" />
                    <span className="font-medium text-green-800">{t('View Analytics')}</span>
                  </div>
                </button>
                <button className="w-full text-left px-4 py-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                  <div className="flex items-center space-x-2">
                    <Globe className="w-4 h-4 text-blue-600" />
                    <span className="font-medium text-blue-800">{t('Share Profile')}</span>
                  </div>
                </button>
                <button className="w-full text-left px-4 py-3 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors">
                  <div className="flex items-center space-x-2">
                    <Award className="w-4 h-4 text-purple-600" />
                    <span className="font-medium text-purple-800">{t('View Certificates')}</span>
                  </div>
                </button>
              </div>
            </div>

            {/* WhatsApp Integration */}
            <div className="bg-green-50 rounded-xl border border-green-200 p-6">
              <h3 className="text-lg font-semibold text-green-900 mb-4">
                {t('WhatsApp Integration')}
              </h3>
              <p className="text-sm text-green-800 mb-4">
                {t('Get updates and notifications directly on WhatsApp')}
              </p>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-green-800">{t('Connected')}</span>
                </div>
                <div className="text-sm text-green-700">
                  {t('Number')}: {formData.whatsappNumber}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;