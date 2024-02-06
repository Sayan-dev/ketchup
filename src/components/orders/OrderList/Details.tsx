import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useTheme } from '@react-navigation/native';
import { ExtendedTheme } from '../../../types';
import Preview from '../../common/Images/PreviewImage';

const Details = () => {
  const theme = useTheme();

  const styles = createStyles(theme);
  return (
    <View style={styles.container}>
      <Text style={styles.name}>Quinoa fruit salad</Text>
      <Text>2 packs</Text>
    </View>
  );
};

export default Details;

const createStyles = (theme: ExtendedTheme) =>
  StyleSheet.create({
    container: {
      justifyContent: 'center',
    },
    name: {
      ...theme.fonts.medium,
      fontSize: 16,
    },
  });
