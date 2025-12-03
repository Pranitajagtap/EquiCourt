import { router } from 'expo-router';
import { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import Footer from '../Ecomponents/Footer';
import Header from '../Ecomponents/Header';
import VoiceInput from '../Ecomponents/VoiceInput';

export default function InputScreen() {
  const [complaint, setComplaint] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [language, setLanguage] = useState('en');

  const handleVoiceResult = (result) => {
    setComplaint(prev => prev + ' ' + result);
  };

  const handleSubmit = async () => {
    if (!complaint.trim()) {
      Alert.alert('Error', 'Please enter or speak your complaint');
      return;
    }

    router.push({
      pathname: '/result',
      params: { 
        complaint: complaint.trim(),
        language: language
      }
    });
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1, backgroundColor: '#F3F4F6' }}>
      <Header title="File Your Complaint" />
      
      <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 20 }}>
        <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center', color: '#1F2937' }}>
          Describe Your Issue
        </Text>

        {/* Language Selector */}
        <View style={{ marginBottom: 20 }}>
          <Text style={{ fontSize: 16, fontWeight: '600', marginBottom: 8, color: '#374151' }}>
            Select Language:
          </Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
            {[
              { code: 'en', name: 'English' },
              { code: 'hi', name: 'Hindi' },
              { code: 'ta', name: 'Tamil' },
              { code: 'te', name: 'Telugu' },
              { code: 'bn', name: 'Bengali' },
              { code: 'mr', name: 'Marathi' }
            ].map((lang) => (
              <TouchableOpacity
                key={lang.code}
                style={{
                  paddingHorizontal: 16,
                  paddingVertical: 8,
                  backgroundColor: language === lang.code ? '#4F46E5' : '#E5E7EB',
                  borderRadius: 20,
                }}
                onPress={() => setLanguage(lang.code)}
              >
                <Text style={{ 
                  color: language === lang.code ? '#fff' : '#374151',
                  fontSize: 14,
                  fontWeight: '500'
                }}>
                  {lang.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Voice Input */}
        <VoiceInput
          onResult={handleVoiceResult}
          isRecording={isRecording}
          setIsRecording={setIsRecording}
          language={language}
        />

        <Text style={{ fontSize: 16, fontWeight: '600', marginBottom: 8, color: '#374151' }}>
          Or type your complaint:
        </Text>

        <TextInput
          style={{
            height: 200,
            backgroundColor: '#fff',
            borderRadius: 12,
            padding: 16,
            fontSize: 16,
            marginBottom: 20,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 3,
            textAlignVertical: 'top',
            borderWidth: 1,
            borderColor: '#D1D5DB',
          }}
          placeholder={`Describe your complaint in detail...\n\nExample in ${language === 'en' ? 'English' : 'your selected language'}:\n"My mobile phone was stolen at the bus stand yesterday around 5 PM. The thief was wearing a blue shirt."`}
          placeholderTextColor="#9CA3AF"
          multiline
          value={complaint}
          onChangeText={setComplaint}
        />

        {/* Complaint Tips */}
        <View style={{ 
          backgroundColor: '#EFF6FF', 
          padding: 16, 
          borderRadius: 12, 
          marginBottom: 20,
          borderLeftWidth: 4,
          borderLeftColor: '#3B82F6'
        }}>
          <Text style={{ fontSize: 14, fontWeight: '600', color: '#1E40AF', marginBottom: 8 }}>
            📝 Tips for Better Complaint:
          </Text>
          <Text style={{ fontSize: 12, color: '#374151', lineHeight: 18 }}>
            • Include date, time, and location{'\n'}
            • Describe people involved{'\n'}
            • Mention any evidence or witnesses{'\n'}
            • Be specific about what happened
          </Text>
        </View>

        <TouchableOpacity
          style={{
            backgroundColor: complaint.trim() ? '#4F46E5' : '#9CA3AF',
            paddingVertical: 16,
            borderRadius: 12,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.2,
            shadowRadius: 4,
            elevation: 5,
          }}
          onPress={handleSubmit}
          disabled={!complaint.trim()}
        >
          <Text style={{ color: '#fff', fontSize: 18, fontWeight: 'bold', textAlign: 'center' }}>
            Analyze Complaint
          </Text>
        </TouchableOpacity>
      </ScrollView>
      
      <Footer 
        onBack={() => router.back()} 
        onNext={handleSubmit}
        showNext={false}
      />
    </KeyboardAvoidingView>
  );
}