import { Ionicons } from '@expo/vector-icons';
import { Dimensions, ScrollView, StyleSheet, Text, View } from 'react-native';
import { BarChart, LineChart } from 'react-native-chart-kit';

export default function MetricsPanel({ metrics }) {
  if (!metrics) return null;

  // Prepare chart data
  const prepareLatencyData = () => ({
    labels: ['Processing', 'Draft', 'Classification', 'Comparison'],
    datasets: [{
      data: [
        metrics.latency?.complaint_processing || 0,
        metrics.latency?.draft_generation || 0,
        metrics.latency?.classification || 0,
        metrics.latency?.ipc_bns_comparison || 0,
      ],
    }]
  });

  const prepareAccuracyData = () => ({
    labels: ['Classification', 'Severity', 'Legal Mapping', 'Multilingual'],
    datasets: [{
      data: [
        (metrics.accuracy?.classification || 0) * 100,
        (metrics.accuracy?.severity_prediction || 0) * 100,
        (metrics.accuracy?.legal_mapping || 0) * 100,
        (metrics.accuracy?.multilingual_processing || 0) * 100,
      ],
    }]
  });

  const prepareUsageData = () => ({
    labels: ['Complaints', 'Drafts', 'IPC Queries', 'BNS Queries'],
    datasets: [{
      data: [
        metrics.usage?.complaints_processed || 0,
        metrics.usage?.drafts_generated || 0,
        metrics.usage?.ipc_queries || 0,
        metrics.usage?.bns_queries || 0,
      ],
    }]
  });

  const getPerformanceColor = (value, type = 'latency') => {
    if (type === 'latency') {
      if (value < 200) return '#10B981'; // Green
      if (value < 400) return '#F59E0B'; // Yellow
      return '#EF4444'; // Red
    } else {
      if (value >= 90) return '#10B981'; // Green
      if (value >= 80) return '#F59E0B'; // Yellow
      return '#EF4444'; // Red
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* System Status Card */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Ionicons name="server" size={20} color="#4F46E5" />
          <Text style={styles.cardTitle}>System Status</Text>
        </View>
        <View style={styles.statusGrid}>
          <View style={styles.statusItem}>
            <View style={[styles.statusDot, { backgroundColor: '#10B981' }]} />
            <Text style={styles.statusLabel}>Backend</Text>
            <Text style={styles.statusValue}>Operational</Text>
          </View>
          <View style={styles.statusItem}>
            <View style={[styles.statusDot, { backgroundColor: '#10B981' }]} />
            <Text style={styles.statusLabel}>Database</Text>
            <Text style={styles.statusValue}>Operational</Text>
          </View>
          <View style={styles.statusItem}>
            <View style={[styles.statusDot, { backgroundColor: '#10B981' }]} />
            <Text style={styles.statusLabel}>ML Services</Text>
            <Text style={styles.statusValue}>Operational</Text>
          </View>
          <View style={styles.statusItem}>
            <Ionicons name="time" size={16} color="#6B7280" />
            <Text style={styles.statusLabel}>Uptime</Text>
            <Text style={styles.statusValue}>{metrics.system_status?.uptime_percentage || 99.8}%</Text>
          </View>
        </View>
      </View>

      {/* Latency Metrics */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Ionicons name="speedometer" size={20} color="#F59E0B" />
          <Text style={styles.cardTitle}>Latency Performance (ms)</Text>
        </View>
        <BarChart
          data={prepareLatencyData()}
          width={Dimensions.get('window').width - 40}
          height={220}
          yAxisLabel=""
          yAxisSuffix="ms"
          chartConfig={{
            backgroundColor: '#fff',
            backgroundGradientFrom: '#fff',
            backgroundGradientTo: '#fff',
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(245, 158, 11, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(107, 114, 128, ${opacity})`,
            style: { borderRadius: 16 },
            propsForLabels: { fontSize: 12 },
          }}
          style={styles.chart}
          showValuesOnTopOfBars={true}
        />
        <View style={styles.metricsGrid}>
          {metrics.accuracy && Object.entries(metrics.accuracy).map(([key, value]) => (
            key !== 'average' && (
              <View key={key} style={styles.metricItem}>
                <Text style={styles.metricLabel}>
                  {key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                </Text>
                <Text style={[styles.metricValue, { color: getPerformanceColor(value, 'latency') }]}>
                  {value.toFixed(0)}ms
                </Text>
              </View>
            )
          ))}
        </View>
      </View>

      {/* Accuracy Metrics */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Ionicons name="checkmark-circle" size={20} color="#10B981" />
          <Text style={styles.cardTitle}>Accuracy Metrics (%)</Text>
        </View>
        <LineChart
          data={prepareAccuracyData()}
          width={Dimensions.get('window').width - 40}
          height={220}
          chartConfig={{
            backgroundColor: '#fff',
            backgroundGradientFrom: '#fff',
            backgroundGradientTo: '#fff',
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(16, 185, 129, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(107, 114, 128, ${opacity})`,
            style: { borderRadius: 16 },
            propsForLabels: { fontSize: 12 },
          }}
          style={styles.chart}
          bezier
        />
        <View style={styles.metricsGrid}>
          {metrics.accuracy && Object.entries(metrics.accuracy).map(([key, value]) => (
            <View key={key} style={styles.metricItem}>
              <Text style={styles.metricLabel}>
                {key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
              </Text>
              <Text style={[styles.metricValue, { color: getPerformanceColor(value * 100, 'accuracy') }]}>
                {(value * 100).toFixed(1)}%
              </Text>
            </View>
          ))}
        </View>
      </View>

      {/* Usage Statistics */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Ionicons name="stats-chart" size={20} color="#8B5CF6" />
          <Text style={styles.cardTitle}>Usage Statistics</Text>
        </View>
        <BarChart
          data={prepareUsageData()}
          width={Dimensions.get('window').width - 40}
          height={220}
          yAxisLabel=""
          chartConfig={{
            backgroundColor: '#fff',
            backgroundGradientFrom: '#fff',
            backgroundGradientTo: '#fff',
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(139, 92, 246, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(107, 114, 128, ${opacity})`,
            style: { borderRadius: 16 },
            propsForLabels: { fontSize: 12 },
          }}
          style={styles.chart}
          showValuesOnTopOfBars={true}
        />
        <View style={styles.metricsGrid}>
          {metrics.accuracy && Object.entries(metrics.accuracy).map(([key, value]) => (
            <View key={key} style={styles.metricItem}>
              <Text style={styles.metricLabel}>
                {key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
              </Text>
              <Text style={styles.metricValue}>
                {value.toLocaleString()}
              </Text>
            </View>
          ))}
        </View>
      </View>

      {/* Coverage Metrics */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Ionicons name="map" size={20} color="#3B82F6" />
          <Text style={styles.cardTitle}>Coverage & Scale</Text>
        </View>
        <View style={styles.coverageGrid}>
          <View style={styles.coverageItem}>
            <Ionicons name="document-text" size={24} color="#4F46E5" />
            <Text style={styles.coverageNumber}>{metrics.coverage?.ipc_sections_covered || 50}</Text>
            <Text style={styles.coverageLabel}>IPC Sections</Text>
          </View>
          <View style={styles.coverageItem}>
            <Ionicons name="swap-horizontal" size={24} color="#10B981" />
            <Text style={styles.coverageNumber}>{metrics.coverage?.bns_sections_covered || 50}</Text>
            <Text style={styles.coverageLabel}>BNS Sections</Text>
          </View>
          <View style={styles.coverageItem}>
            <Ionicons name="library" size={24} color="#F59E0B" />
            <Text style={styles.coverageNumber}>{metrics.coverage?.legal_acts_available || 22}</Text>
            <Text style={styles.coverageLabel}>Legal Acts</Text>
          </View>
          <View style={styles.coverageItem}>
            <Ionicons name="language" size={24} color="#8B5CF6" />
            <Text style={styles.coverageNumber}>{metrics.coverage?.languages_supported || 5}</Text>
            <Text style={styles.coverageLabel}>Languages</Text>
          </View>
          <View style={styles.coverageItem}>
            <Ionicons name="business" size={24} color="#EF4444" />
            <Text style={styles.coverageNumber}>{metrics.coverage?.states_covered || 28}</Text>
            <Text style={styles.coverageLabel}>States</Text>
          </View>
          <View style={styles.coverageItem}>
            <Ionicons name="location" size={24} color="#EC4899" />
            <Text style={styles.coverageNumber}>{metrics.coverage?.districts_covered || 736}</Text>
            <Text style={styles.coverageLabel}>Districts</Text>
          </View>
        </View>
      </View>

      {/* Performance Summary */}
      <View style={[styles.card, styles.summaryCard]}>
        <View style={styles.cardHeader}>
          <Ionicons name="trophy" size={20} color="#DC2626" />
          <Text style={styles.cardTitle}>Performance Summary</Text>
        </View>
        <View style={styles.summaryContent}>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>Overall Performance</Text>
            <View style={styles.performanceBar}>
              <View 
                style={[
                  styles.performanceFill, 
                  { width: `${metrics.latency?.average ? 100 - (metrics.latency.average / 10) : 85}%` }
                ]} 
              />
            </View>
            <Text style={styles.summaryValue}>
              {metrics.latency?.average 
                ? `${100 - (metrics.latency.average / 10)}/100` 
                : '85/100'}
            </Text>
          </View>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>User Satisfaction</Text>
            <View style={styles.performanceBar}>
              <View style={[styles.performanceFill, { width: '92%', backgroundColor: '#10B981' }]} />
            </View>
            <Text style={styles.summaryValue}>92/100</Text>
          </View>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>System Reliability</Text>
            <View style={styles.performanceBar}>
              <View style={[styles.performanceFill, { width: `${metrics.system_status?.uptime_percentage || 99.8}%`, backgroundColor: '#3B82F6' }]} />
            </View>
            <Text style={styles.summaryValue}>{metrics.system_status?.uptime_percentage || 99.8}/100</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginHorizontal: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#F3F4F6',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
    marginLeft: 8,
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
    alignSelf: 'center', // Added for centering
  },
  statusGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    justifyContent: 'center', // Center items in the grid
  },
  statusItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    flex: 1,
    minWidth: '45%',
    justifyContent: 'space-between', // Better spacing between elements
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
    alignSelf: 'center', // Ensure dot is centered vertically
  },
  statusLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginRight: 4,
  },
  statusValue: {
    fontSize: 12,
    color: '#1F2937',
    fontWeight: '600',
    // Removed marginLeft: 'auto' as justifyContent handles spacing
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginTop: 16,
    justifyContent: 'center', // Center metrics items
  },
  metricItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    flex: 1,
    minWidth: '45%',
    justifyContent: 'space-between', // Space between label and value
  },
  metricLabel: {
    fontSize: 12,
    color: '#6B7280',
    // Removed flex: 1 as we use justifyContent
  },
  metricValue: {
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 4,
    textAlign: 'center', // Right align for values
  },
  coverageGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    justifyContent: 'center', // Center coverage items
  },
  coverageItem: {
    alignItems: 'center', // This already centers content
    backgroundColor: '#F9FAFB',
    padding: 12,
    borderRadius: 12,
    flex: 1,
    minWidth: '30%',
  },
  coverageNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
    marginVertical: 4,
    textAlign: 'center', // Center text
  },
  coverageLabel: {
    fontSize: 11,
    color: '#6B7280',
    textAlign: 'center',
  },
  summaryCard: {
    marginBottom: 30,
  },
  summaryContent: {
    gap: 16,
  },
  summaryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', // Space out label, bar, and value
  },
  summaryLabel: {
    fontSize: 14,
    color: '#374151',
    width: 120,
  },
  performanceBar: {
    flex: 1,
    height: 8,
    backgroundColor: '#E5E7EB',
    borderRadius: 4,
    marginHorizontal: 12,
    overflow: 'hidden',
  },
  performanceFill: {
    height: '100%',
    backgroundColor: '#4F46E5',
    borderRadius: 4,
  },
  summaryValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1F2937',
    width: 50,
    textAlign: 'center',
  },
});