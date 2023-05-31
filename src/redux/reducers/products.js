import { createSlice, nanoid, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '@/utils/api';
const initialState = {
  data: [],
  singleProduct: {},
  status: 'idle',
  error: undefined,
};

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    const response = await axios.get('/products');
    return response.data;
  },
);
export const singleProduct = createAsyncThunk(
  'products/singleProduct',
  async (id) => {
    const response = await axios.get(`products/${id}`);
    return response.data;
  },
);

export const addNewProduct = createAsyncThunk(
  'products/addNewProduct',
  async (initialProduct) => {
    const response = await axios.post('/products/1', initialProduct);
    return response.data;
  },
);

export const deleteProduct = createAsyncThunk(
  'products/deleteProduct',
  async (id) => {
    await axios.delete(`/products/${id}`);
    return id;
  },
);

export const products = createSlice({
  name: 'products',
  initialState,
  reducers: {
    addProduct: (state, action) => {
      //   console.log('data', state);
      state.data.push(action.payload);
    },
    // removeProduct: async (state, action) => {
    //   const { id } = action.payload;
    //   const result = state.data.filter((item, i) => i !== id);
    //   state.data = result;
    // },
    resetProducts: () => initialState,
  },
  extraReducers(builder) {
    builder
      .addCase(fetchProducts.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload.products;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addNewProduct.fulfilled, (state, action) => {
        state.data.push(action.payload);
      })
      .addCase(deleteProduct.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(singleProduct.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(deleteProduct.fulfilled, (state, { payload }) => {
        // console.log('payload', payload);
        state.status = 'succeeded';

        const result = state.data.filter((item, i) => item.id !== payload);
        // console.log('result', result);
        state.data = result;
      })
      .addCase(singleProduct.fulfilled, (state, { payload }) => {
        // console.log('payload', payload);
        state.status = 'succeeded';
        state.singleProduct = payload;
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(singleProduct.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { addProduct, removeProduct, resetProducts } = products.actions;
export default products.reducer;
