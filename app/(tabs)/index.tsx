import { Text, View } from '@/components/Themed';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { ScrollView, StyleSheet } from 'react-native';

export default function HomeScreen() {
  const batteryLevel = 82;
  const batteryBars = 10;
  const filledBars = Math.round((batteryLevel / 100) * batteryBars);

  return (
    <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
      <View style={styles.container}>
        {/* Header Section */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Hi, Alex 👋</Text>
            <Text style={styles.subtitle}>Welcome back</Text>
          </View>
          <View style={styles.notificationBadge}>
            <FontAwesome name="bell-o" size={20} color="#666" />
          </View>
        </View>

        {/* Weather Card */}
        <View style={styles.weatherCard}>
          <View>
            <Text style={styles.weatherTemp}>Sunny, 32°C</Text>
            <Text style={styles.weatherDate}>{new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}</Text>
          </View>
          <Text style={styles.weatherIcon}>🌤️</Text>
        </View>

        {/* Energy Flow Visualization */}
        <View style={styles.energyFlowCard}>
          {/* Floating Energy Data Points */}
          <View style={styles.energyPointsRow}>
            <View style={[styles.energyBubble, styles.exportBubble]}>
              <Text style={styles.bubbleValue}>1.5 kw</Text>
              <Text style={styles.bubbleLabel}>Export</Text>
            </View>
            <View style={[styles.energyBubble, styles.homeBubble]}>
              <Text style={styles.bubbleValue}>64 kw</Text>
              <Text style={styles.bubbleLabel}>Home</Text>
            </View>
            <View style={[styles.energyBubble, styles.produceBubble]}>
              <Text style={styles.bubbleValue}>3.65 w</Text>
              <Text style={styles.bubbleLabel}>Produce</Text>
            </View>
          </View>

          {/* House Illustration Placeholder */}
          <View style={styles.houseContainer}>
            <View style={styles.housePlaceholder}>
              <FontAwesome name="home" size={48} color="#666" />
              <Text style={styles.houseText}>Your Home</Text>
            </View>
            {/* Stored Energy Point */}
            <View style={[styles.energyBubble, styles.storedBubble]}>
              <Text style={styles.bubbleValue}>129 kw</Text>
              <Text style={styles.bubbleLabel}>Stored</Text>
            </View>
          </View>
        </View>

        {/* Charging Status Card */}
        <View style={styles.chargingCard}>
          <View style={styles.chargingHeader}>
            <View>
              <Text style={styles.chargingTitle}>Charging</Text>
              <Text style={styles.chargingSubtitle}>1h 10 min remained</Text>
            </View>
            <View style={styles.chargingRight}>
              <Text style={styles.batteryIcon}>⚡</Text>
              <Text style={styles.batteryPercent}>{batteryLevel}%</Text>
            </View>
          </View>
          <Text style={styles.capacityText}>4500 kw cap</Text>

          {/* Battery Progress Bar */}
          <View style={styles.batteryBar}>
            {Array.from({ length: batteryBars }).map((_, index) => (
              <View
                key={index}
                style={[
                  styles.batterySegment,
                  index < filledBars && styles.batterySegmentFilled,
                ]}
              />
            ))}
          </View>
        </View>

        {/* Consumptions Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Consumptions</Text>
            <Text style={styles.seeAll}>See all</Text>
          </View>

          <View style={styles.consumptionGrid}>
            <View style={styles.consumptionCard}>
              <View style={styles.consumptionIconContainer}>
                <FontAwesome name="car" size={20} color="#4CAF50" />
              </View>
              <View style={styles.consumptionInfo}>
                <Text style={styles.consumptionValue}>3.2 kWh</Text>
                <Text style={styles.consumptionLabel}>Car</Text>
              </View>
              <FontAwesome name="arrow-up" size={12} color="#999" style={styles.arrowIcon} />
            </View>

            <View style={styles.consumptionCard}>
              <View style={styles.consumptionIconContainer}>
                <FontAwesome name="television" size={20} color="#FF9800" />
              </View>
              <View style={styles.consumptionInfo}>
                <Text style={styles.consumptionValue}>1.8 kWh</Text>
                <Text style={styles.consumptionLabel}>Electronics</Text>
              </View>
              <FontAwesome name="arrow-up" size={12} color="#999" style={styles.arrowIcon} />
            </View>

            <View style={styles.consumptionCard}>
              <View style={styles.consumptionIconContainer}>
                <FontAwesome name="snowflake-o" size={20} color="#2196F3" />
              </View>
              <View style={styles.consumptionInfo}>
                <Text style={styles.consumptionValue}>4.5 kWh</Text>
                <Text style={styles.consumptionLabel}>AC</Text>
              </View>
              <FontAwesome name="arrow-up" size={12} color="#999" style={styles.arrowIcon} />
            </View>

            <View style={styles.consumptionCard}>
              <View style={styles.consumptionIconContainer}>
                <FontAwesome name="lightbulb-o" size={20} color="#FFC107" />
              </View>
              <View style={styles.consumptionInfo}>
                <Text style={styles.consumptionValue}>0.8 kWh</Text>
                <Text style={styles.consumptionLabel}>Lights</Text>
              </View>
              <FontAwesome name="arrow-up" size={12} color="#999" style={styles.arrowIcon} />
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
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 14,
    opacity: 0.6,
    marginTop: 2,
  },
  notificationBadge: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(128,128,128,0.2)',
  },
  weatherCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderRadius: 16,
    marginBottom: 16,
  },
  weatherTemp: {
    fontSize: 20,
    fontWeight: '600',
  },
  weatherDate: {
    fontSize: 14,
    opacity: 0.6,
    marginTop: 4,
  },
  weatherIcon: {
    fontSize: 40,
  },
  energyFlowCard: {
    padding: 20,
    borderRadius: 16,
    marginBottom: 16,
  },
  energyPointsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  energyBubble: {
    width: 72,
    height: 72,
    borderRadius: 36,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
  },
  exportBubble: {
    borderColor: '#ef5350',
  },
  homeBubble: {
    borderColor: '#66bb6a',
  },
  produceBubble: {
    borderColor: '#ff7043',
  },
  storedBubble: {
    borderColor: '#26a69a',
    position: 'absolute',
    left: 20,
    bottom: 20,
  },
  bubbleValue: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  bubbleLabel: {
    fontSize: 10,
    opacity: 0.7,
  },
  houseContainer: {
    alignItems: 'center',
    position: 'relative',
    minHeight: 120,
  },
  housePlaceholder: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  houseText: {
    marginTop: 8,
    fontSize: 12,
    opacity: 0.6,
  },
  chargingCard: {
    padding: 20,
    borderRadius: 16,
    marginBottom: 16,
  },
  chargingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  chargingTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  chargingSubtitle: {
    fontSize: 14,
    opacity: 0.6,
    marginTop: 4,
  },
  chargingRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  batteryIcon: {
    fontSize: 18,
    marginRight: 4,
  },
  batteryPercent: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  capacityText: {
    fontSize: 12,
    opacity: 0.5,
    textAlign: 'right',
    marginTop: -20,
    marginBottom: 16,
  },
  batteryBar: {
    flexDirection: 'row',
    gap: 4,
    marginTop: 8,
  },
  batterySegment: {
    flex: 1,
    height: 32,
    borderRadius: 6,
    backgroundColor: 'rgba(128,128,128,0.2)',
  },
  batterySegmentFilled: {
    backgroundColor: '#4CAF50',
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
  },
  seeAll: {
    fontSize: 14,
    opacity: 0.6,
  },
  consumptionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  consumptionCard: {
    width: '47%',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 16,
  },
  consumptionIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(128,128,128,0.1)',
  },
  consumptionInfo: {
    flex: 1,
    marginLeft: 12,
  },
  consumptionValue: {
    fontSize: 16,
    fontWeight: '600',
  },
  consumptionLabel: {
    fontSize: 12,
    opacity: 0.6,
    marginTop: 2,
  },
  arrowIcon: {
    transform: [{ rotate: '45deg' }],
  },
});
