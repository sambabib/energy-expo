import { analyticsConsumptionData } from '@/services/mockData';
import { StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';

export function ConsumptionChart({ style, chartHeight = 160 }: { style?: StyleProp<ViewStyle>; chartHeight?: number }) {
  // Find max value to scale bars relative to the chart height
  // We treat the numbers as values now.
  // We need to find the max of any individual bar segment across all data points to scale properly.
  const allValues = analyticsConsumptionData.flatMap(d => [d.solar, d.battery, d.grid]);
  const maxValue = Math.max(...allValues, 100); // Default to at least 100 if values are small

  return (
    <View style={style}>
      {/* Grouped Bar Chart */}
      <View style={[styles.groupedChart, { height: chartHeight }]}>
        {analyticsConsumptionData.map((item, index) => (
          <View key={index} style={styles.groupContainer}>
            {/* Solar Bar */}
            <View style={styles.barTrack}>
              <View
                style={[
                  styles.bar,
                  styles.solarBar,
                  { height: `${(item.solar / maxValue) * 100}%` }
                ]}
              />
            </View>

            {/* Battery Bar */}
            <View style={styles.barTrack}>
              <View
                style={[
                  styles.bar,
                  styles.batteryBar,
                  { height: `${(item.battery / maxValue) * 100}%` }
                ]}
              />
            </View>

            {/* Grid Bar */}
            <View style={styles.barTrack}>
              <View
                style={[
                  styles.bar,
                  styles.gridBar,
                  { height: `${(item.grid / maxValue) * 100}%` }
                ]}
              />
            </View>
          </View>
        ))}
      </View>

      {/* Legend */}
      <View style={styles.legend}>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, styles.solarDot]} />
          <Text style={styles.legendText}>Direct Solar</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, styles.batteryDot]} />
          <Text style={styles.legendText}>Battery</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, styles.gridDot]} />
          <Text style={styles.legendText}>Grid</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  groupedChart: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: 160,
    marginBottom: 20,
  },
  groupContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    gap: 2, // Gap between bars in a group
    height: '100%',
  },
  barTrack: {
    width: 6, // Reduced width as requested
    height: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  bar: {
    width: '100%',
    borderRadius: 3,
    minHeight: 4, // Ensure even 0 values have a tiny visibility or just for style
  },
  solarBar: {
    backgroundColor: '#8BC34A',
  },
  batteryBar: {
    backgroundColor: '#D4E157',
  },
  gridBar: {
    backgroundColor: '#F5F5F5',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderStyle: 'dashed',
  },
  legend: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  legendDot: {
    width: 12,
    height: 12,
    borderRadius: 3,
  },
  solarDot: {
    backgroundColor: '#8BC34A',
  },
  batteryDot: {
    backgroundColor: '#D4E157',
  },
  gridDot: {
    backgroundColor: '#F5F5F5',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderStyle: 'dashed',
  },
  legendText: {
    fontSize: 12,
    opacity: 0.7,
    color: '#888',
  },
});
