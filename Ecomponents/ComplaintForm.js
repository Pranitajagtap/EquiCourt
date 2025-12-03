import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
    Alert,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';

export default function ComplaintForm({ onSubmit, initialData = {} }) {
  const [formData, setFormData] = useState({
    description: initialData.description || '',
    date: initialData.date || '',
    time: initialData.time || '',
    location: initialData.location || '',
    propertyValue: initialData.propertyValue || '',
    witnesses: initialData.witnesses || '',
    language: initialData.language || 'en',
  });

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'hi', name: 'Hindi' },
    { code: 'mr', name: 'Marathi' },
    { code: 'hi-en', name: 'Hinglish' },
  ];

  const handleSubmit = () => {
    if (!formData.description.trim()) {
      Alert.alert('Error', 'Please describe what happened');
      return;
    }
    onSubmit(formData);
  };

  const handleClear = () => {
    setFormData({
      description: '',
      date: '',
      time: '',
      location: '',
      propertyValue: '',
      witnesses: '',
      language: 'en',
    });
  };

  return (
    <ScrollView style={styles.container}>
      {/* Language Selector */}
      <View style={styles.languageSection}>
        <Text style={styles.sectionTitle}>🌐 Select Language</Text>
        <View style={styles.languageButtons}>
          {languages.map((lang) => (
            <TouchableOpacity
              key={lang.code}
              style={[
                styles.languageButton,
                formData.language === lang.code && styles.languageButtonSelected
              ]}
              onPress={() => setFormData({...formData, language: lang.code})}
            >
              <Text style={[
                styles.languageButtonText,
                formData.language === lang.code && styles.languageButtonTextSelected
              ]}>
                {lang.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Main Complaint Description */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>📝 Describe What Happened</Text>
        <TextInput
          style={styles.textArea}
          placeholder="Describe the incident in detail. Include what happened, who was involved, and any important details..."
          placeholderTextColor="#9CA3AF"
          value={formData.description}
          onChangeText={(text) => setFormData({...formData, description: text})}
          multiline
          numberOfLines={6}
          textAlignVertical="top"
        />
        <Text style={styles.charCount}>
          {formData.description.length}/1000 characters
        </Text>
      </View>

      {/* Incident Details */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>📅 Incident Details</Text>
        
        <View style={styles.row}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Date</Text>
            <TextInput
              style={styles.input}
              placeholder="DD/MM/YYYY"
              value={formData.date}
              onChangeText={(text) => setFormData({...formData, date: text})}
            />
          </View>
          
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Time</Text>
            <TextInput
              style={styles.input}
              placeholder="HH:MM AM/PM"
              value={formData.time}
              onChangeText={(text) => setFormData({...formData, time: text})}
            />
          </View>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Location</Text>
          <TextInput
            style={styles.input}
            placeholder="Where did it happen? (Address, landmark, etc.)"
            value={formData.location}
            onChangeText={(text) => setFormData({...formData, location: text})}
          />
        </View>
      </View>

      {/* Additional Information */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>💰 Property/Value Details</Text>
        <TextInput
          style={styles.input}
          placeholder="Value of stolen/damaged property (if applicable)"
          value={formData.propertyValue}
          onChangeText={(text) => setFormData({...formData, propertyValue: text})}
          keyboardType="numeric"
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>👥 Witnesses</Text>
        <TextInput
          style={styles.textArea}
          placeholder="Names and contact details of witnesses (if any)"
          placeholderTextColor="#9CA3AF"
          value={formData.witnesses}
          onChangeText={(text) => setFormData({...formData, witnesses: text})}
          multiline
          numberOfLines={3}
          textAlignVertical="top"
        />
      </View>

      {/* Action Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.clearButton} onPress={handleClear}>
          <Ionicons name="trash" size={20} color="#EF4444" />
          <Text style={styles.clearButtonText}>Clear All</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Ionicons name="paper-plane" size={20} color="#fff" />
          <Text style={styles.submitButtonText}>Analyze Complaint</Text>
        </TouchableOpacity>
      </View>

      {/* Tips */}
      <View style={styles.tipsContainer}>
        <Text style={styles.tipsTitle}>💡 Tips for Better Complaint:</Text>
        <View style={styles.tipItem}>
          <Ionicons name="checkmark-circle" size={14} color="#10B981" />
          <Text style={styles.tipText}>Be specific about date, time, and location</Text>
        </View>
        <View style={styles.tipItem}>
          <Ionicons name="checkmark-circle" size={14} color="#10B981" />
          <Text style={styles.tipText}>Describe people involved (if known)</Text>
        </View>
        <View style={styles.tipItem}>
          <Ionicons name="checkmark-circle" size={14} color="#10B981" />
          <Text style={styles.tipText}>Mention any evidence available</Text>
        </View>
        <View style={styles.tipItem}>
          <Ionicons name="checkmark-circle" size={14} color="#10B981" />
          <Text style={styles.tipText}>Include accurate property value for theft cases</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
    padding: 16,
  },
  languageSection: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  section: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 12,
  },
  languageButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  languageButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  languageButtonSelected: {
    backgroundColor: '#4F46E5',
    borderColor: '#4F46E5',
  },
  languageButtonText: {
    fontSize: 14,
    color: '#374151',
    fontWeight: '500',
  },
  languageButtonTextSelected: {
    color: '#fff',
  },
  textArea: {
    backgroundColor: '#F9FAFB',
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    color: '#374151',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    minHeight: 100,
    textAlignVertical: 'top',
  },
  charCount: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'right',
    marginTop: 4,
  },
  row: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },
  inputContainer: {
    flex: 1,
  },
  label: {
    fontSize: 14,
    color: '#374151',
    marginBottom: 6,
    fontWeight: '500',
  },
  input: {
    backgroundColor: '#F9FAFB',
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    color: '#374151',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  clearButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FEF2F2',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#FECACA',
    gap: 8,
  },
  clearButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#DC2626',
  },
  submitButton: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4F46E5',
    padding: 16,
    borderRadius: 12,
    gap: 8,
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  tipsContainer: {
    backgroundColor: '#FFFBEB',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#FDE68A',
  },
  tipsTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#92400E',
    marginBottom: 8,
  },
  tipItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
    gap: 6,
  },
  tipText: {
    fontSize: 13,
    color: '#92400E',
    flex: 1,
  },
});