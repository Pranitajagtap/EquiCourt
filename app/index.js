import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react'; // ✅ Add React import
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

export default function HomeScreen() {
  // ✅ useState must be inside the component function
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedFeature, setSelectedFeature] = useState(null);

  const menuItems = [
    {
      id: 1, // ✅ Add unique ID
      title: 'File New Complaint',
      subtitle: 'Analyze and generate FIR draft',
      icon: 'document-text',
      color: '#4F46E5',
      route: '/complaint',
      category: 'primary'
    },
    {
      id: 2,
      title: 'Complaint History',
      subtitle: 'View your previous complaints',
      icon: 'time',
      color: '#10B981',
      route: '/history',
      category: 'primary'
    },
    {
      id: 3,
      title: 'IPC vs BNS Comparison',
      subtitle: 'Compare old IPC with new BNS sections',
      icon: 'scale',
      color: '#F59E0B',
      route: '/ipc-bns',
      category: 'legal'
    },
    {
      id: 4,
      title: 'Learn Legal Acts',
      subtitle: 'Study 20+ Indian legal acts',
      icon: 'library',
      color: '#8B5CF6',
      route: '/learn',
      category: 'legal'
    },
    {
      id: 5,
      title: 'XAI Analysis',
      subtitle: 'Transparent AI explanation',
      icon: 'analytics',
      color: '#3B82F6',
      route: '/xai',
      category: 'ai'
    },
    {
      id: 6,
      title: 'Performance Metrics',
      subtitle: 'System performance & accuracy',
      icon: 'speedometer',
      color: '#EC4899',
      route: '/metrics',
      category: 'ai'
    },
    {
      id: 7,
      title: 'FIR Draft Templates',
      subtitle: 'Pre-made FIR drafts',
      icon: 'copy',
      color: '#06B6D4',
      route: '/draft',
      category: 'tools'
    },
    {
      id: 8,
      title: 'Subscription Plans',
      subtitle: 'View student-friendly plans',
      icon: 'card',
      color: '#22C55E',
      route: '/subscription',
      category: 'tools'
    },
    {
      id: 9,
      title: 'Settings',
      subtitle: 'Language & preferences',
      icon: 'settings',
      color: '#6B7280',
      route: '/settings',
      category: 'settings'
    }
  ];

  const stats = {
    complaintsProcessed: 1250,
    draftsGenerated: 890,
    activeUsers: 342,
    accuracy: '92%'
  };

  const quickActions = [
    { 
      id: 1,
      icon: 'mic', 
      title: 'Voice Input', 
      color: '#4F46E5',
      onPress: () => router.push('/complaint')
    },
    { 
      id: 2,
      icon: 'language', 
      title: 'Multilingual', 
      color: '#10B981',
      onPress: () => router.push('/settings')
    },
    { 
      id: 3,
      icon: 'shield', 
      title: 'Offline Mode', 
      color: '#F59E0B',
      onPress: () => Alert.alert('Info', 'Offline mode saves complaints locally')
    },
    { 
      id: 4,
      icon: 'download', 
      title: 'Save PDF', 
      color: '#8B5CF6',
      onPress: () => Alert.alert('Info', 'Save FIR as PDF feature')
    }
  ];

  const categories = [
    { id: 1, name: 'All', icon: 'grid' },
    { id: 2, name: 'Primary', icon: 'star' },
    { id: 3, name: 'Legal', icon: 'scale' },
    { id: 4, name: 'AI', icon: 'analytics' },
    { id: 5, name: 'Tools', icon: 'build' }
  ];

  const filteredMenuItems = menuItems.filter(item => 
    activeCategory === 'All' || item.category === activeCategory.toLowerCase()
  );

  return (
    <View style={styles.container}>
      {/* Header with App Logo */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <View style={styles.logoContainer}>
            <Ionicons name="scale" size={32} color="#fff" />
            <Text style={styles.appName}>EquiCourt</Text>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>AI Legal</Text>
            </View>
          </View>
          <TouchableOpacity onPress={() => router.push('/settings')}>
            <Ionicons name="notifications" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
        
        <Text style={styles.welcomeText}>Welcome to Legal AI Assistant</Text>
        <Text style={styles.subtitle}>
          Multilingual legal-tech app for lawyers, students & citizens
        </Text>
      </View>

      {/* Main Content */}
      <View style={styles.mainContent}>
        <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
          {/* Quick Stats */}
          <View style={styles.statsCard}>
            <View style={styles.statsHeader}>
              <Text style={styles.statsTitle}>📊 System Performance</Text>
              <TouchableOpacity onPress={() => router.push('/metrics')}>
                <Text style={styles.viewAll}>View Details →</Text>
              </TouchableOpacity>
            </View>
            
            <View style={styles.statsGrid}>
              <View style={styles.statItem}>
                <View style={[styles.statIcon, { backgroundColor: '#EEF2FF' }]}>
                  <Ionicons name="document-text" size={20} color="#4F46E5" />
                </View>
                <Text style={styles.statNumber}>{stats.complaintsProcessed.toLocaleString()}+</Text>
                <Text style={styles.statLabel}>Complaints</Text>
              </View>
              
              <View style={styles.statItem}>
                <View style={[styles.statIcon, { backgroundColor: '#D1FAE5' }]}>
                  <Ionicons name="create" size={20} color="#10B981" />
                </View>
                <Text style={styles.statNumber}>{stats.draftsGenerated.toLocaleString()}+</Text>
                <Text style={styles.statLabel}>Drafts</Text>
              </View>
              
              <View style={styles.statItem}>
                <View style={[styles.statIcon, { backgroundColor: '#FEF3C7' }]}>
                  <Ionicons name="people" size={20} color="#F59E0B" />
                </View>
                <Text style={styles.statNumber}>{stats.activeUsers.toLocaleString()}+</Text>
                <Text style={styles.statLabel}>Users</Text>
              </View>
              
              <View style={styles.statItem}>
                <View style={[styles.statIcon, { backgroundColor: '#E0E7FF' }]}>
                  <Ionicons name="checkmark-circle" size={20} color="#8B5CF6" />
                </View>
                <Text style={styles.statNumber}>{stats.accuracy}</Text>
                <Text style={styles.statLabel}>Accuracy</Text>
              </View>
            </View>
          </View>

          {/* Quick Actions */}
          <Text style={styles.sectionTitle}>🚀 Quick Actions</Text>
          <View style={styles.quickActions}>
            {quickActions.map((action) => (
              <TouchableOpacity 
                key={action.id}
                style={styles.quickAction}
                onPress={action.onPress}
              >
                <View style={[styles.actionIcon, { backgroundColor: action.color + '20' }]}>
                  <Ionicons name={action.icon} size={24} color={action.color} />
                </View>
                <Text style={styles.actionText}>{action.title}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Category Filter */}
          <Text style={styles.sectionTitle}>📁 Categories</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categories}>
            {categories.map((category) => (
              <TouchableOpacity 
                key={category.id}
                style={[
                  styles.category,
                  activeCategory === category.name && styles.categoryActive
                ]}
                onPress={() => setActiveCategory(category.name)}
              >
                <Ionicons 
                  name={category.icon} 
                  size={16} 
                  color={activeCategory === category.name ? '#fff' : '#4F46E5'} 
                />
                <Text style={[
                  styles.categoryText,
                  activeCategory === category.name && styles.categoryTextActive
                ]}>
                  {category.name}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Features Grid */}
          <Text style={styles.sectionTitle}>✨ All Features</Text>
          <View style={styles.featuresGrid}>
            {filteredMenuItems.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={[
                  styles.featureCard,
                  selectedFeature === item.id && styles.featureCardSelected
                ]}
                onPress={() => {
                  setSelectedFeature(item.id);
                  router.push(item.route);
                }}
                onPressIn={() => setSelectedFeature(item.id)}
                onPressOut={() => setSelectedFeature(null)}
              >
                <View style={[styles.featureIcon, { backgroundColor: item.color + '20' }]}>
                  <Ionicons name={item.icon} size={24} color={item.color} />
                </View>
                <Text style={styles.featureTitle}>{item.title}</Text>
                <Text style={styles.featureSubtitle}>{item.subtitle}</Text>
                <View style={styles.featureTag}>
                  <Text style={[styles.featureTagText, { color: item.color }]}>
                    {item.category.toUpperCase()}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>

          {/* Subscription Banner */}
          <TouchableOpacity 
            style={styles.subscriptionBanner}
            onPress={() => router.push('/subscription')}
          >
            <View style={styles.bannerContent}>
              <View style={styles.bannerIcon}>
                <Ionicons name="star" size={24} color="#fff" />
              </View>
              <View style={styles.bannerText}>
                <Text style={styles.bannerTitle}>Upgrade to Pro</Text>
                <Text style={styles.bannerSubtitle}>Unlock XAI, offline mode & more features</Text>
              </View>
              <Ionicons name="arrow-forward" size={20} color="#fff" />
            </View>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4F46E5',
  },
  header: {
    paddingTop: 60,
    paddingBottom: 25,
    paddingHorizontal: 20,
    backgroundColor: '#4F46E5',
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  appName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  badge: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginLeft: 8,
  },
  badgeText: {
    fontSize: 10,
    color: '#fff',
    fontWeight: '600',
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
    lineHeight: 34,
  },
  subtitle: {
    fontSize: 14,
    color: '#E5E7EB',
    lineHeight: 20,
    marginBottom: 20,
  },
  mainContent: {
    flex: 1,
    backgroundColor: '#F9FAFB',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 20,
  },
  scrollView: {
    flex: 1,
  },
  statsCard: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  statsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  statsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  viewAll: {
    fontSize: 12,
    color: '#4F46E5',
    fontWeight: '600',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  statItem: {
    flex: 1,
    minWidth: '45%',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
  },
  statIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 12,
    color: '#6B7280',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 16,
    marginTop: 8,
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  quickAction: {
    alignItems: 'center',
    flex: 1,
  },
  actionIcon: {
    width: 56,
    height: 56,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  actionText: {
    fontSize: 12,
    color: '#4B5563',
    fontWeight: '500',
    textAlign: 'center',
  },
  categories: {
    marginBottom: 20,
  },
  category: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E0E7FF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    gap: 6,
  },
  categoryActive: {
    backgroundColor: '#4F46E5',
  },
  categoryText: {
    fontSize: 14,
    color: '#4F46E5',
    fontWeight: '500',
  },
  categoryTextActive: {
    color: '#fff',
  },
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 20,
  },
  featureCard: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  featureCardSelected: {
    backgroundColor: '#F5F3FF',
    borderWidth: 2,
    borderColor: '#8B5CF6',
  },
  featureIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  featureTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  featureSubtitle: {
    fontSize: 11,
    color: '#6B7280',
    lineHeight: 14,
    marginBottom: 8,
  },
  featureTag: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(79, 70, 229, 0.1)',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  featureTagText: {
    fontSize: 10,
    fontWeight: '600',
  },
  subscriptionBanner: {
    backgroundColor: '#4F46E5',
    borderRadius: 20,
    padding: 20,
    marginBottom: 30,
  },
  bannerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  bannerIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bannerText: {
    flex: 1,
  },
  bannerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  bannerSubtitle: {
    fontSize: 12,
    color: '#E5E7EB',
  },
});