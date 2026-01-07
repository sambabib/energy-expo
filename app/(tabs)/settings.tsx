import { Text } from '@/components/Themed';
import { useAppContext } from '@/context/AppContext';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { ScrollView, StyleSheet, Switch, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SettingsScreen() {
  const { settings, updateSetting, colorScheme } = useAppContext();

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colorScheme === 'dark' ? '#000' : '#fff' }]}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        <View style={styles.container}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Settings</Text>
            <View style={styles.menuButton}>
              <FontAwesome name="ellipsis-h" size={20} color="#666" />
            </View>
          </View>

          {/* Account Section */}
          <Text style={styles.sectionTitle}>Account</Text>

          <View style={styles.settingRow}>
            <Text style={styles.settingLabel}>Account</Text>
            <Switch
              value={settings.accountEnabled}
              onValueChange={(value) => updateSetting('accountEnabled', value)}
              trackColor={{ false: '#E0E0E0', true: '#4CAF50' }}
              thumbColor="#fff"
            />
          </View>
          <View style={styles.divider} />

          <View style={styles.settingRow}>
            <Text style={styles.settingLabel}>Notifications</Text>
            <Switch
              value={settings.notifications}
              onValueChange={(value) => updateSetting('notifications', value)}
              trackColor={{ false: '#E0E0E0', true: '#4CAF50' }}
              thumbColor="#fff"
            />
          </View>
          <View style={styles.divider} />

          <View style={styles.settingRow}>
            <Text style={styles.settingLabel}>Dark Mode</Text>
            <Switch
              value={settings.darkMode}
              onValueChange={(value) => updateSetting('darkMode', value)}
              trackColor={{ false: '#E0E0E0', true: '#4CAF50' }}
              thumbColor="#fff"
            />
          </View>
          <View style={styles.divider} />

          <View style={styles.settingRow}>
            <Text style={styles.settingLabel}>Biometric</Text>
            <Switch
              value={settings.biometric}
              onValueChange={(value) => updateSetting('biometric', value)}
              trackColor={{ false: '#E0E0E0', true: '#4CAF50' }}
              thumbColor="#fff"
            />
          </View>

          {/* Energy Monitoring Section */}
          <Text style={styles.sectionTitle}>Energy Monitoring</Text>

          <View style={styles.settingRow}>
            <Text style={styles.settingLabel}>Real-time Monitoring</Text>
            <Switch
              value={settings.realTimeMonitoring}
              onValueChange={(value) => updateSetting('realTimeMonitoring', value)}
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
              value={settings.peakUsageAlerts}
              onValueChange={(value) => updateSetting('peakUsageAlerts', value)}
              trackColor={{ false: '#E0E0E0', true: '#4CAF50' }}
              thumbColor="#fff"
            />
          </View>
          <View style={styles.divider} />

          <View style={styles.settingRow}>
            <Text style={styles.settingLabel}>Solar Panel Tracking</Text>
            <Switch
              value={settings.solarTracking}
              onValueChange={(value) => updateSetting('solarTracking', value)}
              trackColor={{ false: '#E0E0E0', true: '#4CAF50' }}
              thumbColor="#fff"
            />
          </View>

          {/* Privacy Section */}
          <Text style={styles.sectionTitle}>Privacy</Text>

          <View style={styles.settingRow}>
            <Text style={styles.settingLabel}>Location Service</Text>
            <Switch
              value={settings.locationService}
              onValueChange={(value) => updateSetting('locationService', value)}
              trackColor={{ false: '#E0E0E0', true: '#4CAF50' }}
              thumbColor="#fff"
            />
          </View>
          <View style={styles.divider} />

          <View style={styles.settingRow}>
            <Text style={styles.settingLabel}>Data Collection</Text>
            <Switch
              value={settings.dataCollection}
              onValueChange={(value) => updateSetting('dataCollection', value)}
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
