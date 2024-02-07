import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useTheme } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ExtendedTheme } from '../../../types';
import Order from './Order';
import { Order as OrderEntity } from '../../../types/entities';

interface Props {
  orders: Record<string, OrderEntity>;
}

const OrderList = ({ orders }: Props) => {
  const theme = useTheme();

  const styles = createStyles(theme);
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {Object.values(orders).map(order => (
          <Order data={order} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default OrderList;

const createStyles = (theme: ExtendedTheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 24,
    },
  });
