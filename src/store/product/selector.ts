import { shallow } from 'zustand/shallow';
import useProduct from '.';
import { Order } from '../../types/entities';

const useProductStore = () =>
  useProduct(state => [
    state.selectedProduct,
    state.selectProduct,
    state.likeProduct,
    state.addProduct,
    state.subProduct,
  ]) as [
    Order | null,
    (product: Order | null) => void,
    (like: boolean | null) => void,
    () => void,
    () => void,
  ];
export default useProductStore;
