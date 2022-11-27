import {
  MaterialTopTabBarProps,
  MaterialTopTabNavigationEventMap,
} from '@react-navigation/material-top-tabs';
import React from 'react';
import { View, TouchableOpacity, StyleSheet, LayoutChangeEvent, Platform } from 'react-native';
import { NavigationHelpers, TabNavigationState, useTheme } from '@react-navigation/native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
  withDelay,
} from 'react-native-reanimated';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { BlurView } from '@react-native-community/blur';
import type { ExtendedTheme } from '../types';
import { TabParamList } from '../HomeTabNavigator';

export interface TabBarProps extends MaterialTopTabBarProps {
  navigation: NavigationHelpers<TabParamList, MaterialTopTabNavigationEventMap>;
  state: TabNavigationState<TabParamList>;
}

const TabBar: React.FC<TabBarProps> = ({ state, descriptors, navigation }) => {
  const theme = useTheme();
  const styles = React.useMemo(() => createStyles(theme), [theme]);

  const offset = useSharedValue(100);
  const width = useSharedValue(95);

  const handleLayoutChange = (event: LayoutChangeEvent) => {
    width.value = event.nativeEvent.layout.width;
  };

  const animatedStyle = useAnimatedStyle(() => ({
    left: withDelay(
      0,
      withTiming(offset.value, {
        duration: 500,
        easing: Easing.elastic(1),
      }),
    ),
  }));

  React.useEffect(() => {
    offset.value = state.index * width.value + (3 - state.index) * 2;
  }, [state]);

  return (
    <View style={styles.main}>
      {Platform.OS === 'android' ? (
        <BlurView
          style={styles.absolute}
          blurType="dark"
          blurRadius={1}
          blurAmount={10}
          overlayColor=""
        />
      ) : null}
      {Platform.OS === 'ios' ? (
        <BlurView style={styles.absolute} blurType="ultraThinMaterialDark" blurAmount={50} />
      ) : null}

      <View style={styles.tabContainer}>
        <View style={styles.container}>
          <Animated.View style={[styles.bar, animatedStyle]} />
          {state.routes.map((route, index) => {
            const { options } = descriptors[route.key];

            const label =
              options.tabBarLabel !== undefined
                ? options.tabBarLabel
                : options.title !== undefined
                ? options.title
                : route.name;

            const isFocused = state.index === index;

            const onPress = () => {
              const event = navigation.emit({
                type: 'tabPress',
                target: route.key,
                canPreventDefault: true,
              });

              if (!isFocused && !event.defaultPrevented) {
                // The `merge: true` option makes sure that the params inside the tab screen are preserved
                navigation.navigate({
                  name: route.name,
                  merge: true,
                  params: undefined,
                });
              }
            };

            const onLongPress = () => {
              navigation.emit({
                type: 'tabLongPress',
                target: route.key,
              });
            };

            return (
              <TouchableOpacity
                accessibilityRole="button"
                accessibilityState={isFocused ? { selected: true } : {}}
                accessibilityLabel={options.tabBarAccessibilityLabel}
                testID={options.tabBarTestID}
                onPress={onPress}
                onLongPress={onLongPress}
                style={[styles.tab, isFocused ? styles.tabActive : null]}
                key={route.key}
                onLayout={handleLayoutChange}
              >
                <Animated.Text style={[styles.text, isFocused ? styles.textActive : null]}>
                  {label as string}
                </Animated.Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </View>
  );
};

const createStyles = (theme: ExtendedTheme) =>
  StyleSheet.create({
    main: {
      padding: theme.spacing.md,
      backgroundColor: theme.colors.transparent,
      width: '100%',
      position: 'absolute',
      bottom: 0,
    },
    tabContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '100%',
      backgroundColor: theme.colors.transparent,
      marginBottom: Platform.OS === 'ios' ? theme.spacing.sm : 0,
    },
    container: {
      flexDirection: 'row',
      backgroundColor: theme.colors.text,
      borderRadius: 24,
      padding: 4,
      flexGrow: 1,
      flexShrink: 1,
    },
    searchButton: {
      backgroundColor: theme.colors.text,
      marginLeft: theme.spacing.sm,
      borderRadius: 60,
      padding: 10,
    },
    bar: {
      position: 'absolute',
      zIndex: 0,
      top: 4,
      left: 4,
      width: '33.33%',
      height: 40,
      backgroundColor: theme.colors.background,
      borderRadius: 24,
    },
    tab: {
      flex: 1,
      paddingHorizontal: 16,
      paddingVertical: 10,
      borderRadius: 24,
    },
    tabActive: {},
    text: {
      color: theme.colors.background,
      ...theme.fonts.medium,
      textAlign: 'center',
      fontSize: 14,
    },
    textActive: {
      color: theme.colors.text,
    },
    absolute: {
      position: 'absolute',
      bottom: 0,
      top: 0,
      left: 0,
      right: 0,
      width: wp(100),
    },
  });

export default TabBar;
