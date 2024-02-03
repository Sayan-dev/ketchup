import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useTheme } from '@react-navigation/native';
import { ExtendedTheme } from '../../../types';

const LikeButton = () => {
  const theme = useTheme();

  const styles = createStyles(theme);
  return (
    <View style={styles.container}>
      <Text style={styles.body}>Like</Text>
    </View>
  );
};

export default LikeButton;

const createStyles = (theme: ExtendedTheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    body: {
      fontSize: 16,
      color: theme.colors.text,
      ...theme.fonts.medium,
    },
    label: {
      fontSize: 20,
      color: theme.colors.text,
      ...theme.fonts.medium,
      paddingVertical: 2,
      borderBottomColor: theme.colors.primary,
      borderBottomWidth: 2,
      alignSelf: 'flex-start',
    },
    info: {
      paddingVertical: 18,
    },
  });
