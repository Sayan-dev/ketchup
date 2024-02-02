import { useMutation, useQuery } from '@tanstack/react-query';
import firestore from '@react-native-firebase/firestore';
import Toast from 'react-native-toast-message';
import firebase from '@react-native-firebase/app';

import { BookmarkRequest, Bookmarks, CreateRecipeRequest, Recipe } from '../../types/entities';

export const useCreateRecipe = () =>
  useMutation<Recipe, any, CreateRecipeRequest>(
    async data => {
      const res = await firestore().collection('Recipe').add({
        userId: data.uid,
        name: data.name,
        description: data.description,
      });
      return res as unknown as Recipe;
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

export const useRecipes = (data: { userId: string }) =>
  useQuery(['recipe'], async () => {
    const res = await firestore().collection('Recipe').where('userId', '==', data.userId);
    return res as unknown as Recipe[];
  });

export const useBookmarkRecipe = () =>
  useMutation<Bookmarks, any, BookmarkRequest>(
    async data => {
      const firestoreRef = firestore().collection('Bookmarks').doc(data.uid);
      const res = await firestoreRef.update(
        'bookmarks',
        firebase.firestore.FieldValue.arrayUnion(data.recipeId),
      );
      return res as unknown as Bookmarks;
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
