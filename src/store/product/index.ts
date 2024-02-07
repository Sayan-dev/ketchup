import { create, StateCreator } from 'zustand';
import { Order } from '../../types/entities';

interface ProductSlice {
  selectedProduct: Order | null;
  selectProduct: (product: Order) => void;
  likeProduct: (like: boolean) => void;
  addProduct: () => void;
  subProduct: () => void;
}

type Slice = ProductSlice;

const useProductSlice: StateCreator<Slice, [], [], ProductSlice> = set => ({
  selectedProduct: null,
  selectProduct: (product: Order) => set(state => ({ state, selectedProduct: product })),
  likeProduct: (like: boolean) =>
    set(prevState => {
      const newState = { ...prevState };
      if (newState.selectedProduct) {
        newState.selectedProduct.like = like;
      }
      return newState;
    }),
  addProduct: () =>
    set(prevState => {
      const newState = { ...prevState };
      if (newState.selectedProduct) {
        if (newState.selectedProduct.quantity) newState.selectedProduct.quantity += 1;
        else {
          newState.selectedProduct.quantity = 1;
        }
      }
      return newState;
    }),
  subProduct: () =>
    set(prevState => {
      if (prevState.selectedProduct && prevState.selectedProduct.quantity > 1) {
        const newState = { ...prevState };
        if (newState.selectedProduct) {
          if (newState.selectedProduct.quantity) newState.selectedProduct.quantity -= 1;
          else {
            newState.selectedProduct.quantity = 1;
          }
        }
        return newState;
      }
      return prevState;
    }),
});

const useProduct = create<Slice>()((...rest) => ({
  ...useProductSlice(...rest),
}));

export default useProduct;
