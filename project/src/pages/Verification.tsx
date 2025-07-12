import React, { useState } from 'react';
import { Upload, Camera, Satellite, CheckCircle, Clock, AlertCircle, Map, Activity, Zap, Brain, FileText, MapPin } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useNotification } from '../context/NotificationContext';
import { useApp } from '../context/AppContext';
import { useAuth } from '../context/AuthContext';

const Verification = () => {
  const { t } = useLanguage();
  const { addNotification } = useNotification();
  const { user } = useAuth();
  const { submitProject, projects, runAIVerification } = useApp();
  const [activeTab, setActiveTab] = useState('submit');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    title: '',
    type: '',
    location: '',
    description: '',
    evidence: [] as string[]
  });

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const fileNames = Array.from(files).map(file => file.name);
      setUploadedFiles(prev => [...prev, ...fileNames]);
      setFormData(prev => ({
        ...prev,
        evidence: [...prev.evidence, ...fileNames]
      }));
      addNotification({
        type: 'success',
        title: 'Files Uploaded!',
        message: `${files.length} file(s) uploaded successfully for AI analysis.`
      });
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmitProject = async () => {
    if (!formData.type || !formData.title || !formData.location || !formData.description) {
      addNotification({
        type: 'error',
        title: 'Missing Information',
        message: 'Please fill in all required fields before submitting.'
      });
      return;
    }

    if (!user) {
      addNotification({
        type: 'error',
        title: 'Authentication Required',
        message: 'Please log in to submit a project.'
      });
      return;
    }

    setIsSubmitting(true);
    
    // Run fraud detection
    addNotification({
      type: 'info',
      title: 'Running Security Checks',
      message: 'Verifying project authenticity and location...'
    });
    
    // Simulate fraud detection
    setTimeout(async () => {
      const fraudCheck = Math.random() > 0.1; // 90% pass rate
      
      if (!fraudCheck) {
        addNotification({
          type: 'error',
          title: 'Security Alert',
          message: 'Project location or images could not be verified. Please ensure you are submitting from your actual farm location with original photos.'
        });
        setIsSubmitting(false);
        return;
      }
      
      addNotification({
        type: 'success',
        title: 'Security Checks Passed',
        message: 'Location verified ✓ Images authentic ✓ Proceeding with AI verification...'
      });
      
      // Continue with normal submission
      submitProjectAfterChecks();
    }, 2000);
  };
  
  const submitProjectAfterChecks = async () => {
    try {
      await submitProject({
        title: formData.title,
        type: formData.type,
        location: formData.location,
        description: formData.description,
        evidence: formData.evidence
      });

      // Reset form
      setFormData({
        title: '',
        type: '',
        location: '',
        description: '',
        evidence: []
      });
      setUploadedFiles([]);
      
      // Switch to history tab to see the submitted project
      setTimeout(() => {
        setActiveTab('history');
      }, 1000);

    } catch (error) {
      addNotification({
        type: 'error',
        title: 'Submission Failed',
        message: 'Failed to submit project. Please try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'verified':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'pending':
        return <Clock className="w-5 h-5 text-yellow-600 animate-spin" />;
      case 'rejected':
        return <AlertCircle className="w-5 h-5 text-red-600" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'verified':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'rejected':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  // Get user's projects
  const userProjects = user ? projects.filter(p => p.userId === user.id) : [];

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            {t('Project Verification')} 🛰️
          </h1>
          <p className="text-xl text-gray-600">
            {t('Submit your environmental projects for AI-powered verification')}
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 mb-8">
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => setActiveTab('submit')}
              className={`px-8 py-4 font-medium transition-all duration-300 ${
                activeTab === 'submit'
                  ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              }`}
            >
              {t('Submit Project')}
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`px-8 py-4 font-medium transition-all duration-300 ${
                activeTab === 'history'
                  ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              }`}
            >
              {t('Verification History')} ({userProjects.length})
            </button>
            <button
              onClick={() => setActiveTab('realtime')}
              className={`px-8 py-4 font-medium transition-all duration-300 ${
                activeTab === 'realtime'
                  ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              }`}
            >
              {t('Real-time Monitoring')}
            </button>
          </div>

          {/* Submit Project Tab */}
          {activeTab === 'submit' && (
            <div className="p-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      {t('Project Title')} *
                    </label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => handleInputChange('title', e.target.value)}
                      placeholder="e.g., Solar Panel Installation on Farm"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      {t('Project Type')} *
                    </label>
                    <select
                      value={formData.type}
                      onChange={(e) => handleInputChange('type', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    >
                      <option value="">{t('Select Project Type')}</option>
                      <option value="Renewable Energy">{t('Renewable Energy')}</option>
                      <option value="Forestry">{t('Forestry')}</option>
                      <option value="Agriculture">{t('Agriculture')}</option>
                      <option value="Water Conservation">{t('Water Conservation')}</option>
                      <option value="Soil Conservation">{t('Soil Conservation')}</option>
                      <option value="Waste Management">Waste Management</option>
                      <option value="Energy Efficiency">Energy Efficiency</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      {t('Project Location')} *
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        value={formData.location}
                        onChange={(e) => handleInputChange('location', e.target.value)}
                        placeholder={t('Enter address or coordinates')}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      {t('Project Description')} *
                    </label>
                    <textarea
                      rows={4}
                      value={formData.description}
                      onChange={(e) => handleInputChange('description', e.target.value)}
                      placeholder={t('Describe your environmental project in detail...')}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      {t('Upload Evidence')}
                    </label>
                    <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-blue-400 transition-colors duration-300 bg-gradient-to-br from-blue-50 to-indigo-50">
                      <Upload className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                      <p className="text-lg text-gray-600 mb-2">
                        {t('Drop files here or click to browse')}
                      </p>
                      <p className="text-sm text-gray-500 mb-4">
                        {t('Support: JPG, PNG, PDF, MP4 (max 10MB)')}
                      </p>
                      <input 
                        type="file" 
                        className="hidden" 
                        multiple 
                        accept=".jpg,.jpeg,.png,.pdf,.mp4"
                        onChange={handleFileUpload}
                        id="file-upload"
                      />
                      <label 
                        htmlFor="file-upload"
                        className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors cursor-pointer inline-block"
                      >
                        Choose Files
                      </label>
                      
                      {uploadedFiles.length > 0 && (
                        <div className="mt-4 text-left">
                          <p className="text-sm font-medium text-gray-700 mb-2">Uploaded Files:</p>
                          {uploadedFiles.map((file, index) => (
                            <div key={index} className="text-sm text-green-600 bg-green-50 px-3 py-1 rounded-lg mb-1 flex items-center space-x-2">
                              <FileText className="w-4 h-4" />
                              <span>✓ {file}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  <button 
                    onClick={handleSubmitProject}
                    disabled={isSubmitting || !user}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-xl font-bold text-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                  >
                    {isSubmitting ? (
                      <>
                        <Brain className="w-5 h-5 animate-pulse" />
                        <span>Submitting...</span>
                      </>
                    ) : (
                      <>
                        <Zap className="w-5 h-5" />
                        <span>{t('Submit for Verification')}</span>
                      </>
                    )}
                  </button>

                  {!user && (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
                      <p className="text-yellow-800 text-sm">
                        Please log in to submit projects for verification.
                      </p>
                    </div>
                  )}
                </div>

                <div className="space-y-6">
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-100 p-8 rounded-2xl border border-blue-200">
                    <h3 className="text-xl font-bold text-blue-900 mb-6 flex items-center space-x-2">
                      <Brain className="w-6 h-6" />
                      <span>{t('AI Verification Process')}</span>
                    </h3>
                    <div className="space-y-4">
                      {[
                        { step: 1, title: 'Data Collection', desc: 'Satellite imagery and project data analysis', icon: '📡' },
                        { step: 2, title: 'AI Analysis', desc: 'Machine learning algorithms verify impact', icon: '🧠' },
                        { step: 3, title: 'Blockchain Recording', desc: 'Results stored on immutable ledger', icon: '⛓️' },
                        { step: 4, title: 'Credit Generation', desc: 'GramCredits issued based on verified impact', icon: '💰' }
                      ].map((item, index) => (
                        <div key={index} className="flex items-start space-x-4 group">
                          <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold group-hover:scale-110 transition-transform duration-300">
                            {item.step}
                          </div>
                          <div className="flex-1">
                            <div className="font-medium text-blue-900 flex items-center space-x-2">
                              <span>{item.icon}</span>
                              <span>{t(item.title)}</span>
                            </div>
                            <div className="text-sm text-blue-700">{t(item.desc)}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-green-50 to-emerald-100 p-8 rounded-2xl border border-green-200">
                    <h3 className="text-xl font-bold text-green-900 mb-6">
                      {t('Verification Benefits')}
                    </h3>
                    <ul className="space-y-3">
                      {[
                        '95%+ accuracy with AI verification',
                        '24-48 hour verification time',
                        'Transparent blockchain recording',
                        'Instant credit generation',
                        'Global marketplace access',
                        'Real-time impact tracking'
                      ].map((benefit, index) => (
                        <li key={index} className="flex items-center space-x-3 group">
                          <CheckCircle className="w-5 h-5 text-green-600 group-hover:scale-110 transition-transform duration-300" />
                          <span className="text-green-800">{t(benefit)}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Verification History Tab */}
          {activeTab === 'history' && (
            <div className="p-8">
              {userProjects.length > 0 ? (
                <div className="space-y-6">
                  {userProjects.map((project) => (
                    <div key={project.id} className="bg-gradient-to-r from-gray-50 to-white p-6 rounded-2xl border border-gray-200 hover:shadow-lg transition-all duration-300 transform hover:scale-102">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-4">
                          {getStatusIcon(project.status)}
                          <div>
                            <h3 className="font-bold text-gray-900 text-lg">{project.title}</h3>
                            <p className="text-sm text-gray-500">{new Date(project.submittedAt).toLocaleDateString()}</p>
                          </div>
                        </div>
                        <span className={`px-4 py-2 rounded-full text-sm font-medium border ${getStatusColor(project.status)}`}>
                          {t(project.status)}
                        </span>
                      </div>
                      
                      <div className="mb-4">
                        <p className="text-gray-600 mb-2">{project.description}</p>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <span className="flex items-center space-x-1">
                            <MapPin className="w-4 h-4" />
                            <span>{project.location}</span>
                          </span>
                          <span>•</span>
                          <span>{project.type}</span>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                        <div className="bg-green-50 p-3 rounded-lg">
                          <span className="text-gray-500">{t('Credits Earned')}: </span>
                          <span className="font-bold text-green-600 text-lg">{project.credits}</span>
                        </div>
                        <div className="bg-blue-50 p-3 rounded-lg">
                          <span className="text-gray-500">{t('Type')}: </span>
                          <span className="font-bold text-blue-600">{project.type}</span>
                        </div>
                        <div className="bg-purple-50 p-3 rounded-lg">
                          <span className="text-gray-500">{t('Confidence')}: </span>
                          <span className="font-bold text-purple-600">{project.confidence}%</span>
                        </div>
                        <div className="bg-gray-50 p-3 rounded-lg">
                          <span className="text-gray-500">Blockchain: </span>
                          <span className="font-mono text-xs text-gray-600">
                            {project.blockchainTx ? `${project.blockchainTx.substring(0, 10)}...` : 'Processing...'}
                          </span>
                        </div>
                      </div>
                      
                      {project.evidence.length > 0 && (
                        <div className="mt-4">
                          <p className="text-sm font-medium text-gray-700 mb-2">Evidence Files:</p>
                          <div className="flex flex-wrap gap-2">
                            {project.evidence.map((file, index) => (
                              <span key={index} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                                {file}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Satellite className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-medium text-gray-900 mb-2">No Projects Yet</h3>
                  <p className="text-gray-500 mb-6">Submit your first environmental project to get started!</p>
                  <button
                    onClick={() => setActiveTab('submit')}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
                  >
                    Submit Project
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Real-time Monitoring Tab */}
          {activeTab === 'realtime' && (
            <div className="p-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="bg-gradient-to-br from-green-50 to-blue-50 p-8 rounded-2xl border border-green-200">
                    <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center space-x-2">
                      <Satellite className="w-6 h-6 text-blue-600" />
                      <span>{t('Live Satellite Feed')}</span>
                    </h3>
                    <div className="bg-gradient-to-br from-gray-900 to-blue-900 rounded-xl h-64 flex items-center justify-center relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-r from-green-400/20 to-blue-400/20 animate-pulse"></div>
                      <Satellite className="w-20 h-20 text-green-400 animate-bounce" />
                      <div className="absolute bottom-4 left-4 text-green-400 text-sm font-mono">
                        Live Feed: 23.0225°N, 72.5714°E
                      </div>
                      <div className="absolute top-4 right-4 text-green-400 text-xs">
                        🟢 LIVE
                      </div>
                    </div>
                    <div className="mt-4 text-sm text-gray-600">
                      {t('Real-time satellite imagery of your project locations')}
                    </div>
                  </div>

                  <div className="bg-white border border-gray-200 p-8 rounded-2xl shadow-lg">
                    <h3 className="text-xl font-bold text-gray-900 mb-6">
                      {t('Environmental Metrics')}
                    </h3>
                    <div className="space-y-4">
                      {[
                        { label: 'Carbon Sequestration', value: '12.5 tons CO2', color: 'green', progress: 85 },
                        { label: 'Energy Generation', value: '5.2 kWh', color: 'blue', progress: 70 },
                        { label: 'Water Saved', value: '1,200 liters', color: 'cyan', progress: 90 },
                        { label: 'Soil Health', value: '85% improved', color: 'emerald', progress: 85 }
                      ].map((metric, index) => (
                        <div key={index} className="group">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-gray-600">{t(metric.label)}</span>
                            <span className={`font-bold text-${metric.color}-600 text-lg`}>{metric.value}</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-3">
                            <div 
                              className={`bg-gradient-to-r from-${metric.color}-400 to-${metric.color}-600 h-3 rounded-full transition-all duration-1000 ease-out`}
                              style={{ width: `${metric.progress}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="bg-white border border-gray-200 p-8 rounded-2xl shadow-lg">
                    <h3 className="text-xl font-bold text-gray-900 mb-6">
                      {t('Project Status')}
                    </h3>
                    <div className="space-y-4">
                      {[
                        { status: 'Solar panels operational', active: true, icon: '☀️' },
                        { status: 'Tree growth monitored', active: true, icon: '🌳' },
                        { status: 'Soil analysis pending', active: false, icon: '🌱' },
                        { status: 'Water conservation active', active: true, icon: '💧' }
                      ].map((item, index) => (
                        <div key={index} className="flex items-center space-x-4 group">
                          <div className="text-2xl group-hover:scale-110 transition-transform duration-300">
                            {item.icon}
                          </div>
                          <div className={`w-3 h-3 rounded-full ${item.active ? 'bg-green-500 animate-pulse' : 'bg-yellow-500 animate-pulse'}`}></div>
                          <span className="text-sm font-medium">{t(item.status)}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-white border border-gray-200 p-8 rounded-2xl shadow-lg">
                    <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center space-x-2">
                      <Brain className="w-6 h-6 text-purple-600" />
                      <span>{t('AI Insights')}</span>
                    </h3>
                    <div className="space-y-4">
                      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-200">
                        <div className="flex items-center space-x-3 mb-3">
                          <Activity className="w-5 h-5 text-blue-600" />
                          <span className="text-sm font-bold text-blue-900">{t('Recommendation')}</span>
                        </div>
                        <p className="text-sm text-blue-800">
                          {t('Consider planting additional trees on the eastern boundary to maximize carbon capture potential.')}
                        </p>
                      </div>
                      <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-xl border border-green-200">
                        <div className="flex items-center space-x-3 mb-3">
                          <CheckCircle className="w-5 h-5 text-green-600" />
                          <span className="text-sm font-bold text-green-900">{t('Achievement')}</span>
                        </div>
                        <p className="text-sm text-green-800">
                          {t('Your projects have exceeded the initial carbon reduction target by 15%!')}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Verification;