import * as SplashScreen from 'expo-splash-screen';
import React, { useEffect } from 'react';
import { Dimensions, Image, StyleSheet } from 'react-native';
import Animated, {
  Easing,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming
} from 'react-native-reanimated';

const { width, height } = Dimensions.get('window');

interface AnimatedSplashScreenProps {
  onFinish: () => void;
}

export function AnimatedSplashScreen({ onFinish }: AnimatedSplashScreenProps) {
  const logoTranslateY = useSharedValue(height);
  const containerTranslateY = useSharedValue(0);
  const opacity = useSharedValue(0);
  const scale = useSharedValue(0.8);

  useEffect(() => {
    // Hide native splash screen once this component is mounted
    SplashScreen.hideAsync();

    // Start animation
    // 1. Logo comes up from bottom
    logoTranslateY.value = withTiming(0, {
      duration: 1000,
      easing: Easing.out(Easing.cubic), // "Curve"
    });

    opacity.value = withTiming(1, {
      duration: 800,
    });

    scale.value = withTiming(1, {
      duration: 1000,
      easing: Easing.out(Easing.back(1.5)),
    });

    // 2. Animate background off-screen (bottom to top) after logo animation
    containerTranslateY.value = withDelay(2000, withTiming(-height, {
      duration: 1000,
      easing: Easing.out(Easing.cubic),
    }, (finished) => {
      if (finished) {
        runOnJS(onFinish)();
      }
    }));
  }, []);

  const logoAnimatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateY: logoTranslateY.value },
      { scale: scale.value }
    ],
    opacity: opacity.value,
  }));

  const containerAnimatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateY: containerTranslateY.value }
    ]
  }));

  return (
    <Animated.View style={[styles.container, containerAnimatedStyle]}>
      <Animated.View style={[styles.logoContainer, logoAnimatedStyle]}>
        <Image
          source={require('@/assets/images/logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </Animated.View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#e39b65',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 99999,
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 200,
    height: 200,
  },
});
