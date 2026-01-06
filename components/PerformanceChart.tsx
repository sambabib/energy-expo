import { dayLabels, performanceData } from '@/services/mockData';
import { StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';

export function PerformanceChart({ style, chartHeight = 160 }: { style?: StyleProp<ViewStyle>; chartHeight?: number }) {
  // Calculate internal dimensions based on total height
  // reserving 24px for bottom axis labels
  const chartAreaHeight = chartHeight - 24;

  return (
    <View style={style}>
      {/* Line Chart */}
      <View style={[styles.lineChartContainer, { height: chartHeight }]}>
        {/* Y-axis labels (left - Energy) */}
        <View style={styles.yAxisLeft}>
          <Text style={styles.yAxisLabel}>400</Text>
          <Text style={styles.yAxisLabel}>200</Text>
          <Text style={styles.yAxisLabel}>0</Text>
        </View>

        {/* Chart Area */}
        <View style={styles.lineChart}>
          {/* Grid lines */}
          <View style={[styles.gridLines, { bottom: 24 }]}>
            <View style={styles.gridLine} />
            <View style={styles.gridLine} />
            <View style={styles.gridLine} />
          </View>

          {/* Energy Line (green) */}
          <View style={[styles.lineContainer, { bottom: 24 }]}>
            {performanceData.energy.map((value, index) => (
              <View
                key={`energy-${index}`}
                style={[
                  styles.dataPoint,
                  styles.energyPoint,
                  {
                    bottom: (value / 500) * chartAreaHeight,
                    left: `${(index / 6) * 100}%`,
                  },
                ]}
              />
            ))}
          </View>

          {/* Efficiency Line (blue) */}
          <View style={[styles.lineContainer, { bottom: 24 }]}>
            {performanceData.efficiency.map((value, index) => (
              <View
                key={`efficiency-${index}`}
                style={[
                  styles.dataPoint,
                  styles.efficiencyPoint,
                  {
                    bottom: (value / 100) * chartAreaHeight,
                    left: `${(index / 6) * 100}%`,
                  },
                ]}
              />
            ))}
          </View>

          {/* X-axis labels */}
          <View style={styles.xAxisLabels}>
            {dayLabels.map((label, index) => (
              <Text key={index} style={styles.xAxisLabel}>{label}</Text>
            ))}
          </View>
        </View>

        {/* Y-axis labels (right - Efficiency) */}
        <View style={styles.yAxisRight}>
          <Text style={styles.yAxisLabel}>100</Text>
          <Text style={styles.yAxisLabel}>50</Text>
          <Text style={styles.yAxisLabel}>0</Text>
        </View>
      </View>

      {/* Chart Legend */}
      <View style={styles.chartLegend}>
        <View style={styles.legendItem}>
          <View style={[styles.legendLine, styles.energyLine]} />
          <Text style={styles.legendText}>Energy (Kwh)</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendLine, styles.efficiencyLine]} />
          <Text style={styles.legendText}>Efficiency (%)</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  lineChartContainer: {
    flexDirection: 'row',
    height: 160,
    marginBottom: 16,
  },
  yAxisLeft: {
    width: 30,
    justifyContent: 'space-between',
    paddingBottom: 24,
  },
  yAxisRight: {
    width: 30,
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingBottom: 24,
  },
  yAxisLabel: {
    fontSize: 10,
    opacity: 0.5,
    color: '#888',
  },
  lineChart: {
    flex: 1,
    position: 'relative',
    marginHorizontal: 8,
  },
  gridLines: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 24,
    justifyContent: 'space-between',
  },
  gridLine: {
    height: 1,
    backgroundColor: 'rgba(128,128,128,0.2)',
  },
  lineContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 24,
  },
  dataPoint: {
    position: 'absolute',
    width: 8,
    height: 8,
    borderRadius: 4,
    marginLeft: -4,
  },
  energyPoint: {
    backgroundColor: '#4CAF50',
  },
  efficiencyPoint: {
    backgroundColor: '#7986CB',
  },
  xAxisLabels: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  xAxisLabel: {
    fontSize: 10,
    opacity: 0.5,
    color: '#888',
  },
  chartLegend: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 24,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  legendLine: {
    width: 16,
    height: 3,
    borderRadius: 2,
  },
  energyLine: {
    backgroundColor: '#4CAF50',
  },
  efficiencyLine: {
    backgroundColor: '#7986CB',
  },
  legendText: {
    fontSize: 12,
    opacity: 0.7,
    color: '#888',
  },
});
