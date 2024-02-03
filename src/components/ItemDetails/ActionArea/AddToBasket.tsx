import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useTheme } from '@react-navigation/native';
import { ExtendedTheme } from '../../../types';
import Button from '../../common/Button';

const AddToBasketButton = () => {
  const theme = useTheme();

  const styles = createStyles(theme);
  return (
    <View style={styles.container}>
      <Button style={styles.addButton}>Add to basket</Button>
    </View>
  );
};

export default AddToBasketButton;

const createStyles = (theme: ExtendedTheme) =>
  StyleSheet.create({
    container: {
      flex: 2,
    },
    body: {
      fontSize: 16,
      color: theme.colors.text,
      ...theme.fonts.medium,
    },
    addButton: {
      width: '100%',
      justifyContent: 'center',
      paddingVertical: theme.spacing.md,
      borderRadius: 10,
    },
    info: {
      paddingVertical: 18,
    },
  });
