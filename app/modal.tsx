import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

export default function ExploreScreen() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Explore EquiCourt</Text>
      <View style={styles.card}>
        <Text style={styles.text}>
          Discover the features of EquiCourt: AI-powered complaint classification, severity scoring, and FIR generation.
        </Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.text}>
          Upload your complaint or speak to the app — it will guide you step by step.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6', // bg-gray-100
    padding: 16, // p-4
  },
  title: {
    fontSize: 24, // text-2xl
    fontWeight: 'bold', // font-bold
    marginBottom: 16, // mb-4
    color: '#1F2937', // text-gray-800
  },
  card: {
    backgroundColor: '#FFFFFF', // bg-white
    borderRadius: 16, // rounded-2xl
    padding: 16, // p-4
    marginBottom: 16, // mb-4
    shadowColor: '#000', // shadow-lg
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  text: {
    color: '#374151', // text-gray-700
    fontSize: 16,
    lineHeight: 24,
  },
});