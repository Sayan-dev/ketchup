import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useTheme } from '@react-navigation/native';
import { RootStackParamList } from '../../../../RootNavigator';
import Button from '../../Button';
import { ExtendedTheme } from '../../../../types';

type StackHeaderProps = {
  goBack: () => void;
};

const RootStackNavigationHeader: React.FC<StackHeaderProps> = ({ goBack }) => {
  const theme = useTheme();
  const styles = React.useMemo(() => createStyles(theme), [theme]);

  return (
    <View style={styles.container}>
      <Button
        LeftIconName="keyboard-arrow-left"
        textColor="text"
        iconSize={30}
        backgroundColor="background"
        onPress={goBack}
      >
        Go Back
      </Button>
    </View>
  );
};

export default RootStackNavigationHeader;

const createStyles = (theme: ExtendedTheme) =>
  StyleSheet.create({
    container: {
      backgroundColor: theme.colors.primary,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexDirection: 'row',
    },
  });
