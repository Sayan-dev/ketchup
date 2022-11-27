import type { ExtendedTheme } from '../types';
import fonts from './fonts';

const AppTheme: ExtendedTheme = {
  dark: false,
  colors: {
    background: '#F8F8FA',
    dark: '#171C2B',
    lightBackground: '#D8D8D8',
    card: '#070707',
    text: '#070707',
    border: '#A9A9A9',
    primary: '#FFCB40',
    accent: '#EDB727',
    secondary: '#FFFFFF',
    error: '#FF155B',
    notification: '#070707',
    transparent: 'transparent',
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 40,
  },
  fonts,
  fontSize: {
    text: 16,
    small: 14,
    medium: 16,
    large: 20,
    h1: 24,
  },
};

export default AppTheme;
