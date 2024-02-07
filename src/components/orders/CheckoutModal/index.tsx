import { StyleSheet, Text, TextInput, View } from 'react-native';
import React from 'react';
import { useTheme } from '@react-navigation/native';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { ExtendedTheme } from '../../../types';
import BottomModal from '../../common/BottomModal';
import Typography from '../../common/Typography';
import { CheckoutDetails } from '../../../types/entities';
import ControlledFloatingTextInput from '../../common/form/ControlledFloatingTextInput';
import Button from '../../common/Button';

interface Props {
  open: boolean;
  onClose: () => void;
  bookOrder: () => void;
}

const schema = yup.object().shape({
  address: yup.string().max(200).required('Required'),
  phoneNumber: yup.string().max(11).required('Required'),
});

const CheckoutModal = ({ open, onClose, bookOrder }: Props) => {
  const theme = useTheme();
  const form = useForm<CheckoutDetails>({
    resolver: yupResolver(schema),
    defaultValues: {
      address: '',
      phoneNumber: '',
    },
  });

  const inputs = React.useRef<Record<keyof CheckoutDetails, TextInput | null>>({
    address: null,
    phoneNumber: null,
  });

  const styles = createStyles(theme);
  return (
    <BottomModal isVisible={open} onClose={onClose}>
      <View style={styles.container}>
        <FormProvider {...form}>
          <Typography fontStyle="medium" fontSize={20}>
            Delivery address
          </Typography>
          <ControlledFloatingTextInput
            ref={el => {
              inputs.current.address = el;
            }}
            name="address"
            placeholder="10th avenue, Lekki, Lagos State"
            inputContainerStyle={styles.formInputStyle}
            placeholderTextColor={theme.colors.formText}
            keyboardType="default"
            autoCapitalize="none"
            returnKeyType="next"
            onNext={() => inputs.current.phoneNumber?.focus()}
          />
          <Typography fontStyle="medium" fontSize={20}>
            Number we can call
          </Typography>
          <ControlledFloatingTextInput
            ref={el => {
              inputs.current.address = el;
            }}
            name="phoneNumber"
            placeholder="8100838105"
            inputContainerStyle={styles.formInputStyle}
            placeholderTextColor={theme.colors.formText}
            keyboardType="number-pad"
            autoCapitalize="none"
            returnKeyType="next"
            onNext={() => inputs.current.phoneNumber?.blur()}
          />
          <View style={styles.actionbuttons}>
            <Button onPress={bookOrder}>Pay on delivery</Button>
            <Button>Pay with card</Button>
          </View>
        </FormProvider>
      </View>
    </BottomModal>
  );
};

export default CheckoutModal;

const createStyles = (theme: ExtendedTheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'space-between',
      backgroundColor: theme.colors.background,
      height: '100%',
      paddingHorizontal: 24,
      paddingVertical: 40,
    },

    button: {
      flexDirection: 'row',
      flex: 1,
      justifyContent: 'center',
    },
    modal: {
      width: '100%',
      height: '90%',
      alignItems: 'center',
      justifyContent: 'center',
    },
    formInputStyle: {
      backgroundColor: theme.colors.formBackground,
    },
    actionbuttons: {
      flexDirection: 'row',
    },
  });
