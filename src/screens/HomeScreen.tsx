import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { CompositeScreenProps, useTheme } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { MaterialTopTabScreenProps } from '@react-navigation/material-top-tabs';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { ExtendedTheme } from '../types';
import Typography from '../components/common/Typography';
import Button from '../components/common/Button';
import { TabParamList } from '../HomeTabNavigator';
import { RootStackParamList } from '../RootNavigator';
import RecommendedComponent from '../components/home/Recommended';
import FilterComponent from '../components/home/Filters';
import useProductStore from '../store/product/selector';
import { Product } from '../types/entities';
import Heading from '../components/home/Heading';
import TopBar from '../components/home/Topbar';
import Search from '../components/home/Search';

type HomeScreenProps = CompositeScreenProps<
  MaterialTopTabScreenProps<TabParamList, 'Home'>,
  NativeStackScreenProps<RootStackParamList>
>;
const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const [, selectProduct] = useProductStore();
  const theme = useTheme();
  const selectItem = async (product: Product) => {
    // await auth().signOut();
    // navigation.getParent()?.reset({ index: 1, routes: [{ name: 'Login' }] });
    selectProduct(product);
    navigation.navigate('ItemDetails');
  };
  const styles = React.useMemo(() => createStyles(theme), [theme]);
  return (
    <SafeAreaView style={styles.container}>
      <TopBar />
      <ScrollView style={styles.content}>
        <Heading />
        <Search />
        <RecommendedComponent selectItem={selectItem} />
        <FilterComponent selectItem={selectItem} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const createStyles = (theme: ExtendedTheme) =>
  StyleSheet.create({
    container: {
      flexGrow: 1,
      paddingLeft: 24,
    },
    headerDescription: { fontSize: 20, color: theme.colors.primary },
    content: {
      marginTop: 70,
    },
  });
