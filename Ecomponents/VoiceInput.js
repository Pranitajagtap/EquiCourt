import { Ionicons } from '@expo/vector-icons';
import * as Speech from 'expo-speech';
import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  Vibration,
  View
} from 'react-native';

export default function VoiceInput({ onVoiceResult, language = 'en' }) {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [hasPermission, setHasPermission] = useState(true); // Always true for simulation
  const [recordingTime, setRecordingTime] = useState(0);
  const [recordingTimer, setRecordingTimer] = useState(null);

  // Remove permission checking - not needed for simulation
  const checkPermissions = async () => {
    // For simulation, always have permission
    setHasPermission(true);
  };

  const startRecording = async () => {
    // Skip actual recording for simulation
    setIsRecording(true);
    setTranscript('Listening... Speak now');
    setRecordingTime(0);
    Vibration.vibrate(50);

    // Start timer
    const timer = setInterval(() => {
      setRecordingTime(prev => {
        if (prev >= 30) {
          clearInterval(timer);
          stopRecording();
          return prev;
        }
        return prev + 1;
      });
    }, 1000);

    setRecordingTimer(timer);

    // Simulate result after 3 seconds
    setTimeout(() => {
      stopRecording();
      
      // Simulated voice results based on language
      const simulatedResults = {
        en: "Someone stole my mobile phone from the bus station yesterday around 5 PM. The thief was wearing a blue shirt.",
        hi: "कल शाम 5 बजे बस स्टेशन से किसी ने मेरा मोबाइल फोन चुरा लिया। चोर नीली शर्ट पहने हुए था।",
        mr: "काल संध्याकाळी ५ वाजता बस स्थानकावरून कोणीतरी माझा मोबाईल फोन चोरला. चोर निळा शर्ट घातला होता.",
        'hi-en': "Yesterday evening 5 baje bus station se kisi ne mera mobile phone chura liya. Chor neeli shirt pehna tha."
      };

      const result = simulatedResults[language] || simulatedResults.en;
      setTranscript(result);
      onVoiceResult?.(result);
      
      // Speak confirmation
      Speech.speak('Voice recording saved', { language, rate: 0.9 });
    }, 3000);
  };

  const stopRecording = () => {
    if (recordingTimer) {
      clearInterval(recordingTimer);
      setRecordingTimer(null);
    }
    
    setIsRecording(false);
    Vibration.vibrate(100);
  };

  const clearTranscript = () => {
    setTranscript('');
    onVoiceResult?.('');
  };

  const getLanguageName = (code) => {
    const languages = {
      en: 'English',
      hi: 'Hindi',
      mr: 'Marathi',
      'hi-en': 'Hinglish'
    };
    return languages[code] || 'English';
  };

  const playTranscript = () => {
    if (transcript) {
      Speech.speak(transcript, { 
        language: language === 'hi-en' ? 'en' : language,
        rate: 0.9 
      });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="mic" size={24} color="#4F46E5" />
        <Text style={styles.title}>Voice Input Assistant</Text>
        <View style={styles.languageBadge}>
          <Ionicons name="language" size={12} color="#fff" />
          <Text style={styles.languageText}>{getLanguageName(language)}</Text>
        </View>
      </View>

      <TouchableOpacity
        style={[styles.recordButton, isRecording && styles.recordingButton]}
        onPress={isRecording ? stopRecording : startRecording}
        activeOpacity={0.8}
      >
        <View style={styles.recordButtonContent}>
          {isRecording ? (
            <>
              <View style={styles.recordingIndicator}>
                <View style={styles.recordingPulse} />
                <View style={styles.recordingDot} />
              </View>
              <Text style={styles.recordButtonText}>Stop Recording</Text>
              <View style={styles.timerContainer}>
                <Ionicons name="time" size={14} color="#fff" />
                <Text style={styles.recordingTime}>{recordingTime}s / 30s</Text>
              </View>
            </>
          ) : (
            <>
              <View style={styles.micIconContainer}>
                <Ionicons name="mic" size={36} color="#fff" />
              </View>
              <Text style={styles.recordButtonText}>Tap to Speak</Text>
              <Text style={styles.recordSubtext}>
                Speak your complaint clearly
              </Text>
            </>
          )}
        </View>
      </TouchableOpacity>

      {/* Voice Tips */}
      <View style={styles.tipsBox}>
        <Ionicons name="bulb" size={16} color="#F59E0B" />
        <Text style={styles.tipsText}>
          Speak naturally. Include: What happened, when, where, and who was involved.
        </Text>
      </View>

      {/* Transcript Display */}
      {transcript ? (
        <View style={styles.transcriptContainer}>
          <View style={styles.transcriptHeader}>
            <View style={styles.transcriptTitleRow}>
              <Ionicons name="document-text" size={18} color="#4F46E5" />
              <Text style={styles.transcriptTitle}>Voice Transcript</Text>
            </View>
            <TouchableOpacity onPress={clearTranscript} style={styles.clearButton}>
              <Ionicons name="close-circle" size={20} color="#6B7280" />
            </TouchableOpacity>
          </View>
          
          <View style={styles.transcriptBox}>
            <Text style={styles.transcriptText}>{transcript}</Text>
          </View>

          <View style={styles.transcriptActions}>
            <TouchableOpacity 
              style={[styles.actionButton, styles.playButton]}
              onPress={playTranscript}
            >
              <Ionicons name="play" size={16} color="#4F46E5" />
              <Text style={[styles.actionText, styles.playText]}>Playback</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.actionButton, styles.useButton]}
              onPress={() => onVoiceResult?.(transcript)}
            >
              <Ionicons name="checkmark-circle" size={16} color="#fff" />
              <Text style={[styles.actionText, styles.useText]}>Use This Text</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.actionButton, styles.editButton]}
              onPress={() => {
                // Navigate to edit screen or show text input
                onVoiceResult?.(transcript);
              }}
            >
              <Ionicons name="create" size={16} color="#6B7280" />
              <Text style={[styles.actionText, styles.editText]}>Edit</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View style={styles.placeholderContainer}>
          <Ionicons name="chatbubble-ellipses" size={40} color="#D1D5DB" />
          <Text style={styles.placeholderText}>
            Your voice transcript will appear here
          </Text>
          <Text style={styles.placeholderSubtext}>
            Speak clearly and include all important details
          </Text>
        </View>
      )}

      {/* Feature Highlights */}
      <View style={styles.featuresContainer}>
        <Text style={styles.featuresTitle}>🎤 Voice Input Features</Text>
        <View style={styles.featuresGrid}>
          <View style={styles.featureItem}>
            <Ionicons name="time" size={16} color="#10B981" />
            <Text style={styles.featureText}>30 sec max</Text>
          </View>
          <View style={styles.featureItem}>
            <Ionicons name="language" size={16} color="#8B5CF6" />
            <Text style={styles.featureText}>4 Languages</Text>
          </View>
          <View style={styles.featureItem}>
            <Ionicons name="shield" size={16} color="#3B82F6" />
            <Text style={styles.featureText}>Secure</Text>
          </View>
          <View style={styles.featureItem}>
            <Ionicons name="download" size={16} color="#F59E0B" />
            <Text style={styles.featureText}>Save & Edit</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
    borderWidth: 1,
    borderColor: '#F3F4F6',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginLeft: 10,
    flex: 1,
  },
  languageBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4F46E5',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
    gap: 4,
  },
  languageText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  recordButton: {
    backgroundColor: '#4F46E5',
    borderRadius: 18,
    paddingVertical: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    overflow: 'hidden',
  },
  recordingButton: {
    backgroundColor: '#DC2626',
  },
  recordButtonContent: {
    alignItems: 'center',
    gap: 8,
  },
  micIconContainer: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  recordButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  recordSubtext: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 14,
    marginTop: 4,
  },
  recordingIndicator: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255,255,255,0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  recordingPulse: {
    position: 'absolute',
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255,255,255,0.3)',
  },
  recordingDot: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#fff',
  },
  timerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 8,
  },
  recordingTime: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  tipsBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFBEB',
    padding: 14,
    borderRadius: 10,
    marginBottom: 20,
    gap: 10,
    borderWidth: 1,
    borderColor: '#FDE68A',
  },
  tipsText: {
    fontSize: 13,
    color: '#92400E',
    flex: 1,
    lineHeight: 18,
  },
  transcriptContainer: {
    marginBottom: 20,
  },
  transcriptHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  transcriptTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  transcriptTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
  },
  clearButton: {
    padding: 4,
  },
  transcriptBox: {
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    marginBottom: 16,
  },
  transcriptText: {
    fontSize: 15,
    color: '#4B5563',
    lineHeight: 22,
  },
  transcriptActions: {
    flexDirection: 'row',
    gap: 10,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 10,
    gap: 8,
    flex: 1,
    justifyContent: 'center',
  },
  playButton: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  useButton: {
    backgroundColor: '#10B981',
    borderWidth: 1,
    borderColor: '#10B981',
  },
  editButton: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  actionText: {
    fontSize: 14,
    fontWeight: '600',
  },
  playText: {
    color: '#4F46E5',
  },
  useText: {
    color: '#fff',
  },
  editText: {
    color: '#6B7280',
  },
  placeholderContainer: {
    alignItems: 'center',
    paddingVertical: 40,
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#E5E7EB',
    borderStyle: 'dashed',
  },
  placeholderText: {
    fontSize: 15,
    color: '#6B7280',
    marginTop: 12,
    fontWeight: '500',
  },
  placeholderSubtext: {
    fontSize: 13,
    color: '#9CA3AF',
    marginTop: 4,
  },
  featuresContainer: {
    backgroundColor: '#F0F9FF',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#BAE6FD',
  },
  featuresTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#0369A1',
    marginBottom: 12,
  },
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    gap: 6,
    flex: 1,
    minWidth: '45%',
  },
  featureText: {
    fontSize: 12,
    color: '#374151',
    fontWeight: '500',
  },
});