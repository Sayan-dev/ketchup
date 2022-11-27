import { Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useTheme } from '@react-navigation/native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Button from '../common/Button';
import OnBoarding2 from '../../assets/images/onboarding2.png';
import type { ExtendedTheme } from '../../types';

interface onboardProps {
  handleGettingStarted?: () => void;

  key: string;
}

const Onboarding1 = ({ key, handleGettingStarted }: onboardProps) => {
  const theme = useTheme();

  const styles = React.useMemo(() => createStyles(theme), [theme]);

  return (
    <View key={key} style={styles.container}>
      <Image resizeMode="contain" style={styles.onBoardingImage} source={OnBoarding2} />
      <View style={styles.onBoardingData}>
        <Text style={styles.onBoardingTextHeader}>Welcome to Ketchup</Text>
        <Text style={styles.onBoardingTextFooter}>
          Generate a new recipe from what you have at home
        </Text>
      </View>
      <View>
        <Text>0</Text>
        <Text>1</Text>
        <Text>2</Text>
      </View>
      <View style={styles.actionArea}>
        <Button style={styles.getStartedButton} onPress={handleGettingStarted}>
          Get Started
        </Button>
      </View>
    </View>
  );
};

export default Onboarding1;

const createStyles = (theme: ExtendedTheme) =>
  StyleSheet.create({
    pagerView: {
      flex: 1,
    },
    getStartedButton: {
      width: '100%',
      justifyContent: 'center',
      paddingVertical: theme.spacing.md,
      borderRadius: 40,
    },
    buttonText: {
      color: theme.colors.secondary,
    },
    skipButton: {
      backgroundColor: theme.colors.background,
    },

    actionArea: {
      borderTopWidth: 0.5,
      paddingVertical: wp(10),
      borderColor: theme.colors.lightBackground,
      width: '80%',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    onBoardingData: {
      marginTop: wp(5),
      paddingHorizontal: wp(10),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    },
    onBoardingTextHeader: {
      fontSize: 20,
      ...theme.fonts.bold,
      fontWeight: '800',
      color: theme.colors.text,
      textAlign: 'center',
    },
    onBoardingTextFooter: {
      marginTop: wp(5),
      fontSize: 14,
      lineHeight: 25,
      color: theme.colors.accent,
      textAlign: 'center',
    },
    onBoardingImage: {
      height: wp(70),
      width: wp(100),
    },
    container: {
      flexGrow: 1,
      alignItems: 'center',
      justifyContent: 'space-evenly',
      paddingTop: wp(30),
    },
  });
