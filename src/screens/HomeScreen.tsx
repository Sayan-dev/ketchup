import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useTheme } from '@react-navigation/native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import type { ExtendedTheme } from '../types';

const HomeScreen = () => {
  const theme = useTheme();
  const styles = React.useMemo(() => createStyles(theme), [theme]);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        <Text style={styles.what}>Add</Text> some stuff from your fridge
      </Text>
    </View>
  );
};

export default HomeScreen;

const createStyles = (theme: ExtendedTheme) =>
  StyleSheet.create({
    headerDescription: { fontSize: 20, color: theme.colors.primary },
    what: { ...theme.fonts.bold, fontWeight: '800' },
    buttonText: {
      color: theme.colors.secondary,
    },
    button: {
      backgroundColor: theme.colors.primary,
      width: '80%',
      marginTop: wp(120),
      borderRadius: wp(10),
      color: theme.colors.secondary,
      justifyContent: 'center',
      alignItems: 'center',
      display: 'flex',
      height: wp(15),
    },
    text: {
      paddingTop: wp(10),
      color: theme.colors.primary,
      fontSize: 35,
    },
    container: {
      flexGrow: 1,
      alignItems: 'center',
      paddingBottom: wp(25),
      paddingHorizontal: wp(5),
    },
    logo: {
      width: wp(60),
      height: wp(60),
      resizeMode: 'contain',
    },
    logoText: {
      width: wp(60),
      resizeMode: 'contain',
    },
  });
