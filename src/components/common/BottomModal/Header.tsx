import * as React from 'react';
import {
  TouchableOpacityProps,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  View,
  Text,
} from 'react-native';
import { useTheme } from '@react-navigation/native';
import type { ExtendedTheme, FontSize } from '../../types';

const ModalHeader = ({ title }: { title: string }) => {
  const theme = useTheme();
  const styles = React.useMemo(() => createStyles(theme), [theme]);

  return (
    <View style={styles.header}>
      <Text style={styles.text}>{title}</Text>
    </View>
  );
};

export default ModalHeader;
const createStyles = (theme: ExtendedTheme) =>
  StyleSheet.create({
    header: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    text: {
      paddingTop: 10,
      textAlign: 'center',
      fontSize: 24,
    },
  });
