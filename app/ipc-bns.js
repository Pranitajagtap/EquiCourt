import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Footer from '../Ecomponents/Footer';
import Header from '../Ecomponents/Header';
import IpcBnsCard from '../Ecomponents/IpcBnsCard';

export default function IpcBnsScreen() {
  const [sections, setSections] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  const categories = ['All', 'Body Offenses', 'Property Offenses', 'Women & Children', 'Cyber Crimes', 'Public Order'];

  useEffect(() => {
    // Load sample data
    const sampleData = [
      {
        ipc: { code: '302', title: 'Murder', punishment: 'Death or life imprisonment' },
        bns: { code: '103', title: 'Murder', punishment: 'Death or life imprisonment' },
        changes: ['Gender neutral language', 'Digital evidence recognized'],
        impact: 'Major'
      },
      {
        ipc: { code: '375', title: 'Rape', punishment: 'Imprisonment 7 years to life' },
        bns: { code: '63', title: 'Sexual offences', punishment: 'Imprisonment 10 years to life' },
        changes: ['Gender neutral', 'Enhanced punishment', 'Digital offences added'],
        impact: 'Major'
      }
    ];
    setSections(sampleData);
  }, []);

  const searchSections = (text) => {
    setSearch(text);
  };

  return (
    <View style={styles.container}>
      <Header title="IPC vs BNS Comparison" />
      
      <ScrollView style={styles.content}>
        <Text style={styles.subtitle}>
          Compare old IPC sections with new BNS (2023) provisions
        </Text>

        {/* Search */}
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#6B7280" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search sections (302, 375, 420...)"
            value={search}
            onChangeText={searchSections}
          />
        </View>

        {/* Categories */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categories}>
          {categories.map((cat) => (
            <TouchableOpacity
              key={cat}
              style={[
                styles.categoryChip,
                selectedCategory === cat && styles.categoryChipSelected
              ]}
              onPress={() => setSelectedCategory(cat)}
            >
              <Text style={[
                styles.categoryText,
                selectedCategory === cat && styles.categoryTextSelected
              ]}>
                {cat}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Info Card */}
        <View style={styles.infoCard}>
          <Ionicons name="information-circle" size={20} color="#3B82F6" />
          <Text style={styles.infoText}>
            BNS (Bharatiya Nyaya Sanhita) replaces IPC from July 1, 2024 with modern provisions.
          </Text>
        </View>

        {/* Sections List */}
        <Text style={styles.sectionTitle}>50+ Sections Compared</Text>
        {sections.map((section, index) => (
          <IpcBnsCard key={index} section={section} />
        ))}

        {/* Legend */}
        <View style={styles.legend}>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: '#EF4444' }]} />
            <Text style={styles.legendText}>Major Change</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: '#F59E0B' }]} />
            <Text style={styles.legendText}>Moderate Change</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: '#10B981' }]} />
            <Text style={styles.legendText}>Minor Change</Text>
          </View>
        </View>
      </ScrollView>

      <Footer onBack={() => console.log('Back')} nextText="Back to Home" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9FAFB' },
  content: { flex: 1, padding: 16 },
  subtitle: { fontSize: 14, color: '#6B7280', marginBottom: 20, textAlign: 'center' },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  searchInput: { flex: 1, marginLeft: 12, fontSize: 16 },
  categories: { marginBottom: 16 },
  categoryChip: {
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  categoryChipSelected: { backgroundColor: '#4F46E5', borderColor: '#4F46E5' },
  categoryText: { fontSize: 14, color: '#374151' },
  categoryTextSelected: { color: '#fff' },
  infoCard: {
    flexDirection: 'row',
    backgroundColor: '#EFF6FF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
    gap: 12,
  },
  infoText: { flex: 1, fontSize: 14, color: '#374151', lineHeight: 20 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#1F2937', marginBottom: 16 },
  legend: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginTop: 20,
  },
  legendItem: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  legendDot: { width: 10, height: 10, borderRadius: 5 },
  legendText: { fontSize: 12, color: '#6B7280' },
});