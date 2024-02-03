import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useTheme } from '@react-navigation/native';

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
import Storage from '../utils/storage';
import { RootStackParamList } from '../RootNavigator';
import RootStackNavigationHeader from '../components/common/Header/StackNavigation/RootStackNavigationHeader';
import { ExtendedTheme } from '../types';
import Preview from '../components/common/Images/PreviewImage';
import BaseLayout from '../components/layouts/BaseLayout';
import Counter from '../components/ItemDetails/Counter';
import InfoComponent from '../components/ItemDetails/Info';
import Suggestions from '../components/ItemDetails/Suggestion';
import ActionArea from '../components/ItemDetails/ActionArea';

type ItemDetailsProps = NativeStackScreenProps<RootStackParamList, 'ItemDetails'>;

const ItemDetailsScreen: React.FC<ItemDetailsProps> = ({ navigation }) => {
  const theme = useTheme();

  const styles = React.useMemo(() => createStyles(theme), [theme]);

  return (
    <BaseLayout backgroundColor={theme.colors.primary}>
      <View style={styles.heading}>
        <RootStackNavigationHeader goBack={navigation.goBack} />
      </View>
      <View style={styles.subContainer}>
        <View style={styles.preview}>
          <Preview />
        </View>
        <View style={styles.detailing}>
          <Text style={styles.label}>Quinoa Fruit Salad</Text>
          <Counter />
          <InfoComponent />
          <Suggestions />
          <ActionArea />
        </View>
      </View>
    </BaseLayout>
  );
};

export default ItemDetailsScreen;

const createStyles = (theme: ExtendedTheme) =>
  StyleSheet.create({
    container: {
      backgroundColor: theme.colors.primary,
    },
    heading: {},

    subContainer: {
      flex: 1,

      backgroundColor: theme.colors.primary,
    },
    preview: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    detailing: {
      flex: 2,
      paddingTop: heightPercentageToDP(3),
      alignItems: 'stretch',
      paddingHorizontal: widthPercentageToDP(5),
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      backgroundColor: theme.colors.background,
    },
    label: {
      fontSize: 32,
      color: theme.colors.text,
      ...theme.fonts.medium,
    },
  });
