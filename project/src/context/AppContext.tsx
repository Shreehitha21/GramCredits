import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useAuth } from './AuthContext';
import { useNotification } from './NotificationContext';

// Types
interface Project {
  id: string;
  userId: string;
  title: string;
  type: string;
  location: string;
  description: string;
  status: 'pending' | 'verified' | 'rejected';
  credits: number;
  submittedAt: string;
  verifiedAt?: string;
  confidence: number;
  evidence: string[];
  blockchainTx?: string;
}

interface Transaction {
  id: string;
  type: 'earn' | 'trade' | 'buy' | 'sell';
  amount: number;
  credits: number;
  fromUserId?: string;
  toUserId?: string;
  projectId?: string;
  timestamp: string;
  blockchainTx: string;
  status: 'pending' | 'completed' | 'failed';
}

interface LearningProgress {
  userId: string;
  courseId: string;
  progress: number;
  completedLessons: number[];
  points: number;
  completedAt?: string;
}

interface MarketListing {
  id: string;
  sellerId: string;
  credits: number;
  pricePerCredit: number;
  totalPrice: number;
  description: string;
  projectType: string;
  status: 'active' | 'sold' | 'cancelled';
  createdAt: string;
}

interface AppContextType {
  // Projects
  projects: Project[];
  submitProject: (projectData: Omit<Project, 'id' | 'userId' | 'submittedAt' | 'status' | 'credits' | 'confidence' | 'blockchainTx'>) => Promise<void>;
  verifyProject: (projectId: string) => Promise<void>;
  
  // Transactions
  transactions: Transaction[];
  addTransaction: (transaction: Omit<Transaction, 'id' | 'timestamp' | 'blockchainTx'>) => void;
  
  // Learning
  learningProgress: LearningProgress[];
  updateLearningProgress: (courseId: string, lessonId: number) => void;
  completeCourse: (courseId: string) => void;
  
  // Marketplace
  marketListings: MarketListing[];
  createListing: (listing: Omit<MarketListing, 'id' | 'sellerId' | 'createdAt' | 'status'>) => void;
  buyCredits: (listingId: string, buyerId: string) => Promise<void>;
  
  // Real-time stats
  getUserStats: (userId: string) => {
    totalCredits: number;
    totalEarnings: number;
    projectsCompleted: number;
    carbonImpact: number;
    learningPoints: number;
  };
  
  // Global stats
  globalStats: {
    totalUsers: number;
    totalCredits: number;
    totalProjects: number;
    totalEarnings: number;
  };
  
  // AI Verification
  runAIVerification: (projectId: string) => Promise<{ confidence: number; credits: number; insights: string[] }>;
  
  // Blockchain simulation
  generateBlockchainTx: () => string;
  
  // Anti-fraud features
  detectFraud: (projectData: any, userId: string) => Promise<{ isFraud: boolean; confidence: number; reasons: string[] }>;
  verifyLocation: (coordinates: string, userId: string) => Promise<{ isValid: boolean; distance: number }>;
  checkImageAuthenticity: (imageData: string) => Promise<{ isAuthentic: boolean; confidence: number }>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const { user } = useAuth();
  const { addNotification } = useNotification();
  
