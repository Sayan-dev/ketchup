import { Image, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useTheme } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { ExtendedTheme } from '../../../types';

import LeftDrawerIcon from '../../../assets/images/hamburger.png';
import BasketIcon from '../../../assets/images/fa_shopping-basket.png';
import Typography from '../../common/Typography';

interface Props {
  goToBasket: () => void;
  openDrawer: () => void;
}

const TopBar = ({ openDrawer, goToBasket }: Props) => {
  const theme = useTheme();

  const styles = createStyles(theme);
  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={openDrawer}>
        <Image source={LeftDrawerIcon} />
      </TouchableOpacity>
      <TouchableOpacity onPress={goToBasket} style={styles.basketContainer}>
        {/* <Image source={BasketIcon} style={styles.basket} /> */}
        <Icon name="basket" size={30} color={theme.colors.primary} />
        <Typography fontSize={10}>My Basket</Typography>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default TopBar;

const createStyles = (theme: ExtendedTheme) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',

      justifyContent: 'space-between',
      paddingLeft: 21,
      paddingRight: 24,

      backgroundColor: theme.colors.background,
      paddingVertical: 20,
    },

    basketContainer: {
      alignItems: 'center',
    },
    body: {
      fontSize: 16,
      color: theme.colors.text,
      ...theme.fonts.medium,
    },
    label: {
      fontSize: 24,
      color: theme.colors.text,
      ...theme.fonts.medium,
      paddingVertical: 2,
    },
    productContainer: {
      paddingVertical: 30,
    },
    products: {},
  });
