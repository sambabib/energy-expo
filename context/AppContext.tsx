import React, { createContext, ReactNode, useContext, useState } from 'react';

type ColorScheme = 'light' | 'dark';

interface Settings {
  accountEnabled: boolean;
  notifications: boolean;
  darkMode: boolean;
  biometric: boolean;
  realTimeMonitoring: boolean;
  peakUsageAlerts: boolean;
  solarTracking: boolean;
  locationService: boolean;
  dataCollection: boolean;
}

interface AppContextType {
  // Theme
  colorScheme: ColorScheme;
  toggleColorScheme: () => void;

  // Settings
  settings: Settings;
  updateSetting: <K extends keyof Settings>(key: K, value: Settings[K]) => void;
}

const defaultSettings: Settings = {
  accountEnabled: true,
  notifications: false,
  darkMode: true,
  biometric: true,
  realTimeMonitoring: true,
  peakUsageAlerts: true,
  solarTracking: false,
  locationService: true,
  dataCollection: true,
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [colorScheme, setColorScheme] = useState<ColorScheme>('dark');
  const [settings, setSettings] = useState<Settings>(defaultSettings);

  const toggleColorScheme = () => {
    setColorScheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  const updateSetting = <K extends keyof Settings>(key: K, value: Settings[K]) => {
    setSettings(prev => ({ ...prev, [key]: value }));

    // Special handling for dark mode
    if (key === 'darkMode') {
      setColorScheme(value ? 'dark' : 'light');
    }
  };

  return (
    <AppContext.Provider
      value={{
        colorScheme,
        toggleColorScheme,
        settings,
        updateSetting,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
}
