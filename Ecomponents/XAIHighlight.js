import { ScrollView, StyleSheet, Text, View } from 'react-native';

export default function XAIHighlight({ text, highlights, classification, explanationData }) {
  const renderHighlightedText = () => {
    if (!highlights || highlights.length === 0) {
      return <Text style={styles.normalText}>{text}</Text>;
    }

    const parts = [];
    let lastIndex = 0;
    
    const sortedHighlights = [...highlights].sort((a, b) => a.start - b.start);
    
    sortedHighlights.forEach((highlight, index) => {
      if (highlight.start > lastIndex) {
        parts.push(
          <Text key={`text-${index}`} style={styles.normalText}>
            {text.substring(lastIndex, highlight.start)}
          </Text>
        );
      }
      
      parts.push(
        <Text key={`highlight-${index}`} style={[
          styles.highlightedText,
          { backgroundColor: getHighlightColor(highlight.weight) }
        ]}>
          {text.substring(highlight.start, highlight.end)}
        </Text>
      );
      
      lastIndex = highlight.end;
    });
    
    if (lastIndex < text.length) {
      parts.push(
        <Text key="text-final" style={styles.normalText}>
          {text.substring(lastIndex)}
        </Text>
      );
    }
    
    return parts;
  };

  const getHighlightColor = (weight) => {
    if (weight >= 0.8) return '#FECACA';
    if (weight >= 0.6) return '#FDE68A';
    return '#FEF3C7';
  };

  const getExplanationText = () => {
    if (!classification && !explanationData) {
      return "No classification data available for explanation.";
    }

    if (explanationData && explanationData.confidence_factors && explanationData.confidence_factors.length > 0) {
      return explanationData.confidence_factors.join('; ');
    }

    if (classification) {
      const keywords = highlights?.map(h => h.keyword) || [];
      if (keywords.length > 0) {
        return `🔍 Selected "${classification.category}" because keywords like "${keywords.slice(0, 3).join('", "')}" were detected with ${(classification.confidence * 100).toFixed(1)}% confidence.`;
      }
      return `🔍 Classified as "${classification.category}" with ${(classification.confidence * 100).toFixed(1)}% confidence.`;
    }

    return "Analysis complete based on the provided text.";
  };

  const getAdditionalExplanation = () => {
    const additionalInfo = [];
    
    if (explanationData?.normalization_changes?.length > 0) {
      additionalInfo.push(`Normalizations applied: ${explanationData.normalization_changes.length}`);
    }
    
    if (highlights?.length > 0) {
      const highImpactCount = highlights.filter(h => h.weight >= 0.8).length;
      const mediumImpactCount = highlights.filter(h => h.weight >= 0.6 && h.weight < 0.8).length;
      additionalInfo.push(`High impact terms: ${highImpactCount}, Medium: ${mediumImpactCount}`);
    }
    
    return additionalInfo.join(' | ');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🔍 Explainable AI Analysis</Text>
      <Text style={styles.subtitle}>Transparent reasoning behind legal classification</Text>
      
      {/* Explanation Section */}
      <View style={styles.explanationContainer}>
        <Text style={styles.explanationTitle}>Why this classification?</Text>
        <Text style={styles.explanationText}>{getExplanationText()}</Text>
        
        {getAdditionalExplanation() && (
          <View style={styles.additionalInfo}>
            <Text style={styles.additionalInfoText}>
              📊 {getAdditionalExplanation()}
            </Text>
          </View>
        )}
      </View>

      {/* Highlighted Text Section */}
      <Text style={styles.sectionTitle}>Key Terms Identified</Text>
      <Text style={styles.sectionSubtitle}>Highlighted words influenced the classification</Text>
      
      <ScrollView style={styles.textContainer}>
        <Text style={styles.text}>
          {renderHighlightedText()}
        </Text>
      </ScrollView>

      {/* Legend */}
      <View style={styles.legend}>
        <View style={styles.legendItem}>
          <View style={[styles.colorBox, { backgroundColor: '#FECACA' }]} />
          <Text style={styles.legendText}>High impact</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.colorBox, { backgroundColor: '#FDE68A' }]} />
          <Text style={styles.legendText}>Medium impact</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.colorBox, { backgroundColor: '#FEF3C7' }]} />
          <Text style={styles.legendText}>Low impact</Text>
        </View>
      </View>

      {/* Classification Confidence */}
      {classification && (
        <View style={styles.confidenceContainer}>
          <View style={styles.confidenceRow}>
            <Text style={styles.confidenceLabel}>Classification Confidence:</Text>
            <View style={styles.confidenceBarContainer}>
              <View 
                style={[
                  styles.confidenceBar, 
                  { width: `${classification.confidence * 100}%` }
                ]} 
              />
            </View>
            <Text style={styles.confidenceValue}>
              {(classification.confidence * 100).toFixed(1)}%
            </Text>
          </View>
          
          {classification.alternative_categories?.length > 0 && (
            <View style={styles.alternativesContainer}>
              <Text style={styles.alternativesTitle}>Alternative categories considered:</Text>
              <View style={styles.alternativesList}>
                {classification.alternative_categories.map((alt, index) => (
                  <View key={index} style={styles.alternativeItem}>
                    <Text style={styles.alternativeText}>{alt}</Text>
                  </View>
                ))}
              </View>
            </View>
          )}
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
    marginBottom: 4,
    color: '#1F2937',
  },
  subtitle: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 16,
  },
  explanationContainer: {
    backgroundColor: '#F0F9FF',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#3B82F6',
  },
  explanationTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1E40AF',
    marginBottom: 6,
  },
  explanationText: {
    fontSize: 13,
    lineHeight: 18,
    color: '#374151',
  },
  additionalInfo: {
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#DBEAFE',
  },
  additionalInfoText: {
    fontSize: 11,
    color: '#6B7280',
    fontStyle: 'italic',
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 12,
  },
  textContainer: {
    maxHeight: 150,
    backgroundColor: '#F9FAFB',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  text: {
    fontSize: 14,
    lineHeight: 20,
    color: '#4B5563',
  },
  normalText: {
    color: '#4B5563',
  },
  highlightedText: {
    fontWeight: '600',
    color: '#92400E',
  },
  legend: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    marginTop: 8,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  colorBox: {
    width: 12,
    height: 12,
    borderRadius: 2,
    marginRight: 4,
  },
  legendText: {
    fontSize: 10,
    color: '#6B7280',
  },
  confidenceContainer: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  confidenceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  confidenceLabel: {
    fontSize: 13,
    color: '#4B5563',
    width: '40%',
  },
  confidenceBarContainer: {
    flex: 1,
    height: 8,
    backgroundColor: '#E5E7EB',
    borderRadius: 4,
    marginHorizontal: 8,
    overflow: 'hidden',
  },
  confidenceBar: {
    height: '100%',
    backgroundColor: '#10B981',
    borderRadius: 4,
  },
  confidenceValue: {
    fontSize: 13,
    fontWeight: '600',
    color: '#059669',
    width: '15%',
    textAlign: 'right',
  },
  alternativesContainer: {
    marginTop: 12,
    padding: 10,
    backgroundColor: '#FEF3C7',
    borderRadius: 6,
  },
  alternativesTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#92400E',
    marginBottom: 6,
  },
  alternativesList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  alternativeItem: {
    backgroundColor: '#FDE68A',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 6,
    marginBottom: 6,
  },
  alternativeText: {
    fontSize: 11,
    color: '#92400E',
  },
});