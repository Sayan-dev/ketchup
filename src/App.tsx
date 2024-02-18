/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import { focusManager, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import { AppStateStatus, LogBox, Platform, StyleSheet } from 'react-native';
import FlipperAsyncStorage from 'rn-flipper-async-storage-advanced';
import Toast from 'react-native-toast-message';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import useAppState from './hooks/useAppState';
import useOnlineManager from './hooks/useOnlineManager';
import RootNavigator from './RootNavigator';
import useUserStore from './store';

// TODO: ISSUE: React Native Flipper is not working with RN 0.69
// https://github.com/facebook/flipper/issues/3859

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: 2 } },
});

if (__DEV__) {
  // eslint-disable-next-line import/no-extraneous-dependencies
  import('react-query-native-devtools').then(({ addPlugin }) => {
    addPlugin({ queryClient });
  });
}

function onAppStateChange(status: AppStateStatus) {
  // React Query already supports in web browser refetch on window focus by default
  if (Platform.OS !== 'web') {
    focusManager.setFocused(status === 'active');
  }
}

LogBox.ignoreLogs(['The native module for Flipper', 'VirtualizedLists should never be']);

const App = () => {
  useOnlineManager();

  useAppState(onAppStateChange);

  React.useEffect(() => {
    if (__DEV__) {
      // eslint-disable-next-line no-console
      useUserStore.subscribe(state => console.log('Zustand: ', JSON.stringify(state, null, 2)));
    }
  }, []);

  return (
    <GestureHandlerRootView style={styles.container}>
      <QueryClientProvider client={queryClient}>
        <RootNavigator />
        {__DEV__ ? <FlipperAsyncStorage /> : null}
        <Toast />
      </QueryClientProvider>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
