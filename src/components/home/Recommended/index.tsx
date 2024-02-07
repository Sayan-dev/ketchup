import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useTheme } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import { ExtendedTheme } from '../../../types';
import ItemCard from '../../common/Card/ItemCard';
import ActionItems from './ActionItems';
import { Product } from '../../../types/entities';

const products = [
  {
    _id: '1',
    name: 'Quinoa fruit salad',
    ingredients: 'Red Quinoa, Lime, Honey, Blueberries, Strawberries, Mango, Fresh mint.',
    suggestions:
      'If you are looking for a new fruit salad to eat today, quinoa is the perfect brunch for you.',
    price: 3000,
    like: false,
  },
  {
    _id: '2',
    name: 'Honey lime combo',
    ingredients: 'Red Quinoa, Lime, Honey, Blueberries, Strawberries, Mango, Fresh mint.',
    suggestions:
      'If you are looking for a new fruit salad to eat today, quinoa is the perfect brunch for you.',
    price: 2000,
    like: false,
  },
  {
    _id: '3',
    name: 'Mern lime combo',
    ingredients: 'Red Quinoa, Lime, Honey, Blueberries, Strawberries, Mango, Fresh mint.',
    suggestions:
      'If you are looking for a new fruit salad to eat today, quinoa is the perfect brunch for you.',
    price: 2000,
    like: false,
  },
  {
    _id: '4',
    name: 'Honey lime combo',
    ingredients: 'Red Quinoa, Lime, Honey, Blueberries, Strawberries, Mango, Fresh mint.',
    suggestions:
      'If you are looking for a new fruit salad to eat today, quinoa is the perfect brunch for you.',
    price: 2000,
    like: false,
  },
];

type Props = {
  selectItem: (product: Product) => void;
};

const RecommendedComponent = ({ selectItem }: Props) => {
  const theme = useTheme();

  const styles = createStyles(theme);
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.label}>Recommended Combo</Text>
        <LinearGradient
          style={styles.productContainer}
          colors={[theme.colors.background, '#E5E5E5', theme.colors.background]}
        >
          <ScrollView horizontal style={styles.products}>
            {products.map(product => (
              <ItemCard
                data={product}
                ActionItems={<ActionItems itemDetails={product} selectItem={selectItem} />}
                options={{ image: { width: 80, height: 80 } }}
              />
            ))}
          </ScrollView>
        </LinearGradient>
      </View>
    </SafeAreaView>
  );
};

export default RecommendedComponent;

const createStyles = (theme: ExtendedTheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: 20,
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
