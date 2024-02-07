import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useTheme } from '@react-navigation/native';

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
import { RootStackParamList } from '../RootNavigator';
import RootStackNavigationHeader from '../components/common/Header/StackNavigation/RootStackNavigationHeader';
import { ExtendedTheme } from '../types';
import Preview from '../components/common/Images/PreviewImage';
import BaseLayout from '../components/layouts/BaseLayout';
import Counter from '../components/ItemDetails/Counter';
import InfoComponent from '../components/ItemDetails/Info';
import Suggestions from '../components/ItemDetails/Suggestion';
import ActionArea from '../components/ItemDetails/ActionArea';
import useProductStore from '../store/product/selector';
import useOrderStore from '../store/order/selector';

type ItemDetailsProps = NativeStackScreenProps<RootStackParamList, 'ItemDetails'>;

const ItemDetailsScreen: React.FC<ItemDetailsProps> = ({ navigation }) => {
  const theme = useTheme();
  const [count, setCount] = useState(0);
  const [selectedItem, , , addProduct, subProduct] = useProductStore();
  const [orders, , createOrder, addOrder, subOrder] = useOrderStore();

  const styles = React.useMemo(() => createStyles(theme), [theme]);

  useEffect(() => {
    if (selectedItem) {
      if (orders[selectedItem._id]) setCount(orders[selectedItem._id].quantity);
      else setCount(selectedItem.quantity || 0);
    } else setCount(0);
  }, [selectedItem?.quantity, selectedItem && orders[selectedItem._id]?.quantity]);

  const navigateToOrderScreen = () => {
    navigation.navigate('Orders');
  };

  const handleCreateOrder = () => {
    if (selectedItem) {
      if (orders[selectedItem._id]) return;
      createOrder(selectedItem);
    }
  };

  const handleAddOrder = () => {
    if (selectedItem) {
      if (orders[selectedItem._id]) addOrder(selectedItem._id);
      else {
        addProduct();
      }
    }
  };
  const handleSubOrder = () => {
    if (selectedItem) {
      if (orders[selectedItem._id]) subOrder(selectedItem._id);
      else {
        subProduct();
      }
    }
  };

  const handleAddToBasket = () => {
    handleCreateOrder();
    navigateToOrderScreen();
  };

  return (
    <BaseLayout backgroundColor={theme.colors.primary}>
      <View style={styles.heading}>
        <RootStackNavigationHeader goBack={navigation.goBack} />
      </View>
      <View style={styles.subContainer}>
        <View style={styles.preview}>
          <Preview />
        </View>
        <View style={styles.detailing}>
          <Text style={styles.label}>{selectedItem?.name}</Text>
          <Counter
            data={selectedItem && selectedItem}
            add={handleAddOrder}
            sub={handleSubOrder}
            count={count}
          />
          <InfoComponent />
          <Suggestions />
          <ActionArea basketAction={handleAddToBasket} />
        </View>
      </View>
    </BaseLayout>
  );
};

export default ItemDetailsScreen;

const createStyles = (theme: ExtendedTheme) =>
  StyleSheet.create({
    container: {
      backgroundColor: theme.colors.primary,
    },
    heading: {},

    subContainer: {
      flex: 1,

      backgroundColor: theme.colors.primary,
    },
    preview: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    detailing: {
      flex: 2,
      paddingTop: heightPercentageToDP(3),
      alignItems: 'stretch',
      paddingHorizontal: widthPercentageToDP(5),
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      backgroundColor: theme.colors.background,
    },
    label: {
      fontSize: 32,
      color: theme.colors.text,
      ...theme.fonts.medium,
    },
  });
