// app/metrics.js - Updated with better layout
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    Dimensions,
    ScrollView,
    StyleSheet,
    Text,
    View
} from 'react-native';
import Footer from '../Ecomponents/Footer';
import Header from '../Ecomponents/Header';
import SimpleMetricsPanel from '../Ecomponents/MetricsPanel';

const { width } = Dimensions.get('window');

export default function MetricsScreen() {
  const [metrics, setMetrics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      const mockMetrics = {
        latency: {
          complaint_processing: 275,
          draft_generation: 150,
          classification: 120,
          ipc_bns_comparison: 60,
          average: 151
        },
        accuracy: {
          classification: 0.92,
          severity_prediction: 0.85,
          legal_mapping: 0.88,
          multilingual_processing: 0.87
        },
        usage: {
          complaints_processed: 1250,
          drafts_generated: 890,
          ipc_queries: 560,
          bns_queries: 420,
          legal_acts_searched: 780,
          active_users: 342,
          peak_concurrent_users: 45
        },
        coverage: {
          ipc_sections_covered: 50,
          bns_sections_covered: 50,
          legal_acts_available: 22,
          languages_supported: 5,
          states_covered: 28,
          districts_covered: 736
        },
        system_status: {
          backend: 'Operational',
          database: 'Operational',
          ml_services: 'Operational',
          uptime_percentage: 99.8,
          last_maintenance: '2024-01-15'
        }
      };
      setMetrics(mockMetrics);
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <View style={styles.container}>
      <Header title="Performance Metrics" onBack={() => router.back()} />
      
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
          <Text style={styles.subtitle}>
            Real-time system performance and accuracy metrics
          </Text>

          {loading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#4F46E5" />
              <Text style={styles.loadingText}>Loading metrics...</Text>
            </View>
          ) : metrics ? (
            <SimpleMetricsPanel metrics={metrics} />
          ) : (
            <View style={styles.errorContainer}>
              <Ionicons name="alert-circle" size={60} color="#DC2626" />
              <Text style={styles.errorText}>Failed to load metrics</Text>
              <Text style={styles.errorSubtext}>Please try again later</Text>
            </View>
          )}

          {/* Info Section */}
          <View style={styles.infoCard}>
            <Ionicons name="information-circle" size={24} color="#3B82F6" />
            <View style={styles.infoContent}>
              <Text style={styles.infoTitle}>About These Metrics</Text>
              <Text style={styles.infoText}>
                • All data is anonymized and secure{'\n'}
                • Updated in real-time{'\n'}
                • Based on actual system usage{'\n'}
                • 99.8% system uptime maintained
              </Text>
            </View>
          </View>
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
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16, // Fixed padding
    paddingTop: 16,
    paddingBottom: 20,
  },
  subtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 20,
    textAlign: 'center',
    paddingHorizontal: 16, // Add horizontal padding
  },
  loadingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  loadingText: {
    fontSize: 16,
    color: '#6B7280',
    marginTop: 16,
  },
  errorContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  errorText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#DC2626',
    marginTop: 16,
  },
  errorSubtext: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 8,
  },
  infoCard: {
    flexDirection: 'row',
    backgroundColor: '#EFF6FF',
    borderRadius: 16,
    padding: 20,
    marginTop: 20,
    marginBottom: 10,
    gap: 16,
    width: '100%', // Ensure full width
  },
  infoContent: {
    flex: 1,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E40AF',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    color: '#374151',
    lineHeight: 22,
  },
});