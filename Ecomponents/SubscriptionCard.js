// Ecomponents/SubscriptionCard.js
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function SubscriptionCard({ 
  plan, 
  isSelected, 
  onSelect, 
  recommended,
  popular 
}) {
  return (
    <TouchableOpacity 
      style={[
        styles.card, 
        isSelected && styles.cardSelected,
        recommended && styles.recommendedCard
      ]}
      onPress={onSelect}
      activeOpacity={0.7}
    >
      {recommended && (
        <View style={styles.recommendedBadge}>
          <Text style={styles.recommendedText}>RECOMMENDED</Text>
        </View>
      )}
      
      {popular && (
        <View style={styles.popularBadge}>
          <Text style={styles.popularText}>MOST POPULAR</Text>
        </View>
      )}
      
      <View style={styles.header}>
        <View>
          <Text style={styles.type}>{plan.type}</Text>
          <Text style={styles.description}>{plan.description}</Text>
        </View>
        
        <View style={styles.priceContainer}>
          <Text style={styles.price}>{plan.price === 'Free' ? 'Free' : `₹${plan.price}`}</Text>
          <Text style={styles.period}>/{plan.period}</Text>
        </View>
      </View>
      
      {plan.originalPrice && (
        <View style={styles.discountContainer}>
          <Text style={styles.originalPrice}>₹{plan.originalPrice}</Text>
          {plan.savings && (
            <Text style={styles.savings}>Save {plan.savings}</Text>
          )}
        </View>
      )}
      
      <View style={styles.features}>
        {plan.features.map((feature, index) => (
          <View key={index} style={styles.featureItem}>
            <Ionicons 
              name={feature.included ? "checkmark-circle" : "close-circle"} 
              size={16} 
              color={feature.included ? "#10B981" : "#9CA3AF"} 
            />
            <Text style={[
              styles.featureText,
              !feature.included && styles.featureExcluded
            ]}>
              {feature.text}
            </Text>
          </View>
        ))}
      </View>
      
      {plan.limits && (
        <View style={styles.limitsContainer}>
          <Text style={styles.limitsTitle}>Limitations:</Text>
          {plan.limits.map((limit, index) => (
            <Text key={index} style={styles.limitText}>• {limit}</Text>
          ))}
        </View>
      )}
      
      <Text style={styles.bestFor}>Best for: {plan.bestFor}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    borderWidth: 2,
    borderColor: '#E5E7EB',
    marginBottom: 16,
    position: 'relative',
  },
  cardSelected: {
    borderColor: '#4F46E5',
    backgroundColor: '#F5F3FF',
  },
  recommendedCard: {
    borderColor: '#10B981',
  },
  recommendedBadge: {
    position: 'absolute',
    top: -10,
    right: 20,
    backgroundColor: '#10B981',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  recommendedText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  popularBadge: {
    position: 'absolute',
    top: -10,
    left: 20,
    backgroundColor: '#F59E0B',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  popularText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  type: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: '#6B7280',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  price: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#4F46E5',
  },
  period: {
    fontSize: 14,
    color: '#6B7280',
    marginLeft: 4,
  },
  discountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 8,
  },
  originalPrice: {
    fontSize: 16,
    color: '#9CA3AF',
    textDecorationLine: 'line-through',
  },
  savings: {
    fontSize: 14,
    color: '#10B981',
    fontWeight: '600',
    backgroundColor: '#D1FAE5',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  features: {
    gap: 12,
    marginBottom: 16,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  featureText: {
    fontSize: 14,
    color: '#374151',
    flex: 1,
  },
  featureExcluded: {
    color: '#9CA3AF',
    textDecorationLine: 'line-through',
  },
  limitsContainer: {
    backgroundColor: '#FEF3F2',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  limitsTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#DC2626',
    marginBottom: 4,
  },
  limitText: {
    fontSize: 12,
    color: '#DC2626',
    marginLeft: 8,
  },
  bestFor: {
    fontSize: 12,
    color: '#6B7280',
    fontStyle: 'italic',
  },
});