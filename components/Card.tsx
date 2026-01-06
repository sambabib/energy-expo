import { StyleSheet } from 'react-native';
import { View, ViewProps } from './Themed';

export function Card(props: ViewProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;

  // Default colors: White for light mode, Dark Gray (#1a1a1a) for dark mode
  // The app background is black (#000) in dark mode, so cards need to be slightly lighter
  const defaultLightColor = '#ffffff';
  const defaultDarkColor = '#1a1a1a';

  return (
    <View
      style={[styles.card, style]}
      lightColor={lightColor || defaultLightColor}
      darkColor={darkColor || defaultDarkColor}
      {...otherProps}
    />
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 24,
    padding: 20,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
});
