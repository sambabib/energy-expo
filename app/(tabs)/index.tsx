import { Card } from '@/components/Card';
import { Text } from '@/components/Themed';
import { useAppContext } from '@/context/AppContext';
import { batteryData, consumptionData, energyFlowData, scheduledCharges, userData } from '@/services/mockData';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { Image, LayoutChangeEvent, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import Animated, { Easing, useAnimatedProps, useSharedValue, withRepeat, withTiming } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Path } from 'react-native-svg';

const AnimatedSvgPath = Animated.createAnimatedComponent(Path);

const FlowLine = ({ d, color }: { d: string; color: string }) => {
  const offset = useSharedValue(0);

  useEffect(() => {
    offset.value = withRepeat(
      withTiming(10, { duration: 1000, easing: Easing.linear }),
      -1,
      false
    );
  }, []);

  const animatedProps = useAnimatedProps(() => ({
    strokeDashoffset: -offset.value,
  }));

  return (
    <AnimatedSvgPath
      d={d}
      stroke={color}
      strokeWidth={2}
      fill="none"
      strokeDasharray="5, 5"
      animatedProps={animatedProps}
    />
  );
};

const EnergyCard = ({ label, value, unit, icon, color, children }: { label: string, value: string | number, unit: string, icon: any, color: string, children?: React.ReactNode }) => (
  <View style={styles.energyCard}>
    <View style={styles.energyCardHeader}>
      <FontAwesome name={icon} size={14} color={color} style={{ marginRight: 6 }} />
      <Text style={styles.energyCardLabel}>{label}</Text>
    </View>
    <View style={styles.energyCardValueContainer}>
      <Text style={styles.energyCardValue}>{value}</Text>
      <Text style={styles.energyCardUnit}>{unit}</Text>
    </View>
    {children}
  </View>
);

