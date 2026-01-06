import { analyticsConsumptionData } from '@/services/mockData';
import { StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';

export function ConsumptionChart({ style, chartHeight = 160 }: { style?: StyleProp<ViewStyle>; chartHeight?: number }) {
  return (
    <View style={style}>
      {/* Stacked Bar Chart */}
      <View style={[styles.stackedChart, { height: chartHeight }]}>
        {analyticsConsumptionData.map((item, index) => (
          <View key={index} style={styles.stackedBarContainer}>
            <View style={styles.stackedBar}>
              {/* Grid (top - striped) */}
              {item.grid > 0 && (
                <View style={[styles.barSegment, styles.gridSegment, { flex: item.grid }]}>
                  <Text style={styles.segmentLabel}>{item.grid}%</Text>
                </View>
              )}
              {/* Battery (middle) */}
              {item.battery > 0 && (
                <View style={[styles.barSegment, styles.batterySegment, { flex: item.battery }]}>
                  <Text style={styles.segmentLabel}>{item.battery}%</Text>
                </View>
              )}
              {/* Solar (bottom) */}
              <View style={[styles.barSegment, styles.solarSegment, { flex: item.solar }]}>
                <Text style={styles.segmentLabel}>{item.solar}%</Text>
              </View>
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
  stackedChart: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 160,
    marginBottom: 20,
  },
  stackedBarContainer: {
    flex: 1,
    paddingHorizontal: 4,
  },
  stackedBar: {
    flex: 1,
    borderRadius: 8,
    overflow: 'hidden',
    flexDirection: 'column',
  },
  barSegment: {
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 20,
  },
  solarSegment: {
    backgroundColor: '#4CAF50',
  },
  batterySegment: {
    backgroundColor: '#CDDC39',
  },
  gridSegment: {
    backgroundColor: '#E0E0E0',
  },
  segmentLabel: {
    fontSize: 10,
    fontWeight: '600',
    color: '#333',
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
    backgroundColor: '#4CAF50',
  },
  batteryDot: {
    backgroundColor: '#CDDC39',
  },
  gridDot: {
    backgroundColor: '#E0E0E0',
  },
  legendText: {
    fontSize: 12,
    opacity: 0.7,
    color: '#888', // Default color, will need to be handled for theme context if we want to be strict, but for now fixed color is fine as per original
  },
});
