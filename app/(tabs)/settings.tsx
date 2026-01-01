import { Text, View } from '@/components/Themed';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useState } from 'react';
import { ScrollView, StyleSheet, Switch, TouchableOpacity } from 'react-native';

export default function SettingsScreen() {
  // Account settings
  const [accountEnabled, setAccountEnabled] = useState(true);
  const [notifications, setNotifications] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [biometric, setBiometric] = useState(true);

  // Energy Monitoring settings
  const [realTimeMonitoring, setRealTimeMonitoring] = useState(true);
  const [peakUsageAlerts, setPeakUsageAlerts] = useState(true);
  const [solarTracking, setSolarTracking] = useState(false);

  // Privacy settings
  const [locationService, setLocationService] = useState(true);
  const [dataCollection, setDataCollection] = useState(true);

  return (
    <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton}>
            <FontAwesome name="chevron-left" size={18} color="#333" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Settings</Text>
          <View style={styles.headerSpacer} />
        </View>

        {/* Account Section */}
        <Text style={styles.sectionTitle}>Account</Text>

        <View style={styles.settingRow}>
          <Text style={styles.settingLabel}>Account</Text>
          <Switch
            value={accountEnabled}
            onValueChange={setAccountEnabled}
            trackColor={{ false: '#E0E0E0', true: '#4CAF50' }}
            thumbColor="#fff"
          />
        </View>
        <View style={styles.divider} />

        <View style={styles.settingRow}>
          <Text style={styles.settingLabel}>Notifications</Text>
          <Switch
            value={notifications}
            onValueChange={setNotifications}
            trackColor={{ false: '#E0E0E0', true: '#4CAF50' }}
            thumbColor="#fff"
          />
        </View>
        <View style={styles.divider} />

        <View style={styles.settingRow}>
          <Text style={styles.settingLabel}>Dark Mode</Text>
          <Switch
            value={darkMode}
            onValueChange={setDarkMode}
            trackColor={{ false: '#E0E0E0', true: '#4CAF50' }}
            thumbColor="#fff"
          />
        </View>
        <View style={styles.divider} />

        <View style={styles.settingRow}>
          <Text style={styles.settingLabel}>Biometric</Text>
          <Switch
            value={biometric}
            onValueChange={setBiometric}
            trackColor={{ false: '#E0E0E0', true: '#4CAF50' }}
            thumbColor="#fff"
          />
        </View>

        {/* Energy Monitoring Section */}
        <Text style={styles.sectionTitle}>Energy Monitoring</Text>

        <View style={styles.settingRow}>
          <Text style={styles.settingLabel}>Real-time Monitoring</Text>
          <Switch
            value={realTimeMonitoring}
            onValueChange={setRealTimeMonitoring}
            trackColor={{ false: '#E0E0E0', true: '#4CAF50' }}
            thumbColor="#fff"
          />
        </View>
        <View style={styles.divider} />

        <View style={styles.settingRow}>
          <View style={styles.settingLabelContainer}>
            <Text style={styles.settingLabel}>Peak Usage Alerts</Text>
            <Text style={styles.settingDescription}>Notify when usage exceeds threshold</Text>
          </View>
          <Switch
            value={peakUsageAlerts}
            onValueChange={setPeakUsageAlerts}
            trackColor={{ false: '#E0E0E0', true: '#4CAF50' }}
            thumbColor="#fff"
          />
        </View>
        <View style={styles.divider} />

        <View style={styles.settingRow}>
          <Text style={styles.settingLabel}>Solar Panel Tracking</Text>
          <Switch
            value={solarTracking}
            onValueChange={setSolarTracking}
            trackColor={{ false: '#E0E0E0', true: '#4CAF50' }}
            thumbColor="#fff"
          />
        </View>

        {/* Privacy Section */}
        <Text style={styles.sectionTitle}>Privacy</Text>

        <View style={styles.settingRow}>
          <Text style={styles.settingLabel}>Location Service</Text>
          <Switch
            value={locationService}
            onValueChange={setLocationService}
            trackColor={{ false: '#E0E0E0', true: '#4CAF50' }}
            thumbColor="#fff"
          />
        </View>
        <View style={styles.divider} />

        <View style={styles.settingRow}>
          <Text style={styles.settingLabel}>Data Collection</Text>
          <Switch
            value={dataCollection}
            onValueChange={setDataCollection}
            trackColor={{ false: '#E0E0E0', true: '#4CAF50' }}
            thumbColor="#fff"
          />
        </View>

        {/* Clear Data Button */}
        <TouchableOpacity style={styles.clearButton}>
          <Text style={styles.clearButtonText}>Clear All Data</Text>
        </TouchableOpacity>

        {/* App Version */}
        <Text style={styles.versionText}>Energy App v1.0.0</Text>
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
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 32,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  headerSpacer: {
    width: 40,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 24,
    marginBottom: 16,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
  },
  settingLabelContainer: {
    flex: 1,
    marginRight: 16,
  },
  settingLabel: {
    fontSize: 16,
  },
  settingDescription: {
    fontSize: 13,
    opacity: 0.5,
    marginTop: 2,
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(128,128,128,0.15)',
  },
  clearButton: {
    alignItems: 'center',
    paddingVertical: 16,
    marginTop: 32,
  },
  clearButtonText: {
    fontSize: 16,
    color: '#4CAF50',
    textDecorationLine: 'underline',
  },
  versionText: {
    textAlign: 'center',
    fontSize: 12,
    opacity: 0.4,
    marginTop: 16,
  },
});
