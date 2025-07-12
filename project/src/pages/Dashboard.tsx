import React, { useState, useEffect } from 'react';
import { TrendingUp, Leaf, Users, Award, DollarSign, Activity, Zap, Target, BarChart3, PieChart, Plus, ArrowUp, ArrowDown } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext';
import { useApp } from '../context/AppContext';

const Dashboard = () => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const { addNotification } = useNotification();
  const { getUserStats, projects, transactions, createListing, globalStats } = useApp();
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [animatedStats, setAnimatedStats] = useState({
    credits: 0,
    income: 0,
    carbon: 0,
    score: 0
  });

  // Get real user stats
  const userStats = user ? getUserStats(user.id) : {
    totalCredits: 0,
    totalEarnings: 0,
    projectsCompleted: 0,
    carbonImpact: 0,
    learningPoints: 0
  };

  // Animate stats on load
  useEffect(() => {
    if (!user) return;

    const targetStats = {
      credits: userStats.totalCredits,
      income: userStats.totalEarnings,
      carbon: userStats.carbonImpact,
      score: Math.min(98, 70 + (userStats.projectsCompleted * 5))
    };

    const duration = 2000;
    const steps = 60;
    const stepDuration = duration / steps;

    let currentStep = 0;
    const interval = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      
      setAnimatedStats({
        credits: Math.floor(targetStats.credits * progress),
        income: Math.floor(targetStats.income * progress),
        carbon: Number((targetStats.carbon * progress).toFixed(1)),
        score: Math.floor(targetStats.score * progress)
      });

      if (currentStep >= steps) {
        clearInterval(interval);
        setAnimatedStats(targetStats);
      }
    }, stepDuration);

    return () => clearInterval(interval);
  }, [user, userStats]);

  const handleQuickAction = (action: string) => {
    switch (action) {
      case 'log':
        addNotification({
          type: 'info',
          title: 'Project Submission',
          message: 'Redirecting to verification page to submit your environmental project...'
        });
        // In a real app, this would navigate to verification page
        window.location.href = '/verification';
        break;
      case 'trade':
        if (userStats.totalCredits > 0) {
          // Create a sample listing
          createListing({
            credits: Math.min(100, userStats.totalCredits),
            pricePerCredit: 12.5,
            totalPrice: Math.min(100, userStats.totalCredits) * 12.5,
            description: 'High-quality carbon credits from verified environmental projects',
            projectType: 'Mixed Portfolio'
          });
        } else {
          addNotification({
            type: 'info',
            title: 'No Credits Available',
            message: 'Complete environmental projects to earn credits for trading.'
          });
        }
        break;
      case 'learn':
        addNotification({
          type: 'success',
          title: 'Learning Module Started',
          message: 'Welcome to "Sustainable Farming Practices" course!'
        });
        window.location.href = '/learning';
        break;
    }
  };

  // Role-specific dashboard content
  const getDashboardContent = () => {
    switch (user?.role) {
      case 'farmer':
        return getFarmerDashboard();
      case 'buyer':
        return getBuyerDashboard();
      case 'verifier':
        return getVerifierDashboard();
      case 'admin':
        return getAdminDashboard();
      default:
        return getFarmerDashboard();
    }
  };

  const getFarmerDashboard = () => {
    const stats = [
      {
        title: 'Total Credits Earned',
        value: animatedStats.credits.toLocaleString(),
        unit: 'GramCredits',
        change: userStats.projectsCompleted > 0 ? '+12%' : '0%',
        icon: <Award className="w-8 h-8 text-yellow-600" />,
        color: 'yellow',
        bgGradient: 'from-yellow-400 to-orange-500'
      },
      {
        title: 'Total Earnings',
        value: `₹${animatedStats.income.toLocaleString()}`,
        unit: 'INR',
        change: userStats.totalEarnings > 0 ? '+8%' : '0%',
        icon: <DollarSign className="w-8 h-8 text-green-600" />,
        color: 'green',
        bgGradient: 'from-green-400 to-emerald-500'
      },
      {
        title: 'Carbon Impact',
        value: animatedStats.carbon.toString(),
        unit: 'CO2 Tons Saved',
        change: userStats.carbonImpact > 0 ? '+15%' : '0%',
        icon: <Leaf className="w-8 h-8 text-emerald-600" />,
        color: 'emerald',
        bgGradient: 'from-emerald-400 to-teal-500'
      },
      {
        title: 'Verification Score',
        value: `${animatedStats.score}%`,
        unit: 'Accuracy',
        change: '+2%',
        icon: <Activity className="w-8 h-8 text-blue-600" />,
        color: 'blue',
        bgGradient: 'from-blue-400 to-indigo-500'
      }
    ];

    const quickActions = [
      { 
        action: 'log', 
        title: 'Submit New Project', 
        desc: 'Record environmental actions', 
        gradient: 'from-green-500 to-emerald-600',
        icon: <Plus className="w-6 h-6" />
      },
      { 
        action: 'trade', 
        title: 'List Credits for Sale', 
        desc: 'Sell in marketplace', 
        gradient: 'from-blue-500 to-indigo-600',
        icon: <TrendingUp className="w-6 h-6" />
      },
      { 
        action: 'learn', 
        title: 'Learn & Earn', 
        desc: 'Complete training modules', 
        gradient: 'from-purple-500 to-pink-600',
        icon: <Target className="w-6 h-6" />
      }
    ];

    return { stats, quickActions };
  };

  const getBuyerDashboard = () => {
    const stats = [
      {
        title: 'Credits Purchased',
        value: '15,250',
        unit: 'Credits',
        change: '+25%',
        icon: <Award className="w-8 h-8 text-blue-600" />,
        color: 'blue',
        bgGradient: 'from-blue-400 to-indigo-500'
      },
      {
        title: 'Total Investment',
        value: '₹2,85,000',
        unit: 'INR',
        change: '+18%',
        icon: <DollarSign className="w-8 h-8 text-green-600" />,
        color: 'green',
        bgGradient: 'from-green-400 to-emerald-500'
      },
      {
        title: 'Carbon Offset',
        value: '45.8',
        unit: 'CO2 Tons',
        change: '+22%',
        icon: <Leaf className="w-8 h-8 text-emerald-600" />,
        color: 'emerald',
        bgGradient: 'from-emerald-400 to-teal-500'
      },
      {
        title: 'Active Projects',
        value: '28',
        unit: 'Projects',
        change: '+5%',
        icon: <Activity className="w-8 h-8 text-purple-600" />,
        color: 'purple',
        bgGradient: 'from-purple-400 to-pink-500'
      }
    ];

    const quickActions = [
      { 
        action: 'browse', 
        title: 'Browse Credits', 
        desc: 'Find new carbon credits', 
        gradient: 'from-blue-500 to-indigo-600',
        icon: <BarChart3 className="w-6 h-6" />
      },
      { 
        action: 'portfolio', 
        title: 'View Portfolio', 
        desc: 'Track your investments', 
        gradient: 'from-green-500 to-emerald-600',
        icon: <PieChart className="w-6 h-6" />
      },
      { 
        action: 'reports', 
        title: 'Impact Reports', 
        desc: 'Download sustainability reports', 
        gradient: 'from-purple-500 to-pink-600',
        icon: <Activity className="w-6 h-6" />
      }
    ];

    return { stats, quickActions };
  };

  const getVerifierDashboard = () => {
    const stats = [
      {
        title: 'Projects Verified',
        value: '342',
        unit: 'Projects',
        change: '+15%',
        icon: <Award className="w-8 h-8 text-green-600" />,
        color: 'green',
        bgGradient: 'from-green-400 to-emerald-500'
      },
      {
        title: 'Pending Reviews',
        value: '28',
        unit: 'Projects',
        change: '+5%',
        icon: <Activity className="w-8 h-8 text-yellow-600" />,
        color: 'yellow',
        bgGradient: 'from-yellow-400 to-orange-500'
      },
      {
        title: 'Verification Rate',
        value: '96.5%',
        unit: 'Accuracy',
        change: '+2%',
        icon: <Target className="w-8 h-8 text-blue-600" />,
        color: 'blue',
        bgGradient: 'from-blue-400 to-indigo-500'
      },
      {
        title: 'Credits Issued',
        value: '125K',
        unit: 'Credits',
        change: '+20%',
        icon: <Leaf className="w-8 h-8 text-emerald-600" />,
        color: 'emerald',
        bgGradient: 'from-emerald-400 to-teal-500'
      }
    ];

    const quickActions = [
      { 
        action: 'review', 
        title: 'Review Projects', 
        desc: 'Verify pending submissions', 
        gradient: 'from-blue-500 to-indigo-600',
        icon: <Activity className="w-6 h-6" />
      },
      { 
        action: 'ai', 
        title: 'AI Analysis', 
        desc: 'Run satellite verification', 
        gradient: 'from-purple-500 to-pink-600',
        icon: <Target className="w-6 h-6" />
      },
      { 
        action: 'reports', 
        title: 'Generate Reports', 
        desc: 'Create verification reports', 
        gradient: 'from-green-500 to-emerald-600',
        icon: <BarChart3 className="w-6 h-6" />
      }
    ];

    return { stats, quickActions };
  };

  const getAdminDashboard = () => {
    const stats = [
      {
        title: 'Total Users',
        value: globalStats.totalUsers.toLocaleString(),
        unit: 'Users',
        change: '+35%',
        icon: <Users className="w-8 h-8 text-blue-600" />,
        color: 'blue',
        bgGradient: 'from-blue-400 to-indigo-500'
      },
      {
        title: 'Platform Revenue',
        value: `₹${(globalStats.totalEarnings * 0.05).toLocaleString()}`,
        unit: 'INR',
        change: '+28%',
        icon: <DollarSign className="w-8 h-8 text-green-600" />,
        color: 'green',
        bgGradient: 'from-green-400 to-emerald-500'
      },
      {
        title: 'Total Credits',
        value: `${(globalStats.totalCredits / 1000000).toFixed(1)}M`,
        unit: 'Credits',
        change: '+42%',
        icon: <Award className="w-8 h-8 text-yellow-600" />,
        color: 'yellow',
        bgGradient: 'from-yellow-400 to-orange-500'
      },
      {
        title: 'System Health',
        value: '99.8%',
        unit: 'Uptime',
        change: '+0.2%',
        icon: <Activity className="w-8 h-8 text-emerald-600" />,
        color: 'emerald',
        bgGradient: 'from-emerald-400 to-teal-500'
      }
    ];

    const quickActions = [
      { 
        action: 'users', 
        title: 'Manage Users', 
        desc: 'User administration', 
        gradient: 'from-blue-500 to-indigo-600',
        icon: <Users className="w-6 h-6" />
      },
      { 
        action: 'analytics', 
        title: 'Platform Analytics', 
        desc: 'View detailed metrics', 
        gradient: 'from-purple-500 to-pink-600',
        icon: <BarChart3 className="w-6 h-6" />
      },
      { 
        action: 'settings', 
        title: 'System Settings', 
        desc: 'Configure platform', 
        gradient: 'from-green-500 to-emerald-600',
        icon: <Activity className="w-6 h-6" />
      }
    ];

    return { stats, quickActions };
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Please log in to access your dashboard</h2>
          <p className="text-gray-600">You need to be authenticated to view this page.</p>
        </div>
      </div>
    );
  }

  const { stats, quickActions } = getDashboardContent();

  // Get user's recent projects and transactions
  const userProjects = projects.filter(p => p.userId === user.id).slice(0, 3);
  const userTransactions = transactions.filter(t => 
    (t.type === 'earn' && t.projectId && projects.find(p => p.id === t.projectId)?.userId === user.id) ||
    (t.type === 'sell' && t.fromUserId === user.id) ||
    (t.type === 'buy' && t.toUserId === user.id)
  ).slice(0, 5);

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-4">
            {t('Welcome back')}, {user.name}! {user.avatar}
          </h1>
          <p className="text-xl text-gray-600">
            {user.role === 'farmer' && t('Track your environmental impact and earnings')}
            {user.role === 'buyer' && 'Monitor your carbon credit investments and impact'}
            {user.role === 'verifier' && 'Review and verify environmental projects'}
            {user.role === 'admin' && 'Manage the GramCredits platform'}
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {quickActions.map((action, index) => (
            <button 
              key={index}
              onClick={() => handleQuickAction(action.action)}
              className={`group bg-gradient-to-r ${action.gradient} text-white p-6 rounded-2xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105`}
            >
              <div className="flex items-center space-x-3 mb-2">
                <div className="group-hover:animate-pulse">{action.icon}</div>
                <div className="text-xl font-bold">{action.title}</div>
              </div>
              <div className="text-sm opacity-90">{action.desc}</div>
            </button>
          ))}
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="group bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-white/20 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-4 rounded-xl bg-gradient-to-r ${stat.bgGradient} shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  {stat.icon}
                </div>
                <div className={`text-sm text-${stat.color}-600 font-bold bg-${stat.color}-100 px-3 py-1 rounded-full flex items-center space-x-1`}>
                  {stat.change.startsWith('+') ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
                  <span>{stat.change}</span>
                </div>
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1 group-hover:text-green-600 transition-colors">
                {stat.value}
              </div>
              <div className="text-sm text-gray-500 mb-2">{stat.unit}</div>
              <div className="text-xs text-gray-400">{t(stat.title)}</div>
            </div>
          ))}
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Projects */}
          <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-white/20">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              {t('Recent Projects')}
            </h3>
            {userProjects.length > 0 ? (
              <div className="space-y-4">
                {userProjects.map((project) => (
                  <div key={project.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${
                        project.status === 'verified' ? 'bg-green-500' : 
                        project.status === 'pending' ? 'bg-yellow-500 animate-pulse' : 'bg-red-500'
                      }`}></div>
                      <div>
                        <div className="font-medium text-gray-900">{project.title}</div>
                        <div className="text-sm text-gray-500">{new Date(project.submittedAt).toLocaleDateString()}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-green-600">+{project.credits}</div>
                      <div className="text-xs text-gray-500">{project.status}</div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <Leaf className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>No projects yet. Submit your first environmental project!</p>
              </div>
            )}
          </div>

          {/* Recent Transactions */}
          <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-white/20">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              {t('Recent Transactions')}
            </h3>
            {userTransactions.length > 0 ? (
              <div className="space-y-4">
                {userTransactions.map((transaction) => (
                  <div key={transaction.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-full ${
                        transaction.type === 'earn' ? 'bg-green-100' :
                        transaction.type === 'sell' ? 'bg-blue-100' : 'bg-purple-100'
                      }`}>
                        {transaction.type === 'earn' ? <Plus className="w-4 h-4 text-green-600" /> :
                         transaction.type === 'sell' ? <ArrowUp className="w-4 h-4 text-blue-600" /> :
                         <ArrowDown className="w-4 h-4 text-purple-600" />}
                      </div>
                      <div>
                        <div className="font-medium text-gray-900 capitalize">{transaction.type}</div>
                        <div className="text-sm text-gray-500">{new Date(transaction.timestamp).toLocaleDateString()}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`font-semibold ${
                        transaction.type === 'earn' || transaction.type === 'sell' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {transaction.type === 'earn' || transaction.type === 'sell' ? '+' : '-'}₹{transaction.amount.toLocaleString()}
                      </div>
                      <div className="text-xs text-gray-500">{transaction.credits} credits</div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <DollarSign className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>No transactions yet. Start earning by submitting projects!</p>
              </div>
            )}
          </div>
        </div>

        {/* Environmental Impact Visualization for Farmers */}
        {user.role === 'farmer' && userStats.projectsCompleted > 0 && (
          <div className="mt-8 bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-white/20">
            <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
              {t('Environmental Impact')} 🌍
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center group">
                <div className="w-20 h-20 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <Leaf className="w-10 h-10 text-white" />
                </div>
                <div className="text-3xl font-bold text-gray-900 group-hover:text-green-600 transition-colors">
                  {Math.floor(userStats.carbonImpact * 100)}
                </div>
                <div className="text-sm text-gray-500">{t('Trees Equivalent')}</div>
                <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-gradient-to-r from-green-400 to-emerald-500 h-2 rounded-full" style={{ width: '85%' }}></div>
                </div>
              </div>
              <div className="text-center group">
                <div className="w-20 h-20 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <Zap className="w-10 h-10 text-white" />
                </div>
                <div className="text-3xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                  {(userStats.totalCredits * 0.01).toFixed(1)} kW
                </div>
                <div className="text-sm text-gray-500">{t('Clean Energy')}</div>
                <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-gradient-to-r from-blue-400 to-indigo-500 h-2 rounded-full" style={{ width: '70%' }}></div>
                </div>
              </div>
              <div className="text-center group">
                <div className="w-20 h-20 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <Users className="w-10 h-10 text-white" />
                </div>
                <div className="text-3xl font-bold text-gray-900 group-hover:text-purple-600 transition-colors">
                  {userStats.projectsCompleted * 15}
                </div>
                <div className="text-sm text-gray-500">{t('People Inspired')}</div>
                <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-gradient-to-r from-purple-400 to-pink-500 h-2 rounded-full" style={{ width: '90%' }}></div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;