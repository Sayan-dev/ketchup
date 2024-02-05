import { StyleSheet, Text, View } from 'react-native';
import { useTheme } from '@react-navigation/native';

import React from 'react';
import { ExtendedTheme } from '../../../types';

const GreetUser = () => {
  const theme = useTheme();

  const styles = createStyles(theme);
  return <Text style={styles.text}>Hello Tony,</Text>;
};

export default GreetUser;

const createStyles = (theme: ExtendedTheme) =>
  StyleSheet.create({
    text: {
      color: theme.colors.text,
      ...theme.fonts.regular,
      fontSize: 20,
    },
  });
