import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';

export default function TimelinePrediction({ timeline, category }) {
  const getTimelineColor = (days) => {
    if (days <= 90) return '#10B981';
    if (days <= 180) return '#F59E0B';
    return '#EF4444';
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>⏰ Estimated Case Timeline</Text>
      
      <View style={styles.timelineSummary}>
        <View style={styles.daysContainer}>
          <Text style={[styles.days, { color: getTimelineColor(timeline.estimated_days) }]}>
            {timeline.estimated_days}
          </Text>
          <Text style={styles.daysLabel}>days</Text>
        </View>
        <View style={styles.summaryText}>
          <Text style={styles.category}>For {category} cases</Text>
          <Text style={styles.confidence}>
            Confidence: {(timeline.confidence * 100).toFixed(0)}%
          </Text>
        </View>
      </View>

      {/* Timeline Stages */}
      <View style={styles.stagesContainer}>
        <Text style={styles.stagesTitle}>Expected Stages:</Text>
        {timeline.stages.map((stage, index) => (
          <View key={index} style={styles.stage}>
            <View style={styles.stageIndicator}>
              <Text style={styles.stageNumber}>{index + 1}</Text>
            </View>
            <View style={styles.stageContent}>
              <Text style={styles.stageName}>{stage.stage}</Text>
              <Text style={styles.stageDuration}>{stage.days}</Text>
            </View>
          </View>
        ))}
      </View>

      {/* Influencing Factors */}
      {timeline.factors && timeline.factors.length > 0 && (
        <View style={styles.factorsContainer}>
          <Text style={styles.factorsTitle}>Based on:</Text>
          {timeline.factors.map((factor, index) => (
            <View key={index} style={styles.factor}>
              <Ionicons name="information-circle" size={14} color="#6B7280" />
              <Text style={styles.factorText}>{factor}</Text>
            </View>
          ))}
        </View>
      )}
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
  timelineSummary: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    padding: 16,
    backgroundColor: '#F8FAFC',
    borderRadius: 8,
  },
  daysContainer: {
    alignItems: 'center',
    marginRight: 16,
  },
  days: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  daysLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: -4,
  },
  summaryText: {
    flex: 1,
  },
  category: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 4,
  },
  confidence: {
    fontSize: 12,
    color: '#6B7280',
  },
  stagesContainer: {
    marginBottom: 16,
  },
  stagesTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
    color: '#374151',
  },
  stage: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  stageIndicator: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#4F46E5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  stageNumber: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  stageContent: {
    flex: 1,
  },
  stageName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
    marginBottom: 2,
  },
  stageDuration: {
    fontSize: 12,
    color: '#6B7280',
  },
  factorsContainer: {
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  factorsTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
    color: '#374151',
  },
  factor: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  factorText: {
    marginLeft: 6,
    fontSize: 12,
    color: '#6B7280',
    flex: 1,
  },
});