import React from 'react';
import { NavigationContainer, NavigatorScreenParams } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFlipper } from '@react-navigation/devtools';
import { Linking, Platform } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import SplashScreen from './screens/SplashScreen';
import AppTheme from './theme/theme';
import Storage from './utils/storage';
import { navigationRef } from './utils/navigation';
import GetStartedScreen from './screens/GetStartedScreen';
import SignupScreen from './screens/SignupScreen';
import LoginScreen from './screens/LoginScreen';
import ItemDetailsScreen from './screens/ItemDetailsScreen';
import HomeScreen from './screens/HomeScreen';
import TrackOrderScreen from './screens/TrackOrderScreen';
import SuccessScreen from './screens/SuccessScreen';
import OrderScreen from './screens/OrderScreen';
import HomeDrawerNavigator from './HomeDrawerNavigator';

export type RootStackParamList = {
  Splash: undefined;
  Login?: undefined;
  Signup?: undefined;
  Verify?: { hash?: string };
  Start: undefined;
  ItemDetails?: undefined;
  HomeDrawer?: undefined;
  Orders?: undefined;
  Success?: undefined;
  Track?: undefined;
};

const linking = {
  prefixes: ['ketchup://'],
  config: {
    screens: {
      HomeDrawer: 'HomeDrawer',
    },
  },
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator = () => {
  useFlipper(navigationRef);

  const [isReady, setIsReady] = React.useState(false);
  const [initialState, setInitialState] = React.useState();

  React.useEffect(() => {
    const restoreState = async () => {
      try {
        const initialUrl = await Linking.getInitialURL();

        if (Platform.OS !== 'web' && initialUrl == null) {
          // Only restore state if there's no deep link and we're not on web
          const savedStateString = await Storage.get('@navigation_state');
          const state = savedStateString ? JSON.parse(savedStateString) : undefined;

          if (state !== undefined) setInitialState(undefined);
        }
      } finally {
        setIsReady(true);
      }
    };

    if (!isReady) {
      restoreState();
    }
  }, [isReady]);

  if (!isReady) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <NavigationContainer
        ref={navigationRef}
        theme={AppTheme}
        initialState={initialState}
        linking={linking}
        onStateChange={state => Storage.save('@navigation_state', JSON.stringify(state))}
      >
        <Stack.Navigator
          screenOptions={{ animation: 'slide_from_bottom', headerShown: false }}
          initialRouteName="Splash"
        >
          <Stack.Screen name="Splash" component={SplashScreen} />
          <Stack.Screen name="Signup" component={SignupScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />

          <Stack.Screen name="Start" component={GetStartedScreen} />

          <Stack.Screen name="HomeDrawer" component={HomeDrawerNavigator} />
          {/* Order */}
          <Stack.Group>
            <Stack.Screen name="ItemDetails" component={ItemDetailsScreen} />
            <Stack.Screen name="Orders" component={OrderScreen} />
            <Stack.Screen name="Success" component={SuccessScreen} />
            <Stack.Screen name="Track" component={TrackOrderScreen} />
          </Stack.Group>
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default RootNavigator;
