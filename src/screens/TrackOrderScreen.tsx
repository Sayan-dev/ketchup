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
import Typography from '../components/common/Typography';

type TrackOrderScreenProps = NativeStackScreenProps<RootStackParamList, 'Track'>;

const TrackOrderScreen: React.FC<TrackOrderScreenProps> = ({
  navigation,
}: TrackOrderScreenProps) => {
  const theme = useTheme();
  const [orders, total] = useOrderStore();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const styles = React.useMemo(() => createStyles(theme), [theme]);
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Typography>Track Order</Typography>
      </View>
    </SafeAreaView>
  );
};

export default TrackOrderScreen;

const createStyles = (theme: ExtendedTheme) =>
  StyleSheet.create({
    container: {
      flexGrow: 1,
    },
  });
