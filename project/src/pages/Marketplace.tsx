import React, { useState } from 'react';
import { Search, Filter, TrendingUp, Users, Globe, ShoppingCart, Eye, Star, Zap, MapPin, Calendar, Award } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useNotification } from '../context/NotificationContext';
import { useApp } from '../context/AppContext';
import { useAuth } from '../context/AuthContext';

const Marketplace = () => {
  const { t } = useLanguage();
  const { addNotification } = useNotification();
  const { user } = useAuth();
  const { marketListings, buyCredits, createListing, getUserStats, globalStats } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState('all');

  const userStats = user ? getUserStats(user.id) : null;

  const handleBuyCredits = async (listingId: string) => {
    if (!user) {
      addNotification({
        type: 'error',
        title: 'Authentication Required',
        message: 'Please log in to purchase credits.'
      });
      return;
    }

    const listing = marketListings.find(l => l.id === listingId);
    if (!listing) return;

    try {
      await buyCredits(listingId, user.id);
    } catch (error) {
      addNotification({
        type: 'error',
        title: 'Purchase Failed',
        message: 'Failed to complete the purchase. Please try again.'
      });
    }
  };

  const handleListCredits = () => {
    if (!user) {
      addNotification({
        type: 'error',
        title: 'Authentication Required',
        message: 'Please log in to list credits.'
      });
      return;
    }

    if (!userStats || userStats.totalCredits === 0) {
      addNotification({
        type: 'info',
        title: 'No Credits Available',
        message: 'Complete environmental projects to earn credits for trading.'
      });
      return;
    }

    const creditsToList = Math.min(100, userStats.totalCredits);
    createListing({
      credits: creditsToList,
      pricePerCredit: 12.5,
      totalPrice: creditsToList * 12.5,
      description: 'High-quality carbon credits from verified environmental projects',
      projectType: 'Mixed Portfolio'
    });
  };

  // Sample listings with real data from context
  const sampleListings = [
    {
      id: 'sample-1',
      seller: 'Ramesh Kumar',
      location: 'Gujarat, India',
      type: 'Renewable Energy',
      credits: 500,
      price: 12.5,
      description: 'Solar panel installation in rural farming community',
      verified: true,
      rating: 4.9,
      image: 'https://images.pexels.com/photos/433308/pexels-photo-433308.jpeg?auto=compress&cs=tinysrgb&w=400',
      trending: true,
      createdAt: '2024-01-20T10:00:00Z'
    },
    {
      id: 'sample-2',
      seller: 'Priya Sharma',
      location: 'Rajasthan, India',
      type: 'Forestry',
      credits: 750,
      price: 11.8,
      description: 'Community forest restoration project',
      verified: true,
      rating: 4.8,
      image: 'https://images.pexels.com/photos/1632790/pexels-photo-1632790.jpeg?auto=compress&cs=tinysrgb&w=400',
      trending: false,
      createdAt: '2024-01-19T14:30:00Z'
    },
    {
      id: 'sample-3',
      seller: 'Arjun Patel',
      location: 'Maharashtra, India',
      type: 'Agriculture',
      credits: 300,
      price: 10.5,
      description: 'Organic farming and soil conservation',
      verified: true,
      rating: 4.6,
      image: 'https://images.pexels.com/photos/1595104/pexels-photo-1595104.jpeg?auto=compress&cs=tinysrgb&w=400',
      trending: false,
      createdAt: '2024-01-18T09:15:00Z'
    }
  ];

  // Combine real listings with sample data
  const allListings = [
    ...marketListings.filter(l => l.status === 'active').map(l => ({
      id: l.id,
      seller: 'Verified Farmer',
      location: 'India',
      type: l.projectType,
      credits: l.credits,
      price: l.pricePerCredit,
      description: l.description,
      verified: true,
      rating: 4.8,
      image: 'https://images.pexels.com/photos/433308/pexels-photo-433308.jpeg?auto=compress&cs=tinysrgb&w=400',
      trending: false,
      createdAt: l.createdAt
    })),
    ...sampleListings
  ];

  const buyers = [
    {
      name: 'Microsoft',
      demand: '50,000 credits',
      budget: '₹8,00,000',
      type: 'Technology',
      urgency: 'high'
    },
    {
      name: 'Tata Steel',
      demand: '75,000 credits',
      budget: '₹12,00,000',
      type: 'Manufacturing',
      urgency: 'medium'
    },
    {
      name: 'Infosys',
      demand: '30,000 credits',
      budget: '₹5,00,000',
      type: 'Services',
      urgency: 'low'
    },
    {
      name: 'Reliance',
      demand: '100,000 credits',
      budget: '₹15,00,000',
      type: 'Energy',
      urgency: 'high'
    }
  ];

  const filteredListings = allListings.filter(listing => {
    const matchesSearch = listing.seller.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         listing.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         listing.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || listing.type.toLowerCase().includes(selectedCategory.toLowerCase());
    const matchesPrice = priceRange === 'all' || 
                        (priceRange === '0-10' && listing.price <= 10) ||
                        (priceRange === '10-15' && listing.price > 10 && listing.price <= 15) ||
                        (priceRange === '15+' && listing.price > 15);
    return matchesSearch && matchesCategory && matchesPrice;
  });

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'high': return 'border-red-500 bg-red-50';
      case 'medium': return 'border-yellow-500 bg-yellow-50';
      case 'low': return 'border-green-500 bg-green-50';
      default: return 'border-gray-500 bg-gray-50';
    }
  };

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-4">
            {t('Carbon Credits Marketplace')} 🌍
          </h1>
          <p className="text-xl text-gray-600">
            {t('Connect with global buyers and sellers in the carbon credit ecosystem')}
          </p>
        </div>

        {/* Market Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {[
            { label: 'Avg. Price/Credit', value: '₹12.5', color: 'green', icon: '💰' },
            { label: 'Credits Available', value: (globalStats.totalCredits / 1000).toFixed(0) + 'K', color: 'blue', icon: '📊' },
            { label: 'Active Sellers', value: '234', color: 'purple', icon: '👥' },
            { label: 'Active Buyers', value: '89', color: 'orange', icon: '🏢' }
          ].map((stat, index) => (
            <div key={index} className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              <div className="flex items-center space-x-3 mb-2">
                <span className="text-2xl">{stat.icon}</span>
                <div className={`text-2xl font-bold text-${stat.color}-600`}>{stat.value}</div>
              </div>
              <div className="text-sm text-gray-500">{t(stat.label)}</div>
            </div>
          ))}
        </div>

        {/* Search and Filters */}
        <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-white/20 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder={t('Search sellers, projects, or locations...')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
              />
            </div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 transition-all duration-300"
            >
              <option value="all">{t('All Categories')}</option>
              <option value="renewable">{t('Renewable Energy')}</option>
              <option value="forestry">{t('Forestry')}</option>
              <option value="agriculture">{t('Agriculture')}</option>
              <option value="conservation">{t('Conservation')}</option>
            </select>
            <select
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 transition-all duration-300"
            >
              <option value="all">{t('All Prices')}</option>
              <option value="0-10">₹0-10</option>
              <option value="10-15">₹10-15</option>
              <option value="15+">₹15+</option>
            </select>
            <button className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-xl hover:from-green-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-105">
              <Filter className="w-4 h-4" />
              <span>{t('Filter')}</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Listings */}
          <div className="lg:col-span-3">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">
                {t('Available Credits')} ({filteredListings.length})
              </h2>
              <div className="text-sm text-gray-500">
                Showing {filteredListings.length} of {allListings.length} listings
              </div>
            </div>
            
            <div className="space-y-6">
              {filteredListings.map((listing) => (
                <div key={listing.id} className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-102">
                  <div className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-6">
                        <div className="relative">
                          <img
                            src={listing.image}
                            alt={listing.type}
                            className="w-20 h-20 rounded-xl object-cover shadow-lg"
                          />
                          {listing.trending && (
                            <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full flex items-center space-x-1">
                              <Zap className="w-3 h-3" />
                              <span>Hot</span>
                            </div>
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="text-xl font-bold text-gray-900">{listing.seller}</h3>
                            {listing.verified && (
                              <span className="bg-green-100 text-green-800 text-xs px-3 py-1 rounded-full border border-green-200 flex items-center space-x-1">
                                <Star className="w-3 h-3" />
                                <span>{t('Verified')}</span>
                              </span>
                            )}
                          </div>
                          <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                            <span className="flex items-center space-x-1">
                              <MapPin className="w-4 h-4" />
                              <span>{listing.location}</span>
                            </span>
                            <span>•</span>
                            <span>{listing.type}</span>
                            <span>•</span>
                            <span className="flex items-center space-x-1">
                              <Star className="w-4 h-4 text-yellow-500" />
                              <span>{listing.rating}</span>
                            </span>
                            <span>•</span>
                            <span className="flex items-center space-x-1">
                              <Calendar className="w-4 h-4" />
                              <span>{new Date(listing.createdAt).toLocaleDateString()}</span>
                            </span>
                          </div>
                          <p className="text-gray-600 mb-4 text-lg">{listing.description}</p>
                          <div className="flex items-center space-x-6">
                            <div className="bg-blue-50 px-4 py-2 rounded-lg">
                              <span className="text-sm text-gray-500">Available: </span>
                              <span className="font-bold text-blue-600 text-lg">{listing.credits.toLocaleString()}</span>
                              <span className="text-sm text-gray-500"> {t('credits')}</span>
                            </div>
                            <div className="bg-green-50 px-4 py-2 rounded-lg">
                              <span className="text-sm text-gray-500">Price: </span>
                              <span className="font-bold text-green-600 text-lg">₹{listing.price}</span>
                              <span className="text-sm text-gray-500"> {t('per credit')}</span>
                            </div>
                            <div className="bg-purple-50 px-4 py-2 rounded-lg">
                              <span className="text-sm text-gray-500">Total: </span>
                              <span className="font-bold text-purple-600 text-lg">₹{(listing.credits * listing.price).toLocaleString()}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col space-y-3">
                        <button 
                          onClick={() => handleBuyCredits(listing.id)}
                          className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all duration-300 transform hover:scale-105 font-medium"
                        >
                          <ShoppingCart className="w-4 h-4" />
                          <span>{t('Buy Credits')}</span>
                        </button>
                        <button className="flex items-center space-x-2 px-6 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-all duration-300 font-medium">
                          <Eye className="w-4 h-4" />
                          <span>{t('View Details')}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {filteredListings.length === 0 && (
                <div className="text-center py-12">
                  <ShoppingCart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-medium text-gray-900 mb-2">No Credits Found</h3>
                  <p className="text-gray-500 mb-6">Try adjusting your search filters to find more credits.</p>
                  <button
                    onClick={() => {
                      setSearchTerm('');
                      setSelectedCategory('all');
                      setPriceRange('all');
                    }}
                    className="bg-gradient-to-r from-green-600 to-blue-600 text-white px-6 py-3 rounded-xl font-medium hover:from-green-700 hover:to-blue-700 transition-all duration-300"
                  >
                    Clear Filters
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Active Buyers */}
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-white/20">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center space-x-2">
                <Users className="w-6 h-6 text-blue-600" />
                <span>{t('Active Buyers')}</span>
              </h3>
              <div className="space-y-4">
                {buyers.map((buyer, index) => (
                  <div key={index} className={`border-l-4 pl-4 p-3 rounded-lg ${getUrgencyColor(buyer.urgency)} transition-all duration-300 hover:shadow-md`}>
                    <div className="font-bold text-gray-900 text-lg">{buyer.name}</div>
                    <div className="text-sm text-gray-600">{buyer.type}</div>
                    <div className="text-sm text-blue-600 font-medium">{buyer.demand}</div>
                    <div className="text-sm text-green-600 font-bold">{buyer.budget}</div>
                    <div className={`text-xs mt-1 px-2 py-1 rounded-full inline-block ${
                      buyer.urgency === 'high' ? 'bg-red-100 text-red-800' :
                      buyer.urgency === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {buyer.urgency} priority
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-white/20">
              <h3 className="text-xl font-bold text-gray-900 mb-6">
                {t('Quick Actions')}
              </h3>
              <div className="space-y-3">
                <button 
                  onClick={handleListCredits}
                  className="w-full text-left px-4 py-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl hover:from-green-100 hover:to-emerald-100 transition-all duration-300 border border-green-200 group"
                >
                  <div className="font-bold text-green-800 group-hover:text-green-900 flex items-center space-x-2">
                    <Award className="w-4 h-4" />
                    <span>{t('List Your Credits')}</span>
                  </div>
                  <div className="text-sm text-green-600">
                    {userStats ? `${userStats.totalCredits} credits available` : t('Start selling today')}
                  </div>
                </button>
                <button 
                  onClick={() => window.location.href = '/verification'}
                  className="w-full text-left px-4 py-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl hover:from-blue-100 hover:to-indigo-100 transition-all duration-300 border border-blue-200 group"
                >
                  <div className="font-bold text-blue-800 group-hover:text-blue-900">{t('Submit Project')}</div>
                  <div className="text-sm text-blue-600">{t('Earn credits from environmental projects')}</div>
                </button>
                <button className="w-full text-left px-4 py-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl hover:from-purple-100 hover:to-pink-100 transition-all duration-300 border border-purple-200 group">
                  <div className="font-bold text-purple-800 group-hover:text-purple-900">{t('Price Alerts')}</div>
                  <div className="text-sm text-purple-600">{t('Get notified of price changes')}</div>
                </button>
              </div>
            </div>

            {/* Market Trends */}
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-white/20">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center space-x-2">
                <TrendingUp className="w-6 h-6 text-green-600" />
                <span>{t('Market Trends')}</span>
              </h3>
              <div className="space-y-4">
                {[
                  { category: 'Renewable Energy', change: '+8%', color: 'green' },
                  { category: 'Forestry', change: '+12%', color: 'green' },
                  { category: 'Agriculture', change: '+5%', color: 'green' },
                  { category: 'Conservation', change: '+15%', color: 'green' }
                ].map((trend, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <span className="text-sm text-gray-600 font-medium">{t(trend.category)}</span>
                    <span className={`text-sm text-${trend.color}-600 flex items-center space-x-1 font-bold`}>
                      <TrendingUp className="w-3 h-3" />
                      <span>{trend.change}</span>
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* User Stats (if logged in) */}
            {user && userStats && (
              <div className="bg-gradient-to-br from-green-50 to-blue-50 p-6 rounded-2xl border border-green-200">
                <h3 className="text-xl font-bold text-gray-900 mb-6">
                  Your Portfolio
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Credits Owned:</span>
                    <span className="font-bold text-green-600">{userStats.totalCredits}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Earnings:</span>
                    <span className="font-bold text-green-600">₹{userStats.totalEarnings.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Projects:</span>
                    <span className="font-bold text-blue-600">{userStats.projectsCompleted}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Carbon Impact:</span>
                    <span className="font-bold text-emerald-600">{userStats.carbonImpact.toFixed(1)} tons</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Marketplace;