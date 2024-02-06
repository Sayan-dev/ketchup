import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import TabBar, { TabBarProps } from './components/TabBar';
import HomeScreen from './screens/HomeScreen';
import OrderScreen from './screens/OrderScreen';

export type TabParamList = {
  Home: undefined;
  Orders: undefined;
  Favorites: undefined;
};

const Tab = createMaterialTopTabNavigator<TabParamList>();

const HomeTabNavigator: React.FC = () => (
  <Tab.Navigator
    initialRouteName="Home"
    screenOptions={{
      swipeEnabled: false,
    }}
    tabBarPosition="bottom"
    // tabBar={props => <TabBar {...(props as TabBarProps)} />}
  >
    <Tab.Screen name="Home" component={HomeScreen} options={{ tabBarLabel: 'Home' }} />
    <Tab.Screen name="Orders" component={OrderScreen} options={{ tabBarLabel: 'Orders' }} />
    <Tab.Screen name="Favorites" component={HomeScreen} options={{ tabBarLabel: 'Likes' }} />
  </Tab.Navigator>
);

export default HomeTabNavigator;
