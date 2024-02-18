import { StyleSheet, Text, TextInput, View } from 'react-native';
import React, { useState } from 'react';
import { CompositeScreenProps, useTheme } from '@react-navigation/native';

import { MaterialTopTabScreenProps } from '@react-navigation/material-top-tabs';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as yup from 'yup';
import { DrawerScreenProps } from '@react-navigation/drawer';
import { RootStackParamList } from '../RootNavigator';

import { useGetOrders } from '../api/queries/order.queries';
import { DrawerParamList } from '../HomeDrawerNavigator';
import Topbar from '../components/common/TopBar';
import OrderList from '../components/myorders/OrderList';
import type { ExtendedTheme } from '../types';

type MyOrderScreenProps = CompositeScreenProps<
  DrawerScreenProps<DrawerParamList, 'MyOrders'>,
  NativeStackScreenProps<RootStackParamList>
>;

const MyOrderScreen: React.FC<MyOrderScreenProps> = ({ navigation }: MyOrderScreenProps) => {
  const theme = useTheme();

  const orders = useGetOrders();

  const goBack = () => {
    navigation.goBack();
  };

  const styles = React.useMemo(() => createStyles(theme), [theme]);
  return (
    <SafeAreaView style={styles.container}>
      <Topbar goBack={goBack} title="My Orders" />
      <OrderList orders={orders.data || []} />
    </SafeAreaView>
  );
};

export default MyOrderScreen;

const createStyles = (theme: ExtendedTheme) =>
  StyleSheet.create({
    container: {
      flexGrow: 1,
    },
  });
