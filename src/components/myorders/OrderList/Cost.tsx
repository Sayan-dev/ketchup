import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useTheme } from '@react-navigation/native';
import { ExtendedTheme } from '../../../types';
import { Order, PreviousOrder } from '../../../types/entities';

interface Props {
  data: PreviousOrder;
}

const Cost = ({ data }: Props) => {
  const theme = useTheme();

  const styles = createStyles(theme);
  return (
    <View style={styles.container}>
      <Text style={styles.cost}>${data.total}</Text>
    </View>
  );
};

export default Cost;

const createStyles = (theme: ExtendedTheme) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    cost: {
      ...theme.fonts.medium,
      fontSize: 16,
    },
  });