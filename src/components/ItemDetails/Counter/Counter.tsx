import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useTheme } from '@react-navigation/native';
import { ExtendedTheme } from '../../../types';

interface Props {
  add: () => void;
  sub: () => void;
  count: number;
}

const Counter = ({ add, sub, count }: Props) => {
  const theme = useTheme();

  const styles = createStyles(theme);
  return (
    <View style={styles.container}>
      <Text onPress={sub} style={[styles.body, styles.sub]}>
        -
      </Text>
      <Text style={[styles.body, styles.count]}>{count}</Text>
      <Text onPress={add} style={[styles.body, styles.add]}>
        +
      </Text>
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
