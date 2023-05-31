import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  data: [],
};

export const products = createSlice({
  name: 'products',
  initialState,
  reducers: {
    addProduct: (state, action) => {
      //   console.log('data', state);
      state.data.push(action.payload);
    },
    removeProduct: (state, action) => {
      const { id } = action.payload;
      console.log('id', id);
      const result = state.data.filter((item, i) => i !== id);
      state.data = result;
    },
    resetProducts: () => initialState,
  },
});

export const { addProduct, removeProduct, resetProducts } = products.actions;
export default products.reducer;
