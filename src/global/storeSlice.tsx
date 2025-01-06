import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define TypeScript types for product and state
interface Product {
  id: string | number;
  name: string;
  price: number;
  qty?: number;
}

interface StoreState {
  products: Product[];
  cart: Product[];
}

// Initial state
const initialState: StoreState = {
  products: [],
  cart: [],
};

const storeSlice = createSlice({
  name: "eStore",
  initialState,
  reducers: {
    // Action to add products to the store
    addProductToStore: (state, { payload }: PayloadAction<Product[]>) => {
      state.products = payload;
    },

    // Action to add a product to the cart
    addProductToCart: (state, { payload }: PayloadAction<Product>) => {
      const index = state.cart.findIndex((item) => item.id === payload.id);

      if (index !== -1) {
        // Increment the quantity if the product is already in the cart
        state.cart[index].qty = (state.cart[index].qty || 1) + 1;
      } else {
        // Add a new product to the cart
        const product = { ...payload, qty: 1 };
        state.cart.push(product);
      }
    },
  },
});

// Export actions and reducer
export const { addProductToStore, addProductToCart } = storeSlice.actions;

export default storeSlice.reducer;
