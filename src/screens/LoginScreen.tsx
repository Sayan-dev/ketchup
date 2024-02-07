import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import React from 'react';
import * as yup from 'yup';
import { useTheme } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoginRequest, UserRegisterRequest } from '../types/entities';
import { RootStackParamList } from '../RootNavigator';
import type { ExtendedTheme } from '../types';
import ScrollLayout from '../components/layouts/ScrollLayout';
import Button from '../components/common/Button';
import Typography from '../components/common/Typography';
import ControlledFloatingTextInput from '../components/common/form/ControlledFloatingTextInput';
import PasswordInput from '../components/common/form/PasswordInput';
import { useLogin } from '../api/queries/auth.queries';
import { get } from '../utils/storage';

const schema = yup.object().shape({
  email: yup.string().email('Must be a valid email').required('Required'),
  password: yup.string().required('Required'),
});

type LoginScreenProps = NativeStackScreenProps<RootStackParamList, 'Login'>;

const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
  const theme = useTheme();
  const styles = React.useMemo(() => createStyles(theme), [theme]);

  const form = useForm<UserRegisterRequest>({
    resolver: yupResolver(schema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const Login = useLogin();
  const onSubmit = form.handleSubmit(async data => {
    Login.mutate(data, {
      onSuccess: async () => {
        const introFlag = await get('@intro');
        if (introFlag) navigation.reset({ index: 1, routes: [{ name: 'Home' }] });
        else {
          navigation.reset({ index: 1, routes: [{ name: 'Start' }] });
        }
      },
    });
  });

  const inputs = React.useRef<Record<keyof LoginRequest, TextInput | null>>({
    email: null,
    password: null,
  });

  const goToSignUp = () => {
    navigation.navigate('Signup');
  };
  return (
    <ScrollLayout scrollViewProps={{ style: styles.container }} edges={['top', 'left', 'right']}>
      <FormProvider {...form}>
        <View style={styles.form}>
          <Typography fontStyle="medium" fontSize="h1" style={styles.heading}>
            Sign In
          </Typography>

          <ControlledFloatingTextInput
            ref={el => {
              inputs.current.email = el;
            }}
            name="email"
            label="Email"
            keyboardType="email-address"
            autoCapitalize="none"
            returnKeyType="next"
            onNext={() => inputs.current.password?.focus()}
          />
          <PasswordInput
            ref={el => {
              inputs.current.password = el;
            }}
            name="password"
            label="Password"
            autoCapitalize="none"
            returnKeyType="done"
            onNext={() => inputs.current.password?.blur()}
          />

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.textButton}>
              <Typography fontStyle="medium" fontSize="small">
                Forgot password?
              </Typography>
            </TouchableOpacity>

            <Button
              onPress={onSubmit}
              style={styles.button}
              RightIconName="arrow-right"
              // isLoading={login.isLoading}
            >
              Login
            </Button>
          </View>
          <View>
            <TouchableOpacity onPress={goToSignUp} style={styles.textButton}>
              <Typography fontStyle="medium" fontSize="small">
                Sign up
              </Typography>
            </TouchableOpacity>
          </View>
        </View>
      </FormProvider>
    </ScrollLayout>
  );
};

export default LoginScreen;
const createStyles = (theme: ExtendedTheme) =>
  StyleSheet.create({
    container: {
      paddingTop: theme.spacing.md,
      paddingBottom: theme.spacing.md,
    },
    heading: {
      ...theme.fonts.bold,
      fontSize: 42,
      marginBottom: theme.spacing.sm,
    },
    form: {
      marginBottom: theme.spacing.lg,
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    textButton: {
      ...theme.fonts.medium,
    },
    button: {
      marginTop: 'auto',
    },
    LoginContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'baseline',
      marginTop: 'auto',
      marginBottom: theme.spacing.md,
    },
  });
