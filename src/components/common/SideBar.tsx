import {
  MaterialTopTabBarProps,
  MaterialTopTabNavigationEventMap,
} from '@react-navigation/material-top-tabs';
import React from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  LayoutChangeEvent,
  Platform,
  Image,
} from 'react-native';
import { DrawerNavigationState, NavigationHelpers, useTheme } from '@react-navigation/native';

import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerNavigationEventMap,
  DrawerContentComponentProps,
} from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import auth from '@react-native-firebase/auth';
import type { ExtendedTheme } from '../../types';
import { DrawerParamList } from '../../HomeDrawerNavigator';

import Logo from '../../assets/images/logo.png';
import Typography from './Typography';
import Button from './Button';
import { remove } from '../../utils/storage';

export interface SideBarProps extends DrawerContentComponentProps {
  state: DrawerNavigationState<DrawerParamList>;
}

const SideBar: React.FC<SideBarProps> = ({ state, navigation, descriptors }) => {
  const theme = useTheme();
  const styles = React.useMemo(() => createStyles(theme), [theme]);

  const iconNameMap = {
    'Home': 'home',
    'MyOrders': 'food',
    'Favorites': 'cards-heart',
  };

  const handleLogout = async () => {
    await auth().signOut();
    navigation.reset({
      index: 1,
      routes: [{ name: 'Login' }],
    });
  };

  return (
    <View style={styles.main}>
      <View style={styles.image}>
        <Image source={Logo} style={styles.logo} />
      </View>
      <DrawerContentScrollView style={styles.drawerSection}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];

          const label =
            options.drawerLabel !== undefined
              ? options.drawerLabel
              : options.title !== undefined
              ? options.title
              : route.name;

          const isFocused = state.index === index;

          const onPress = () => {
            if (!isFocused) {
              // The `merge: true` option makes sure that the params inside the tab screen are preserved
              navigation.navigate({
                name: route.name,
                merge: true,
                params: undefined,
              });
            }
          };

          return (
            <TouchableOpacity
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              // accessibilityLabel={options.tabBarAccessibilityLabel}
              // testID={options.tabBarTestID}
              onPress={onPress}
              style={[styles.section, isFocused ? styles.sectionActive : null]}
              key={route.key}
            >
              <Icon
                name={iconNameMap[route.name]}
                color={isFocused ? theme.colors.primary : theme.colors.text}
                style={styles.icon}
                size={24}
              />
              <Typography style={[styles.text, isFocused ? styles.textActive : null]}>
                {label as string}
              </Typography>
            </TouchableOpacity>
          );
        })}
      </DrawerContentScrollView>
      <Button onPress={handleLogout} style={styles.logoutButton} fontSize="large">
        Sign Out
      </Button>
    </View>
  );
};

const createStyles = (theme: ExtendedTheme) =>
  StyleSheet.create({
    main: {
      padding: theme.spacing.md,
      backgroundColor: theme.colors.background,
      width: '100%',
      height: '100%',
    },
    image: {
      flexDirection: 'row',
      justifyContent: 'center',
    },
    icon: {
      marginRight: 20,
    },
    logo: {
      width: 200,
      height: 200,
      marginVertical: 20,
    },
    drawerSection: {
      paddingVertical: 10,
      paddingHorizontal: 10,
      borderTopWidth: 2,
      borderColor: theme.colors.border,
    },
    logoutButton: { paddingVertical: 10 },

    section: {
      flex: 1,
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 20,
      borderBottomWidth: 2,
      borderColor: theme.colors.border,
    },
    sectionActive: {},

    text: {
      color: theme.colors.text,
      ...theme.fonts.bold,
      fontSize: 20,
    },
    textActive: {
      color: theme.colors.primary,
    },
  });

export default SideBar;
