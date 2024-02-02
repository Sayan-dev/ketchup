import { Modal, StyleSheet, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { useTheme } from '@react-navigation/native';
import {
  GooglePlaceData,
  GooglePlaceDetail,
  GooglePlacesAutocomplete,
  GooglePlacesAutocompleteRef,
} from 'react-native-google-places-autocomplete';
import { GOOGLE_MAPS_API_KEY } from 'react-native-dotenv';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { ExtendedTheme } from '../../../types';
import FloatingTextInput, { FloatingTextInputProps } from '../FloatingTextInput';
import { RequestAddress } from '../../../types/entities';
import Button from '../Button';

interface AddressInputProps extends Omit<FloatingTextInputProps, 'onChange' | 'value'> {
  name: string;
  value?: RequestAddress;
  onChange?: (address: RequestAddress) => void;
}

const AddressInput: React.FC<AddressInputProps> = ({ value, onChange, ...props }) => {
  const theme = useTheme();
  const styles = React.useMemo(() => createStyles(theme), [theme]);
  const safeArea = useSafeAreaInsets();

  const ref = React.useRef<GooglePlacesAutocompleteRef | null>();

  React.useEffect(() => {
    if (ref.current && value?.formattedAddress) ref.current.setAddressText(value?.formattedAddress);
  }, [value]);

  const [isVisible, setVisible] = React.useState(false);
  const toggle = React.useCallback(() => setVisible(v => !v), []);

  const [address, setAddress] = React.useState<RequestAddress | null>(null);

  const handleSelect = (data: GooglePlaceData, details: GooglePlaceDetail | null = null) => {
    const addressDetails: RequestAddress = {
      formattedAddress: data.description,
      coordinates: {
        lat: 0,
        lng: 0,
      },
    };

    if (details) {
      addressDetails.coordinates = {
        lat: details.geometry.location.lat,
        lng: details.geometry.location.lng,
      };

      addressDetails.locality =
        details.address_components.find(component =>
          component.types.includes('sublocality_level_3'),
        )?.long_name ??
        details.address_components.find(component =>
          component.types.includes('sublocality_level_2'),
        )?.long_name ??
        details.address_components.find(component =>
          component.types.includes('sublocality_level_1'),
        )?.long_name;

      addressDetails.city = details.address_components.find(component =>
        component.types.includes('administrative_area_level_2'),
      )?.long_name;

      addressDetails.state = details.address_components.find(component =>
        component.types.includes('administrative_area_level_1'),
      )?.long_name;

      addressDetails.country = details.address_components.find(component =>
        component.types.includes('country'),
      )?.long_name;

      const zipCode = details.address_components.find(component =>
        component.types.includes('postal_code'),
      )?.long_name;

      addressDetails.zipCode = typeof zipCode === 'string' ? Number(zipCode) : undefined;
    }

    setAddress(addressDetails);
    if (onChange) onChange(addressDetails);
    toggle();
  };

  return (
    <View>
      <TouchableOpacity onPress={toggle}>
        <FloatingTextInput
          editable={false}
          {...props}
          value={address?.formattedAddress ?? ''}
          multiline
          pointerEvents="none"
          placeholderTextColor={theme.colors.border}
        />
      </TouchableOpacity>

      <Modal visible={isVisible} onRequestClose={toggle}>
        <View style={[styles.modalContent, { paddingTop: safeArea.top }]}>
          <GooglePlacesAutocomplete
            ref={inputRef => {
              ref.current = inputRef;
            }}
            placeholder="Search"
            onPress={handleSelect}
            query={{
              key: GOOGLE_MAPS_API_KEY,
              language: 'en',
              components: 'country:in',
            }}
            minLength={2} // minimum length of text to search
            fetchDetails
            keyboardShouldPersistTaps="always"
            textInputProps={{
              InputComp: FloatingTextInput,
              label: 'Search',
              style: { width: '100%', color: theme.colors.background },
              containerStyle: {
                width: '100%',
              },
              multiline: true,
            }}
            styles={{
              row: {
                backgroundColor: theme.colors.background,
              },
              description: {
                color: theme.colors.text,
              },
              poweredContainer: {
                backgroundColor: theme.colors.background,
              },
            }}
          />

          <Button iconName="close" style={styles.closeButton} onPress={toggle}>
            Close
          </Button>
        </View>
      </Modal>
    </View>
  );
};

export default AddressInput;

const createStyles = (theme: ExtendedTheme) =>
  StyleSheet.create({
    modalContent: {
      backgroundColor: theme.colors.background,
      flex: 1,
      padding: theme.spacing.md,
    },
    closeButton: {},
  });
