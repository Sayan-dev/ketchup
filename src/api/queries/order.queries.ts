import Toast from 'react-native-toast-message';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Order } from '../../types/entities';
import { OrderRequest, createOrder, fetchAllOrders } from '../requests/order.requests';
import { ApiResponseError } from '../http';

export const useCreateOrder = () =>
  useMutation<null, ApiResponseError, OrderRequest>(
    async data => {
      console.log('hello');
      const res = await createOrder(data);
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

export const useOrders = () =>
  useQuery(['orders'], async () => {
    const res = await fetchAllOrders();
    return res?.data;
  });
