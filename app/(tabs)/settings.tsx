import { Text, View } from '@/components/Themed';
import { useState } from 'react';
import { ScrollView, StyleSheet, Switch } from 'react-native';

export default function SettingsScreen() {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [peakAlerts, setPeakAlerts] = useState(true);
  const [weeklyReport, setWeeklyReport] = useState(true);

  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
        {/* Account Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account</Text>
          <View style={styles.card}>
            <View style={styles.profileRow}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>JD</Text>
              </View>
              <View style={styles.profileInfo}>
                <Text style={styles.profileName}>John Doe</Text>
                <Text style={styles.profileEmail}>john.doe@email.com</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Preferences Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Preferences</Text>
          <View style={styles.card}>
            <View style={styles.settingRow}>
              <View>
                <Text style={styles.settingLabel}>Push Notifications</Text>
                <Text style={styles.settingDescription}>Receive usage alerts</Text>
              </View>
              <Switch
                value={notifications}
                onValueChange={setNotifications}
                trackColor={{ false: '#767577', true: '#81b0ff' }}
                thumbColor={notifications ? '#4CAF50' : '#f4f3f4'}
              />
            </View>
            <View style={styles.divider} />
            <View style={styles.settingRow}>
              <View>
                <Text style={styles.settingLabel}>Dark Mode</Text>
                <Text style={styles.settingDescription}>Use dark theme</Text>
              </View>
              <Switch
                value={darkMode}
                onValueChange={setDarkMode}
                trackColor={{ false: '#767577', true: '#81b0ff' }}
                thumbColor={darkMode ? '#4CAF50' : '#f4f3f4'}
              />
            </View>
          </View>
        </View>

        {/* Alerts Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Alerts</Text>
          <View style={styles.card}>
            <View style={styles.settingRow}>
              <View>
                <Text style={styles.settingLabel}>Peak Usage Alerts</Text>
                <Text style={styles.settingDescription}>Notify during high usage</Text>
              </View>
              <Switch
                value={peakAlerts}
                onValueChange={setPeakAlerts}
                trackColor={{ false: '#767577', true: '#81b0ff' }}
                thumbColor={peakAlerts ? '#4CAF50' : '#f4f3f4'}
              />
            </View>
            <View style={styles.divider} />
            <View style={styles.settingRow}>
              <View>
                <Text style={styles.settingLabel}>Weekly Report</Text>
                <Text style={styles.settingDescription}>Email summary every Sunday</Text>
              </View>
              <Switch
                value={weeklyReport}
                onValueChange={setWeeklyReport}
                trackColor={{ false: '#767577', true: '#81b0ff' }}
                thumbColor={weeklyReport ? '#4CAF50' : '#f4f3f4'}
              />
            </View>
          </View>
        </View>

        {/* Energy Plan Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Energy Plan</Text>
          <View style={styles.card}>
            <View style={styles.planRow}>
              <Text style={styles.planLabel}>Current Plan</Text>
              <Text style={styles.planValue}>Standard Rate</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.planRow}>
              <Text style={styles.planLabel}>Rate per kWh</Text>
              <Text style={styles.planValue}>$0.12</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.planRow}>
              <Text style={styles.planLabel}>Billing Cycle</Text>
              <Text style={styles.planValue}>Monthly</Text>
            </View>
          </View>
        </View>

        {/* App Info */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>Energy App v1.0.0</Text>
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
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 1,
    opacity: 0.6,
    marginBottom: 12,
  },
  card: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  profileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  profileInfo: {
    marginLeft: 16,
  },
  profileName: {
    fontSize: 18,
    fontWeight: '600',
  },
  profileEmail: {
    fontSize: 14,
    opacity: 0.6,
    marginTop: 2,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  settingLabel: {
    fontSize: 16,
  },
  settingDescription: {
    fontSize: 12,
    opacity: 0.6,
    marginTop: 2,
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(128,128,128,0.2)',
    marginHorizontal: 16,
  },
  planRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
  },
  planLabel: {
    fontSize: 16,
  },
  planValue: {
    fontSize: 16,
    fontWeight: '500',
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  footerText: {
    fontSize: 12,
    opacity: 0.4,
  },
});
