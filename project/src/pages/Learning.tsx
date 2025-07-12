import React, { useState } from 'react';
import { BookOpen, Award, Target, Play, CheckCircle, Star, TrendingUp, Users, Zap, Brain, Trophy, Gift } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useNotification } from '../context/NotificationContext';
import { useApp } from '../context/AppContext';
import { useAuth } from '../context/AuthContext';
import CertificateGenerator from '../components/CertificateGenerator';

const Learning = () => {
  const { t } = useLanguage();
  const { addNotification } = useNotification();
  const { user } = useAuth();
  const { updateLearningProgress, completeCourse, learningProgress } = useApp();
  const [activeTab, setActiveTab] = useState('courses');

  const handleStartCourse = (courseId: string, courseTitle: string) => {
    if (!user) {
      addNotification({
        type: 'error',
        title: 'Authentication Required',
        message: 'Please log in to start learning courses.'
      });
      return;
    }

    addNotification({
      type: 'success',
      title: 'Course Started!',
      message: `Welcome to "${courseTitle}". You'll earn points for each completed lesson!`
    });

    // Start first lesson
    updateLearningProgress(courseId, 1);
  };

  const handleCompleteLesson = (courseId: string, lessonId: number) => {
    if (!user) return;
    updateLearningProgress(courseId, lessonId);
  };

  const handleCompleteCourse = (courseId: string, courseTitle: string) => {
    if (!user) return;
    completeCourse(courseId);
    addNotification({
      type: 'success',
      title: 'Course Completed! 🎓',
      message: `Congratulations! You've completed "${courseTitle}" and earned a certificate!`
    });
  };

  const handleJoinChallenge = (challengeName: string) => {
    if (!user) {
      addNotification({
        type: 'error',
        title: 'Authentication Required',
        message: 'Please log in to join community challenges.'
      });
      return;
    }

    addNotification({
      type: 'info',
      title: 'Challenge Joined!',
      message: `You've joined the "${challengeName}". Work with the community to achieve our goal!`
    });
  };

  // Get user's learning progress
  const userProgress = user ? learningProgress.filter(p => p.userId === user.id) : [];
  const totalPoints = userProgress.reduce((sum, p) => sum + p.points, 0);
  const completedCourses = userProgress.filter(p => p.completedAt).length;
  const totalLessons = userProgress.reduce((sum, p) => sum + p.completedLessons.length, 0);

  const courses = [
    {
      id: 'carbon-credits-101',
      title: 'Introduction to Carbon Credits',
      description: 'Learn the basics of carbon markets and how they work',
      duration: '30 minutes',
      difficulty: 'Beginner',
      reward: 50,
      lessons: 8,
      image: 'https://images.pexels.com/photos/1108572/pexels-photo-1108572.jpeg?auto=compress&cs=tinysrgb&w=400',
      trending: true
    },
    {
      id: 'sustainable-farming',
      title: 'Sustainable Farming Practices',
      description: 'Modern techniques for eco-friendly agriculture',
      duration: '45 minutes',
      difficulty: 'Intermediate',
      reward: 75,
      lessons: 12,
      image: 'https://images.pexels.com/photos/1595104/pexels-photo-1595104.jpeg?auto=compress&cs=tinysrgb&w=400',
      trending: false
    },
    {
      id: 'blockchain-fundamentals',
      title: 'Blockchain Fundamentals',
      description: 'Understanding blockchain technology for carbon credits',
      duration: '50 minutes',
      difficulty: 'Intermediate',
      reward: 90,
      lessons: 11,
      image: 'https://images.pexels.com/photos/844124/pexels-photo-844124.jpeg?auto=compress&cs=tinysrgb&w=400',
      trending: true
    },
    {
      id: 'climate-adaptation',
      title: 'Climate Change Adaptation',
      description: 'Preparing your farm for climate resilience',
      duration: '55 minutes',
      difficulty: 'Advanced',
      reward: 110,
      lessons: 13,
      image: 'https://images.pexels.com/photos/1108572/pexels-photo-1108572.jpeg?auto=compress&cs=tinysrgb&w=400',
      trending: false
    },
    {
      id: 'renewable-energy',
      title: 'Renewable Energy Systems',
      description: 'Solar, wind, and biogas solutions for farmers',
      duration: '60 minutes',
      difficulty: 'Advanced',
      reward: 100,
      lessons: 15,
      image: 'https://images.pexels.com/photos/433308/pexels-photo-433308.jpeg?auto=compress&cs=tinysrgb&w=400',
      trending: true
    },
    {
      id: 'water-conservation',
      title: 'Water Conservation Techniques',
      description: 'Efficient irrigation and rainwater harvesting',
      duration: '40 minutes',
      difficulty: 'Intermediate',
      reward: 80,
      lessons: 10,
      image: 'https://images.pexels.com/photos/1108572/pexels-photo-1108572.jpeg?auto=compress&cs=tinysrgb&w=400',
      trending: false
    }
  ];

  const achievements = [
    {
      id: 1,
      title: 'First Steps',
      description: 'Complete your first lesson',
      icon: '🌱',
      earned: totalLessons > 0,
      points: 10,
      rarity: 'common'
    },
    {
      id: 2,
      title: 'Knowledge Seeker',
      description: 'Complete 5 lessons',
      icon: '📚',
      earned: totalLessons >= 5,
      points: 50,
      rarity: 'uncommon'
    },
    {
      id: 3,
      title: 'Carbon Expert',
      description: 'Master carbon credit fundamentals',
      icon: '🌍',
      earned: userProgress.some(p => p.courseId === 'carbon-credits-101' && p.completedAt),
      points: 100,
      rarity: 'rare'
    },
    {
      id: 4,
      title: 'Sustainable Farmer',
      description: 'Complete all farming courses',
      icon: '🚜',
      earned: completedCourses >= 2,
      points: 200,
      rarity: 'epic'
    },
    {
      id: 5,
      title: 'Community Leader',
      description: 'Help 10 other farmers',
      icon: '👥',
      earned: false,
      points: 150,
      rarity: 'rare'
    },
    {
      id: 6,
      title: 'Green Pioneer',
      description: 'Complete all courses',
      icon: '⚡',
      earned: completedCourses >= courses.length,
      points: 250,
      rarity: 'legendary'
    }
  ];

  const leaderboard = [
    { rank: 1, name: 'Ramesh Kumar', points: 1250, location: 'Gujarat', avatar: '👨‍🌾' },
    { rank: 2, name: 'Priya Sharma', points: 1180, location: 'Rajasthan', avatar: '👩‍🌾' },
    { rank: 3, name: 'Arjun Patel', points: 1050, location: 'Maharashtra', avatar: '👨‍🌾' },
    { rank: 4, name: 'Meera Joshi', points: 980, location: 'Himachal Pradesh', avatar: '👩‍🌾' },
    { rank: 5, name: 'Suresh Singh', points: 920, location: 'Punjab', avatar: '👨‍🌾' },
    { rank: 6, name: user?.name || 'You', points: totalPoints, location: user?.location || 'India', avatar: user?.avatar || '🌟' }
  ].sort((a, b) => b.points - a.points).map((item, index) => ({ ...item, rank: index + 1 }));

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'Intermediate':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Advanced':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'border-gray-300 bg-gray-50';
      case 'uncommon': return 'border-green-300 bg-green-50';
      case 'rare': return 'border-blue-300 bg-blue-50';
      case 'epic': return 'border-purple-300 bg-purple-50';
      case 'legendary': return 'border-yellow-300 bg-yellow-50';
      default: return 'border-gray-300 bg-gray-50';
    }
  };

  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1: return 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white';
      case 2: return 'bg-gradient-to-r from-gray-400 to-gray-600 text-white';
      case 3: return 'bg-gradient-to-r from-orange-400 to-red-500 text-white';
      default: return 'bg-gradient-to-r from-blue-400 to-indigo-500 text-white';
    }
  };

  const getCourseProgress = (courseId: string) => {
    const progress = userProgress.find(p => p.courseId === courseId);
    return progress ? progress.completedLessons.length : 0;
  };

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
            {t('Learning Hub')} 🎓
          </h1>
          <p className="text-xl text-gray-600">
            {t('Learn, earn, and grow with our gamified green literacy platform')}
          </p>
        </div>

        {/* Progress Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {[
            { label: 'Lessons Completed', value: totalLessons.toString(), icon: BookOpen, color: 'green' },
            { label: 'Points Earned', value: totalPoints.toString(), icon: Award, color: 'yellow' },
            { label: 'Badges Earned', value: achievements.filter(a => a.earned).length.toString(), icon: Target, color: 'blue' },
            { label: 'Courses Completed', value: completedCourses.toString(), icon: Trophy, color: 'purple' }
          ].map((stat, index) => (
            <div key={index} className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              <div className="flex items-center space-x-4">
                <div className={`p-4 bg-gradient-to-r from-${stat.color}-400 to-${stat.color}-600 rounded-xl shadow-lg`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-3xl font-bold text-gray-900">{stat.value}</div>
                  <div className="text-sm text-gray-500">{t(stat.label)}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Tab Navigation */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 mb-8">
          <div className="flex border-b border-gray-200">
            {['courses', 'achievements', 'leaderboard'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-8 py-4 font-medium transition-all duration-300 ${
                  activeTab === tab
                    ? 'text-purple-600 border-b-2 border-purple-600 bg-purple-50'
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                }`}
              >
                {t(tab.charAt(0).toUpperCase() + tab.slice(1))}
              </button>
            ))}
          </div>

          {/* Courses Tab */}
          {activeTab === 'courses' && (
            <div className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {courses.map((course) => {
                  const completed = getCourseProgress(course.id);
                  const isCompleted = userProgress.some(p => p.courseId === course.id && p.completedAt);
                  
                  return (
                    <div key={course.id} className="bg-gradient-to-br from-white to-gray-50 rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border border-gray-200">
                      <div className="relative">
                        <img
                          src={course.image}
                          alt={course.title}
                          className="w-full h-48 object-cover"
                        />
                        {course.trending && (
                          <div className="absolute top-4 right-4 bg-red-500 text-white text-xs px-3 py-1 rounded-full flex items-center space-x-1">
                            <Zap className="w-3 h-3" />
                            <span>Trending</span>
                          </div>
                        )}
                        {isCompleted && (
                          <div className="absolute top-4 left-4 bg-green-500 text-white text-xs px-3 py-1 rounded-full flex items-center space-x-1">
                            <CheckCircle className="w-3 h-3" />
                            <span>Completed</span>
                          </div>
                        )}
                        <div className="absolute bottom-4 left-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getDifficultyColor(course.difficulty)}`}>
                            {t(course.difficulty)}
                          </span>
                        </div>
                      </div>
                      <div className="p-6">
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-sm text-gray-500">{course.duration}</span>
                          <div className="flex items-center space-x-1">
                            <Gift className="w-4 h-4 text-yellow-600" />
                            <span className="text-sm font-medium text-yellow-600">{course.reward} {t('points')}</span>
                          </div>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-3">{t(course.title)}</h3>
                        <p className="text-gray-600 mb-4">{t(course.description)}</p>
                        
                        <div className="flex items-center justify-between mb-4">
                          <div className="text-sm text-gray-500">
                            {completed}/{course.lessons} {t('lessons completed')}
                          </div>
                          <div className="text-sm font-medium text-purple-600">
                            {Math.round((completed / course.lessons) * 100)}% Complete
                          </div>
                        </div>
                        
                        <div className="w-full bg-gray-200 rounded-full h-3 mb-6">
                          <div
                            className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full transition-all duration-500"
                            style={{ width: `${(completed / course.lessons) * 100}%` }}
                          ></div>
                        </div>
                        
                        {isCompleted ? (
                          <div className="text-center">
                            <div className="flex items-center justify-center space-x-2 text-green-600 mb-4">
                              <Trophy className="w-6 h-6" />
                              <span className="font-bold">Course Completed!</span>
                            </div>
                            <CertificateGenerator
                              courseTitle={course.title}
                              completionDate={userProgress.find(p => p.courseId === course.id)?.completedAt || new Date().toISOString()}
                              points={course.reward}
                            />
                          </div>
                        ) : (
                          <div className="space-y-3">
                            <button 
                              onClick={() => handleStartCourse(course.id, course.title)}
                              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-xl font-bold hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2"
                            >
                              <Play className="w-4 h-4" />
                              <span>{completed > 0 ? t('Continue') : t('Start Course')}</span>
                            </button>
                            
                            {completed > 0 && completed < course.lessons && (
                              <button 
                                onClick={() => handleCompleteLesson(course.id, completed + 1)}
                                className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white py-2 rounded-lg font-medium hover:from-blue-600 hover:to-indigo-600 transition-all duration-300"
                              >
                                Complete Next Lesson
                              </button>
                            )}
                            
                            {completed === course.lessons && !isCompleted && (
                              <button 
                                onClick={() => handleCompleteCourse(course.id, course.title)}
                                className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white py-2 rounded-lg font-medium hover:from-green-600 hover:to-emerald-600 transition-all duration-300 flex items-center justify-center space-x-2"
                              >
                                <Trophy className="w-4 h-4" />
                                <span>Complete Course</span>
                              </button>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Achievements Tab */}
          {activeTab === 'achievements' && (
            <div className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {achievements.map((achievement) => (
                  <div
                    key={achievement.id}
                    className={`p-6 rounded-2xl border-2 transition-all duration-300 transform hover:scale-105 ${
                      achievement.earned
                        ? 'bg-gradient-to-br from-green-50 to-emerald-50 border-green-200 shadow-lg'
                        : `${getRarityColor(achievement.rarity)} border-2`
                    }`}
                  >
                    <div className="text-center">
                      <div className={`text-5xl mb-4 ${achievement.earned ? 'animate-bounce' : 'grayscale'}`}>
                        {achievement.icon}
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 mb-2">
                        {t(achievement.title)}
                      </h3>
                      <p className="text-sm text-gray-600 mb-4">
                        {t(achievement.description)}
                      </p>
                      <div className="flex items-center justify-center space-x-2 mb-3">
                        <Star className={`w-4 h-4 ${achievement.earned ? 'text-yellow-500' : 'text-gray-400'}`} />
                        <span className={`text-sm font-medium ${achievement.earned ? 'text-green-600' : 'text-gray-500'}`}>
                          {achievement.points} {t('points')}
                        </span>
                      </div>
                      <div className={`text-xs px-3 py-1 rounded-full inline-block ${
                        achievement.rarity === 'legendary' ? 'bg-yellow-100 text-yellow-800' :
                        achievement.rarity === 'epic' ? 'bg-purple-100 text-purple-800' :
                        achievement.rarity === 'rare' ? 'bg-blue-100 text-blue-800' :
                        achievement.rarity === 'uncommon' ? 'bg-green-100 text-green-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {achievement.rarity}
                      </div>
                      {achievement.earned && (
                        <div className="mt-4">
                          <CheckCircle className="w-8 h-8 text-green-600 mx-auto animate-pulse" />
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Leaderboard Tab */}
          {activeTab === 'leaderboard' && (
            <div className="p-8">
              <div className="space-y-4">
                {leaderboard.map((userItem, index) => (
                  <div
                    key={index}
                    className={`flex items-center justify-between p-6 rounded-2xl transition-all duration-300 transform hover:scale-102 ${
                      userItem.name === user?.name || userItem.name === 'You' ? 'bg-gradient-to-r from-green-50 to-blue-50 border-2 border-green-200 shadow-lg' : 'bg-white border border-gray-200 hover:shadow-lg'
                    }`}
                  >
                    <div className="flex items-center space-x-6">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg ${getRankColor(userItem.rank)}`}>
                        {userItem.rank}
                      </div>
                      <div className="text-4xl">{userItem.avatar}</div>
                      <div>
                        <div className="font-bold text-gray-900 text-lg flex items-center space-x-2">
                          <span>{userItem.name}</span>
                          {userItem.rank <= 3 && (
                            <Trophy className={`w-5 h-5 ${
                              userItem.rank === 1 ? 'text-yellow-500' :
                              userItem.rank === 2 ? 'text-gray-500' :
                              'text-orange-500'
                            }`} />
                          )}
                        </div>
                        <div className="text-sm text-gray-500">{userItem.location}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-purple-600 text-2xl">{userItem.points.toLocaleString()}</div>
                      <div className="text-sm text-gray-500">{t('points')}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Community Features */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-white/20">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center space-x-2">
              <Users className="w-6 h-6 text-blue-600" />
              <span>{t('Community Challenges')}</span>
            </h3>
            <div className="space-y-6">
              {[
                { title: 'Monthly Tree Planting', desc: 'Plant 1000 trees as a community', progress: 750, target: 1000, color: 'blue' },
                { title: 'Solar Energy Drive', desc: 'Install solar panels in 50 farms', progress: 32, target: 50, color: 'green' }
              ].map((challenge, index) => (
                <div key={index} className={`bg-gradient-to-r from-${challenge.color}-50 to-${challenge.color}-100 p-6 rounded-xl border border-${challenge.color}-200`}>
                  <h4 className={`font-bold text-${challenge.color}-900 mb-2 text-lg`}>{t(challenge.title)}</h4>
                  <p className={`text-sm text-${challenge.color}-800 mb-4`}>{t(challenge.desc)}</p>
                  <div className="flex items-center justify-between mb-3">
                    <div className={`text-xs text-${challenge.color}-600 font-medium`}>
                      Progress: {challenge.progress}/{challenge.target}
                    </div>
                    <div className={`text-xs text-${challenge.color}-600 font-medium`}>
                      {Math.ceil((challenge.target - challenge.progress) / 10)} days left
                    </div>
                  </div>
                  <div className={`w-full bg-${challenge.color}-200 rounded-full h-3 mb-4`}>
                    <div 
                      className={`bg-gradient-to-r from-${challenge.color}-500 to-${challenge.color}-600 h-3 rounded-full transition-all duration-1000`} 
                      style={{ width: `${(challenge.progress / challenge.target) * 100}%` }}
                    ></div>
                  </div>
                  <button 
                    onClick={() => handleJoinChallenge(challenge.title)}
                    className={`w-full bg-gradient-to-r from-${challenge.color}-600 to-${challenge.color}-700 text-white py-2 rounded-lg font-medium hover:from-${challenge.color}-700 hover:to-${challenge.color}-800 transition-all duration-300`}
                  >
                    Join Challenge
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-white/20">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center space-x-2">
              <Brain className="w-6 h-6 text-purple-600" />
              <span>{t('Recent Activity')}</span>
            </h3>
            <div className="space-y-4">
              {[
                { action: 'Completed "Solar Energy Basics"', time: '2 hours ago', icon: '📚', color: 'green' },
                { action: 'Earned "Knowledge Seeker" badge', time: '1 day ago', icon: '🏆', color: 'yellow' },
                { action: 'Joined "Tree Planting Challenge"', time: '3 days ago', icon: '🌳', color: 'blue' },
                { action: 'Started "Water Conservation" course', time: '5 days ago', icon: '💧', color: 'cyan' }
              ].map((activity, index) => (
                <div key={index} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                  <div className="text-2xl">{activity.icon}</div>
                  <div className={`w-3 h-3 bg-${activity.color}-500 rounded-full animate-pulse`}></div>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-gray-900">
                      {t(activity.action)}
                    </div>
                    <div className="text-xs text-gray-500">{activity.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Learning;