import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';

export default function CorruptionRisk({ riskAssessment }) {
  const getRiskColor = (level) => {
    switch (level?.toLowerCase()) {
      case 'high': return '#EF4444';
      case 'medium': return '#F59E0B';
      case 'low': return '#10B981';
      default: return '#6B7280';
    }
  };

  const getRiskIcon = (level) => {
    switch (level?.toLowerCase()) {
      case 'high': return 'warning';
      case 'medium': return 'alert-circle';
      case 'low': return 'checkmark-circle';
      default: return 'help-circle';
    }
  };

  return (
    <View style={[
      styles.container,
      { borderLeftColor: getRiskColor(riskAssessment?.risk_level) }
    ]}>
      <View style={styles.header}>
        <Ionicons 
          name={getRiskIcon(riskAssessment?.risk_level)} 
          size={20} 
          color={getRiskColor(riskAssessment?.risk_level)} 
        />
        <Text style={styles.title}>Corruption Risk Assessment</Text>
        <View style={[
          styles.riskBadge,
          { backgroundColor: getRiskColor(riskAssessment?.risk_level) }
        ]}>
          <Text style={styles.riskText}>
            {riskAssessment?.risk_level || 'Unknown'} Risk
          </Text>
        </View>
      </View>

      <Text style={styles.score}>
        Risk Score: {riskAssessment?.risk_score ? (riskAssessment.risk_score * 100).toFixed(0) : 'N/A'}%
      </Text>

      <Text style={styles.recommendation}>
        {riskAssessment?.recommendation || 'Follow standard procedures'}
      </Text>

      {riskAssessment?.recommendations && (
        <View style={styles.recommendations}>
          <Text style={styles.recommendationsTitle}>Recommended Actions:</Text>
          {riskAssessment.recommendations.map((rec, index) => (
            <View key={index} style={styles.recommendationItem}>
              <Ionicons name="shield-checkmark" size={14} color="#10B981" />
              <Text style={styles.recommendationText}>{rec}</Text>
            </View>
          ))}
        </View>
      )}

      {riskAssessment?.factors_considered && (
        <Text style={styles.factors}>
          Factors: {riskAssessment.factors_considered.join(', ')}
        </Text>
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
    borderLeftWidth: 4,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
    marginLeft: 8,
    flex: 1,
  },
  riskBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  riskText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  score: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 8,
  },
  recommendation: {
    fontSize: 14,
    color: '#374151',
    fontStyle: 'italic',
    marginBottom: 12,
    lineHeight: 20,
  },
  recommendations: {
    marginTop: 8,
  },
  recommendationsTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  recommendationItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 6,
  },
  recommendationText: {
    marginLeft: 8,
    fontSize: 12,
    color: '#4B5563',
    flex: 1,
    lineHeight: 16,
  },
  factors: {
    fontSize: 11,
    color: '#9CA3AF',
    marginTop: 8,
    fontStyle: 'italic',
  },
});