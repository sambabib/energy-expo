import { Text, View } from '@/components/Themed';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';

const PERIODS = ['24 hour', 'Weekly', 'Monthly', '6 months'] as const;
type Period = typeof PERIODS[number];

// Mock data for stacked bar chart (Direct Solar, Battery, Grid percentages)
const consumptionData = [
  { solar: 60, battery: 30, grid: 10 },
  { solar: 55, battery: 30, grid: 15 },
  { solar: 80, battery: 26, grid: 14 },
  { solar: 74, battery: 26, grid: 20 },
  { solar: 100, battery: 0, grid: 0 },
  { solar: 55, battery: 30, grid: 15 },
  { solar: 63, battery: 37, grid: 15 },
];

// Mock data for performance metrics line chart
const performanceData = {
  energy: [180, 220, 280, 320, 380, 420, 350],
  efficiency: [45, 55, 70, 85, 95, 100, 80],
};

const dayLabels = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

export default function AnalyticsScreen() {
  const [selectedPeriod, setSelectedPeriod] = useState<Period>('Weekly');
  const maxBarHeight = 140;

  return (
    <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Analytics</Text>
          <View style={styles.menuButton}>
            <FontAwesome name="ellipsis-h" size={20} color="#666" />
          </View>
        </View>

        {/* Period Selector */}
        <View style={styles.periodSelector}>
          {PERIODS.map((period) => (
            <View
              key={period}
              style={[
                styles.periodButton,
                selectedPeriod === period && styles.periodButtonActive,
              ]}
              onTouchEnd={() => setSelectedPeriod(period)}
            >
              <Text
                style={[
                  styles.periodButtonText,
                  selectedPeriod === period && styles.periodButtonTextActive,
                ]}
              >
                {period}
              </Text>
            </View>
          ))}
        </View>

        {/* Consumption Overview Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Consumption overview</Text>

          {/* Stacked Bar Chart */}
          <View style={styles.stackedChart}>
            {consumptionData.map((item, index) => (
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

        {/* CO2 Emissions Card */}
        <View style={styles.emissionsCard}>
          <View style={styles.emissionsIcon}>
            <FontAwesome name="recycle" size={24} color="#4CAF50" />
          </View>
          <View style={styles.emissionsContent}>
            <Text style={styles.emissionsValue}>750 kg CO2 emissions saved</Text>
            <Text style={styles.emissionsSubtext}>Carbon footprint offset</Text>
          </View>
        </View>

        {/* Performance Metrics Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Performance Metrics</Text>

          {/* Line Chart */}
          <View style={styles.lineChartContainer}>
            {/* Y-axis labels (left - Energy) */}
            <View style={styles.yAxisLeft}>
              <Text style={styles.yAxisLabel}>400</Text>
              <Text style={styles.yAxisLabel}>200</Text>
              <Text style={styles.yAxisLabel}>0</Text>
            </View>

            {/* Chart Area */}
            <View style={styles.lineChart}>
              {/* Grid lines */}
              <View style={styles.gridLines}>
                <View style={styles.gridLine} />
                <View style={styles.gridLine} />
                <View style={styles.gridLine} />
              </View>

              {/* Energy Line (green) */}
              <View style={styles.lineContainer}>
                {performanceData.energy.map((value, index) => (
                  <View
                    key={`energy-${index}`}
                    style={[
                      styles.dataPoint,
                      styles.energyPoint,
                      {
                        bottom: (value / 500) * 120,
                        left: `${(index / 6) * 100}%`,
                      },
                    ]}
                  />
                ))}
              </View>

              {/* Efficiency Line (blue) */}
              <View style={styles.lineContainer}>
                {performanceData.efficiency.map((value, index) => (
                  <View
                    key={`efficiency-${index}`}
                    style={[
                      styles.dataPoint,
                      styles.efficiencyPoint,
                      {
                        bottom: (value / 100) * 120,
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
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  menuButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  periodSelector: {
    flexDirection: 'row',
    backgroundColor: 'rgba(128,128,128,0.1)',
    borderRadius: 12,
    padding: 4,
    marginBottom: 20,
  },
  periodButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 8,
  },
  periodButtonActive: {
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  periodButtonText: {
    fontSize: 12,
    fontWeight: '500',
    opacity: 0.6,
  },
  periodButtonTextActive: {
    opacity: 1,
    fontWeight: '600',
  },
  card: {
    padding: 20,
    borderRadius: 16,
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 20,
  },
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
  },
  emissionsCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderRadius: 16,
    marginBottom: 16,
  },
  emissionsIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(76, 175, 80, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  emissionsContent: {
    flex: 1,
  },
  emissionsValue: {
    fontSize: 16,
    fontWeight: '600',
  },
  emissionsSubtext: {
    fontSize: 13,
    opacity: 0.6,
    marginTop: 2,
  },
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
  },
  chartLegend: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 24,
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
});
