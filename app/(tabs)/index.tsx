import Constants from 'expo-constants';
import { Image } from 'expo-image';
import * as Linking from 'expo-linking';
import { useEffect } from 'react';
import { Platform, StyleSheet } from 'react-native';

import { HelloWave } from '@/components/hello-wave';
import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

function getServerBaseUrl() {
  // Web: localhost funciona
  if (Platform.OS === 'web') return 'http://localhost:3000';

  // Expo Go: obtener host del debugger (p.ej. "192.168.1.10:19000")
  // SDK 54: prefer expoConfig.hostUri, fallback a expoGoConfig.debuggerHost
  const hostUri = (Constants as any)?.expoConfig?.hostUri || (Constants as any)?.expoGoConfig?.debuggerHost;
  let host = typeof hostUri === 'string' ? hostUri.split(':')[0] : 'localhost';

  // Emulador Android: usar 10.0.2.2 si host apunta a localhost
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
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Redirecting to Login...</ThemedText>
        <HelloWave />
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Opening Login Page</ThemedText>
        <ThemedText>
          You will be redirected to the login page.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Make sure your server is running</ThemedText>
        <ThemedText>
          Run <ThemedText type="defaultSemiBold">npm run server</ThemedText> in a separate terminal to start the Express server.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 1: Try it</ThemedText>
        <ThemedText>
          Edit <ThemedText type="defaultSemiBold">app/(tabs)/index.tsx</ThemedText> to see changes.
          Press{' '}
          <ThemedText type="defaultSemiBold">
            {Platform.select({
              ios: 'cmd + d',
              android: 'cmd + m',
              web: 'F12',
            })}
          </ThemedText>{' '}
          to open developer tools.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 2: Explore</ThemedText>
        <ThemedText>
          {`Tap the Explore tab to learn more about what's included in this starter app.`}
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 3: Get a fresh start</ThemedText>
        <ThemedText>
          {`When you're ready, run `}
          <ThemedText type="defaultSemiBold">npm run reset-project</ThemedText> to get a fresh{' '}
          <ThemedText type="defaultSemiBold">app</ThemedText> directory. This will move the current{' '}
          <ThemedText type="defaultSemiBold">app</ThemedText> to{' '}
          <ThemedText type="defaultSemiBold">app-example</ThemedText>.
        </ThemedText>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
