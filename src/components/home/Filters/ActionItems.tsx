import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useTheme } from '@react-navigation/native';
import { ExtendedTheme } from '../../../types';

const ActionItems = () => {
  const theme = useTheme();

  const styles = createStyles(theme);
  return (
    <View style={styles.container}>
      <View style={styles.price}>
        <Text style={styles.body}>$</Text>
        <Text style={styles.body}>2000</Text>
      </View>
      <Text style={[styles.body, styles.add]}>+</Text>
    </View>
  );
};

export default ActionItems;

const createStyles = (theme: ExtendedTheme) =>
  StyleSheet.create({
    container: {
      width: '100%',
      flexDirection: 'row',
      paddingVertical: 10,
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    price: {
      flexDirection: 'row',
    },
    body: {
      fontSize: 14,

      color: theme.colors.secondary,
      ...theme.fonts.medium,
    },
    add: {
      backgroundColor: theme.colors.lightBackground,
      color: theme.colors.primary,
      justifyContent: 'center',
      lineHeight: 34,
      alignItems: 'center',
      textAlign: 'center',
      height: 24,
      width: 24,
      fontSize: 30,

      borderRadius: 24,
    },
  });
