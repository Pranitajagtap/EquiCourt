import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function FIRDraft({ draft, onSave, onShare }) {
  const formatDate = () => {
    const now = new Date();
    return now.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <ScrollView style={styles.container}>
      {/* Draft Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Text style={styles.title}>FIR Draft</Text>
          <Text style={styles.subtitle}>Auto-generated based on your complaint</Text>
        </View>
        <View style={styles.badge}>
          <Ionicons name="document-text" size={16} color="#fff" />
          <Text style={styles.badgeText}>DRAFT</Text>
        </View>
      </View>

      {/* Draft Metadata */}
      <View style={styles.metaContainer}>
        <View style={styles.metaItem}>
          <Ionicons name="calendar" size={14} color="#6B7280" />
          <Text style={styles.metaText}>Generated: {formatDate()}</Text>
        </View>
        <View style={styles.metaItem}>
          <Ionicons name="shield" size={14} color="#6B7280" />
          <Text style={styles.metaText}>Case ID: FIR-{Date.now().toString().slice(-6)}</Text>
        </View>
      </View>

      {/* FIR Content */}
      <View style={styles.contentCard}>
        <Text style={styles.sectionTitle}>FIR (First Information Report)</Text>
        
        <View style={styles.contentSection}>
          <Text style={styles.label}>To,</Text>
          <Text style={styles.text}>The Station House Officer</Text>
          <Text style={styles.text}>{draft?.policeStation || 'Local Police Station'}</Text>
        </View>

        <View style={styles.contentSection}>
          <Text style={styles.label}>Subject: FIR for {draft?.category || 'Criminal Offense'}</Text>
          <Text style={styles.text}>
            I wish to lodge an FIR regarding the following incident:
          </Text>
        </View>

        <View style={styles.contentSection}>
          <Text style={styles.label}>Incident Details:</Text>
          <Text style={styles.text}>{draft?.description || 'No description provided.'}</Text>
        </View>

        {draft?.date && (
          <View style={styles.contentSection}>
            <Text style={styles.label}>Date & Time:</Text>
            <Text style={styles.text}>
              {draft.date} at {draft.time || 'unknown time'}
            </Text>
          </View>
        )}

        {draft?.location && (
          <View style={styles.contentSection}>
            <Text style={styles.label}>Location:</Text>
            <Text style={styles.text}>{draft.location}</Text>
          </View>
        )}

        {/* Legal Sections */}
        {draft?.sections && draft.sections.length > 0 && (
          <View style={styles.contentSection}>
            <Text style={styles.label}>Applicable Legal Sections:</Text>
            {draft.sections.map((section, index) => (
              <View key={index} style={styles.sectionItem}>
                <View style={styles.sectionBadge}>
                  <Text style={styles.sectionCode}>{section.code}</Text>
                </View>
                <Text style={styles.sectionText}>{section.description}</Text>
              </View>
            ))}
          </View>
        )}

        {/* Severity Assessment */}
        {draft?.severity && (
          <View style={styles.contentSection}>
            <Text style={styles.label}>Severity Assessment:</Text>
            <View style={[
              styles.severityBadge,
              { backgroundColor: draft.severity.color + '20' }
            ]}>
              <Text style={[
                styles.severityText,
                { color: draft.severity.color }
              ]}>
                {draft.severity.level} Severity ({draft.severity.score}/100)
              </Text>
            </View>
          </View>
        )}

        {/* Recommendations */}
        {draft?.recommendations && draft.recommendations.length > 0 && (
          <View style={styles.contentSection}>
            <Text style={styles.label}>Recommended Actions:</Text>
            {draft.recommendations.map((rec, index) => (
              <View key={index} style={styles.recommendationItem}>
                <Ionicons name="checkmark-circle" size={14} color="#10B981" />
                <Text style={styles.recommendationText}>{rec}</Text>
              </View>
            ))}
          </View>
        )}

        {/* Footer */}
        <View style={styles.footerSection}>
          <Text style={styles.label}>Complainant Details:</Text>
          <Text style={styles.text}>[Your Name]</Text>
          <Text style={styles.text}>[Your Address]</Text>
          <Text style={styles.text}>[Your Contact Number]</Text>
          <Text style={styles.text}>[Your Email]</Text>
        </View>

        <View style={styles.signatureSection}>
          <Text style={styles.text}>Signature: _________________</Text>
          <Text style={styles.text}>Date: {new Date().toLocaleDateString('en-IN')}</Text>
        </View>
      </View>

      {/* Action Buttons */}
      <View style={styles.actionsContainer}>
        <TouchableOpacity style={styles.actionButton} onPress={onSave}>
          <Ionicons name="download" size={20} color="#4F46E5" />
          <Text style={styles.actionText}>Save Draft</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={[styles.actionButton, styles.shareButton]} onPress={onShare}>
          <Ionicons name="share" size={20} color="#fff" />
          <Text style={[styles.actionText, styles.shareText]}>Share FIR</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="print" size={20} color="#F59E0B" />
          <Text style={styles.actionText}>Print</Text>
        </TouchableOpacity>
      </View>

      {/* Important Notes */}
      <View style={styles.notesContainer}>
        <Text style={styles.notesTitle}>⚠️ Important Notes:</Text>
        <View style={styles.noteItem}>
          <Ionicons name="information-circle" size={14} color="#3B82F6" />
          <Text style={styles.noteText}>
            This is a draft FIR. Submit it at your local police station.
          </Text>
        </View>
        <View style={styles.noteItem}>
          <Ionicons name="information-circle" size={14} color="#3B82F6" />
          <Text style={styles.noteText}>
            Carry original ID proof and supporting documents.
          </Text>
        </View>
        <View style={styles.noteItem}>
          <Ionicons name="information-circle" size={14} color="#3B82F6" />
          <Text style={styles.noteText}>
            You have the right to get a free copy of the FIR.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  headerContent: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#6B7280',
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4F46E5',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    gap: 4,
  },
  badgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  metaContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#F3F4F6',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  metaText: {
    fontSize: 12,
    color: '#6B7280',
  },
  contentCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#F3F4F6',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 20,
    textAlign: 'center',
  },
  contentSection: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 6,
  },
  text: {
    fontSize: 14,
    color: '#4B5563',
    lineHeight: 20,
    marginBottom: 4,
  },
  sectionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 8,
  },
  sectionBadge: {
    backgroundColor: '#EEF2FF',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    minWidth: 60,
  },
  sectionCode: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#4F46E5',
    textAlign: 'center',
  },
  sectionText: {
    fontSize: 12,
    color: '#4B5563',
    flex: 1,
  },
  severityBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  severityText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  recommendationItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
    gap: 8,
  },
  recommendationText: {
    fontSize: 13,
    color: '#374151',
    flex: 1,
    lineHeight: 18,
  },
  footerSection: {
    marginTop: 20,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  signatureSection: {
    marginTop: 30,
    alignItems: 'flex-end',
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  actionButton: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginHorizontal: 4,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  shareButton: {
    backgroundColor: '#4F46E5',
    borderColor: '#4F46E5',
  },
  actionText: {
    fontSize: 12,
    color: '#374151',
    marginTop: 6,
    fontWeight: '500',
  },
  shareText: {
    color: '#fff',
  },
  notesContainer: {
    backgroundColor: '#EFF6FF',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#BAE6FD',
  },
  notesTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1E40AF',
    marginBottom: 12,
  },
  noteItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
    gap: 8,
  },
  noteText: {
    fontSize: 13,
    color: '#374151',
    flex: 1,
    lineHeight: 18,
  },
});