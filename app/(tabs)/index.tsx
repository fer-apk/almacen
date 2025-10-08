import Constants from 'expo-constants';
import * as Linking from 'expo-linking';
import { useEffect } from 'react';
import { Platform, StyleSheet } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

function getServerBaseUrl() {
  if (Platform.OS === 'web') return 'http://localhost:3000';
  const hostUri = (Constants as any)?.expoConfig?.hostUri || (Constants as any)?.expoGoConfig?.debuggerHost;
  let host = typeof hostUri === 'string' ? hostUri.split(':')[0] : 'localhost';
  if (Platform.OS === 'android' && (host === 'localhost' || host === '127.0.0.1')) {
    host = '10.0.2.2';
  }
  return `http://${host}:3000`;
}

export default function HomeScreen() {
  useEffect(() => {
    const base = getServerBaseUrl();
    const loginUrl = `${base}/login`;
    Linking.openURL(loginUrl);
  }, []);

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Redirecting to Login...</ThemedText>
      <ThemedText>Opening login page. Ensure the Express server is running on port 3000.</ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    gap: 12,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
});