  // State
  const [projects, setProjects] = useState<Project[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [learningProgress, setLearningProgress] = useState<LearningProgress[]>([]);
  const [marketListings, setMarketListings] = useState<MarketListing[]>([]);
  const [globalStats, setGlobalStats] = useState({
    totalUsers: 12450,
    totalCredits: 2500000,
    totalProjects: 8750,
    totalEarnings: 45850000
  });

  // Initialize with some sample data
  useEffect(() => {
    // Sample projects
    const sampleProjects: Project[] = [
      {
        id: '1',
        userId: '1',
        title: 'Solar Panel Installation',
        type: 'Renewable Energy',
        location: 'Gujarat, India',
        description: 'Installed 5kW solar panels on farmhouse roof',
        status: 'verified',
        credits: 300,
        submittedAt: '2024-01-15T10:00:00Z',
        verifiedAt: '2024-01-16T14:30:00Z',
        confidence: 98,
        evidence: ['solar_panels.jpg', 'installation_certificate.pdf'],
        blockchainTx: '0x1a2b3c4d5e6f7890abcdef1234567890'
      },
      {
        id: '2',
        userId: '1',
        title: 'Tree Plantation Drive',
        type: 'Forestry',
        location: 'Gujarat, India',
        description: 'Planted 150 native trees on farm boundary',
        status: 'verified',
        credits: 150,
        submittedAt: '2024-01-10T08:00:00Z',
        verifiedAt: '2024-01-11T16:45:00Z',
        confidence: 95,
        evidence: ['tree_planting.jpg', 'gps_coordinates.txt'],
        blockchainTx: '0x2b3c4d5e6f7890abcdef1234567890ab'
      }
    ];

    // Sample transactions
    const sampleTransactions: Transaction[] = [
      {
        id: '1',
        type: 'earn',
        amount: 3750,
        credits: 300,
        projectId: '1',
        timestamp: '2024-01-16T14:30:00Z',
        blockchainTx: '0x1a2b3c4d5e6f7890abcdef1234567890',
        status: 'completed'
      },
      {
        id: '2',
        type: 'earn',
        amount: 1875,
        credits: 150,
        projectId: '2',
        timestamp: '2024-01-11T16:45:00Z',
        blockchainTx: '0x2b3c4d5e6f7890abcdef1234567890ab',
        status: 'completed'
      }
    ];

    // Sample market listings
    const sampleListings: MarketListing[] = [
      {
        id: '1',
        sellerId: '2',
        credits: 500,
        pricePerCredit: 12.5,
        totalPrice: 6250,
        description: 'Solar panel installation credits',
        projectType: 'Renewable Energy',
        status: 'active',
        createdAt: '2024-01-20T10:00:00Z'
      }
    ];

    setProjects(sampleProjects);
    setTransactions(sampleTransactions);
    setMarketListings(sampleListings);
  }, []);

  // Generate blockchain transaction ID
  const generateBlockchainTx = (): string => {
    return '0x' + Math.random().toString(16).substr(2, 32);
  };

  // Submit new project
  const submitProject = async (projectData: Omit<Project, 'id' | 'userId' | 'submittedAt' | 'status' | 'credits' | 'confidence' | 'blockchainTx'>): Promise<void> => {
    if (!user) return;

    const newProject: Project = {
      ...projectData,
      id: Date.now().toString(),
      userId: user.id,
      submittedAt: new Date().toISOString(),
      status: 'pending',
      credits: 0,
      confidence: 0
    };

    setProjects(prev => [...prev, newProject]);
    
    addNotification({
      type: 'info',
      title: 'Project Submitted!',
      message: 'Your project has been submitted for AI verification. Processing will begin shortly.'
    });

    // Simulate AI verification after 3 seconds
    setTimeout(async () => {
      await verifyProject(newProject.id);
    }, 3000);
  };

  // AI Verification simulation
  const runAIVerification = async (projectId: string): Promise<{ confidence: number; credits: number; insights: string[] }> => {
    // Simulate AI processing delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const confidence = Math.floor(Math.random() * 20) + 80; // 80-99%
    const baseCredits = Math.floor(Math.random() * 200) + 100; // 100-300 credits
    const credits = Math.floor(baseCredits * (confidence / 100));
    
    const insights = [
      'Satellite imagery confirms project location and scale',
      'Environmental impact calculations verified',
      'Project meets international carbon credit standards',
      'Blockchain verification completed successfully'
    ];

    return { confidence, credits, insights };
  };

  // Verify project
  const verifyProject = async (projectId: string): Promise<void> => {
    const project = projects.find(p => p.id === projectId);
    if (!project) return;

    addNotification({
      type: 'info',
      title: 'AI Verification Started',
      message: 'Analyzing satellite data and environmental impact...'
    });

    try {
      const verificationResult = await runAIVerification(projectId);
      const blockchainTx = generateBlockchainTx();

      // Update project
      setProjects(prev => prev.map(p => 
        p.id === projectId 
          ? {
              ...p,
              status: 'verified' as const,
              credits: verificationResult.credits,
              confidence: verificationResult.confidence,
              verifiedAt: new Date().toISOString(),
              blockchainTx
            }
          : p
      ));

      // Add earning transaction
      const newTransaction: Transaction = {
        id: Date.now().toString(),
        type: 'earn',
        amount: verificationResult.credits * 12.5, // ₹12.5 per credit
        credits: verificationResult.credits,
        projectId,
        timestamp: new Date().toISOString(),
        blockchainTx,
        status: 'completed'
      };

      setTransactions(prev => [...prev, newTransaction]);

      // Update global stats
      setGlobalStats(prev => ({
        ...prev,
        totalCredits: prev.totalCredits + verificationResult.credits,
        totalProjects: prev.totalProjects + 1,
        totalEarnings: prev.totalEarnings + newTransaction.amount
      }));

      addNotification({
        type: 'success',
        title: 'Project Verified! 🎉',
        message: `Earned ${verificationResult.credits} GramCredits (₹${newTransaction.amount.toLocaleString()}) with ${verificationResult.confidence}% confidence!`
      });

    } catch (error) {
      setProjects(prev => prev.map(p => 
        p.id === projectId 
          ? { ...p, status: 'rejected' as const }
          : p
      ));

      addNotification({
        type: 'error',
        title: 'Verification Failed',
        message: 'Project could not be verified. Please check your evidence and try again.'
      });
    }
  };

  // Add transaction
  const addTransaction = (transaction: Omit<Transaction, 'id' | 'timestamp' | 'blockchainTx'>): void => {
    const newTransaction: Transaction = {
      ...transaction,
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      blockchainTx: generateBlockchainTx()
    };

    setTransactions(prev => [...prev, newTransaction]);
  };

  // Update learning progress
  const updateLearningProgress = (courseId: string, lessonId: number): void => {
    if (!user) return;

    setLearningProgress(prev => {
      const existing = prev.find(p => p.userId === user.id && p.courseId === courseId);
      
      if (existing) {
        return prev.map(p => 
          p.userId === user.id && p.courseId === courseId
            ? {
                ...p,
                completedLessons: [...new Set([...p.completedLessons, lessonId])],
                points: p.points + 10
              }
            : p
        );
      } else {
        return [...prev, {
          userId: user.id,
          courseId,
          progress: 0,
          completedLessons: [lessonId],
          points: 10
        }];
      }
    });

    addNotification({
      type: 'success',
      title: 'Lesson Completed! 📚',
      message: 'You earned 10 learning points!'
    });
  };

  // Complete course
  const completeCourse = (courseId: string): void => {
    if (!user) return;

    setLearningProgress(prev => prev.map(p => 
      p.userId === user.id && p.courseId === courseId
        ? {
            ...p,
            progress: 100,
            points: p.points + 50,
            completedAt: new Date().toISOString()
          }
        : p
    ));

    addNotification({
      type: 'success',
      title: 'Course Completed! 🏆',
      message: 'You earned 50 bonus points and a certificate!'
    });
  };

  // Create market listing
  const createListing = (listing: Omit<MarketListing, 'id' | 'sellerId' | 'createdAt' | 'status'>): void => {
    if (!user) return;

    const newListing: MarketListing = {
      ...listing,
      id: Date.now().toString(),
      sellerId: user.id,
      createdAt: new Date().toISOString(),
      status: 'active'
    };

    setMarketListings(prev => [...prev, newListing]);

    addNotification({
      type: 'success',
      title: 'Listing Created! 💰',
      message: `Your ${listing.credits} credits are now available in the marketplace!`
    });
  };

  // Buy credits
  const buyCredits = async (listingId: string, buyerId: string): Promise<void> => {
    const listing = marketListings.find(l => l.id === listingId);
    if (!listing || listing.status !== 'active') return;

    // Update listing status
    setMarketListings(prev => prev.map(l => 
      l.id === listingId 
        ? { ...l, status: 'sold' as const }
        : l
    ));

    // Create buy transaction
    const buyTransaction: Transaction = {
      id: Date.now().toString(),
      type: 'buy',
      amount: listing.totalPrice,
      credits: listing.credits,
      fromUserId: buyerId,
      toUserId: listing.sellerId,
      timestamp: new Date().toISOString(),
      blockchainTx: generateBlockchainTx(),
      status: 'completed'
    };

    // Create sell transaction
    const sellTransaction: Transaction = {
      id: (Date.now() + 1).toString(),
      type: 'sell',
      amount: listing.totalPrice,
      credits: listing.credits,
      fromUserId: listing.sellerId,
      toUserId: buyerId,
      timestamp: new Date().toISOString(),
      blockchainTx: generateBlockchainTx(),
      status: 'completed'
    };

    setTransactions(prev => [...prev, buyTransaction, sellTransaction]);

    addNotification({
      type: 'success',
      title: 'Purchase Successful! 🎉',
      message: `Bought ${listing.credits} credits for ₹${listing.totalPrice.toLocaleString()}. Transaction recorded on blockchain.`
    });
  };

  // Get user stats
  const getUserStats = (userId: string) => {
    const userProjects = projects.filter(p => p.userId === userId && p.status === 'verified');
    const userTransactions = transactions.filter(t => 
      (t.type === 'earn' && t.projectId && projects.find(p => p.id === t.projectId)?.userId === userId) ||
      (t.type === 'sell' && t.fromUserId === userId)
    );
    const userLearning = learningProgress.filter(p => p.userId === userId);

    const totalCredits = userProjects.reduce((sum, p) => sum + p.credits, 0);
    const totalEarnings = userTransactions.reduce((sum, t) => sum + t.amount, 0);
    const projectsCompleted = userProjects.length;
    const carbonImpact = userProjects.reduce((sum, p) => {
      // Estimate CO2 impact based on project type
      const impactMultiplier = p.type === 'Renewable Energy' ? 2.5 : 
                              p.type === 'Forestry' ? 1.8 : 1.2;
      return sum + (p.credits * impactMultiplier / 100);
    }, 0);
    const learningPoints = userLearning.reduce((sum, p) => sum + p.points, 0);

    return {
      totalCredits,
      totalEarnings,
      projectsCompleted,
      carbonImpact,
      learningPoints
    };
  };

  const value: AppContextType = {
    projects,
    submitProject,
    verifyProject,
    transactions,
    addTransaction,
    learningProgress,
    updateLearningProgress,
    completeCourse,
    marketListings,
    createListing,
    buyCredits,
    getUserStats,
    globalStats,
    runAIVerification,
    generateBlockchainTx
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};