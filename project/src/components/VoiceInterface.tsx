import React, { useState, useRef } from 'react';
import { Mic, MicOff } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useNotification } from '../context/NotificationContext';

const VoiceInterface: React.FC = () => {
  const { setLanguage, t } = useLanguage();
  const { addNotification } = useNotification();
  const [isListening, setIsListening] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const recognitionRef = useRef<any>(null);

  const languageMap: Record<string, string> = {
    '1': 'te', // Telugu
    '2': 'hi', // Hindi
    '3': 'ta', // Tamil
    '4': 'bn', // Bengali
    '5': 'en', // English
    'one': 'te',
    'two': 'hi',
    'three': 'ta',
    'four': 'bn',
    'five': 'en',
    'telugu': 'te',
    'hindi': 'hi',
    'tamil': 'ta',
    'bengali': 'bn',
    'english': 'en'
  };

  const languageNames: Record<string, string> = {
    'te': 'Telugu',
    'hi': 'Hindi',
    'ta': 'Tamil',
    'bn': 'Bengali',
    'en': 'English'
  };

  const startListening = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      addNotification({
        type: 'error',
        title: 'Voice Recognition Not Supported',
        message: 'Your browser does not support voice recognition. Please use Chrome or Edge.'
      });
      return;
    }

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    recognitionRef.current = new SpeechRecognition();
    
    recognitionRef.current.continuous = false;
    recognitionRef.current.interimResults = false;
    recognitionRef.current.lang = 'en-US';

    recognitionRef.current.onstart = () => {
      setIsListening(true);
      addNotification({
        type: 'info',
        title: t('Voice Interface'),
        message: t('Listening...')
      });
    };

    recognitionRef.current.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript.toLowerCase().trim();
      setIsListening(false);
      setIsProcessing(true);
      
      addNotification({
        type: 'info',
        title: t('Voice command recognized'),
        message: `"${transcript}"`
      });

      // Process the command
      setTimeout(() => {
        processVoiceCommand(transcript);
        setIsProcessing(false);
      }, 1000);
    };

    recognitionRef.current.onerror = (event: any) => {
      setIsListening(false);
      setIsProcessing(false);
      addNotification({
        type: 'error',
        title: 'Voice Recognition Error',
        message: 'Could not recognize speech. Please try again.'
      });
    };

    recognitionRef.current.onend = () => {
      setIsListening(false);
    };

    recognitionRef.current.start();
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    setIsListening(false);
  };

  const processVoiceCommand = (command: string) => {
    // Check for language change commands
    const words = command.split(' ');
    
    for (const word of words) {
      if (languageMap[word]) {
        const newLang = languageMap[word];
        setLanguage(newLang);
        addNotification({
          type: 'success',
          title: t('Language changed to'),
          message: languageNames[newLang]
        });
        return;
      }
    }

    // Check for number commands
    if (command.includes('1') || command.includes('one')) {
      setLanguage('te');
      addNotification({
        type: 'success',
        title: 'Language changed to Telugu',
        message: 'భాష తెలుగుకు మార్చబడింది'
      });
    } else if (command.includes('2') || command.includes('two')) {
      setLanguage('hi');
      addNotification({
        type: 'success',
        title: 'Language changed to Hindi',
        message: 'भाषा हिंदी में बदल दी गई'
      });
    } else if (command.includes('3') || command.includes('three')) {
      setLanguage('ta');
      addNotification({
        type: 'success',
        title: 'Language changed to Tamil',
        message: 'மொழி தமிழுக்கு மாற்றப்பட்டது'
      });
    } else if (command.includes('4') || command.includes('four')) {
      setLanguage('bn');
      addNotification({
        type: 'success',
        title: 'Language changed to Bengali',
        message: 'ভাষা বাংলায় পরিবর্তিত হয়েছে'
      });
    } else if (command.includes('5') || command.includes('five')) {
      setLanguage('en');
      addNotification({
        type: 'success',
        title: 'Language changed to English',
        message: 'Language changed to English'
      });
    } else {
      addNotification({
        type: 'info',
        title: 'Voice Command Help',
        message: 'Say "1" for Telugu, "2" for Hindi, "3" for Tamil, "4" for Bengali, "5" for English'
      });
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className="bg-white rounded-full shadow-lg border border-gray-200 p-4">
        <button
          onMouseDown={startListening}
          onMouseUp={stopListening}
          onTouchStart={startListening}
          onTouchEnd={stopListening}
          className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 ${
            isListening 
              ? 'bg-red-500 hover:bg-red-600 animate-pulse' 
              : isProcessing
              ? 'bg-yellow-500 hover:bg-yellow-600'
              : 'bg-green-500 hover:bg-green-600'
          } text-white shadow-lg hover:shadow-xl transform hover:scale-110`}
          title={isListening ? t('Listening...') : isProcessing ? t('Processing...') : t('Press and hold to speak')}
        >
          {isListening ? (
            <div className="flex space-x-1">
              <div className="w-1 h-6 bg-white rounded animate-pulse"></div>
              <div className="w-1 h-4 bg-white rounded animate-pulse" style={{ animationDelay: '0.1s' }}></div>
              <div className="w-1 h-8 bg-white rounded animate-pulse" style={{ animationDelay: '0.2s' }}></div>
              <div className="w-1 h-3 bg-white rounded animate-pulse" style={{ animationDelay: '0.3s' }}></div>
            </div>
          ) : isProcessing ? (
            <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          ) : (
            <Mic className="w-8 h-8" />
          )}
        </button>
      </div>
      
      {/* Instructions */}
      <div className="absolute bottom-20 right-0 bg-black text-white text-xs px-3 py-2 rounded-lg opacity-75 max-w-xs">
        <div className="font-bold mb-1">{t('Voice Interface')}</div>
        <div>1 = Telugu, 2 = Hindi</div>
        <div>3 = Tamil, 4 = Bengali, 5 = English</div>
        <div className="mt-1 text-gray-300">{t('Press and hold to speak')}</div>
      </div>
    </div>
  );
};

export default VoiceInterface;