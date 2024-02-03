import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useTheme } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import { ExtendedTheme } from '../../../types';
import ItemCard from '../../common/Card/ItemCard';
import ActionItems from './ActionItems';

const products = [
  {
    name: 'Honey lime combo',
    price: 200000,
    like: false,
  },
  {
    name: 'Honey lime combo',
    price: 200000,
    like: false,
  },
  {
    name: 'Honey lime combo',
    price: 200000,
    like: false,
  },
  {
    name: 'Honey lime combo',
    price: 200000,
    like: false,
  },
];

const FilterComponent = () => {
  const theme = useTheme();

  const styles = createStyles(theme);
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.label}>Hottest</Text>
        <LinearGradient
          style={styles.productContainer}
          colors={[theme.colors.background, '#E5E5E5', theme.colors.background]}
        >
          <ScrollView horizontal style={styles.products}>
            {products.map(product => (
              <ItemCard label={product.name} ActionItems={ActionItems} />
            ))}
          </ScrollView>
        </LinearGradient>
      </View>
    </SafeAreaView>
  );
};

export default FilterComponent;

const createStyles = (theme: ExtendedTheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      paddingVertical: 20,
    },
    body: {
      fontSize: 16,
      color: theme.colors.text,
      ...theme.fonts.medium,
    },
    label: {
      fontSize: 24,
      color: theme.colors.text,
      ...theme.fonts.medium,
      paddingVertical: 2,
    },
    productContainer: {
      paddingVertical: 30,
    },
    products: {},
  });
