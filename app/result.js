import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Footer from '../Ecomponents/Footer';
import Header from '../Ecomponents/Header';
import XAIHighlight from '../Ecomponents/XAIHighlight';

export default function ResultScreen() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setResult({
        category: 'Theft',
        confidence: 0.92,
        severity: {
          score: 65,
          level: 'High',
          factors: ['Public place', 'Property value involved']
        },
        sections: [
          { code: '378', description: 'Theft', punishment: '3 years imprisonment' },
          { code: '379', description: 'Punishment for theft', punishment: '3 years imprisonment' }
        ],
        explanation: {
          highlights: [
            { start: 8, end: 13, keyword: 'stole', weight: 0.9 },
            { start: 22, end: 28, keyword: 'phone', weight: 0.7 },
            { start: 37, end: 49, keyword: 'bus station', weight: 0.6 }
          ],
          confidence_factors: ['Keyword "stole" indicates theft', 'Location suggests public place theft']
        },
        timeline: {
          estimated_days: 90,
          stages: [
            { stage: 'FIR Registration', days: '1-7 days' },
            { stage: 'Investigation', days: '30-60 days' },
            { stage: 'Trial', days: '60-90 days' }
          ]
        }
      });
      setLoading(false);
    }, 2000);
  }, []);

  const generateFIR = () => {
    router.push('/draft');
  };

  return (
    <View style={styles.container}>
      <Header title="Analysis Results" />
      
      <ScrollView style={styles.content}>
        {loading ? (
          <View style={styles.loadingContainer}>
            <Ionicons name="analytics" size={60} color="#4F46E5" />
            <Text style={styles.loadingText}>AI is analyzing your complaint...</Text>
          </View>
        ) : result ? (
          <>
            {/* Summary Card */}
            <View style={styles.summaryCard}>
              <Text style={styles.summaryTitle}>🎯 Analysis Complete</Text>
              <View style={styles.summaryGrid}>
                <View style={styles.summaryItem}>
                  <Text style={styles.summaryLabel}>Category</Text>
                  <View style={[styles.categoryBadge, { backgroundColor: '#FEF3C7' }]}>
                    <Text style={[styles.categoryText, { color: '#92400E' }]}>
                      {result.category}
                    </Text>
                  </View>
                </View>
                <View style={styles.summaryItem}>
                  <Text style={styles.summaryLabel}>Confidence</Text>
                  <View style={styles.confidenceBar}>
                    <View 
                      style={[
                        styles.confidenceFill, 
                        { width: `${result.confidence * 100}%` }
                      ]} 
                    />
                  </View>
                  <Text style={styles.confidenceText}>
                    {(result.confidence * 100).toFixed(1)}%
                  </Text>
                </View>
                <View style={styles.summaryItem}>
                  <Text style={styles.summaryLabel}>Severity</Text>
                  <View style={[styles.severityBadge, { backgroundColor: '#FEE2E2' }]}>
                    <Text style={[styles.severityText, { color: '#DC2626' }]}>
                      {result.severity.level}
                    </Text>
                  </View>
                </View>
              </View>
            </View>

            {/* XAI Explanation */}
            <Text style={styles.sectionTitle}>🤖 AI Explanation</Text>
            <XAIHighlight
              text="Someone stole my phone from the bus station yesterday."
              highlights={result.explanation.highlights}
              classification={{ 
                category: result.category, 
                confidence: result.confidence,
                alternative_categories: ['Property Crime', 'Loss']
              }}
              explanationData={result.explanation}
            />

            {/* Legal Sections */}
            <View style={styles.sectionsCard}>
              <Text style={styles.sectionsTitle}>⚖️ Applicable Legal Sections</Text>
              {result.sections.map((section, index) => (
                <View key={index} style={styles.sectionItem}>
                  <View style={styles.sectionHeader}>
                    <View style={styles.sectionCodeContainer}>
                      <Text style={styles.sectionCode}>{section.code}</Text>
                    </View>
                    <Text style={styles.sectionDescription}>{section.description}</Text>
                  </View>
                  <Text style={styles.sectionPunishment}>{section.punishment}</Text>
                </View>
              ))}
            </View>

            {/* Timeline */}
            <View style={styles.timelineCard}>
              <Text style={styles.timelineTitle}>⏰ Estimated Timeline</Text>
              <View style={styles.timelineItem}>
                <Ionicons name="time" size={24} color="#F59E0B" />
                <View style={styles.timelineContent}>
                  <Text style={styles.timelineDays}>{result.timeline.estimated_days} days</Text>
                  <Text style={styles.timelineText}>Expected resolution time</Text>
                </View>
              </View>
              {result.timeline.stages.map((stage, index) => (
                <View key={index} style={styles.stageItem}>
                  <View style={styles.stageDot} />
                  <Text style={styles.stageName}>{stage.stage}</Text>
                  <Text style={styles.stageTime}>{stage.days}</Text>
                </View>
              ))}
            </View>

            {/* Action Button */}
            <TouchableOpacity style={styles.generateButton} onPress={generateFIR}>
              <Ionicons name="document-text" size={24} color="#fff" />
              <Text style={styles.generateButtonText}>Generate FIR Draft</Text>
            </TouchableOpacity>
          </>
        ) : (
          <Text style={styles.errorText}>No results available</Text>
        )}
      </ScrollView>

      <Footer 
        onBack={() => router.back()}
        onNext={generateFIR}
        nextText="Generate FIR"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9FAFB' },
  content: { flex: 1, padding: 16 },
  loadingContainer: { alignItems: 'center', paddingVertical: 60 },
  loadingText: { fontSize: 16, color: '#6B7280', marginTop: 16 },
  summaryCard: { backgroundColor: '#fff', borderRadius: 16, padding: 20, marginBottom: 20 },
  summaryTitle: { fontSize: 18, fontWeight: 'bold', color: '#1F2937', marginBottom: 16 },
  summaryGrid: { flexDirection: 'row', justifyContent: 'space-between' },
  summaryItem: { alignItems: 'center', flex: 1 },
  summaryLabel: { fontSize: 12, color: '#6B7280', marginBottom: 8 },
  categoryBadge: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 12 },
  categoryText: { fontSize: 12, fontWeight: 'bold' },
  confidenceBar: { width: 60, height: 8, backgroundColor: '#E5E7EB', borderRadius: 4, overflow: 'hidden' },
  confidenceFill: { height: '100%', backgroundColor: '#10B981', borderRadius: 4 },
  confidenceText: { fontSize: 12, color: '#374151', marginTop: 4 },
  severityBadge: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 12 },
  severityText: { fontSize: 12, fontWeight: 'bold' },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#1F2937', marginBottom: 12 },
  sectionsCard: { backgroundColor: '#fff', borderRadius: 16, padding: 20, marginBottom: 20 },
  sectionsTitle: { fontSize: 16, fontWeight: 'bold', color: '#1F2937', marginBottom: 16 },
  sectionItem: { marginBottom: 16 },
  sectionHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  sectionCodeContainer: { backgroundColor: '#EEF2FF', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 6, marginRight: 12 },
  sectionCode: { fontSize: 14, fontWeight: 'bold', color: '#4F46E5' },
  sectionDescription: { fontSize: 14, color: '#374151', flex: 1 },
  sectionPunishment: { fontSize: 13, color: '#6B7280' },
  timelineCard: { backgroundColor: '#fff', borderRadius: 16, padding: 20, marginBottom: 20 },
  timelineTitle: { fontSize: 16, fontWeight: 'bold', color: '#1F2937', marginBottom: 16 },
  timelineItem: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  timelineContent: { marginLeft: 12 },
  timelineDays: { fontSize: 24, fontWeight: 'bold', color: '#1F2937' },
  timelineText: { fontSize: 14, color: '#6B7280' },
  stageItem: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  stageDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#F59E0B', marginRight: 12 },
  stageName: { fontSize: 14, color: '#374151', flex: 1 },
  stageTime: { fontSize: 13, color: '#6B7280' },
  generateButton: { 
    flexDirection: 'row', 
    backgroundColor: '#4F46E5', 
    padding: 20, 
    borderRadius: 16, 
    alignItems: 'center', 
    justifyContent: 'center',
    gap: 12,
    marginBottom: 30 
  },
  generateButtonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  errorText: { textAlign: 'center', color: '#DC2626', fontSize: 16, marginTop: 40 },
});