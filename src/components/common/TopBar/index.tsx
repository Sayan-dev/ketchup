import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useTheme } from '@react-navigation/native';
import Button from '../Button';
import type { ExtendedTheme } from '../../../types';
import Typography from '../Typography';

interface Props {
  goBack?: () => void;
  title: string;
  border?: number;
}
const Topbar = ({ goBack, title, border = 0 }: Props) => {
  const theme = useTheme();

  const styles = createStyles(theme);
  return (
    <View style={[styles.container, { borderBottomWidth: border }]}>
      <Button
        LeftIconName="keyboard-arrow-left"
        textColor="text"
        style={styles.backButton}
        iconSize={36}
        borderRadius={20}
        fontSize="medium"
        backgroundColor="background"
        onPress={goBack}
      >
        Go back
      </Button>
      <Typography style={styles.title} fontSize="h1" fontStyle="medium" color="background">
        {title}
      </Typography>
      <Typography />
    </View>
  );
};

export default Topbar;

const createStyles = (theme: ExtendedTheme) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: 30,
      backgroundColor: theme.colors.primary,
      borderBottomWidth: 2,
      borderBottomColor: theme.colors.secondary,
    },
    title: {
      marginLeft: 14,
    },
    backButton: {
      position: 'absolute',
      paddingLeft: 24,
      paddingRight: 6,
      paddingVertical: 6,
      left: 24,
    },
  });
