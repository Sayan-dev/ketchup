import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useTheme } from '@react-navigation/native';
import { ExtendedTheme } from '../../../types';
import Preview from '../../common/Images/PreviewImage';
import Cost from './Cost';
import Details from './Details';

const Order = () => {
  const theme = useTheme();

  const styles = createStyles(theme);
  return (
    <View style={styles.container}>
      <View style={styles.info}>
        <View style={styles.image}>
          <Preview height={40} width={40} />
        </View>
        <Details />
      </View>

      <Cost />
    </View>
  );
};

export default Order;

const createStyles = (theme: ExtendedTheme) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 16,
      marginBottom: 30,
      borderBottomWidth: 1,
      paddingHorizontal: 24,
      borderBottomColor: theme.colors.border,
    },
    image: {
      height: 64,
      width: 65,
      borderRadius: 10,
      padding: 12,
      marginRight: 16,
    },
    info: {
      flexDirection: 'row',
    },
  });
