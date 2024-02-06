import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useTheme } from '@react-navigation/native';
import { ExtendedTheme } from '../../../types';
import Preview from '../../common/Images/PreviewImage';
import Total from './Total';
import Button from '../../common/Button';

const CheckoutBar = () => {
  const theme = useTheme();

  const styles = createStyles(theme);
  return (
    <View style={styles.container}>
      <Total />
      <Button style={{ flex: 2, width: '100%', paddingVertical: 14, justifyContent: 'center' }}>
        Checkout
      </Button>
    </View>
  );
};

export default CheckoutBar;

const createStyles = (theme: ExtendedTheme) =>
  StyleSheet.create({
    container: {
      position: 'absolute',
      bottom: 0,
      paddingHorizontal: 24,
      paddingVertical: 20,
      flexDirection: 'row',
      backgroundColor: theme.colors.background,
      elevation: 2,
      borderTopColor: theme.colors.border,
      borderTopWidth: 1,
    },
    name: {
      ...theme.fonts.medium,
      fontSize: 16,
    },
  });