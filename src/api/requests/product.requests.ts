import { ApiResponse, Product } from '../../types/entities';
import http from '../http';

const BASE_URL = '/api/product';

export const fetchAllProducts = async () => {
  const response = await http.get<ApiResponse<[Product]>>(`${BASE_URL}`);
  return response;
};
export const fetchProduct = async (productId?: string) => {
  const response = await http.get<ApiResponse<Product>>(`${BASE_URL}/${productId}`);
  return response;
};
