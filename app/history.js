import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Footer from '../Ecomponents/Footer';
import Header from '../Ecomponents/Header';
import HistoryItem from '../Ecomponents/HistoryItem';

export default function HistoryScreen() {
  const [history, setHistory] = useState([]);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    // Sample history data
    const sampleHistory = [
      {
        id: '1',
        timestamp: new Date().toISOString(),
        description: 'Mobile phone theft at bus station',
        category: 'Theft',
        severity: { score: 65, level: 'High' },
        sections: [{ code: '378' }, { code: '379' }],
        language: 'en'
      },
      {
        id: '2',
        timestamp: new Date(Date.now() - 86400000).toISOString(),
        description: 'Online fraud through fake website',
        category: 'Cybercrime',
        severity: { score: 55, level: 'Medium' },
        sections: [{ code: '420' }, { code: '66C' }],
        language: 'hi'
      }
    ];
    setHistory(sampleHistory);
  }, []);

  const filters = ['All', 'Theft', 'Assault', 'Fraud', 'Cybercrime'];

  return (
    <View style={styles.container}>
      <Header title="Complaint History" />
      
      <ScrollView style={styles.content}>
        {/* Stats */}
        <View style={styles.statsCard}>
          <View style={styles.statItem}>
            <Ionicons name="document-text" size={24} color="#4F46E5" />
            <Text style={styles.statNumber}>{history.length}</Text>
            <Text style={styles.statLabel}>Total</Text>
          </View>
          <View style={styles.statItem}>
            <Ionicons name="time" size={24} color="#F59E0B" />
            <Text style={styles.statNumber}>{history.filter(h => new Date(h.timestamp) > new Date(Date.now() - 86400000)).length}</Text>
            <Text style={styles.statLabel}>Today</Text>
          </View>
          <View style={styles.statItem}>
            <Ionicons name="download" size={24} color="#10B981" />
            <Text style={styles.statNumber}>{history.length}</Text>
            <Text style={styles.statLabel}>Saved</Text>
          </View>
        </View>

        {/* Filters */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filters}>
          {filters.map((f) => (
            <TouchableOpacity
              key={f}
              style={[styles.filterChip, filter === f && styles.filterChipSelected]}
              onPress={() => setFilter(f)}
            >
              <Text style={[styles.filterText, filter === f && styles.filterTextSelected]}>
                {f}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* History List */}
        {history.length > 0 ? (
          history.map((item) => (
            <HistoryItem key={item.id} item={item} onPress={() => console.log('View', item.id)} />
          ))
        ) : (
          <View style={styles.emptyState}>
            <Ionicons name="time" size={60} color="#D1D5DB" />
            <Text style={styles.emptyTitle}>No History Yet</Text>
            <Text style={styles.emptyText}>
              Your complaint history will appear here after you file complaints.
            </Text>
          </View>
        )}

        {/* Clear History */}
        {history.length > 0 && (
          <TouchableOpacity style={styles.clearButton}>
            <Ionicons name="trash" size={20} color="#EF4444" />
            <Text style={styles.clearButtonText}>Clear All History</Text>
          </TouchableOpacity>
        )}
      </ScrollView>

      <Footer onBack={() => console.log('Back')} nextText="Back to Home" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9FAFB' },
  content: { flex: 1, padding: 16 },
  statsCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    justifyContent: 'space-between',
  },
  statItem: { alignItems: 'center' },
  statNumber: { fontSize: 24, fontWeight: 'bold', color: '#1F2937', marginTop: 8 },
  statLabel: { fontSize: 12, color: '#6B7280', marginTop: 4 },
  filters: { marginBottom: 20 },
  filterChip: {
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  filterChipSelected: { backgroundColor: '#4F46E5', borderColor: '#4F46E5' },
  filterText: { fontSize: 14, color: '#374151' },
  filterTextSelected: { color: '#fff' },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyTitle: { fontSize: 18, fontWeight: '600', color: '#1F2937', marginTop: 16 },
  emptyText: { fontSize: 14, color: '#6B7280', textAlign: 'center', marginTop: 8, lineHeight: 20 },
  clearButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FEF2F2',
    padding: 16,
    borderRadius: 12,
    marginTop: 20,
    gap: 8,
  },
  clearButtonText: { fontSize: 16, fontWeight: '600', color: '#DC2626' },
});