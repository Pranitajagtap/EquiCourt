import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function ActCard({ act, onPress }) {
  const getCategoryColor = (category) => {
    switch (category) {
      case 'Criminal Law': return '#DC2626';
      case 'Civil Law': return '#2563EB';
      case 'Cyber Law': return '#7C3AED';
      case 'Commercial Law': return '#059669';
      case 'Family Law': return '#DB2777';
      case 'Property Law': return '#EA580C';
      default: return '#6B7280';
    }
  };

  const getStatusColor = (status) => {
    if (status.includes('Active')) return '#10B981';
    if (status.includes('Replaced')) return '#EF4444';
    return '#F59E0B';
  };

  return (
    <TouchableOpacity 
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <Text style={styles.name} numberOfLines={2}>{act.name}</Text>
          <View style={[styles.categoryBadge, { backgroundColor: getCategoryColor(act.category) + '20' }]}>
            <Text style={[styles.categoryText, { color: getCategoryColor(act.category) }]}>
              {act.category}
            </Text>
          </View>
        </View>
        <View style={styles.yearContainer}>
          <Ionicons name="calendar" size={14} color="#6B7280" />
          <Text style={styles.year}>{act.year}</Text>
        </View>
      </View>

      <Text style={styles.summary} numberOfLines={3}>
        {act.summary}
      </Text>

      <View style={styles.details}>
        <View style={styles.detailItem}>
          <Ionicons name="document-text" size={14} color="#6B7280" />
          <Text style={styles.detailText}>Sec: {act.sections}</Text>
        </View>
        
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(act.status) + '20' }]}>
          <Text style={[styles.statusText, { color: getStatusColor(act.status) }]}>
            {act.status}
          </Text>
        </View>
      </View>

      {act.key_features && (
        <View style={styles.features}>
          {act.key_features.slice(0, 2).map((feature, index) => (
            <View key={index} style={styles.featureItem}>
              <Ionicons name="checkmark-circle" size={12} color="#10B981" />
              <Text style={styles.featureText}>{feature}</Text>
            </View>
          ))}
          {act.key_features.length > 2 && (
            <Text style={styles.moreFeatures}>+{act.key_features.length - 2} more</Text>
          )}
        </View>
      )}

      <View style={styles.footer}>
        <View style={styles.relevance}>
          <Ionicons name="trending-up" size={14} color="#4F46E5" />
          <Text style={styles.relevanceText}>{act.relevance || 'High'} relevance</Text>
        </View>
        <Ionicons name="chevron-forward" size={18} color="#9CA3AF" />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#F3F4F6',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  titleContainer: {
    flex: 1,
    marginRight: 12,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 6,
    lineHeight: 22,
  },
  categoryBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  categoryText: {
    fontSize: 11,
    fontWeight: '600',
  },
  yearContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  year: {
    fontSize: 12,
    color: '#374151',
    marginLeft: 4,
    fontWeight: '500',
  },
  summary: {
    fontSize: 14,
    color: '#4B5563',
    lineHeight: 20,
    marginBottom: 12,
  },
  details: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailText: {
    fontSize: 12,
    color: '#6B7280',
    marginLeft: 4,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  statusText: {
    fontSize: 11,
    fontWeight: '600',
  },
  features: {
    backgroundColor: '#F9FAFB',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  featureText: {
    fontSize: 12,
    color: '#374151',
    marginLeft: 6,
    flex: 1,
  },
  moreFeatures: {
    fontSize: 11,
    color: '#6B7280',
    fontStyle: 'italic',
    marginTop: 4,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  relevance: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  relevanceText: {
    fontSize: 12,
    color: '#4B5563',
    marginLeft: 6,
    fontWeight: '500',
  },
});