import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';

export default function CategoryCard({ category, confidence, description }) {
  const getCategoryIcon = (cat) => {
    switch (cat?.toLowerCase()) {
      case 'theft': return 'bag-handle';
      case 'assault': return 'body';
      case 'harassment': return 'warning';
      case 'fraud': return 'card';
      case 'cybercrime': return 'desktop';
      default: return 'document';
    }
  };

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.iconContainer}>
          <Ionicons name={getCategoryIcon(category)} size={20} color="#4F46E5" />
        </View>
        <Text style={styles.category}>{category}</Text>
        <View style={styles.confidenceBadge}>
          <Text style={styles.confidenceText}>
            {(confidence * 100).toFixed(0)}%
          </Text>
        </View>
      </View>
      
      <Text style={styles.confidence}>Confidence: {(confidence * 100).toFixed(1)}%</Text>
      <Text style={styles.description}>{description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#EEF2FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  category: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    flex: 1,
  },
  confidenceBadge: {
    backgroundColor: '#10B981',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  confidenceText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  confidence: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#4B5563',
    lineHeight: 20,
  },
});