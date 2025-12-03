// app/_layout.js
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function RootLayout() {
  return (
    <>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />                 {/* Home */}
        <Stack.Screen name="complaint" />             {/* Complaint */}
        <Stack.Screen name="result" />                {/* Result */}
        <Stack.Screen name="draft" />                 {/* Draft */}
        <Stack.Screen name="history" />               {/* History */}
        <Stack.Screen name="learn" />                 {/* Learn */}
        <Stack.Screen name="ipc-bns" />               {/* IPC-BNS */}
        <Stack.Screen name="xai" />                   {/* XAI */}
        <Stack.Screen name="metrics" />               {/* Metrics */}
        <Stack.Screen name="subscription" />          {/* Subscription */}
        <Stack.Screen name="settings" />              {/* Settings */}
      </Stack>
      <StatusBar style="auto" />
    </>
  );
}