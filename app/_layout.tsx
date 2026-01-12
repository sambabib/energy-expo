import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import 'react-native-reanimated';

import { AnimatedSplashScreen } from '@/components/AnimatedSplashScreen';
import { AppProvider, useAppContext } from '@/context/AppContext';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });
  const [showSplash, setShowSplash] = useState(true);

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    // Only verify loaded here, splash hiding is handled by the custom component
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <AppProvider>
      <RootLayoutNav />
      {showSplash && <AnimatedSplashScreen onFinish={() => setShowSplash(false)} />}
    </AppProvider>
  );
}

function RootLayoutNav() {
  const { colorScheme } = useAppContext();

  const MyDarkTheme = {
    ...DarkTheme,
    colors: {
      ...DarkTheme.colors,
      background: '#000',
    },
  };

  const MyLightTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: '#fff',
    },
  };

  return (
    <ThemeProvider value={colorScheme === 'dark' ? MyDarkTheme : MyLightTheme}>
      <StatusBar
        style={colorScheme === 'dark' ? 'light' : 'dark'}
        backgroundColor={colorScheme === 'dark' ? '#000' : '#fff'}
      />
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="modal" options={{ presentation: 'modal', headerShown: false }} />
        <Stack.Screen
          name="full-screen-chart"
          options={{
            presentation: 'fullScreenModal',
            headerShown: false,
            animation: 'slide_from_bottom'
          }}
        />
      </Stack>
    </ThemeProvider>
  );
}
