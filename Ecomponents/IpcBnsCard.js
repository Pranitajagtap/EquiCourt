import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function IpcBnsCard({ section, onPress }) {
  const getChangeColor = (impact) => {
    switch(impact) {
      case 'Major': return '#EF4444';
      case 'Moderate': return '#F59E0B';
      case 'Minor': return '#10B981';
      default: return '#6B7280';
    }
  };

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      {/* Section Numbers */}
      <View style={styles.sectionHeader}>
        <View style={[styles.sectionBadge, { backgroundColor: '#FEE2E2' }]}>
          <Text style={[styles.sectionCode, { color: '#DC2626' }]}>
            IPC {section.ipc?.code || 'N/A'}
          </Text>
        </View>
        <Ionicons name="arrow-forward" size={16} color="#9CA3AF" />
        <View style={[styles.sectionBadge, { backgroundColor: '#DBEAFE' }]}>
          <Text style={[styles.sectionCode, { color: '#2563EB' }]}>
            BNS {section.bns?.code || 'N/A'}
          </Text>
        </View>
      </View>

      {/* Titles */}
      <View style={styles.titleContainer}>
        <Text style={styles.title} numberOfLines={2}>
          {section.ipc?.title || section.bns?.title || 'Not Available'}
        </Text>
      </View>

      {/* Punishment Comparison */}
      <View style={styles.punishmentContainer}>
        <View style={styles.punishmentItem}>
          <Ionicons name="scale" size={14} color="#6B7280" />
          <Text style={styles.punishmentLabel}>IPC:</Text>
          <Text style={styles.punishmentText} numberOfLines={1}>
            {section.ipc?.punishment || 'N/A'}
          </Text>
        </View>
        <View style={styles.punishmentItem}>
          <Ionicons name="scale" size={14} color="#6B7280" />
          <Text style={styles.punishmentLabel}>BNS:</Text>
          <Text style={styles.punishmentText} numberOfLines={1}>
            {section.bns?.punishment || 'N/A'}
          </Text>
        </View>
      </View>

      {/* Changes */}
      {section.changes && section.changes.length > 0 && (
        <View style={styles.changesContainer}>
          <Text style={styles.changesTitle}>Key Changes:</Text>
          {section.changes.slice(0, 2).map((change, index) => (
            <View key={index} style={styles.changeItem}>
              <Ionicons name="checkmark-circle" size={12} color="#10B981" />
              <Text style={styles.changeText} numberOfLines={2}>{change}</Text>
            </View>
          ))}
          {section.changes.length > 2 && (
            <Text style={styles.moreChanges}>+{section.changes.length - 2} more</Text>
          )}
        </View>
      )}

      {/* Impact */}
      {section.impact && (
        <View style={styles.impactContainer}>
          <View style={[styles.impactBadge, { backgroundColor: getChangeColor(section.impact) + '20' }]}>
            <Text style={[styles.impactText, { color: getChangeColor(section.impact) }]}>
              {section.impact} Impact
            </Text>
          </View>
        </View>
      )}

      {/* View Details */}
      <View style={styles.footer}>
        <Text style={styles.viewDetails}>View Comparison Details</Text>
        <Ionicons name="chevron-forward" size={16} color="#4F46E5" />
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
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  sectionBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  sectionCode: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  titleContainer: {
    marginBottom: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    lineHeight: 22,
  },
  punishmentContainer: {
    backgroundColor: '#F9FAFB',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  punishmentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  punishmentLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginLeft: 6,
    marginRight: 4,
    width: 35,
  },
  punishmentText: {
    fontSize: 12,
    color: '#374151',
    flex: 1,
    fontWeight: '500',
  },
  changesContainer: {
    marginBottom: 12,
  },
  changesTitle: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 6,
    fontWeight: '500',
  },
  changeItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  changeText: {
    fontSize: 12,
    color: '#374151',
    marginLeft: 6,
    flex: 1,
    lineHeight: 16,
  },
  moreChanges: {
    fontSize: 11,
    color: '#6B7280',
    fontStyle: 'italic',
    marginTop: 4,
  },
  impactContainer: {
    marginBottom: 12,
  },
  impactBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  impactText: {
    fontSize: 11,
    fontWeight: '600',
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  viewDetails: {
    fontSize: 13,
    color: '#4F46E5',
    fontWeight: '500',
  },
});