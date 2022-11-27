import { Image, StyleSheet, View } from 'react-native';
import React from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useTheme } from '@react-navigation/native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { RootStackParamList } from '../RootNavigator';
import ScrollLayout from '../components/layouts/ScrollLayout';
import type { ExtendedTheme } from '../types';
import Logo from '../assets/images/logo.png';

type SplashScreenProps = NativeStackScreenProps<RootStackParamList, 'Splash'>;

const SplashScreen: React.FC<SplashScreenProps> = ({ navigation }) => {
  const theme = useTheme();
  const styles = React.useMemo(() => createStyles(theme), [theme]);

  const bootstrap = async () => {
    navigation.reset({ index: 1, routes: [{ name: 'Start' }] });
  };

  React.useEffect(() => {
    setTimeout(() => {
      bootstrap();
    }, 2000);
  }, []);
  return (
    <ScrollLayout edges={['top', 'left', 'right']}>
      <View style={styles.container}>
        <Image source={Logo} style={styles.logo} />
      </View>
    </ScrollLayout>
  );
};

export default SplashScreen;

const createStyles = (theme: ExtendedTheme) =>
  StyleSheet.create({
    container: {
      flexGrow: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: theme.colors.background,
    },
    logo: {
      width: wp(50),
      height: wp(50),
      resizeMode: 'contain',
    },
  });
