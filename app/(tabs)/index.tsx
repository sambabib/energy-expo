import { Card } from '@/components/Card';
import { Text } from '@/components/Themed';
import { useAppContext } from '@/context/AppContext';
import { batteryData, energyFlowData, userData } from '@/services/mockData';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Image, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  const { colorScheme } = useAppContext();
  const batteryBars = 10;
  const filledBars = Math.round((batteryData.level / 100) * batteryBars);

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colorScheme === 'dark' ? '#000' : '#fff' }]}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        <View style={styles.container}>
          {/* Header Section */}
          <View style={styles.header}>
            <View>
              <Text style={styles.greeting}>Hi, {userData.name}</Text>
              <Text style={styles.subtitle}>Welcome back</Text>
            </View>
            <View style={styles.notificationBadge}>
              <FontAwesome name="bell-o" size={20} color="#666" />
            </View>
          </View>

          {/* Weather Card */}
          <Card style={styles.weatherCard}>
            <View>
              <Text style={styles.weatherTemp}>Sunny, 32°C</Text>
              <Text style={styles.weatherDate}>{new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}</Text>
            </View>
            <Text style={styles.weatherIcon}>🌤️</Text>
          </Card>

          {/* Energy Flow Visualization */}
          <Card style={styles.energyFlowCard}>
            {/* Connection Lines */}
            <View style={[StyleSheet.absoluteFill, { zIndex: -1 }]}>
              {/* Export Line (Red) - Down and Right */}
              <View style={{
                position: 'absolute',
                top: 80,
                left: 50,
                width: 2,
                height: 50,
                borderLeftWidth: 2,
                borderColor: '#ef5350',
                borderStyle: 'dashed',
              }} />
              <View style={{
                position: 'absolute',
                top: 130,
                left: 50,
                right: '50%',
                height: 2,
                borderTopWidth: 2,
                borderColor: '#ef5350',
                borderStyle: 'dashed',
              }} />
              <View style={{
                position: 'absolute',
                top: 130,
                left: '50%',
                height: 30,
                borderLeftWidth: 2,
                borderColor: '#ef5350',
                borderStyle: 'dashed',
              }} />

              {/* Home Line (Green) - Straight Down */}
              <View style={{
                position: 'absolute',
                top: 80,
                left: '50%',
                marginLeft: -1, // Center the 2px line
                height: 72,
                borderLeftWidth: 2,
                borderColor: '#66bb6a',
                borderStyle: 'dashed',
              }} />

              {/* Produce Line (Orange) - Straight Down */}
              <View style={{
                position: 'absolute',
                top: 80,
                right: 50,
                height: 72,
                borderLeftWidth: 2,
                borderColor: '#ff7043',
                borderStyle: 'dashed',
              }} />
            </View>

            {/* Floating Energy Data Points */}
            <View style={styles.energyPointsRow}>
              <View style={[styles.energyBubble, styles.exportBubble]}>
                <Text style={styles.bubbleValue}>{energyFlowData.export} kw</Text>
                <Text style={styles.bubbleLabel}>Export</Text>
              </View>
              <View style={[styles.energyBubble, styles.homeBubble]}>
                <Text style={styles.bubbleValue}>{energyFlowData.home} kw</Text>
                <Text style={styles.bubbleLabel}>Home</Text>
              </View>
              <View style={[styles.energyBubble, styles.produceBubble]}>
                <Text style={styles.bubbleValue}>{energyFlowData.produce} w</Text>
                <Text style={styles.bubbleLabel}>Produce</Text>
              </View>
            </View>

            {/* House Illustration */}
            <View style={styles.houseContainer}>
              {/* Stored Energy Line */}
              <View style={{
                position: 'absolute',
                bottom: 50,
                left: 50,
                width: 50,
                height: 40,
                zIndex: -1,
              }}>
                <View style={{
                  position: 'absolute',
                  left: 0,
                  bottom: 0,
                  width: 2,
                  height: '100%',
                  borderLeftWidth: 2,
                  borderColor: '#26a69a',
                  borderStyle: 'dashed',
                }} />
                <View style={{
                  position: 'absolute',
                  left: 0,
                  top: 0,
                  width: '100%',
                  height: 2,
                  borderTopWidth: 2,
                  borderColor: '#26a69a',
                  borderStyle: 'dashed',
                }} />
              </View>

              <Image
                source={require('@/assets/images/house.png')}
                style={styles.houseImage}
                resizeMode="contain"
              />
              {/* Stored Energy Point */}
              <View style={[styles.energyBubble, styles.storedBubble]}>
                <Text style={styles.bubbleValue}>{energyFlowData.stored} kw</Text>
                <Text style={styles.bubbleLabel}>Stored</Text>
              </View>
            </View>
          </Card>

          {/* Charging Status Card */}
          <Card style={styles.chargingCard}>
            <View style={styles.chargingHeader}>
              <View>
                <Text style={styles.chargingTitle}>Charging</Text>
                <Text style={styles.chargingSubtitle}>{batteryData.timeRemaining} remained</Text>
              </View>
              <View style={styles.chargingRight}>
                <Text style={styles.batteryIcon}>⚡</Text>
                <Text style={styles.batteryPercent}>{batteryData.level}%</Text>
              </View>
            </View>
            <Text style={styles.capacityText}>{batteryData.capacity} kw cap</Text>

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
          </Card>

          {/* Consumptions Section */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Consumptions</Text>
              <Text style={styles.seeAll}>See all</Text>
            </View>

            <View style={styles.consumptionGrid}>
              <Card style={styles.consumptionCard}>
                <View style={styles.consumptionIconContainer}>
                  <FontAwesome name="car" size={20} color="#4CAF50" />
                </View>
                <View style={styles.consumptionInfo}>
                  <Text style={styles.consumptionValue}>3.2 kWh</Text>
                  <Text style={styles.consumptionLabel}>Car</Text>
                </View>
                <FontAwesome name="arrow-up" size={12} color="#999" style={styles.arrowIcon} />
              </Card>

              <Card style={styles.consumptionCard}>
                <View style={styles.consumptionIconContainer}>
                  <FontAwesome name="television" size={20} color="#FF9800" />
                </View>
                <View style={styles.consumptionInfo}>
                  <Text style={styles.consumptionValue}>1.8 kWh</Text>
                  <Text style={styles.consumptionLabel}>Electronics</Text>
                </View>
                <FontAwesome name="arrow-up" size={12} color="#999" style={styles.arrowIcon} />
              </Card>

              <Card style={styles.consumptionCard}>
                <View style={styles.consumptionIconContainer}>
                  <FontAwesome name="snowflake-o" size={20} color="#2196F3" />
                </View>
                <View style={styles.consumptionInfo}>
                  <Text style={styles.consumptionValue}>4.5 kWh</Text>
                  <Text style={styles.consumptionLabel}>AC</Text>
                </View>
                <FontAwesome name="arrow-up" size={12} color="#999" style={styles.arrowIcon} />
              </Card>

              <Card style={styles.consumptionCard}>
                <View style={styles.consumptionIconContainer}>
                  <FontAwesome name="lightbulb-o" size={20} color="#FFC107" />
                </View>
                <View style={styles.consumptionInfo}>
                  <Text style={styles.consumptionValue}>0.8 kWh</Text>
                  <Text style={styles.consumptionLabel}>Lights</Text>
                </View>
                <FontAwesome name="arrow-up" size={12} color="#999" style={styles.arrowIcon} />
              </Card>
            </View>
          </View>
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
    // Card styles are handled by the component
  },
  energyPointsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  energyBubble: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    zIndex: 1,
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
    justifyContent: 'center',
    marginVertical: 20,
    height: 280,
    position: 'relative',
  },
  houseImage: {
    width: 350,
    height: 280,
  },
  chargingCard: {
    // Card styles are handled by the component
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
    height: 48,
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
