import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useMemo, useState } from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import ActCard from '../Ecomponents/ActCard';
import Footer from '../Ecomponents/Footer';
import Header from '../Ecomponents/Header';
import apiService from '../services/api';

export default function LearnScreen() {
  const [acts, setActs] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    loadActs();
  }, []);

  const loadActs = async () => {
    try {
      const actsData = await apiService.getLegalActs();
      setActs(actsData);
    } catch (error) {
      console.error('Failed to load acts:', error);
      // Use fallback data if API fails
      setActs(fallbackActs);
    } finally {
      setLoading(false);
    }
  };

  // OPTIMIZED: Use useMemo for filtered acts - instant filtering
  const filteredActs = useMemo(() => {
    if (!search && selectedCategory === 'All') {
      return acts;
    }
    
    const searchLower = search.toLowerCase();
    const categoryFilter = selectedCategory === 'All' ? null : selectedCategory;
    
    return acts.filter(act => {
      // Check search first
      const matchesSearch = !search || 
        act.name.toLowerCase().includes(searchLower) ||
        (act.category && act.category.toLowerCase().includes(searchLower)) ||
        (act.summary && act.summary.toLowerCase().includes(searchLower));
      
      // Check category
      const matchesCategory = !categoryFilter || act.category === categoryFilter;
      
      return matchesSearch && matchesCategory;
    });
  }, [acts, search, selectedCategory]);

  const searchActs = (text) => {
    setSearch(text);
    // Filtering now happens automatically via useMemo
  };

  const categories = ['All', 'Criminal Law', 'Civil Law', 'Cyber Law', 'Commercial Law', 'Family Law', 'Property Law', 'Social Justice'];

  const filterByCategory = (category) => {
    setSelectedCategory(category);
    // Filtering now happens automatically via useMemo
  };

  // Fallback data if API fails
  const fallbackActs = useMemo(() => [
    {
      id: 1,
      name: 'Indian Penal Code (IPC)',
      year: 1860,
      category: 'Criminal Law',
      summary: 'The main criminal code of India covering all substantive aspects of criminal law. Has 511 sections.',
      sections: 511,
      status: 'Replaced by BNS (2023)',
      relevance: 'High',
      key_features: ['Defines crimes and punishments', 'Based on British common law', 'Comprehensive coverage']
    },
    {
      id: 2,
      name: 'Bharatiya Nyaya Sanhita (BNS)',
      year: 2023,
      category: 'Criminal Law',
      summary: 'New criminal code replacing IPC with modern provisions, gender neutrality and digital offenses.',
      sections: 358,
      status: 'Active from July 1, 2024',
      relevance: 'Very High',
      key_features: ['Gender-neutral language', 'Digital offenses included', 'Community service options']
    },
    {
      id: 3,
      name: 'Indian Contract Act',
      year: 1872,
      category: 'Civil Law',
      summary: 'Governs contract law in India and is the key act regulating Indian contract law.',
      sections: 238,
      status: 'Active',
      relevance: 'High',
      key_features: ['Defines essential elements of valid contract', 'Doctrine of frustration', 'Remedies for breach']
    }
  ], []);

  // Preload categories for faster rendering
  const categoryChips = useMemo(() => 
    categories.map((category, index) => (
      <TouchableOpacity
        key={index}
        style={[
          styles.categoryChip,
          selectedCategory === category && styles.categoryChipSelected
        ]}
        onPress={() => filterByCategory(category)}
      >
        <Text style={[
          styles.categoryText,
          selectedCategory === category && styles.categoryTextSelected
        ]}>
          {category}
        </Text>
      </TouchableOpacity>
    ))
  , [categories, selectedCategory]);

  return (
    <View style={styles.container}>
      <Header title="Learn Legal Acts" />
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Custom Search Bar */}
        <View style={styles.searchContainer}>
          <View style={styles.searchInputContainer}>
            <Ionicons name="search" size={20} color="#6B7280" style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search acts (IPC, Contract, Evidence...)"
              placeholderTextColor="#9CA3AF"
              value={search}
              onChangeText={searchActs}
              returnKeyType="search"
              clearButtonMode="while-editing"
            />
            {search.length > 0 && (
              <TouchableOpacity 
                onPress={() => searchActs('')}
                style={styles.clearButton}
              >
                <Ionicons name="close-circle" size={20} color="#6B7280" />
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* Category Filter Chips */}
        <Text style={styles.sectionTitle}>Browse by Category</Text>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false} 
          style={styles.categoryScroll}
        >
          {categoryChips}
        </ScrollView>

        {/* Stats and Info */}
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Ionicons name="library" size={20} color="#4F46E5" />
            <Text style={styles.statText}>
              <Text style={styles.statNumber}>{filteredActs.length}</Text> Acts
            </Text>
          </View>
          <View style={styles.statItem}>
            <Ionicons name="time" size={20} color="#10B981" />
            <Text style={styles.statText}>
              <Text style={styles.statNumber}>{acts.length}</Text> Total
            </Text>
          </View>
          <View style={styles.statItem}>
            <Ionicons name="trending-up" size={20} color="#F59E0B" />
            <Text style={styles.statText}>
              <Text style={styles.statNumber}>20+</Text> Indian Laws
            </Text>
          </View>
        </View>

        {/* Acts List */}
        {loading ? (
          <View style={styles.loadingContainer}>
            <Ionicons name="hourglass" size={40} color="#6B7280" />
            <Text style={styles.loadingText}>Loading legal acts...</Text>
          </View>
        ) : filteredActs.length > 0 ? (
          <View style={styles.actsList}>
            <Text style={styles.resultsTitle}>
              {selectedCategory === 'All' ? 'All Legal Acts' : `${selectedCategory} Acts`}
            </Text>
            {filteredActs.map((act) => (
              <ActCard 
                key={act.id} 
                act={act}
                onPress={() => {
                  // Navigate to act details or show more info
                  console.log('Act selected:', act.name);
                }}
              />
            ))}
          </View>
        ) : (
          <View style={styles.noResultsContainer}>
            <Ionicons name="search" size={60} color="#D1D5DB" />
            <Text style={styles.noResultsTitle}>No acts found</Text>
            <Text style={styles.noResultsText}>
              Try different search terms or select another category
            </Text>
            <TouchableOpacity 
              style={styles.resetButton}
              onPress={() => {
                setSearch('');
                setSelectedCategory('All');
              }}
            >
              <Text style={styles.resetButtonText}>Reset Filters</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Legal Disclaimer */}
        <View style={styles.disclaimer}>
          <Ionicons name="information-circle" size={20} color="#3B82F6" />
          <View style={styles.disclaimerContent}>
            <Text style={styles.disclaimerTitle}>Legal Information Notice</Text>
            <Text style={styles.disclaimerText}>
              This content is for educational purposes only. It provides summaries of Indian legal acts but does not constitute legal advice. Always consult a qualified lawyer for legal matters.
            </Text>
          </View>
        </View>
      </ScrollView>

      <Footer 
        onBack={() => console.log('Back pressed')}
        nextText="Back to Home"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  searchContainer: {
    marginTop: 16,
    marginBottom: 20,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#374151',
    paddingVertical: 0,
  },
  clearButton: {
    padding: 4,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 12,
  },
  categoryScroll: {
    marginBottom: 20,
  },
  categoryChip: {
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  categoryChipSelected: {
    backgroundColor: '#4F46E5',
    borderColor: '#4F46E5',
  },
  categoryText: {
    fontSize: 14,
    color: '#374151',
    fontWeight: '500',
  },
  categoryTextSelected: {
    color: '#fff',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#F3F4F6',
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statText: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 6,
    textAlign: 'center',
  },
  statNumber: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  actsList: {
    marginBottom: 20,
  },
  resultsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 16,
  },
  loadingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  loadingText: {
    fontSize: 16,
    color: '#6B7280',
    marginTop: 12,
  },
  noResultsContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  noResultsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginTop: 16,
    marginBottom: 8,
  },
  noResultsText: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 20,
  },
  resetButton: {
    backgroundColor: '#4F46E5',
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 8,
  },
  resetButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  disclaimer: {
    flexDirection: 'row',
    backgroundColor: '#EFF6FF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 30,
    borderLeftWidth: 4,
    borderLeftColor: '#3B82F6',
  },
  disclaimerContent: {
    flex: 1,
    marginLeft: 12,
  },
  disclaimerTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1E40AF',
    marginBottom: 4,
  },
  disclaimerText: {
    fontSize: 12,
    color: '#374151',
    lineHeight: 18,
  },
});