import { StyleSheet } from 'react-native';
import React from 'react';
import { CompositeScreenProps, useTheme } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { DrawerScreenProps } from '@react-navigation/drawer';
import auth from '@react-native-firebase/auth';
import type { ExtendedTheme } from '../types';
import { RootStackParamList } from '../RootNavigator';
import RecommendedComponent from '../components/home/Recommended';
import FilterComponent from '../components/home/Filters';
import useProductStore from '../store/product/selector';
import { Product } from '../types/entities';
import Heading from '../components/home/Heading';
import TopBar from '../components/home/Topbar';
import Search from '../components/home/Search';
import { useProducts } from '../api/queries/product.queries';
import { DrawerParamList } from '../HomeDrawerNavigator';
import Loading from '../components/common/Loader/LoadingModal';
import { useUser } from '../store/selector';
import useInitializeFirebase from '../hooks/useInitializeFirebase';

type HomeScreenProps = CompositeScreenProps<
  DrawerScreenProps<DrawerParamList, 'Home'>,
  NativeStackScreenProps<RootStackParamList>
>;

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const [, selectProduct] = useProductStore();

  const products = useProducts();
  const theme = useTheme();
  const [user] = useUser();
  const selectItem = async (product: Product) => {
    selectProduct({ ...product, quantity: 1 });
    navigation.navigate('ItemDetails');
  };

  const openDrawer = () => {
    navigation.openDrawer();
  };

  const goToBasket = () => {
    navigation.navigate('Orders');
  };
  const styles = React.useMemo(() => createStyles(theme), [theme]);
  // auth()
  //   .currentUser?.getIdToken()
  //   .then(res => {
  //     console.log(res);
  //   });
  return (
    <SafeAreaView style={styles.container}>
      <Loading
        loadingText="Fetching all products. It might delay due to server restart. Please be patient"
        open={products.isLoading}
      />
      <TopBar openDrawer={openDrawer} goToBasket={goToBasket} />
      <ScrollView style={styles.content}>
        <Heading user={user} />
        {/* <Search /> */}
        <RecommendedComponent selectItem={selectItem} products={products.data || []} />
        <FilterComponent selectItem={selectItem} products={products.data || []} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const createStyles = (theme: ExtendedTheme) =>
  StyleSheet.create({
    container: {
      flexGrow: 1,
    },
    headerDescription: { fontSize: 20, color: theme.colors.primary },
    content: {
      paddingLeft: 21,
      paddingRight: 24,
    },
  });
