import { shallow } from 'zustand/shallow';
import useProduct from '.';
import { Product } from '../../types/entities';

const useProductStore = () =>
  useProduct(state => [state.selectedProduct, state.selectProduct, state.likeProduct], shallow) as [
    Product | null,
    (product: Product | null) => void,

    (like: boolean | null) => void,
  ];
export default useProductStore;
