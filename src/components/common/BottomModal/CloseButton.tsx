import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { useTheme } from '@react-navigation/native';

import { TouchableOpacity } from 'react-native-gesture-handler';
import Typography from '../Typography';
import { ExtendedTheme } from '../../../types';

interface Props {
  onClose: () => void;
}

const CloseButton = ({ onClose }: Props) => {
  const theme = useTheme();
  const styles = React.useMemo(() => createStyles(theme), [theme]);

  return (
    <TouchableOpacity style={styles.container}>
      <Typography onPress={onClose} style={styles.close}>
        X
      </Typography>
    </TouchableOpacity>
  );
};

export default CloseButton;

const createStyles = (theme: ExtendedTheme) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 16,
    },
    close: {
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
      width: 48,
      height: 48,
      borderRadius: 48,
      backgroundColor: theme.colors.background,
    },
  });
