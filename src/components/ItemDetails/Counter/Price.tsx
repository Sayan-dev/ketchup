import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useTheme } from '@react-navigation/native';
import { ExtendedTheme } from '../../../types';

const Price = () => {
  const theme = useTheme();

  const styles = createStyles(theme);
  return (
    <View style={styles.container}>
      <Text style={styles.body}>$</Text>

      <Text style={styles.body}>2000</Text>
    </View>
  );
};

export default Price;

const createStyles = (theme: ExtendedTheme) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
    },
    body: {
      ...theme.fonts.medium,
      fontSize: 24,
      color: theme.colors.text,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
