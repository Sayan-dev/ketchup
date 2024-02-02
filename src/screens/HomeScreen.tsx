import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { CompositeScreenProps, useTheme } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { MaterialTopTabScreenProps } from '@react-navigation/material-top-tabs';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { ExtendedTheme } from '../types';
import Typography from '../components/common/Typography';
import Button from '../components/common/Button';
import { TabParamList } from '../HomeTabNavigator';
import { RootStackParamList } from '../RootNavigator';

type HomeScreenProps = CompositeScreenProps<
  MaterialTopTabScreenProps<TabParamList, 'Home'>,
  NativeStackScreenProps<RootStackParamList>
>;
const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const theme = useTheme();
  const logout = async () => {
    await auth().signOut();
    navigation.getParent()?.reset({ index: 1, routes: [{ name: 'Login' }] });
  };
  const styles = React.useMemo(() => createStyles(theme), [theme]);
  return (
    <View style={styles.container}>
      <Typography style={styles.text}>
        <Text style={styles.what}>Add</Text> some stuff from your fridge
      </Typography>
      <Button onPress={logout}>Log out</Button>
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
