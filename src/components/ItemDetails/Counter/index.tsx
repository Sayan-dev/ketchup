import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useTheme } from '@react-navigation/native';
import { ExtendedTheme } from '../../../types';
import Counter from './Counter';
import Price from './Price';

const CounterComponent = () => {
  const theme = useTheme();

  const styles = createStyles(theme);
  return (
    <View style={styles.container}>
      <Counter />
      <Price />
    </View>
  );
};

export default CounterComponent;

const createStyles = (theme: ExtendedTheme) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 24,
      borderBottomWidth: 2,
      borderBottomColor: theme.colors.secondary,
    },
  });
