import { Card } from '@/components/Card';
import { Text } from '@/components/Themed';
import { useAppContext } from '@/context/AppContext';
import { batteryData, consumptionData } from '@/services/mockData';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Stack, router } from 'expo-router';
import { useState } from 'react';
import { Modal, Pressable, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ConsumptionDetailsScreen() {
  const { colorScheme } = useAppContext();
  const [selectedItem, setSelectedItem] = useState<typeof consumptionData[0] | null>(null);

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colorScheme === 'dark' ? '#000' : '#fff' }]}>
      <Stack.Screen options={{ headerShown: false }} />
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        <View style={styles.container}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
              <FontAwesome name="arrow-left" size={20} color={colorScheme === 'dark' ? '#fff' : '#000'} />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Consumption Details</Text>
            <View style={{ width: 40 }} />
          </View>

          <View style={styles.consumptionGrid}>
            {consumptionData.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={styles.cardWrapper}
                onPress={() => setSelectedItem(item)}
              >
                <Card style={styles.consumptionCard}>
                  <View style={styles.consumptionIconContainer}>
                    <FontAwesome name={item.icon as any} size={20} color={item.color} />
                  </View>
                  <View style={styles.consumptionInfo}>
                    <Text style={styles.consumptionValue}>{item.value} {item.unit}</Text>
                    <Text style={styles.consumptionLabel}>{item.name}</Text>
                    {item.name === 'Battery' && (
                      <Text style={styles.socLabel}>SOC: {Math.round(batteryData.level)}%</Text>
                    )}
                  </View>
                  <FontAwesome name="chevron-right" size={12} color="#999" style={styles.arrowIcon} />
                </Card>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>

      <Modal
        animationType="slide"
        transparent={true}
        visible={!!selectedItem}
        onRequestClose={() => setSelectedItem(null)}
      >
        <Pressable style={styles.modalOverlay} onPress={() => setSelectedItem(null)}>
          <Pressable style={[styles.modalContent, { backgroundColor: colorScheme === 'dark' ? '#1a1a1a' : '#fff' }]} onPress={(e) => e.stopPropagation()}>
            {selectedItem && (
              <>
                <View style={styles.modalHeader}>
                  <View style={[styles.modalIconContainer, { backgroundColor: 'rgba(128,128,128,0.1)' }]}>
                    <FontAwesome name={selectedItem.icon as any} size={24} color={selectedItem.color} />
                  </View>
                  <Text style={styles.modalTitle}>{selectedItem.name}</Text>
                  <TouchableOpacity onPress={() => setSelectedItem(null)} style={styles.closeButton}>
                    <FontAwesome name="times" size={20} color={colorScheme === 'dark' ? '#fff' : '#666'} />
                  </TouchableOpacity>
                </View>

                <View style={styles.modalBody}>
                  <View style={styles.modalRow}>
                    <Text style={styles.modalLabel}>Current Usage</Text>
                    <Text style={styles.modalValue}>{selectedItem.value} {selectedItem.unit}</Text>
                  </View>

                  {selectedItem.name === 'Battery' && (
                    <View style={styles.modalRow}>
                      <Text style={styles.modalLabel}>State of Charge</Text>
                      <Text style={styles.modalValue}>{Math.round(batteryData.level)}%</Text>
                    </View>
                  )}

                  <View style={styles.separator} />

                  <Text style={styles.descriptionText}>
                    Detailed statistics and historical data for {selectedItem.name} will appear here.
                  </Text>
                </View>
              </>
            )}
          </Pressable>
        </Pressable>
      </Modal>
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
    paddingBottom: 40,
  },
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  consumptionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  cardWrapper: {
    width: '47%',
    marginBottom: 12,
  },
  consumptionCard: {
    width: '100%',
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
  socLabel: {
    fontSize: 12,
    color: '#4CAF50',
    marginTop: 2,
    fontWeight: '600',
  },
  arrowIcon: {
    position: 'absolute',
    top: 16,
    right: 16,
    opacity: 0.5,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    minHeight: 300,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  modalIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    flex: 1,
  },
  closeButton: {
    padding: 8,
  },
  modalBody: {
    gap: 16,
  },
  modalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  modalLabel: {
    fontSize: 16,
    opacity: 0.6,
  },
  modalValue: {
    fontSize: 18,
    fontWeight: '600',
  },
  separator: {
    height: 1,
    backgroundColor: 'rgba(128,128,128,0.2)',
    marginVertical: 8,
  },
  descriptionText: {
    fontSize: 14,
    opacity: 0.6,
    lineHeight: 20,
  },
});
