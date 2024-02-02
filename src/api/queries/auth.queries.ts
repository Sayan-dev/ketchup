import { useMutation } from '@tanstack/react-query';
import Toast from 'react-native-toast-message';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { ContactNumber, LoginRequest, User, UserRegisterRequest } from '../../types/entities';
import { ApiResponseError } from '../http';
import {
  deactivateAccount,
  deleteAccount,
  registerWithEmail,
  registerWithPhone,
  updatePassword,
  verifyEmailHash,
  verifyStudent,
} from '../requests/auth.requests';

export const useRegisterWithEmail = () =>
  useMutation<User, ApiResponseError, string>(
    async email => {
      const res = await registerWithEmail(email);
      return res.data.student;
    },
    {
      onSuccess: () => {
        Toast.show({
          type: 'success',
          text1: 'Please verify your email',
          text2: 'Open the verification link sent to your mail',
        });
      },
      onError: err => {
        Toast.show({
          type: 'error',
          text1: 'Oops!',
          text2: err?.message || 'Something went wrong',
        });
      },
    },
  );

export const useVerifyEmailHash = () =>
  useMutation<{ student: User; token: string }, ApiResponseError, string>(
    async hash => {
      const res = await verifyEmailHash(hash);
      return res.data;
    },
    {
      onSuccess: () => {
        Toast.show({
          type: 'success',
          text1: 'Congratulations!',
          text2: 'Your email has been verified!',
        });
      },
      onError: err => {
        Toast.show({
          type: 'error',
          text1: 'Oops!',
          text2: err?.message || 'Something went wrong',
        });
      },
    },
  );

export const useRegisterWithPhone = () =>
  useMutation<User, ApiResponseError, ContactNumber>(
    async contactNumber => {
      const res = await registerWithPhone(contactNumber);
      return res.data.student;
    },
    {
      onSuccess: () => {
        Toast.show({
          type: 'success',
          text1: 'Please verify your phone number',
          text2: 'An OTP has been sent your phone number',
        });
      },
      onError: err => {
        Toast.show({
          type: 'error',
          text1: 'Oops!',
          text2: err?.message || 'Something went wrong',
        });
      },
    },
  );

export const useUpdatePassword = () =>
  useMutation<unknown, ApiResponseError, string>(
    async password => {
      const res = await updatePassword(password);
      return res.data;
    },
    {
      onSuccess: () => {
        Toast.show({
          type: 'success',
          text1: 'Done!',
          text2: 'Your password has been updated',
        });
      },
      onError: err => {
        Toast.show({
          type: 'error',
          text1: 'Oops!',
          text2: err?.message || 'Something went wrong',
        });
      },
    },
  );

export const useRegister = () =>
  useMutation<User, ApiResponseError, UserRegisterRequest>(
    async data => {
      const res = await auth().createUserWithEmailAndPassword(data.email, data.password);
      await firestore().collection('Users').doc(res.user.uid).set({
        email: data.email,
        firstName: data.firstName,
        middleName: data.middleName,
        lastName: data.lastName,
      });
      return res.user as unknown as User;
    },
    {
      onSuccess: () => {
        Toast.show({
          type: 'success',
          text1: 'Congrats! 🎉',
          text2: '',
        });
      },
      onError: err => {
        Toast.show({
          type: 'error',
          text1: 'Oops!',
          text2: err?.message || 'Something went wrong',
        });
      },
    },
  );

export const useVerify = () =>
  useMutation<User, ApiResponseError, void>(
    async () => {
      const res = await verifyStudent();
      return res.data.student;
    },
    {
      retry: false,
      cacheTime: 0,
    },
  );

export const useLogin = () =>
  useMutation<User, ApiResponseError, LoginRequest>(
    async data => {
      const res = await auth().signInWithEmailAndPassword(data.email, data.password);
      const user = await firestore().collection('Users').doc(res.user.uid).get();
      return user as unknown as User;
    },
    {
      onSuccess: () => {
        Toast.show({
          type: 'success',
          text1: 'Successful Login',
          text2: '',
        });
      },
      onError: err => {
        Toast.show({
          type: 'error',
          text1: 'Oops!',
          text2: err?.message || 'Something went wrong',
        });
      },
    },
  );

export const useDeactivateAccount = () =>
  useMutation<unknown, ApiResponseError, void>(
    async () => {
      const res = await deactivateAccount();
      return res.data;
    },
    {
      onError: err => {
        Toast.show({
          type: 'error',
          text1: 'Oops!',
          text2: err?.message || 'Something went wrong',
        });
      },
    },
  );

export const useDeleteAccount = () =>
  useMutation<unknown, ApiResponseError, void>(
    async () => {
      const res = await deleteAccount();
      return res.data;
    },
    {
      onSuccess: () => {
        Toast.show({
          type: 'success',
          text1: 'Your account has been deleted',
          text2: '',
        });
      },
      onError: err => {
        Toast.show({
          type: 'error',
          text1: 'Oops!',
          text2: err?.message || 'Something went wrong',
        });
      },
    },
  );
