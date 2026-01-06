import { ConsumptionChart } from '@/components/ConsumptionChart';
import { PerformanceChart } from '@/components/PerformanceChart';
import { Text, View } from '@/components/Themed';
import { useAppContext } from '@/context/AppContext';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function FullScreenChartScreen() {
  const { type, title } = useLocalSearchParams<{ type: string; title: string }>();
  const router = useRouter();
  const { colorScheme } = useAppContext();

  const renderChart = () => {
    switch (type) {
      case 'consumption':
        return <ConsumptionChart style={styles.chart} chartHeight={400} />;
      case 'performance':
        return <PerformanceChart style={styles.chart} chartHeight={400} />;
      default:
        return <Text>Chart not found</Text>;
    }
  };

  return (
    <SafeAreaView edges={['top', 'bottom']} style={[styles.container, { backgroundColor: colorScheme === 'dark' ? '#000' : '#fff' }]}>
      <Stack.Screen options={{ headerShown: false }} />

      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={[styles.closeButton, { backgroundColor: 'rgba(128,128,128,0.15)' }]}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <FontAwesome name="times" size={20} color={colorScheme === 'dark' ? '#fff' : '#000'} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{title || 'Chart Details'}</Text>
        <View style={styles.placeholder} />
      </View>

      <View style={styles.content}>
        <View style={styles.chartContainer}>
          {renderChart()}
        </View>
        <View style={styles.descriptionContainer}>
          <Text style={styles.descriptionText}>
            Full screen view of {title?.toLowerCase() || 'the chart'}.
            Here you can analyze the data in more detail.
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  placeholder: {
    width: 40,
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  chartContainer: {
    flex: 1,
    justifyContent: 'center',
    marginBottom: 40,
  },
  chart: {
    width: '100%',
  },
  descriptionContainer: {
    marginTop: 20,
    padding: 20,
    borderRadius: 12,
    backgroundColor: 'rgba(128,128,128,0.1)',
  },
  descriptionText: {
    textAlign: 'center',
    opacity: 0.8,
  }
});
