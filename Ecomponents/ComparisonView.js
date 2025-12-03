import React from 'react';
import { Text, View } from 'react-native';

export default function ComparisonView({ data }) {
  return (
    <View style={styles.container}>
      {/* Side-by-side comparison of IPC vs BNS */}
      <View style={styles.comparisonRow}>
        <View style={[styles.column, styles.ipcColumn]}>
          <Text style={styles.columnTitle}>📜 IPC (1860)</Text>
          <Text style={styles.sectionCode}>Section {data.ipc.code}</Text>
          <Text style={styles.sectionTitle}>{data.ipc.title}</Text>
          <Text style={styles.punishment}>Punishment: {data.ipc.punishment}</Text>
        </View>
        
        <View style={styles.arrowContainer}>
          <Text style={styles.arrow}>→</Text>
        </View>
        
        <View style={[styles.column, styles.bnsColumn]}>
          <Text style={styles.columnTitle}>📘 BNS (2023)</Text>
          <Text style={styles.sectionCode}>Section {data.bns.code}</Text>
          <Text style={styles.sectionTitle}>{data.bns.title}</Text>
          <Text style={styles.punishment}>Punishment: {data.bns.punishment}</Text>
        </View>
      </View>
    </View>
  );
}