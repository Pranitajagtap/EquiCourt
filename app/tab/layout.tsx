import React from 'react';
import { StyleSheet, View } from 'react-native';

interface TabLayoutProps {
  children: React.ReactNode;
}

export default function TabLayout({ children }: TabLayoutProps) {
  return <View style={styles.container}>{children}</View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#DBC2A6', // main app background
    padding: 15,
  },
});
