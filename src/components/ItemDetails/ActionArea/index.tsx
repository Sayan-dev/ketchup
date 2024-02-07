import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useTheme } from '@react-navigation/native';
import { ExtendedTheme } from '../../../types';
import LikeButton from './Like';
import AddToBasketButton from './AddToBasket';

interface Props {
  basketAction: () => void;
}

const ActionArea = ({ basketAction }: Props) => {
  const theme = useTheme();

  const styles = createStyles(theme);
  return (
    <View style={styles.container}>
      <LikeButton />
      <AddToBasketButton onPress={basketAction} />
    </View>
  );
};

export default ActionArea;

const createStyles = (theme: ExtendedTheme) =>
  StyleSheet.create({
    container: {
      paddingTop: 10,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
  });
