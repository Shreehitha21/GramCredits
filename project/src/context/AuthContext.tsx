import React, { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  location: string;
  farmSize: string;
  role: 'farmer' | 'buyer' | 'verifier' | 'admin';
  avatar: string;
  credits: number;
  totalEarnings: number;
  projectsCompleted: number;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  register: (userData: Partial<User>, password: string) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

// Mock user database
const mockUsers: Array<User & { password: string }> = [
  {
    id: '1',
    name: 'Ramesh Kumar',
    email: 'ramesh@example.com',
    password: 'farmer123',
    location: 'Gujarat, India',
    farmSize: '2.5 acres',
    role: 'farmer',
    avatar: '👨‍🌾',
    credits: 2450,
    totalEarnings: 35000,
    projectsCompleted: 12
  },
  {
    id: '2',
    name: 'Priya Sharma',
    email: 'priya@example.com',
    password: 'farmer123',
    location: 'Rajasthan, India',
    farmSize: '3.2 acres',
    role: 'farmer',
    avatar: '👩‍🌾',
    credits: 1850,
    totalEarnings: 28000,
    projectsCompleted: 8
  },
  {
    id: '3',
    name: 'Arjun Patel',
    email: 'arjun@example.com',
    password: 'farmer123',
    location: 'Maharashtra, India',
    farmSize: '1.8 acres',
    role: 'farmer',
    avatar: '👨‍🌾',
    credits: 3200,
    totalEarnings: 45000,
    projectsCompleted: 15
  },
  {
    id: '4',
    name: 'Meera Joshi',
    email: 'meera@example.com',
    password: 'farmer123',
    location: 'Himachal Pradesh, India',
    farmSize: '4.1 acres',
    role: 'farmer',
    avatar: '👩‍🌾',
    credits: 1650,
    totalEarnings: 22000,
    projectsCompleted: 6
  },
  {
    id: '5',
    name: 'Suresh Singh',
    email: 'suresh@example.com',
    password: 'farmer123',
    location: 'Punjab, India',
    farmSize: '5.5 acres',
    role: 'farmer',
    avatar: '👨‍🌾',
    credits: 2800,
    totalEarnings: 38000,
    projectsCompleted: 11
  },
  {
    id: '6',
    name: 'Microsoft Corp',
    email: 'buyer@microsoft.com',
    password: 'buyer123',
    location: 'Global',
    farmSize: 'N/A',
    role: 'buyer',
    avatar: '🏢',
    credits: 0,
    totalEarnings: 0,
    projectsCompleted: 0
  },
  {
    id: '7',
    name: 'Tata Group',
    email: 'buyer@tata.com',
    password: 'buyer123',
    location: 'Mumbai, India',
    farmSize: 'N/A',
    role: 'buyer',
    avatar: '🏭',
    credits: 0,
    totalEarnings: 0,
    projectsCompleted: 0
  },
  {
    id: '8',
    name: 'Dr. Kavita Verma',
    email: 'verifier@gramcredits.com',
    password: 'verifier123',
    location: 'Delhi, India',
    farmSize: 'N/A',
    role: 'verifier',
    avatar: '👩‍🔬',
    credits: 0,
    totalEarnings: 0,
    projectsCompleted: 0
  },
  {
    id: '9',
    name: 'Admin User',
    email: 'admin@gramcredits.com',
    password: 'admin123',
    location: 'Bangalore, India',
    farmSize: 'N/A',
    role: 'admin',
    avatar: '👨‍💼',
    credits: 0,
    totalEarnings: 0,
    projectsCompleted: 0
  }
];

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const foundUser = mockUsers.find(u => u.email === email && u.password === password);
    
    if (foundUser) {
      const { password: _, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword);
      return true;
    }
    
    return false;
  };

  const register = async (userData: Partial<User>, password: string): Promise<boolean> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Check if email already exists
    const existingUser = mockUsers.find(u => u.email === userData.email);
    if (existingUser) {
      return false;
    }
    
    // Create new user
    const newUser: User & { password: string } = {
      id: (mockUsers.length + 1).toString(),
      name: userData.name || '',
      email: userData.email || '',
      password,
      location: userData.location || '',
      farmSize: userData.farmSize || '',
      role: userData.role || 'farmer',
      avatar: userData.role === 'farmer' ? '👨‍🌾' : '🏢',
      credits: 0,
      totalEarnings: 0,
      projectsCompleted: 0
    };
    
    mockUsers.push(newUser);
    const { password: _, ...userWithoutPassword } = newUser;
    setUser(userWithoutPassword);
    return true;
  };

  const logout = () => {
    setUser(null);
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    login,
    logout,
    register
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};