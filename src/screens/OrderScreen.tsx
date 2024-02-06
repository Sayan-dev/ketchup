import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { CompositeScreenProps, useTheme } from '@react-navigation/native';

import { MaterialTopTabScreenProps } from '@react-navigation/material-top-tabs';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ExtendedTheme } from '../types';
import { TabParamList } from '../HomeTabNavigator';
import { RootStackParamList } from '../RootNavigator';
import TopBar from '../components/orders/Topbar';
import OrderList from '../components/orders/OrderList';
import CheckoutBar from '../components/orders/Checkout';

type OrderScreenProps = CompositeScreenProps<
  MaterialTopTabScreenProps<TabParamList, 'Orders'>,
  NativeStackScreenProps<RootStackParamList>
>;

const OrderScreen: React.FC<OrderScreenProps> = ({ navigation }: OrderScreenProps) => {
  const theme = useTheme();
  const goBack = async () => {
    // await auth().signOut();
    // navigation.getParent()?.reset({ index: 1, routes: [{ name: 'Login' }] });
    navigation.goBack();
  };
  const styles = React.useMemo(() => createStyles(theme), [theme]);
  return (
    <SafeAreaView style={styles.container}>
      <TopBar goBack={goBack} />
      <OrderList />
      <CheckoutBar />
    </SafeAreaView>
  );
};

export default OrderScreen;

const createStyles = (theme: ExtendedTheme) =>
  StyleSheet.create({
    container: {
      flexGrow: 1,
    },
  });
