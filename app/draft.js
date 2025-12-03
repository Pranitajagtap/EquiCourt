import { router } from 'expo-router';
import React, { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native';
import FIRDraft from '../Ecomponents/FIRDraft';
import Footer from '../Ecomponents/Footer';
import Header from '../Ecomponents/Header';

export default function DraftScreen() {
  const [draft] = useState({
    policeStation: 'Local Police Station',
    category: 'Theft',
    description: 'My mobile phone was stolen from the bus station yesterday around 5 PM. The thief was wearing a blue shirt.',
    date: '15/01/2024',
    time: '5:00 PM',
    location: 'Central Bus Station, Main Road',
    sections: [
      { code: '378', description: 'Theft' },
      { code: '379', description: 'Punishment for theft' }
    ],
    severity: {
      level: 'High',
      score: 65,
      color: '#F59E0B'
    },
    recommendations: [
      'File FIR at nearest police station',
      'Provide IMEI number of stolen phone',
      'Check CCTV footage if available'
    ]
  });

  const handleSave = () => {
    Alert.alert('Success', 'FIR draft saved successfully!');
  };

  const handleShare = () => {
    Alert.alert('Share', 'FIR draft ready to share');
  };

  return (
    <View style={styles.container}>
      <Header title="FIR Draft" />
      
      <ScrollView style={styles.content}>
        <FIRDraft 
          draft={draft}
          onSave={handleSave}
          onShare={handleShare}
        />

        {/* Next Steps */}
        <View style={styles.nextSteps}>
          <Text style={styles.nextStepsTitle}>📋 Next Steps</Text>
          <View style={styles.stepItem}>
            <Text style={styles.stepNumber}>1</Text>
            <View style={styles.stepContent}>
              <Text style={styles.stepTitle}>Print or Save</Text>
              <Text style={styles.stepDesc}>Save this draft or print it</Text>
            </View>
          </View>
          <View style={styles.stepItem}>
            <Text style={styles.stepNumber}>2</Text>
            <View style={styles.stepContent}>
              <Text style={styles.stepTitle}>Visit Police Station</Text>
              <Text style={styles.stepDesc}>Take this draft to your local police station</Text>
            </View>
          </View>
          <View style={styles.stepItem}>
            <Text style={styles.stepNumber}>3</Text>
            <View style={styles.stepContent}>
              <Text style={styles.stepTitle}>Submit with Documents</Text>
              <Text style={styles.stepDesc}>Carry ID proof and supporting documents</Text>
            </View>
          </View>
          <View style={styles.stepItem}>
            <Text style={styles.stepNumber}>4</Text>
            <View style={styles.stepContent}>
              <Text style={styles.stepTitle}>Get FIR Copy</Text>
              <Text style={styles.stepDesc}>Ask for free copy of registered FIR</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      <Footer 
        onBack={() => router.back()}
        onNext={handleSave}
        nextText="Save Draft"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9FAFB' },
  content: { flex: 1 },
  nextSteps: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginHorizontal: 16,
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  nextStepsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 20,
  },
  stepItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  stepNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#4F46E5',
    color: '#fff',
    textAlign: 'center',
    lineHeight: 32,
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 12,
  },
  stepContent: {
    flex: 1,
  },
  stepTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 2,
  },
  stepDesc: {
    fontSize: 13,
    color: '#6B7280',
  },
});