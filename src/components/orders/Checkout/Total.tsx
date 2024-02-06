import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useTheme } from '@react-navigation/native';
import { ExtendedTheme } from '../../../types';
import Preview from '../../common/Images/PreviewImage';

const Total = () => {
  const theme = useTheme();

  const styles = createStyles(theme);
  return (
    <View style={styles.container}>
      <Text style={styles.name}>Total</Text>
      <Text style={styles.cost}>$ 20000</Text>
    </View>
  );
};

export default Total;

const createStyles = (theme: ExtendedTheme) =>
  StyleSheet.create({
    container: {
      flex: 2,
    },
    name: {
      ...theme.fonts.medium,
      fontSize: 16,
    },
    cost: {
      ...theme.fonts.medium,
      fontSize: 24,
    },
  });