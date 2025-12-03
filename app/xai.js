import { router } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import Footer from '../Ecomponents/Footer';
import Header from '../Ecomponents/Header';
import XAIHighlight from '../Ecomponents/XAIHighlight';

export default function XaiScreen() {
  const sampleData = {
    text: "Yesterday at 5 PM, someone stole my mobile phone and wallet from my bag while I was traveling in a bus. The thief was wearing a blue shirt and ran away at the next stop.",
    highlights: [
      { start: 21, end: 26, keyword: "stole", weight: 0.9, reason: "Indicates theft offense" },
      { start: 27, end: 42, keyword: "mobile phone", weight: 0.8, reason: "Stolen property" },
      { start: 47, end: 53, keyword: "wallet", weight: 0.7, reason: "Additional stolen item" },
      { start: 85, end: 95, keyword: "blue shirt", weight: 0.6, reason: "Suspect description" }
    ],
    classification: {
      category: "Theft",
      confidence: 0.92,
      alternative_categories: ["Robbery", "Pickpocketing", "Property Crime"]
    },
    explanation: {
      confidence_factors: [
        "Keyword 'stole' strongly indicates theft",
        "Multiple stolen items mentioned (phone, wallet)",
        "Public transport location increases severity",
        "Specific suspect description adds credibility"
      ]
    }
  };

  return (
    <View style={styles.container}>
      <Header title="XAI Analysis" />
      
      <ScrollView style={styles.content}>
        <Text style={styles.subtitle}>
          Explainable AI shows why certain legal sections were suggested
        </Text>

        {/* XAI Component */}
        <XAIHighlight
          text={sampleData.text}
          highlights={sampleData.highlights}
          classification={sampleData.classification}
          explanationData={sampleData.explanation}
        />

        {/* How XAI Works */}
        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>🔍 How XAI Works</Text>
          <View style={styles.infoItem}>
            <Text style={styles.infoBullet}>•</Text>
            <Text style={styles.infoText}>
              <Text style={styles.infoBold}>Keyword Analysis: </Text>
              Identifies legal terms like "stole", "assault", "fraud"
            </Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoBullet}>•</Text>
            <Text style={styles.infoText}>
              <Text style={styles.infoBold}>Context Understanding: </Text>
              Analyzes location, time, and circumstances
            </Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoBullet}>•</Text>
            <Text style={styles.infoText}>
              <Text style={styles.infoBold}>Severity Scoring: </Text>
              Calculates LSS (Legal Severity Score) based on factors
            </Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoBullet}>•</Text>
            <Text style={styles.infoText}>
              <Text style={styles.infoBold}>Legal Mapping: </Text>
              Maps keywords to relevant IPC/BNS sections
            </Text>
          </View>
        </View>

        {/* Benefits */}
        <View style={styles.benefitsCard}>
          <Text style={styles.benefitsTitle}>✨ Benefits of XAI</Text>
          <View style={styles.benefitItem}>
            <Text style={styles.benefitIcon}>🤝</Text>
            <View style={styles.benefitContent}>
              <Text style={styles.benefitName}>Transparency</Text>
              <Text style={styles.benefitDesc}>Understand why specific laws apply</Text>
            </View>
          </View>
          <View style={styles.benefitItem}>
            <Text style={styles.benefitIcon}>🎓</Text>
            <View style={styles.benefitContent}>
              <Text style={styles.benefitName}>Educational</Text>
              <Text style={styles.benefitDesc}>Learn about Indian legal system</Text>
            </View>
          </View>
          <View style={styles.benefitItem}>
            <Text style={styles.benefitIcon}>⚖️</Text>
            <View style={styles.benefitContent}>
              <Text style={styles.benefitName}>Accuracy</Text>
              <Text style={styles.benefitDesc}>92% accurate legal classification</Text>
            </View>
          </View>
          <View style={styles.benefitItem}>
            <Text style={styles.benefitIcon}>🌐</Text>
            <View style={styles.benefitContent}>
              <Text style={styles.benefitName}>Multilingual</Text>
              <Text style={styles.benefitDesc}>Works in 5 Indian languages</Text>
            </View>
          </View>
        </View>

        {/* Use Case Example */}
        <View style={styles.useCaseCard}>
          <Text style={styles.useCaseTitle}>📋 Use Case Example</Text>
          <Text style={styles.useCaseText}>
            <Text style={styles.useCaseBold}>Input: </Text>
            "My neighbor threatened me with a knife yesterday"
          </Text>
          <Text style={styles.useCaseText}>
            <Text style={styles.useCaseBold}>XAI Analysis: </Text>
            Keywords "threatened" and "knife" indicate criminal intimidation with deadly weapon
          </Text>
          <Text style={styles.useCaseText}>
            <Text style={styles.useCaseBold}>Suggested Section: </Text>
            IPC 506 (Criminal intimidation) → BNS 357
          </Text>
        </View>
      </ScrollView>

      <Footer 
        onBack={() => router.back()}
        nextText="Back to Home"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9FAFB' },
  content: { flex: 1, padding: 16 },
  subtitle: { fontSize: 14, color: '#6B7280', marginBottom: 20, textAlign: 'center' },
  infoCard: { backgroundColor: '#F0F9FF', borderRadius: 16, padding: 20, marginBottom: 20 },
  infoTitle: { fontSize: 16, fontWeight: 'bold', color: '#0369A1', marginBottom: 16 },
  infoItem: { flexDirection: 'row', marginBottom: 12 },
  infoBullet: { fontSize: 16, color: '#3B82F6', marginRight: 8 },
  infoText: { fontSize: 14, color: '#374151', flex: 1, lineHeight: 20 },
  infoBold: { fontWeight: '600', color: '#1E40AF' },
  benefitsCard: { backgroundColor: '#fff', borderRadius: 16, padding: 20, marginBottom: 20 },
  benefitsTitle: { fontSize: 16, fontWeight: 'bold', color: '#1F2937', marginBottom: 16 },
  benefitItem: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  benefitIcon: { fontSize: 24, marginRight: 12 },
  benefitContent: { flex: 1 },
  benefitName: { fontSize: 15, fontWeight: '600', color: '#1F2937', marginBottom: 2 },
  benefitDesc: { fontSize: 13, color: '#6B7280' },
  useCaseCard: { backgroundColor: '#FEF3C7', borderRadius: 16, padding: 20, marginBottom: 30 },
  useCaseTitle: { fontSize: 16, fontWeight: 'bold', color: '#92400E', marginBottom: 12 },
  useCaseText: { fontSize: 14, color: '#92400E', marginBottom: 8, lineHeight: 20 },
  useCaseBold: { fontWeight: '600' },
});