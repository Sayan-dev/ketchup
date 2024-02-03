import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useTheme } from '@react-navigation/native';
import { ExtendedTheme } from '../../../types';

const Suggestions = () => {
  const theme = useTheme();

  const styles = createStyles(theme);
  return (
    <View style={styles.container}>
      <Text style={styles.body}>
        If you are looking for a new fruit salad to eat today, quinoa is the perfect brunch for you.
        make
      </Text>
    </View>
  );
};

export default Suggestions;

const createStyles = (theme: ExtendedTheme) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      paddingVertical: 24,
    },
    body: {
      fontSize: 14,
      color: theme.colors.text,
      ...theme.fonts.regular,
    },
  });
