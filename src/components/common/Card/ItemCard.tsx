import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useTheme } from '@react-navigation/native';
import { ExtendedTheme } from '../../../types';
import Preview from '../Images/PreviewImage';

type Props = {
  label: string;
  ActionItems: React.FC;
};

const ItemCard = ({ label, ActionItems }: Props) => {
  const theme = useTheme();

  const styles = createStyles(theme);
  return (
    <View style={styles.container}>
      <View style={styles.logo}>
        <Preview width={80} height={80} />
      </View>
      <View style={styles.content}>
        <Text style={styles.body}>{label}</Text>
        {ActionItems && <ActionItems />}
      </View>
    </View>
  );
};

export default ItemCard;

const createStyles = (theme: ExtendedTheme) =>
  StyleSheet.create({
    container: {
      width: 160,
      height: 185,
      backgroundColor: theme.colors.background,
      paddingHorizontal: 20,
      borderRadius: 20,
      marginRight: 10,
    },
    body: {
      fontSize: 16,
      color: theme.colors.text,
      ...theme.fonts.medium,
    },
    logo: {
      justifyContent: 'flex-end',
      flex: 3,
      alignItems: 'center',
    },
    content: {
      flex: 2,
      paddingTop: 5,
      alignItems: 'center',
    },
  });
