import { Text, View } from '@/components/Themed';
import { useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';

const PERIODS = ['Day', 'Week', 'Month'] as const;
type Period = typeof PERIODS[number];

// Mock data for the chart
const mockChartData = {
  Day: [1.2, 0.8, 0.5, 0.3, 0.4, 1.8, 2.4, 2.1, 1.5, 1.2, 0.9, 0.6],
  Week: [12.5, 14.2, 11.8, 15.3, 13.1, 16.2, 14.8],
  Month: [85, 92, 78, 88],
};

const mockLabels = {
  Day: ['6a', '8a', '10a', '12p', '2p', '4p', '6p', '8p', '10p', '12a', '2a', '4a'],
  Week: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  Month: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
};

export default function AnalyticsScreen() {
  const [selectedPeriod, setSelectedPeriod] = useState<Period>('Day');
  const data = mockChartData[selectedPeriod];
  const labels = mockLabels[selectedPeriod];
  const maxValue = Math.max(...data);

  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
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

        {/* Summary Stats */}
        <View style={styles.summaryCard}>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryValue}>
              {data.reduce((a, b) => a + b, 0).toFixed(1)}
            </Text>
            <Text style={styles.summaryLabel}>Total kWh</Text>
          </View>
          <View style={styles.summaryDivider} />
          <View style={styles.summaryItem}>
            <Text style={styles.summaryValue}>
              ${(data.reduce((a, b) => a + b, 0) * 0.12).toFixed(2)}
            </Text>
            <Text style={styles.summaryLabel}>Est. Cost</Text>
          </View>
          <View style={styles.summaryDivider} />
          <View style={styles.summaryItem}>
            <Text style={styles.summaryValue}>{maxValue.toFixed(1)}</Text>
            <Text style={styles.summaryLabel}>Peak kWh</Text>
          </View>
        </View>

        {/* Simple Bar Chart */}
        <View style={styles.chartCard}>
          <Text style={styles.chartTitle}>Energy Usage</Text>
          <View style={styles.chart}>
            {data.map((value, index) => (
              <View key={index} style={styles.barContainer}>
                <View
                  style={[
                    styles.bar,
                    { height: (value / maxValue) * 120 },
                  ]}
                />
                <Text style={styles.barLabel}>{labels[index]}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Comparison */}
        <View style={styles.comparisonCard}>
          <Text style={styles.comparisonTitle}>vs. Previous {selectedPeriod}</Text>
          <View style={styles.comparisonRow}>
            <Text style={styles.comparisonValue}>-8%</Text>
            <Text style={styles.comparisonText}>Less energy used</Text>
          </View>
          <View style={styles.comparisonRow}>
            <Text style={styles.comparisonValue}>-$2.40</Text>
            <Text style={styles.comparisonText}>Saved on your bill</Text>
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
  container: {
    flex: 1,
    padding: 20,
  },
  periodSelector: {
    flexDirection: 'row',
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
    backgroundColor: '#4CAF50',
  },
  periodButtonText: {
    fontSize: 14,
    fontWeight: '500',
    opacity: 0.6,
  },
  periodButtonTextActive: {
    color: '#fff',
    opacity: 1,
  },
  summaryCard: {
    flexDirection: 'row',
    padding: 20,
    borderRadius: 16,
    marginBottom: 20,
  },
  summaryItem: {
    flex: 1,
    alignItems: 'center',
  },
  summaryValue: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  summaryLabel: {
    fontSize: 12,
    opacity: 0.6,
    marginTop: 4,
  },
  summaryDivider: {
    width: 1,
    backgroundColor: 'rgba(128,128,128,0.3)',
  },
  chartCard: {
    padding: 20,
    borderRadius: 16,
    marginBottom: 20,
  },
  chartTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 16,
  },
  chart: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: 150,
  },
  barContainer: {
    alignItems: 'center',
    flex: 1,
  },
  bar: {
    width: 20,
    backgroundColor: '#4CAF50',
    borderRadius: 4,
    minHeight: 4,
  },
  barLabel: {
    fontSize: 10,
    opacity: 0.6,
    marginTop: 8,
  },
  comparisonCard: {
    padding: 20,
    borderRadius: 16,
  },
  comparisonTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 16,
  },
  comparisonRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  comparisonValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4CAF50',
    width: 80,
  },
  comparisonText: {
    fontSize: 14,
    opacity: 0.7,
  },
});
