import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function HistoryItem({ item, onPress }) {
  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getCategoryColor = (category) => {
    const colors = {
      'Theft': '#F59E0B',
      'Assault': '#EF4444',
      'Fraud': '#8B5CF6',
      'Harassment': '#EC4899',
      'Cybercrime': '#3B82F6',
      'Property': '#10B981',
      'General': '#6B7280'
    };
    return colors[category] || '#6B7280';
  };

  const getSeverityColor = (score) => {
    if (score >= 80) return '#EF4444';
    if (score >= 60) return '#F59E0B';
    if (score >= 40) return '#10B981';
    return '#6B7280';
  };

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      {/* Status Bar */}
      <View style={styles.statusBar}>
        <View style={styles.dateContainer}>
          <Ionicons name="time" size={12} color="#6B7280" />
          <Text style={styles.dateText}>{formatDate(item.timestamp)}</Text>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: '#D1FAE5' }]}>
          <Text style={[styles.statusText, { color: '#065F46' }]}>
            Draft Saved
          </Text>
        </View>
      </View>

      {/* Content */}
      <Text style={styles.description} numberOfLines={2}>
        {item.description || 'No description available'}
      </Text>

      {/* Tags */}
      <View style={styles.tagsContainer}>
        <View style={[styles.categoryBadge, { backgroundColor: getCategoryColor(item.category) + '20' }]}>
          <Text style={[styles.categoryText, { color: getCategoryColor(item.category) }]}>
            {item.category || 'General'}
          </Text>
        </View>
        
        <View style={styles.severityBadge}>
          <Ionicons name="alert-circle" size={12} color={getSeverityColor(item.severity?.score)} />
          <Text style={[styles.severityText, { color: getSeverityColor(item.severity?.score) }]}>
            {item.severity?.level || 'Medium'}
          </Text>
        </View>
      </View>

      {/* IPC Sections */}
      {item.sections && item.sections.length > 0 && (
        <View style={styles.sectionsContainer}>
          <Text style={styles.sectionsLabel}>IPC Sections:</Text>
          <View style={styles.sectionsList}>
            {item.sections.slice(0, 3).map((section, index) => (
              <View key={index} style={styles.sectionItem}>
                <Text style={styles.sectionCode}>{section.code}</Text>
              </View>
            ))}
            {item.sections.length > 3 && (
              <Text style={styles.moreSections}>+{item.sections.length - 3} more</Text>
            )}
          </View>
        </View>
      )}

      {/* Footer */}
      <View style={styles.footer}>
        <View style={styles.footerItem}>
          <Ionicons name="document-text" size={14} color="#6B7280" />
          <Text style={styles.footerText}>
            {item.id ? `ID: ${item.id.slice(-6)}` : 'No ID'}
          </Text>
        </View>
        
        <View style={styles.footerItem}>
          <Ionicons name="language" size={14} color="#6B7280" />
          <Text style={styles.footerText}>
            {item.language ? item.language.toUpperCase() : 'EN'}
          </Text>
        </View>
      </View>

      {/* Action Button */}
      <View style={styles.actionContainer}>
        <TouchableOpacity style={styles.viewButton} onPress={onPress}>
          <Text style={styles.viewButtonText}>View Details</Text>
          <Ionicons name="chevron-forward" size={16} color="#4F46E5" />
        </TouchableOpacity>
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
  statusBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  dateText: {
    fontSize: 12,
    color: '#6B7280',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  statusText: {
    fontSize: 11,
    fontWeight: '500',
  },
  description: {
    fontSize: 15,
    color: '#374151',
    lineHeight: 22,
    marginBottom: 12,
  },
  tagsContainer: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 12,
  },
  categoryBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  categoryText: {
    fontSize: 12,
    fontWeight: '600',
  },
  severityBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    gap: 4,
  },
  severityText: {
    fontSize: 11,
    fontWeight: '500',
  },
  sectionsContainer: {
    marginBottom: 12,
  },
  sectionsLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 6,
  },
  sectionsList: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  sectionItem: {
    backgroundColor: '#EEF2FF',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  sectionCode: {
    fontSize: 11,
    color: '#4F46E5',
    fontWeight: 'bold',
  },
  moreSections: {
    fontSize: 11,
    color: '#9CA3AF',
    fontStyle: 'italic',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
    marginBottom: 12,
  },
  footerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  footerText: {
    fontSize: 12,
    color: '#6B7280',
  },
  actionContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  viewButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  viewButtonText: {
    fontSize: 13,
    color: '#4F46E5',
    fontWeight: '500',
  },
});