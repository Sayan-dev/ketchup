import { create, StateCreator } from 'zustand';
import { Product } from '../../types/entities';

interface ProductSlice {
  selectedProduct: Product | null;
  selectProduct: (product: Product) => void;
  likeProduct: (like: boolean) => void;
}

type Slice = ProductSlice;

const useProductSlice: StateCreator<Slice, [], [], ProductSlice> = set => ({
  selectedProduct: null,
  selectProduct: (product: Product) => set(state => ({ state, selectedProduct: product })),
  likeProduct: (like: boolean) =>
    set(prevState => {
      const newState = { ...prevState };
      if (newState.selectedProduct) {
        newState.selectedProduct.like = like;
      }
      return newState;
    }),
});

const useProduct = create<Slice>()((...rest) => ({
  ...useProductSlice(...rest),
}));

export default useProduct;
