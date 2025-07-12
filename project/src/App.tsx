import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import Dashboard from './pages/Dashboard';
import Marketplace from './pages/Marketplace';
import Verification from './pages/Verification';
import Learning from './pages/Learning';
import Profile from './pages/Profile';
import { AuthProvider } from './context/AuthContext';
import { LanguageProvider } from './context/LanguageContext';
import { NotificationProvider } from './context/NotificationContext';
import { AppProvider } from './context/AppContext';
import VoiceInterface from './components/VoiceInterface';

function App() {
  return (
    <AuthProvider>
      <NotificationProvider>
        <AppProvider>
          <LanguageProvider>
            <BrowserRouter>
              <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-emerald-50">
                <Header />
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/marketplace" element={<Marketplace />} />
                  <Route path="/verification" element={<Verification />} />
                  <Route path="/learning" element={<Learning />} />
                  <Route path="/profile" element={<Profile />} />
                </Routes>
                <VoiceInterface />
              </div>
            </BrowserRouter>
          </LanguageProvider>
        </AppProvider>
      </NotificationProvider>
    </AuthProvider>
  );
}

export default App;