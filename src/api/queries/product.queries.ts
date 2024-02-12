import { useQuery } from '@tanstack/react-query';
import { isEmpty } from 'lodash';
import { fetchAllProducts, fetchProduct } from '../requests/product.requests';

export const useProduct = (productId?: string) =>
  useQuery(
    ['product', productId],
    async () => {
      const res = await fetchProduct(productId);
      return res?.data;
    },
    {
      enabled: !isEmpty(productId),
    },
  );

export const useProducts = () =>
  useQuery(['products'], async () => {
    const res = await fetchAllProducts();
    return res?.data;
  });
