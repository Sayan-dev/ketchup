import { Image, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { CompositeScreenProps, useTheme } from '@react-navigation/native';

import { MaterialTopTabScreenProps } from '@react-navigation/material-top-tabs';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import { widthPercentageToDP } from 'react-native-responsive-screen';
import { ExtendedTheme } from '../types';
import { RootStackParamList } from '../RootNavigator';
import TopBar from '../components/orders/Topbar';
import OrderList from '../components/orders/OrderList';
import CheckoutBar from '../components/orders/Checkout';
import useOrderStore from '../store/order/selector';
import CheckoutModal from '../components/orders/CheckoutModal';
import Typography from '../components/common/Typography';
import TrackRow from '../components/track/TrackRow';

import progressSuccess from '../assets/images/progress_success.png';
import OrderStep1 from '../assets/images/order_step_1.png';
import OrderStep2 from '../assets/images/order_step_2.png';
import OrderStep3 from '../assets/images/order_step_3.png';
import Success from '../assets/images/BigSuccess.png';
import DottedBorder from '../components/track/DottedBorder';
import Topbar from '../components/track/Topbar';
import Map from '../assets/images/maps_preview.png';

type TrackOrderScreenProps = NativeStackScreenProps<RootStackParamList, 'Track'>;

const TrackOrderScreen: React.FC<TrackOrderScreenProps> = ({
  navigation,
}: TrackOrderScreenProps) => {
  const theme = useTheme();
  const [orders, total] = useOrderStore();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const handleGoBack = () => {
    navigation.popToTop();
  };
  const styles = React.useMemo(() => createStyles(theme), [theme]);
  return (
    <SafeAreaView style={styles.container}>
      <Topbar goBack={handleGoBack} />
      <View style={styles.order}>
        <TrackRow
          name="Order Taken"
          backgroundColor="#FFFAEB"
          image={OrderStep1}
          imageStyles={styles.orderStep1Image}
          imageBackgroundStyles={styles.orderstep1}
          progressImage={progressSuccess}
        />
        <DottedBorder />
        <TrackRow
          name="Order Is Being Prepared"
          backgroundColor="#F1EFF6"
          image={OrderStep2}
          progressImage={progressSuccess}
        />
        <DottedBorder />

        <TrackRow
          name="Order Is Being Delivered"
          description="Your delivery agent is coming"
          backgroundColor="#FEF0F0"
          image={OrderStep3}
          progressImage={progressSuccess}
        />
        <DottedBorder />

        <Image source={Map} />
        <DottedBorder />

        <TrackRow
          name="Order Received"
          backgroundColor="#F0FEF8"
          imageStyles={styles.orderReceived}
          imageBackgroundStyles={styles.orderReceivedBackground}
          image={Success}
          progressImage={progressSuccess}
        />
      </View>
    </SafeAreaView>
  );
};

export default TrackOrderScreen;

const createStyles = (theme: ExtendedTheme) =>
  StyleSheet.create({
    container: {
      flexGrow: 1,
      alignItems: 'center',
    },
    order: {
      width: widthPercentageToDP(100),

      paddingHorizontal: 24,
      paddingVertical: 40,
    },
    orderstep1: {
      width: 65,
      height: 64,
      paddingVertical: 10,
      paddingHorizontal: 8,
    },
    orderStep1Image: {
      width: 48,
      heght: 43,
    },
    orderReceived: {
      width: 40,
      heght: 40,
    },
    orderReceivedBackground: {
      width: 65,
      height: 64,
      paddingVertical: 12,
      paddingHorizontal: 12,
    },
  });
