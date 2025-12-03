import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';
import Footer from '../Ecomponents/Footer';
import Header from '../Ecomponents/Header';

export default function SettingsScreen() {
  const [notifications, setNotifications] = useState(true);
  const [offlineMode, setOfflineMode] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState('en');

  const languages = [
    { code: 'en', name: 'English', native: 'English' },
    { code: 'hi', name: 'Hindi', native: 'हिन्दी' },
    { code: 'mr', name: 'Marathi', native: 'मराठी' },
    { code: 'ta', name: 'Tamil', native: 'தமிழ்' },
    { code: 'hi-en', name: 'Hinglish', native: 'Hinglish' },
  ];

  return (
    <View style={styles.container}>
      <Header title="Settings" />
      
      <ScrollView style={styles.content}>
        {/* Language Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🌐 Language</Text>
          <Text style={styles.sectionDesc}>Select your preferred language</Text>
          
          <View style={styles.languageGrid}>
            {languages.map((lang) => (
              <TouchableOpacity
                key={lang.code}
                style={[
                  styles.languageOption,
                  language === lang.code && styles.languageSelected
                ]}
                onPress={() => setLanguage(lang.code)}
              >
                <Text style={styles.languageName}>{lang.name}</Text>
                <Text style={styles.languageNative}>{lang.native}</Text>
                {language === lang.code && (
                  <Ionicons name="checkmark-circle" size={20} color="#4F46E5" />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* App Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>⚙️ App Settings</Text>
          
          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Ionicons name="notifications" size={24} color="#4F46E5" />
              <View style={styles.settingText}>
                <Text style={styles.settingName}>Notifications</Text>
                <Text style={styles.settingDesc}>Get updates about your complaints</Text>
              </View>
            </View>
            <Switch
              value={notifications}
              onValueChange={setNotifications}
              trackColor={{ false: '#D1D5DB', true: '#4F46E5' }}
            />
          </View>

          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Ionicons name="cloud-offline" size={24} color="#10B981" />
              <View style={styles.settingText}>
                <Text style={styles.settingName}>Offline Mode</Text>
                <Text style={styles.settingDesc}>Save complaints locally</Text>
              </View>
            </View>
            <Switch
              value={offlineMode}
              onValueChange={setOfflineMode}
              trackColor={{ false: '#D1D5DB', true: '#10B981' }}
            />
          </View>

          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Ionicons name="moon" size={24} color="#6B7280" />
              <View style={styles.settingText}>
                <Text style={styles.settingName}>Dark Mode</Text>
                <Text style={styles.settingDesc}>Coming soon</Text>
              </View>
            </View>
            <Switch
              value={darkMode}
              onValueChange={setDarkMode}
              disabled
              trackColor={{ false: '#D1D5DB', true: '#6B7280' }}
            />
          </View>
        </View>

        {/* Data & Privacy */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🔒 Data & Privacy</Text>
          
          <TouchableOpacity style={styles.privacyItem}>
            <Ionicons name="shield" size={24} color="#3B82F6" />
            <View style={styles.privacyText}>
              <Text style={styles.privacyName}>Privacy Policy</Text>
              <Text style={styles.privacyDesc}>How we handle your data</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.privacyItem}>
            <Ionicons name="document-text" size={24} color="#F59E0B" />
            <View style={styles.privacyText}>
              <Text style={styles.privacyName}>Terms of Service</Text>
              <Text style={styles.privacyDesc}>App usage terms</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.privacyItem}>
            <Ionicons name="trash" size={24} color="#EF4444" />
            <View style={styles.privacyText}>
              <Text style={styles.privacyName}>Clear All Data</Text>
              <Text style={styles.privacyDesc}>Delete all saved complaints</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
          </TouchableOpacity>
        </View>

        {/* About */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>ℹ️ About EquiCourt</Text>
          
          <View style={styles.aboutCard}>
            <Text style={styles.aboutText}>
              EquiCourt is an AI-powered legal assistance app designed to help citizens, 
              students, and lawyers navigate the Indian legal system.
            </Text>
            <View style={styles.aboutItem}>
              <Ionicons name="code" size={16} color="#6B7280" />
              <Text style={styles.aboutItemText}>Version 1.0.0</Text>
            </View>
            <View style={styles.aboutItem}>
              <Ionicons name="calendar" size={16} color="#6B7280" />
              <Text style={styles.aboutItemText}>© 2024 EquiCourt</Text>
            </View>
            <View style={styles.aboutItem}>
              <Ionicons name="mail" size={16} color="#6B7280" />
              <Text style={styles.aboutItemText}>support@equicourt.com</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      <Footer 
        onBack={() => router.back()}
        nextText="Save Settings"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9FAFB' },
  content: { flex: 1, padding: 16 },
  section: { 
    backgroundColor: '#fff', 
    borderRadius: 16, 
    padding: 20, 
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#1F2937', marginBottom: 4 },
  sectionDesc: { fontSize: 14, color: '#6B7280', marginBottom: 16 },
  languageGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  languageOption: {
    backgroundColor: '#F9FAFB',
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    minWidth: '30%',
    flex: 1,
    alignItems: 'center',
  },
  languageSelected: {
    backgroundColor: '#EEF2FF',
    borderColor: '#4F46E5',
  },
  languageName: { fontSize: 14, fontWeight: '500', color: '#374151' },
  languageNative: { fontSize: 12, color: '#6B7280', marginTop: 2 },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  settingInfo: { flexDirection: 'row', alignItems: 'center', gap: 12, flexShrink: 1, },
  settingText: { flexShrink: 1,maxWidth: '80%', },
  settingName: { fontSize: 16, color: '#374151', marginBottom: 2 },
  settingDesc: { fontSize: 12, color: '#6B7280' },
  privacyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
    gap: 12,
  },
  privacyText: { flex: 1 },
  privacyName: { fontSize: 16, color: '#374151', marginBottom: 2 },
  privacyDesc: { fontSize: 12, color: '#6B7280' },
  aboutCard: { backgroundColor: '#F9FAFB', borderRadius: 12, padding: 16 },
  aboutText: { fontSize: 14, color: '#374151', lineHeight: 20, marginBottom: 16 },
  aboutItem: { flexDirection: 'row', alignItems: 'center', marginBottom: 8, gap: 8 },
  aboutItemText: { fontSize: 13, color: '#6B7280' },
});