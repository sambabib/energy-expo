import { Card } from '@/components/Card';
import { ConsumptionChart } from '@/components/ConsumptionChart';
import { PerformanceChart } from '@/components/PerformanceChart';
import { Text } from '@/components/Themed';
import { useAppContext } from '@/context/AppContext';
import { co2Saved } from '@/services/mockData';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const PERIODS = ['24 hour', 'Weekly', 'Monthly', '6 months'] as const;
type Period = typeof PERIODS[number];

export default function AnalyticsScreen() {
  const { colorScheme } = useAppContext();
  const [selectedPeriod, setSelectedPeriod] = useState<Period>('Weekly');
  const router = useRouter();

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colorScheme === 'dark' ? '#000' : '#fff' }]}>
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
          <TouchableOpacity
            onPress={() => router.push({ pathname: '/full-screen-chart', params: { type: 'consumption', title: 'Consumption Overview' } })}
            activeOpacity={0.9}
          >
            <Card style={styles.card}>
              <Text style={styles.cardTitle}>Consumption overview</Text>
              <ConsumptionChart />
            </Card>
          </TouchableOpacity>

          {/* CO2 Emissions Card */}
          <Card style={styles.emissionsCard}>
            <View style={styles.emissionsIcon}>
              <FontAwesome name="recycle" size={24} color="#4CAF50" />
            </View>
            <View style={styles.emissionsContent}>
              <Text style={styles.emissionsValue}>{co2Saved} kg CO2 emissions saved</Text>
              <Text style={styles.emissionsSubtext}>Carbon footprint offset</Text>
            </View>
          </Card>

          {/* Performance Metrics Card */}
          <TouchableOpacity
            onPress={() => router.push({ pathname: '/full-screen-chart', params: { type: 'performance', title: 'Performance Metrics' } })}
            activeOpacity={0.9}
          >
            <Card style={styles.card}>
              <Text style={styles.cardTitle}>Performance Metrics</Text>
              <PerformanceChart />
            </Card>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
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
});
