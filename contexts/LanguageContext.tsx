import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';

export interface Language {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
}

interface Translations {
  [key: string]: string;
}

interface LanguageContextType {
  currentLanguage: Language;
  availableLanguages: Language[];
  translations: Translations;
  changeLanguage: (languageCode: string) => Promise<void>;
  t: (key: string, fallback?: string) => string;
  loading: boolean;
}

const defaultLanguage: Language = {
  code: 'en',
  name: 'English',
  nativeName: 'English',
  flag: '🇺🇸'
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const LANGUAGE_STORAGE_KEY = '@tradex_language';

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState<Language>(defaultLanguage);
  const [availableLanguages, setAvailableLanguages] = useState<Language[]>([]);
  const [translations, setTranslations] = useState<Translations>({});
  const [loading, setLoading] = useState(true);

  // Mock API function to fetch available languages
  const fetchAvailableLanguages = async (): Promise<Language[]> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return [
      { code: 'en', name: 'English', nativeName: 'English', flag: '🇺🇸' },
      { code: 'hi', name: 'Hindi', nativeName: 'हिंदी', flag: '🇮🇳' },
      { code: 'es', name: 'Spanish', nativeName: 'Español', flag: '🇪🇸' },
      { code: 'fr', name: 'French', nativeName: 'Français', flag: '🇫🇷' },
      { code: 'de', name: 'German', nativeName: 'Deutsch', flag: '🇩🇪' },
      { code: 'pt', name: 'Portuguese', nativeName: 'Português', flag: '🇵🇹' },
      { code: 'ru', name: 'Russian', nativeName: 'Русский', flag: '🇷🇺' },
      { code: 'ja', name: 'Japanese', nativeName: '日本語', flag: '🇯🇵' },
      { code: 'ko', name: 'Korean', nativeName: '한국어', flag: '🇰🇷' },
      { code: 'zh', name: 'Chinese', nativeName: '中文', flag: '🇨🇳' },
      { code: 'ar', name: 'Arabic', nativeName: 'العربية', flag: '🇸🇦' },
      { code: 'bn', name: 'Bengali', nativeName: 'বাংলা', flag: '🇧🇩' }
    ];
  };

  // Mock API function to fetch translations for a specific language
  const fetchTranslations = async (languageCode: string): Promise<Translations> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const translationsMap: { [key: string]: Translations } = {
      en: {
        'welcome': 'Welcome to TradeX',
        'home': 'Home',
        'watchlist': 'Watchlist',
        'portfolio': 'Portfolio',
        'profile': 'Profile',
        'support': 'Support',
        'add_fund': 'Add Fund',
        'language': 'Language',
        'settings': 'Settings',
        'biometric_passcode': 'Biometric & Passcode',
        'learning_material': 'Learning Material',
        'rewards': 'Rewards',
        'invites_earn': 'Invites & Earn',
        'rate_app': 'Rate TradeX',
        'privacy_policy': 'Privacy Policy',
        'terms_conditions': 'Terms & Conditions',
        'log_out': 'Log Out',
        'app_version': 'App version',
        'select_language': 'Select Language',
        'current_language': 'Current Language',
        'cancel': 'Cancel',
        'save': 'Save',
        'total_balance': 'Total Balance',
        'gains': 'Gains (+)/(-)',
        'active': 'Active',
        'history': 'History',
        'holdings': 'Holdings',
        'performance': 'Performance',
        'recent_transactions': 'Recent Transactions',
        'no_holdings': 'No Holdings Yet',
        'start_trading': 'Start trading to build your portfolio',
        'no_transactions': 'No Transactions',
        'trading_history': 'Your trading history will appear here'
      },
      hi: {
        'welcome': 'TradeX में आपका स्वागत है',
        'home': 'होम',
        'watchlist': 'वॉचलिस्ट',
        'portfolio': 'पोर्टफोलियो',
        'profile': 'प्रोफ़ाइल',
        'support': 'सहायता',
        'add_fund': 'फंड जोड़ें',
        'language': 'भाषा',
        'settings': 'सेटिंग्स',
        'biometric_passcode': 'बायोमेट्रिक और पासकोड',
        'learning_material': 'सीखने की सामग्री',
        'rewards': 'पुरस्कार',
        'invites_earn': 'आमंत्रित करें और कमाएं',
        'rate_app': 'TradeX को रेट करें',
        'privacy_policy': 'गोपनीयता नीति',
        'terms_conditions': 'नियम और शर्तें',
        'log_out': 'लॉग आउट',
        'app_version': 'ऐप संस्करण',
        'select_language': 'भाषा चुनें',
        'current_language': 'वर्तमान भाषा',
        'cancel': 'रद्द करें',
        'save': 'सेव करें',
        'total_balance': 'कुल शेष',
        'gains': 'लाभ (+)/(-)',
        'active': 'सक्रिय',
        'history': 'इतिहास',
        'holdings': 'होल्डिंग्स',
        'performance': 'प्रदर्शन',
        'recent_transactions': 'हाल के लेनदेन',
        'no_holdings': 'अभी तक कोई होल्डिंग नहीं',
        'start_trading': 'अपना पोर्टफोलियो बनाने के लिए ट्रेडिंग शुरू करें',
        'no_transactions': 'कोई लेनदेन नहीं',
        'trading_history': 'आपका ट्रेडिंग इतिहास यहां दिखाई देगा'
      },
      es: {
        'welcome': 'Bienvenido a TradeX',
        'home': 'Inicio',
        'watchlist': 'Lista de seguimiento',
        'portfolio': 'Cartera',
        'profile': 'Perfil',
        'support': 'Soporte',
        'add_fund': 'Agregar fondos',
        'language': 'Idioma',
        'settings': 'Configuración',
        'biometric_passcode': 'Biométrico y código',
        'learning_material': 'Material de aprendizaje',
        'rewards': 'Recompensas',
        'invites_earn': 'Invitar y ganar',
        'rate_app': 'Calificar TradeX',
        'privacy_policy': 'Política de privacidad',
        'terms_conditions': 'Términos y condiciones',
        'log_out': 'Cerrar sesión',
        'app_version': 'Versión de la aplicación',
        'select_language': 'Seleccionar idioma',
        'current_language': 'Idioma actual',
        'cancel': 'Cancelar',
        'save': 'Guardar',
        'total_balance': 'Saldo total',
        'gains': 'Ganancias (+)/(-)',
        'active': 'Activo',
        'history': 'Historial',
        'holdings': 'Tenencias',
        'performance': 'Rendimiento',
        'recent_transactions': 'Transacciones recientes',
        'no_holdings': 'Sin tenencias aún',
        'start_trading': 'Comienza a operar para construir tu cartera',
        'no_transactions': 'Sin transacciones',
        'trading_history': 'Tu historial de trading aparecerá aquí'
      }
    };

    return translationsMap[languageCode] || translationsMap['en'];
  };

  // Translation function
  const t = (key: string, fallback?: string): string => {
    return translations[key] || fallback || key;
  };

  // Change language function
  const changeLanguage = async (languageCode: string) => {
    try {
      setLoading(true);
      const newLanguage = availableLanguages.find(lang => lang.code === languageCode);
      if (newLanguage) {
        const newTranslations = await fetchTranslations(languageCode);
        setCurrentLanguage(newLanguage);
        setTranslations(newTranslations);
        await AsyncStorage.setItem(LANGUAGE_STORAGE_KEY, languageCode);
      }
    } catch (error) {
      console.error('Error changing language:', error);
    } finally {
      setLoading(false);
    }
  };

  // Initialize language context
  useEffect(() => {
    const initializeLanguage = async () => {
      try {
        // Fetch available languages
        const languages = await fetchAvailableLanguages();
        setAvailableLanguages(languages);

        // Get saved language or use default
        const savedLanguage = await AsyncStorage.getItem(LANGUAGE_STORAGE_KEY);
        const languageCode = savedLanguage || defaultLanguage.code;
        
        const selectedLanguage = languages.find(lang => lang.code === languageCode) || defaultLanguage;
        const initialTranslations = await fetchTranslations(languageCode);
        
        setCurrentLanguage(selectedLanguage);
        setTranslations(initialTranslations);
      } catch (error) {
        console.error('Error initializing language:', error);
        // Fallback to default
        setCurrentLanguage(defaultLanguage);
        setTranslations(await fetchTranslations(defaultLanguage.code));
      } finally {
        setLoading(false);
      }
    };

    initializeLanguage();
  }, []);

  const value: LanguageContextType = {
    currentLanguage,
    availableLanguages,
    translations,
    changeLanguage,
    t,
    loading
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}; 