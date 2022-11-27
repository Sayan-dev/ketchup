import type { TextStyle } from 'react-native';

export interface FontStyles {
  regular: TextStyle;
  medium: TextStyle;
  semibold: TextStyle;
  bold: TextStyle;
}

const fonts: FontStyles = {
  regular: {
    fontFamily: 'Manrope-Regular',
  },
  medium: {
    fontFamily: 'Manrope-Medium',
  },
  semibold: {
    fontFamily: 'Manrope-SemiBold',
  },
  bold: {
    fontFamily: 'Manrope-Bold',
  },
};

export default fonts;
