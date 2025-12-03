import { StyleSheet, Text, View } from 'react-native';

export default function SeverityMeter({ score, level }) {
  const getColor = (level) => {
    switch (level) {
      case 'Critical': return '#DC2626';
      case 'High': return '#EF4444';
      case 'Medium': return '#F59E0B';
      case 'Low': return '#10B981';
      default: return '#6B7280';
    }
  };

  const getIcon = (level) => {
    switch (level) {
      case 'Critical': return '🔥';
      case 'High': return '⚠️';
      case 'Medium': return '📋';
      case 'Low': return '✅';
      default: return '📊';
    }
  };

  const width = `${Math.min(score, 100)}%`;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>
          {getIcon(level)} Severity Score: {score}/100
        </Text>
        <View style={[styles.levelBadge, { backgroundColor: getColor(level) }]}>
          <Text style={styles.levelText}>{level} Severity</Text>
        </View>
      </View>
      
      <View style={styles.meterBackground}>
        <View 
          style={[
            styles.meterFill,
            { width, backgroundColor: getColor(level) }
          ]} 
        />
      </View>
      
      <View style={styles.meterLabels}>
        <Text style={styles.meterLabel}>Low</Text>
        <Text style={styles.meterLabel}>Medium</Text>
        <Text style={styles.meterLabel}>High</Text>
        <Text style={styles.meterLabel}>Critical</Text>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  levelBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  levelText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  meterBackground: {
    height: 20,
    backgroundColor: '#E5E7EB',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 8,
  },
  meterFill: {
    height: '100%',
    borderRadius: 10,
  },
  meterLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  meterLabel: {
    fontSize: 10,
    color: '#6B7280',
    fontWeight: '500',
  },
});