export default function HomeScreen() {
  const { colorScheme } = useAppContext();
  const batteryBars = 10;
  const filledBars = Math.round((batteryData.level / 100) * batteryBars);
  const [chartWidth, setChartWidth] = useState(0);
  const [selectedControlTab, setSelectedControlTab] = useState<'Charge' | 'Discharge'>('Charge');

  const onLayout = (event: LayoutChangeEvent) => {
    setChartWidth(event.nativeEvent.layout.width);
  };

  const filteredCharges = scheduledCharges.filter(
    (charge) => charge.type === selectedControlTab.toLowerCase()
  );

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colorScheme === 'dark' ? '#000' : '#fff' }]}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        <View style={styles.container}>
          {/* Header Section */}
          <View style={styles.headerCard}>
            <View>
              <Text style={styles.greeting}>Welcome Back, {userData.name}</Text>
            </View>
            <View style={styles.notificationBadge}>
              <FontAwesome name="bell-o" size={20} color="#666" />
            </View>
          </View>

          {/* Combined Weather & Energy Flow Card */}
          <Card style={styles.combinedCard}>
            {/* Weather Section */}
            <View style={styles.weatherSection}>
              <View>
                <Text style={styles.weatherTemp}>Sunny, 32°C</Text>
                <Text style={styles.weatherDate}>{new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}</Text>
              </View>
              <Text style={styles.weatherIcon}>🌤️</Text>
            </View>

            {/* Separator */}
            <View style={styles.cardSeparator} />

            {/* Energy Flow Section */}
            <View style={styles.energyFlowSection} onLayout={onLayout}>
              {/* Animated Connection Lines */}
              {chartWidth > 0 && (
                <View style={[StyleSheet.absoluteFill, { zIndex: -1 }]}>
                  <Svg width="100%" height="100%">
                    {(() => {
                      const PADDING = 20;
                      const CARD_HEIGHT = 90;
                      const GAP_BELOW_CARDS = 20; // marginTop of houseContainer is 20

                      // Calculate exact start points (bottom center of each card)
                      const startY = CARD_HEIGHT; // Relative to the Svg container top (which matches energyFlowSection padding)

                      const innerWidth = chartWidth - (PADDING * 2);
                      const cardWidth = innerWidth * 0.30; // 30% width per card

                      // Card centers
                      // Export (Left): PADDING + half card width
                      const leftCardX = PADDING + (cardWidth / 2);

                      // Home (Center): Center of chart
                      const centerCardX = chartWidth / 2;

                      // Produce (Right): Chart width - PADDING - half card width
                      const rightCardX = chartWidth - PADDING - (cardWidth / 2);

                      const houseSectionStartY = startY + GAP_BELOW_CARDS;

                      // Target points on the house image
                      // Adjusted for larger house image
                      const roofPeakY = houseSectionStartY + 80;
                      const roofSideY = houseSectionStartY + 130;

                      return (
                        <>
                          {/* Export Line (Red) - From Left Card to House Left Roof */}
                          <FlowLine
                            d={`M ${leftCardX} ${startY} L ${leftCardX} ${houseSectionStartY + 40} L ${chartWidth * 0.35} ${roofSideY}`}
                            color="#ef5350"
                          />

                          {/* Home Line (Green) - From Middle Card to House Top Roof */}
                          <FlowLine
                            d={`M ${centerCardX} ${startY} L ${centerCardX} ${roofPeakY}`}
                            color="#66bb6a"
                          />

                          {/* Produce Line (Orange) - From Right Card to House Right Roof */}
                          <FlowLine
                            d={`M ${rightCardX} ${startY} L ${rightCardX} ${houseSectionStartY + 40} L ${chartWidth * 0.65} ${roofSideY}`}
                            color="#ff7043"
                          />
                        </>
                      );
                    })()}
                  </Svg>
                </View>
              )}

              {/* Floating Energy Data Points */}
              <View style={styles.energyPointsRow}>
                <View style={{ width: '30%' }}>
                  <EnergyCard label="Grid" value={energyFlowData.export} unit="kW" icon="bolt" color="#ef5350" />
                </View>
                <View style={{ width: '30%' }}>
                  <EnergyCard label="Home" value={energyFlowData.home} unit="kW" icon="home" color="#66bb6a" />
                </View>
                <View style={{ width: '30%' }}>
                  <EnergyCard label="Solar" value={energyFlowData.produce} unit="W" icon="sun-o" color="#ff7043" />
                </View>
              </View>

              {/* House Illustration */}
              <View style={styles.houseContainer}>
                <Image
                  source={require('@/assets/images/house.png')}
                  style={styles.houseImage}
                  resizeMode="contain"
                />

                {/* Stored Energy Card (Overlaid) */}
                <View style={styles.storedCardContainer}>
                  <EnergyCard label="Battery" value={energyFlowData.stored} unit="kW" icon="battery-3" color="#26a69a">
                    <Text style={{ fontSize: 10, color: '#4CAF50', fontWeight: 'bold', marginTop: 2 }}>
                      SOC: {batteryData.level}%
                    </Text>
                  </EnergyCard>
                  {/* Connection line for battery */}
                  <View style={{ position: 'absolute', top: -30, left: '50%', marginLeft: -1, zIndex: -1 }}>
                    <Svg width={2} height={30}>
                      <FlowLine d="M 1 30 L 1 0" color="#26a69a" />
                    </Svg>
                  </View>
                </View>
              </View>
            </View>
          </Card>

          {/* Charging Status Card */}
          <Card style={styles.chargingCard}>
            {/* Top Header: Online Status & Energy Used */}
            <View style={styles.chargingTopHeader}>
              {/* Online Indicator */}
              <View style={styles.onlineContainer}>
                <Text style={styles.onlineText}>Online</Text>
                <View style={[styles.onlineDot, { backgroundColor: '#4CAF50' }]} />
              </View>

              {/* Energy Used */}
              <View style={styles.energyUsedContainer}>
                <View style={styles.energyUsedLabelRow}>
                  <FontAwesome name="bolt" size={14} color="#6C63FF" style={{ marginRight: 4 }} />
                  <Text style={styles.energyUsedLabel}>Energy Used</Text>
                </View>
                <Text style={styles.energyUsedValue}>7.3 kWh</Text>
              </View>
            </View>

            {/* Car Illustration */}
            <View style={styles.carContainer}>
              <Image
                source={require('@/assets/images/car-side.png')}
                style={styles.carImage}
                resizeMode="contain"
              />
            </View>

            <View style={styles.chargingHeader}>
              <View>
                <Text style={styles.chargingTitle}>Charging</Text>
                <Text style={styles.chargingSubtitle}>{batteryData.timeRemaining} remaining</Text>
              </View>
              <View style={styles.chargingRight}>
                <Text style={styles.batteryIcon}>⚡</Text>
                <Text style={styles.batteryPercent}>{batteryData.level}%</Text>
              </View>
            </View>

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

          {/* Scheduled Control Section */}
          <View style={styles.section}>
            <View style={[styles.sectionHeader, { marginBottom: 24 }]}>
              <Text style={styles.sectionTitle}>Scheduled Control</Text>
            </View>

            {/* Tab Switcher */}
            <View style={styles.tabSwitcher}>
              {['Charge', 'Discharge'].map((tab) => (
                <TouchableOpacity
                  key={tab}
                  style={[
                    styles.tabButton,
                    selectedControlTab === tab && styles.tabButtonActive,
                  ]}
                  onPress={() => setSelectedControlTab(tab as 'Charge' | 'Discharge')}
                >
                  <Text
                    style={[
                      styles.tabButtonText,
                      selectedControlTab === tab && styles.tabButtonTextActive,
                    ]}
                  >
                    {tab}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <Card style={styles.scheduledCard}>
              {filteredCharges.length > 0 ? (
                filteredCharges.map((charge, index) => (
                  <View key={charge.id}>
                    <View style={styles.scheduledRow}>
                      <View>
                        <Text style={styles.scheduledTime}>{charge.start} - {charge.end}</Text>
                        <Text style={styles.scheduledFrequency}>{charge.frequency}</Text>
                      </View>
                      <View style={styles.scheduledRight}>
                        <Text style={styles.scheduledRate}>{charge.rate} W</Text>
                      </View>
                    </View>
                    {index < filteredCharges.length - 1 && <View style={styles.cardSeparator} />}
                  </View>
                ))
              ) : (
                <View style={styles.emptyState}>
                  <Text style={styles.emptyStateText}>No scheduled {selectedControlTab.toLowerCase()}s</Text>
                </View>
              )}
            </Card>

            <TouchableOpacity style={styles.createChargeButton}>
              <Text style={styles.createChargeButtonText}>Create Scheduled {selectedControlTab}</Text>
            </TouchableOpacity>
          </View>

          {/* Consumptions Section */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Consumption</Text>
              <TouchableOpacity onPress={() => router.push('/consumption-details')}>
                <Text style={styles.seeAll}>See all</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.consumptionGrid}>
              {consumptionData.slice(0, 4).map((item) => (
                <Card key={item.id} style={styles.consumptionCard}>
                  <View style={styles.consumptionIconContainer}>
                    <FontAwesome name={item.icon as any} size={20} color={item.color} />
                  </View>
                  <View style={styles.consumptionInfo}>
                    <Text style={styles.consumptionValue}>{item.value} {item.unit}</Text>
                    <Text style={styles.consumptionLabel}>{item.name}</Text>
                    {item.name === 'Battery' && (
                      <Text style={{ fontSize: 10, color: '#4CAF50', fontWeight: 'bold', marginTop: 2 }}>
                        SOC: {batteryData.level}%
                      </Text>
                    )}
                  </View>
                  <FontAwesome name="arrow-up" size={12} color="#999" style={styles.arrowIcon} />
                </Card>
              ))}
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
    fontSize: 20,
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
  energyPointsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 0,
    zIndex: 10,
  },
  energyCard: {
    backgroundColor: '#1a1a1a', // Dark card background
    borderRadius: 16,
    padding: 12,
    minHeight: 90, // Allow expansion
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  energyCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  energyCardLabel: {
    color: '#aaa',
    fontSize: 12,
    fontWeight: '500',
  },
  energyCardValueContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  energyCardValue: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginRight: 4,
  },
  energyCardUnit: {
    color: '#aaa',
    fontSize: 12,
  },
  houseContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    height: 400, // Further increased height
    position: 'relative',
    width: '100%',
  },
  houseImage: {
    width: '100%',
    height: '100%',
    opacity: 0.9,
  },
  storedCardContainer: {
    position: 'absolute',
    bottom: 0,
    width: '35%',
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
    backgroundColor: '#e39b65',
  },
  section: {
    marginTop: 12,
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
    height: 150,
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    padding: 16,
    position: 'relative',
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
    marginLeft: 0,
  },
  consumptionValue: {
    fontSize: 18,
    fontWeight: '600',
  },
  consumptionLabel: {
    fontSize: 14,
    opacity: 0.6,
    marginTop: 4,
  },
  arrowIcon: {
    transform: [{ rotate: '45deg' }],
    position: 'absolute',
    top: 16,
    right: 16,
  },
  combinedCard: {
    padding: 0,
  },
  weatherSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
  cardSeparator: {
    height: 1,
    backgroundColor: 'rgba(128,128,128,0.2)',
  },
  energyFlowSection: {
    padding: 20,
    paddingBottom: 40,
  },
  headerCard: {
    backgroundColor: '#1a1a1a', // Dark card background
    borderRadius: 24,
    padding: 20,
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  scheduledCard: {
    padding: 0,
    marginBottom: 16,
  },
  scheduledRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
  scheduledTime: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  scheduledFrequency: {
    fontSize: 14,
    opacity: 0.6,
    marginTop: 4,
    color: '#aaa',
  },
  scheduledRight: {
    alignItems: 'flex-end',
  },
  scheduledRate: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  createChargeButton: {
    backgroundColor: '#e39b65',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  createChargeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  tabSwitcher: {
    flexDirection: 'row',
    backgroundColor: 'rgba(128,128,128,0.1)',
    borderRadius: 12,
    padding: 4,
    marginBottom: 16,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 8,
  },
  tabButtonActive: {
    backgroundColor: '#e39b65',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  tabButtonText: {
    fontSize: 14,
    fontWeight: '500',
    opacity: 0.6,
    color: '#aaa',
  },
  tabButtonTextActive: {
    opacity: 1,
    fontWeight: '600',
    color: '#fff',
  },
  emptyState: {
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyStateText: {
    color: '#666',
    fontSize: 14,
    fontStyle: 'italic',
  },
  carContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -40, // Pull car up to reduce top whitespace
    marginBottom: -100, // Pull content up to reduce gap
    height: 400,
    width: '100%',
  },
  carImage: {
    width: '100%',
    height: '100%',
    opacity: 0.9,
  },
  chargingTopHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 0,
    zIndex: 10,
    paddingHorizontal: 10,
    marginTop: 10,
  },
  onlineContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(76, 175, 80, 0.1)',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(76, 175, 80, 0.2)',
  },
  onlineDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginLeft: 6,
  },
  onlineText: {
    color: '#4CAF50',
    fontSize: 12,
    fontWeight: '600',
  },
  energyUsedContainer: {
    alignItems: 'flex-end',
  },
  energyUsedLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  energyUsedLabel: {
    color: '#aaa',
    fontSize: 12,
    fontWeight: '500',
  },
  energyUsedValue: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
