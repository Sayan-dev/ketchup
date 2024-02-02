import shallow from 'zustand/shallow';
import useStore from '.';
import { User, UserRegisterRequest } from '../types/entities';

export const useUser = () =>
  useStore(state => [state.user, state.updateUser], shallow) as [
    User | null,
    (user: User | null) => void,
  ];

export const useRegisteredUser = () =>
  useStore(state => [state.registeredUser, state.updateRegisteredUser], shallow) as [
    UserRegisterRequest | null,
    (registeredStudent: UserRegisterRequest | null) => void,
  ];
