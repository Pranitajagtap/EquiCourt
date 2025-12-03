import { router } from 'expo-router';
import React, { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native';
import Footer from '../Ecomponents/Footer';
import Header from '../Ecomponents/Header';
import SubscriptionCard from '../Ecomponents/SubscriptionCard';

export default function SubscriptionScreen() {
  const [selectedPlan, setSelectedPlan] = useState('Student');

  const PLANS = [
    {
      type: 'Free',
      description: 'Basic features for everyone',
      price: 'Free',
      period: 'forever',
      features: [
        { text: '3 complaints per day', included: true },
        { text: 'Basic IPC-BNS comparison', included: true },
        { text: '20+ Legal Acts access', included: true },
        { text: 'XAI Explanation', included: false },
        { text: 'Offline mode', included: false },
        { text: 'Performance metrics', included: false },
      ],
      limits: ['Max 3 drafts daily', 'No offline access'],
      bestFor: 'Citizens, Students'
    },
    {
      type: 'Student',
      description: 'Perfect for law students',
      price: '49',
      originalPrice: '199',
      period: 'month',
      features: [
        { text: 'Unlimited complaints', included: true },
        { text: 'Full IPC-BNS comparison (50 sections)', included: true },
        { text: 'All Legal Acts with details', included: true },
        { text: 'XAI Explanation', included: true },
        { text: 'Offline mode', included: true },
        { text: 'Basic performance metrics', included: true },
      ],
      savings: '75%',
      bestFor: 'Law Students, Junior Lawyers'
    },
    {
      type: 'Pro',
      description: 'For professionals & organizations',
      price: '249',
      originalPrice: '499',
      period: 'month',
      features: [
        { text: 'Everything in Student plan', included: true },
        { text: 'Advanced XAI with insights', included: true },
        { text: 'Full performance dashboard', included: true },
        { text: 'Priority processing', included: true },
        { text: 'Multiple languages', included: true },
        { text: 'API access (coming soon)', included: true },
      ],
      bestFor: 'Lawyers, Law Firms, Organizations'
    }
  ];

  const handleSubscribe = () => {
    Alert.alert(
      'Subscribe',
      `You selected ${selectedPlan} plan. In a real app, this would process payment.`,
      [{ text: 'OK' }]
    );
  };

  return (
    <View style={styles.container}>
      <Header title="Choose Your Plan" />
      
      <ScrollView style={styles.content}>
        <Text style={styles.title}>Student-Friendly Plans</Text>
        <Text style={styles.subtitle}>
          Choose the plan that best fits your needs. All plans include basic legal assistance.
        </Text>

        {/* Plans */}
        {PLANS.map((plan) => (
          <SubscriptionCard
            key={plan.type}
            plan={plan}
            isSelected={selectedPlan === plan.type}
            onSelect={() => setSelectedPlan(plan.type)}
            recommended={plan.type === 'Student'}
            popular={plan.type === 'Free'}
          />
        ))}

        {/* Features Comparison */}
        <View style={styles.comparisonCard}>
          <Text style={styles.comparisonTitle}>📊 Feature Comparison</Text>
          <View style={styles.featureRow}>
            <Text style={styles.featureName}>Complaints per day</Text>
            <Text style={styles.featureValue}>3</Text>
            <Text style={styles.featureValue}>Unlimited</Text>
            <Text style={styles.featureValue}>Unlimited</Text>
          </View>
          <View style={styles.featureRow}>
            <Text style={styles.featureName}>IPC-BNS Sections</Text>
            <Text style={styles.featureValue}>20</Text>
            <Text style={styles.featureValue}>50+</Text>
            <Text style={styles.featureValue}>50+</Text>
          </View>
          <View style={styles.featureRow}>
            <Text style={styles.featureName}>XAI Analysis</Text>
            <Text style={styles.featureValue}>❌</Text>
            <Text style={styles.featureValue}>✅</Text>
            <Text style={styles.featureValue}>✅ Advanced</Text>
          </View>
          <View style={styles.featureRow}>
            <Text style={styles.featureName}>Offline Mode</Text>
            <Text style={styles.featureValue}>❌</Text>
            <Text style={styles.featureValue}>✅</Text>
            <Text style={styles.featureValue}>✅</Text>
          </View>
          <View style={styles.featureRow}>
            <Text style={styles.featureName}>Support</Text>
            <Text style={styles.featureValue}>Email</Text>
            <Text style={styles.featureValue}>Email + Chat</Text>
            <Text style={styles.featureValue}>Priority 24/7</Text>
          </View>
        </View>

        {/* FAQ */}
        <View style={styles.faqCard}>
          <Text style={styles.faqTitle}>❓ Frequently Asked Questions</Text>
          <View style={styles.faqItem}>
            <Text style={styles.faqQ}>Q: Can I upgrade my plan later?</Text>
            <Text style={styles.faqA}>A: Yes, you can upgrade anytime. You'll only pay the difference.</Text>
          </View>
          <View style={styles.faqItem}>
            <Text style={styles.faqQ}>Q: Is there a free trial?</Text>
            <Text style={styles.faqA}>A: The Free plan is always free. Student plan offers 7-day trial.</Text>
          </View>
          <View style={styles.faqItem}>
            <Text style={styles.faqQ}>Q: Can I cancel anytime?</Text>
            <Text style={styles.faqA}>A: Yes, cancel anytime. No hidden fees.</Text>
          </View>
        </View>
      </ScrollView>

      <Footer 
        onBack={() => router.back()}
        onNext={handleSubscribe}
        nextText="Subscribe Now"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9FAFB' },
  content: { flex: 1, padding: 16 },
  title: { fontSize: 28, fontWeight: 'bold', color: '#1F2937', textAlign: 'center', marginBottom: 8 },
  subtitle: { fontSize: 14, color: '#6B7280', textAlign: 'center', marginBottom: 30, lineHeight: 20 },
  comparisonCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  comparisonTitle: { fontSize: 16, fontWeight: 'bold', color: '#1F2937', marginBottom: 16 },
  featureRow: {
    flexDirection: 'row',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  featureName: { flex: 2, fontSize: 14, color: '#374151' },
  featureValue: { flex: 1, fontSize: 14, color: '#6B7280', textAlign: 'center' },
  faqCard: {
    backgroundColor: '#F0F9FF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 30,
    borderWidth: 1,
    borderColor: '#BAE6FD',
  },
  faqTitle: { fontSize: 16, fontWeight: 'bold', color: '#0369A1', marginBottom: 16 },
  faqItem: { marginBottom: 16 },
  faqQ: { fontSize: 14, fontWeight: '600', color: '#1E40AF', marginBottom: 4 },
  faqA: { fontSize: 13, color: '#374151', lineHeight: 18 },
});