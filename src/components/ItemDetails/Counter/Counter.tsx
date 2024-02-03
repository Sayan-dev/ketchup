import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useTheme } from '@react-navigation/native';
import { ExtendedTheme } from '../../../types';

const Counter = () => {
  const theme = useTheme();

  const styles = createStyles(theme);
  return (
    <View style={styles.container}>
      <Text style={[styles.body, styles.sub]}>-</Text>
      <Text style={[styles.body, styles.count]}>1</Text>
      <Text style={[styles.body, styles.add]}>+</Text>
    </View>
  );
};

export default Counter;

const createStyles = (theme: ExtendedTheme) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
    },
    body: {
      fontSize: 24,
      height: 32,
      width: 32,
      justifyContent: 'center',
      alignItems: 'center',
      color: theme.colors.text,

      ...theme.fonts.medium,
    },
    sub: {
      borderRadius: 32,
      borderColor: theme.colors.text,
      borderWidth: 1,
      textAlign: 'center',
    },
    count: {
      marginHorizontal: 20,
      textAlign: 'center',
    },
    add: {
      backgroundColor: theme.colors.lightBackground,
      color: theme.colors.primary,
      textAlign: 'center',
      borderRadius: 32,
      borderColor: theme.colors.primary,
      borderWidth: 1,
    },
  });
