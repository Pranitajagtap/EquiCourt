import { Ionicons } from '@expo/vector-icons';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

export default function LegalProvisions({ ipcSections, evidenceChecklist, requiredDocuments }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>⚖️ Legal Provisions & Requirements</Text>
      
      {/* IPC Sections */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          <Ionicons name="book" size={16} color="#4F46E5" /> Applicable IPC Sections
        </Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.horizontalScroll}>
            {ipcSections.map((section, index) => (
              <View key={index} style={styles.ipcCard}>
                <Text style={styles.ipcCode}>IPC {section.code}</Text>
                <Text style={styles.ipcDescription}>{section.description}</Text>
                <Text style={styles.ipcPunishment}>{section.punishment}</Text>
              </View>
            ))}
          </View>
        </ScrollView>
      </View>

      {/* Evidence Checklist */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          <Ionicons name="checkmark-done" size={24} color="green" />
        </Text>
        {evidenceChecklist.map((item, index) => (
          <View key={index} style={styles.checklistItem}>
            <Ionicons name="checkmark-circle" size={16} color="#10B981" />
            <Text style={styles.checklistText}>{item}</Text>
          </View>
        ))}
      </View>

      {/* Required Documents */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          <Ionicons name="document" size={16} color="#F59E0B" /> Required Documents
        </Text>
        {requiredDocuments.map((doc, index) => (
          <View key={index} style={styles.documentItem}>
            <Ionicons name="document-text" size={16} color="#F59E0B" />
            <Text style={styles.documentText}>{doc}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#1F2937',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
    color: '#374151',
    flexDirection: 'row',
    alignItems: 'center',
  },
  horizontalScroll: {
    flexDirection: 'row',
  },
  ipcCard: {
    backgroundColor: '#F8FAFC',
    padding: 12,
    borderRadius: 8,
    marginRight: 12,
    minWidth: 150,
    borderLeftWidth: 3,
    borderLeftColor: '#4F46E5',
  },
  ipcCode: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#4F46E5',
    marginBottom: 4,
  },
  ipcDescription: {
    fontSize: 12,
    color: '#374151',
    marginBottom: 4,
  },
  ipcPunishment: {
    fontSize: 10,
    color: '#6B7280',
    fontStyle: 'italic',
  },
  checklistItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    paddingLeft: 4,
  },
  checklistText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#374151',
  },
  documentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    paddingLeft: 4,
  },
  documentText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#374151',
  },
});