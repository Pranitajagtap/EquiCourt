import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import ComplaintForm from '../Ecomponents/ComplaintForm';
import Footer from '../Ecomponents/Footer';
import Header from '../Ecomponents/Header';
import VoiceInput from '../Ecomponents/VoiceInput';

export default function ComplaintScreen() {
  const [activeTab, setActiveTab] = useState('form');
  const [complaintData, setComplaintData] = useState({});

  const handleFormSubmit = (data) => {
    console.log('Complaint submitted:', data);
    setComplaintData(data);
    Alert.alert(
      'Complaint Submitted',
      'Your complaint has been submitted for AI analysis. Processing...',
      [
        { 
          text: 'View Results', 
          onPress: () => router.push('/result') 
        }
      ]
    );
  };

  const handleVoiceResult = (text) => {
    setComplaintData(prev => ({ ...prev, description: text }));
    setActiveTab('form');
  };

  return (
    <View style={styles.container}>
      <Header title="File New Complaint" />
      
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'form' && styles.activeTab]}
          onPress={() => setActiveTab('form')}
        >
          <Ionicons 
            name="document-text" 
            size={20} 
            color={activeTab === 'form' ? '#4F46E5' : '#6B7280'} 
          />
          <Text style={[styles.tabText, activeTab === 'form' && styles.activeTabText]}>
            Form
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.tab, activeTab === 'voice' && styles.activeTab]}
          onPress={() => setActiveTab('voice')}
        >
          <Ionicons 
            name="mic" 
            size={20} 
            color={activeTab === 'voice' ? '#4F46E5' : '#6B7280'} 
          />
          <Text style={[styles.tabText, activeTab === 'voice' && styles.activeTabText]}>
            Voice Input
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        {activeTab === 'form' ? (
          <ComplaintForm 
            onSubmit={handleFormSubmit}
            initialData={complaintData}
          />
        ) : (
          <VoiceInput 
            onVoiceResult={handleVoiceResult}
            language="en"
          />
        )}

        {/* Help Section */}
        <View style={styles.helpSection}>
          <Ionicons name="help-circle" size={24} color="#4F46E5" />
          <View style={styles.helpContent}>
            <Text style={styles.helpTitle}>Need Help?</Text>
            <Text style={styles.helpText}>
              • Describe exactly what happened{'\n'}
              • Mention date, time, and location{'\n'}
              • Include witness details if any{'\n'}
              • Specify property value if applicable
            </Text>
          </View>
        </View>
      </ScrollView>

      <Footer 
        onBack={() => router.back()}
        onNext={() => {
          if (activeTab === 'form') {
            handleFormSubmit(complaintData);
          } else {
            Alert.alert('Submit', 'Please complete the voice input first');
          }
        }}
        nextText={activeTab === 'form' ? 'Submit Complaint' : 'Use Voice Input'}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 12,
    padding: 4,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 8,
    gap: 8,
  },
  activeTab: {
    backgroundColor: '#EEF2FF',
  },
  tabText: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
  activeTabText: {
    color: '#4F46E5',
    fontWeight: '600',
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  helpSection: {
    flexDirection: 'row',
    backgroundColor: '#EFF6FF',
    borderRadius: 12,
    padding: 16,
    marginTop: 20,
    marginBottom: 20,
    gap: 12,
  },
  helpContent: {
    flex: 1,
  },
  helpTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E40AF',
    marginBottom: 8,
  },
  helpText: {
    fontSize: 14,
    color: '#374151',
    lineHeight: 20,
  },
});