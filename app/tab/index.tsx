import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import {
  ScrollView,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

export default function HomeScreen() {
  const menuItems = [
    {
      title: 'File New Complaint',
      subtitle: 'Analyze and generate FIR draft',
      icon: 'document-text' as any,
      color: '#4F46E5',
      route: '/input'
    },
    {
      title: 'Complaint History',
      subtitle: 'View your previous complaints',
      icon: 'time' as any,
      color: '#10B981',
      route: '/history'
    },
    {
      title: 'Settings',
      subtitle: 'App preferences and information',
      icon: 'settings' as any,
      color: '#6B7280',
      route: '/settings'
    }
  ];

  return (
    <View style={{
      flex: 1,
      backgroundColor: '#4F46E5'
    }}>
      {/* Header */}
      <View style={{
        paddingTop: 60,
        paddingBottom: 30,
        paddingHorizontal: 20,
      }}>
        <Text style={{ fontSize: 32, color: '#fff', fontWeight: 'bold', textAlign: 'center', marginBottom: 10 }}>
          Welcome to EquiCourt
        </Text>
        <Text style={{ fontSize: 16, color: '#E5E7EB', textAlign: 'center', lineHeight: 22 }}>
          AI-powered legal assistance for filing complaints, scoring severity, and generating FIR drafts.
        </Text>
      </View>

      {/* Main Content */}
      <View style={{
        flex: 1,
        backgroundColor: '#F3F4F6',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        padding: 20,
      }}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Quick Stats */}
          <View style={{
            backgroundColor: '#fff',
            borderRadius: 20,
            padding: 20,
            marginBottom: 20,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 10,
            elevation: 5,
          }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 15, color: '#1F2937' }}>
              🚀 Get Started Quickly
            </Text>
            
            <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
              <View style={{ alignItems: 'center' }}>
                <Ionicons name={"document-text" as any} size={24} color="#4F46E5" />
                <Text style={{ fontSize: 12, color: '#6B7280', marginTop: 4 }}>File FIR</Text>
              </View>
              <View style={{ alignItems: 'center' }}>
                <Ionicons name={"analytics" as any} size={24} color="#10B981" />
                <Text style={{ fontSize: 12, color: '#6B7280', marginTop: 4 }}>AI Analysis</Text>
              </View>
              <View style={{ alignItems: 'center' }}>
                <Ionicons name={"download" as any} size={24} color="#F59E0B" />
                <Text style={{ fontSize: 12, color: '#6B7280', marginTop: 4 }}>Download</Text>
              </View>
              <View style={{ alignItems: 'center' }}>
                <Ionicons name={"shield-checkmark" as any} size={24} color="#EF4444" />
                <Text style={{ fontSize: 12, color: '#6B7280', marginTop: 4 }}>Secure</Text>
              </View>
            </View>
          </View>

          {/* Menu Grid */}
          <View style={{ marginBottom: 20 }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 15, color: '#1F2937' }}>
              What would you like to do?
            </Text>
            
            {menuItems.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={{
                  backgroundColor: '#fff',
                  borderRadius: 16,
                  padding: 20,
                  marginBottom: 12,
                  flexDirection: 'row',
                  alignItems: 'center',
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.1,
                  shadowRadius: 6,
                  elevation: 3,
                }}
                onPress={() => router.push(item.route as any)}
              >
                <View style={{
                  width: 50,
                  height: 50,
                  borderRadius: 12,
                  backgroundColor: item.color + '20',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginRight: 15,
                }}>
                  <Ionicons name={item.icon} size={24} color={item.color} />
                </View>
                
                <View style={{ flex: 1 }}>
                  <Text style={{ fontSize: 18, fontWeight: '600', color: '#1F2937', marginBottom: 4 }}>
                    {item.title}
                  </Text>
                  <Text style={{ fontSize: 14, color: '#6B7280', lineHeight: 18 }}>
                    {item.subtitle}
                  </Text>
                </View>
                
                <Ionicons name={"chevron-forward" as any} size={20} color="#9CA3AF" />
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>
    </View>
  );
}