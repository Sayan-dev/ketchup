import * as React from 'react';
import {
  TouchableOpacityProps,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { useTheme } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { transform } from 'lodash';
import type { ExtendedTheme, FontSize } from '../../types';
import Typography from './Typography';

interface ButtonProps extends TouchableOpacityProps {
  children?: string | React.ReactElement;
  isLoading?: boolean;
  LeftIconName?: string;
  RightIconName?: string;
  iconSize?: number;
  fontSize?: keyof FontSize;
  backgroundColor?: keyof ExtendedTheme['colors'];
  textColor?: keyof ExtendedTheme['colors'];
}

const Button: React.FC<ButtonProps> = ({
  children,
  style,
  isLoading = false,
  LeftIconName,
  RightIconName,
  iconSize = 28,
  fontSize = 'medium',
  backgroundColor,
  textColor,
  ...props
}) => {
  const theme = useTheme();
  const styles = React.useMemo(() => createStyles(theme), [theme]);

  const isPressed = useSharedValue(0);

  const iconStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: withSpring(10 * isPressed.value) }],
  }));

  return (
    <TouchableOpacity
      {...props}
      style={[
        styles.container,
        { paddingLeft: LeftIconName ? theme.spacing.lg + 24 : theme.spacing.lg },
        { paddingRight: RightIconName ? theme.spacing.lg + 24 : theme.spacing.lg },
        { backgroundColor: backgroundColor ? theme.colors[backgroundColor] : theme.colors.primary },
        style,
      ]}
      onPressIn={() => {
        isPressed.value = 1;
      }}
      onPressOut={() => {
        isPressed.value = 0;
      }}
    >
      {LeftIconName ? (
        <Animated.View style={[iconStyle, styles.leftIcon, { borderRadius: iconSize }]}>
          {isLoading ? (
            <ActivityIndicator color={theme.colors.background} size={iconSize} />
          ) : (
            <Icon name={LeftIconName} color={theme.colors.background} size={iconSize} />
          )}
        </Animated.View>
      ) : isLoading ? (
        <ActivityIndicator color={theme.colors.text} size={iconSize} style={styles.loader} />
      ) : null}
      <Typography
        style={[
          styles.text,
          { color: textColor ? theme.colors[textColor] : theme.colors.background },
        ]}
        fontSize={fontSize}
        fontStyle="medium"
      >
        {children}
      </Typography>
      {RightIconName ? (
        <Animated.View style={[iconStyle, styles.rightIcon, { borderRadius: iconSize }]}>
          {isLoading ? (
            <ActivityIndicator color={theme.colors.background} size={iconSize} />
          ) : (
            <Icon name={RightIconName} color={theme.colors.background} size={iconSize} />
          )}
        </Animated.View>
      ) : isLoading ? (
        <ActivityIndicator color={theme.colors.text} size={iconSize} style={styles.loader} />
      ) : null}
    </TouchableOpacity>
  );
};

export default Button;

const createStyles = (theme: ExtendedTheme) =>
  StyleSheet.create({
    container: {
      backgroundColor: theme.colors.primary,
      borderRadius: 20,
      paddingHorizontal: theme.spacing.lg,
      paddingVertical: theme.spacing.sm,
      paddingRight: theme.spacing.lg + 24,
      alignSelf: 'center',
      justifyContent: 'space-between',
      flexDirection: 'row',
      alignItems: 'center',
    },
    text: {
      color: theme.colors.background,
      marginRight: theme.spacing.md,
    },
    rightIcon: {
      backgroundColor: theme.colors.accent,
      padding: theme.spacing.xs,
      position: 'absolute',
      right: 0,
    },
    leftIcon: {
      backgroundColor: theme.colors.accent,
      padding: theme.spacing.xs,
      position: 'absolute',
      left: 0,
    },
    loader: {
      marginLeft: theme.spacing.sm,
    },
  });
