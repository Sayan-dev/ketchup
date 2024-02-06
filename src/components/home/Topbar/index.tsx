import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useTheme } from '@react-navigation/native';
import { ExtendedTheme } from '../../../types';

const TopBar = () => {
  const theme = useTheme();

  const styles = createStyles(theme);
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text>Topbar</Text>
      </View>
    </SafeAreaView>
  );
};

export default TopBar;

const createStyles = (theme: ExtendedTheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      zIndex: 1000,
      position: 'absolute',
      top: 0,
      width: '100%',
      backgroundColor: theme.colors.background,
      paddingVertical: 20,
    },
    body: {
      fontSize: 16,
      color: theme.colors.text,
      ...theme.fonts.medium,
    },
    label: {
      fontSize: 24,
      color: theme.colors.text,
      ...theme.fonts.medium,
      paddingVertical: 2,
    },
    productContainer: {
      paddingVertical: 30,
    },
    products: {},
  });
