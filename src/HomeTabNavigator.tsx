import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import TabBar, { TabBarProps } from './components/TabBar';
import HomeScreen from './screens/HomeScreen';

export type TabParamList = {
  Home: undefined;
  Explore: undefined;
  Order: undefined;
};

const Tab = createMaterialTopTabNavigator<TabParamList>();

const HomeTabNavigator: React.FC = () => (
  <Tab.Navigator
    initialRouteName="Home"
    screenOptions={{
      swipeEnabled: true,
    }}
    tabBarPosition="bottom"
    tabBar={props => <TabBar {...(props as TabBarProps)} />}
  >
    <Tab.Screen name="Home" component={HomeScreen} options={{ tabBarLabel: 'Home' }} />
  </Tab.Navigator>
);

export default HomeTabNavigator;
