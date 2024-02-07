import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { CompositeScreenProps, useTheme } from '@react-navigation/native';

import { MaterialTopTabScreenProps } from '@react-navigation/material-top-tabs';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ExtendedTheme } from '../types';
import { RootStackParamList } from '../RootNavigator';
import TopBar from '../components/orders/Topbar';
import OrderList from '../components/orders/OrderList';
import CheckoutBar from '../components/orders/Checkout';
import useOrderStore from '../store/order/selector';
import CheckoutModal from '../components/orders/CheckoutModal';

type OrderScreenProps = NativeStackScreenProps<RootStackParamList, 'Orders'>;

const OrderScreen: React.FC<OrderScreenProps> = ({ navigation }: OrderScreenProps) => {
  const theme = useTheme();
  const [orders, total] = useOrderStore();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const goBack = async () => {
    // await auth().signOut();
    // navigation.getParent()?.reset({ index: 1, routes: [{ name: 'Login' }] });
    navigation.goBack();
  };

  const handleCheckout = () => {
    console.log('Hi');
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  const handleBookOrder = () => {
    navigation.navigate('Success');
    handleCloseModal();
  };

  const styles = React.useMemo(() => createStyles(theme), [theme]);
  return (
    <SafeAreaView style={styles.container}>
      <TopBar goBack={goBack} />
      <OrderList orders={orders} />
      <CheckoutBar total={total} checkout={handleCheckout} />
      <CheckoutModal open={isModalVisible} onClose={handleCloseModal} bookOrder={handleBookOrder} />
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
