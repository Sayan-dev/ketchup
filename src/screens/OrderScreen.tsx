import { StyleSheet, Text, TextInput, View } from 'react-native';
import React, { useState } from 'react';
import { CompositeScreenProps, useTheme } from '@react-navigation/native';

import { MaterialTopTabScreenProps } from '@react-navigation/material-top-tabs';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { ExtendedTheme } from '../types';
import { RootStackParamList } from '../RootNavigator';
import TopBar from '../components/orders/Topbar';
import OrderList from '../components/orders/OrderList';
import CheckoutBar from '../components/orders/Checkout';
import useOrderStore from '../store/order/selector';
import CheckoutModal from '../components/orders/CheckoutModal';
import { useCreateOrder } from '../api/queries/order.queries';
import { CheckoutDetails } from '../types/entities';

type OrderScreenProps = NativeStackScreenProps<RootStackParamList, 'Orders'>;

const schema = yup.object().shape({
  address: yup.string().max(200).required('Required'),
  contact: yup.string().max(11).required('Required'),
});

const OrderScreen: React.FC<OrderScreenProps> = ({ navigation }: OrderScreenProps) => {
  const theme = useTheme();
  const [orders, total] = useOrderStore();
  const [isModalVisible, setIsModalVisible] = useState(false);
  console.log('hello');

  const createOrder = useCreateOrder();
  const goBack = async () => {
    navigation.goBack();
  };

  const form = useForm<CheckoutDetails>({
    resolver: yupResolver(schema),
    defaultValues: {
      address: '',
      contact: '',
    },
  });

  const handleCheckout = () => {
    console.log('Hi');
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  const handleBookOrder = form.handleSubmit(async ({ address, contact }) => {
    console.log('hello');

    const orderList = Object.keys(orders).map(id => ({
      productId: id,
      quantity: orders[id].quantity,
    }));

    createOrder.mutate(
      {
        orderItems: orderList,
        total,
        address,
        contact,
        mode: 'COD',
      },
      {
        onSuccess: async () => {
          handleCloseModal();
          navigation.navigate('Success');
        },
        onError: err => {
          console.log(err, 'Error');
        },
      },
    );
  });

  const styles = React.useMemo(() => createStyles(theme), [theme]);
  return (
    <SafeAreaView style={styles.container}>
      <TopBar goBack={goBack} />
      <OrderList orders={orders} />
      <CheckoutBar total={total} checkout={handleCheckout} />
      <CheckoutModal
        form={form}
        open={isModalVisible}
        onClose={handleCloseModal}
        onSubmit={handleBookOrder}
      />
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
