import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const productsStore = createSlice({
  name: "products",
  initialState: [],
  reducers: {
    setProducts: (state, { payload }: PayloadAction<any>) => {
      state.push(...payload);
    },
  },
});

export default productsStore;

export const { setProducts } = productsStore.actions;
