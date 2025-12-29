import { Text, View } from '@/components/Themed';
import { ScrollView, StyleSheet } from 'react-native';

export default function HomeScreen() {
  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
        {/* Header Section */}
        <View style={styles.header}>
          <Text style={styles.greeting}>Good morning</Text>
          <Text style={styles.date}>{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</Text>
        </View>

        {/* Current Usage Card */}
        <View style={styles.card}>
          <Text style={styles.cardLabel}>Current Usage</Text>
          <View style={styles.usageRow}>
            <Text style={styles.usageValue}>2.4</Text>
            <Text style={styles.usageUnit}>kWh</Text>
          </View>
          <Text style={styles.cardSubtext}>Today so far</Text>
        </View>

        {/* Stats Row */}
        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>$3.20</Text>
            <Text style={styles.statLabel}>Today's Cost</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>18.5</Text>
            <Text style={styles.statLabel}>kWh This Week</Text>
          </View>
        </View>

        {/* Quick Insights */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Insights</Text>
          <View style={styles.insightCard}>
            <Text style={styles.insightText}>📉 You're using 12% less energy than yesterday</Text>
          </View>
          <View style={styles.insightCard}>
            <Text style={styles.insightText}>⚡ Peak usage: 6:00 PM - 9:00 PM</Text>
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
  header: {
    marginBottom: 24,
  },
  greeting: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  date: {
    fontSize: 16,
    opacity: 0.7,
    marginTop: 4,
  },
  card: {
    padding: 24,
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  cardLabel: {
    fontSize: 14,
    opacity: 0.7,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  usageRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginTop: 8,
  },
  usageValue: {
    fontSize: 48,
    fontWeight: 'bold',
  },
  usageUnit: {
    fontSize: 24,
    opacity: 0.7,
    marginLeft: 8,
  },
  cardSubtext: {
    fontSize: 14,
    opacity: 0.6,
    marginTop: 8,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  statLabel: {
    fontSize: 12,
    opacity: 0.6,
    marginTop: 4,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  insightCard: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
  },
  insightText: {
    fontSize: 14,
  },
});
