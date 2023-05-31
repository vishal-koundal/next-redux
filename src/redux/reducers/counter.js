import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  value: 0,
};

export const counter = createSlice({
  name: 'counteweer',
  initialState,
  reducers: {
    resetCount: () => initialState,
    incrementCount: (state) => {
      state.value += 1;
    },
    decrementCount: (state) => {
      state.value -= 1;
    },
    incrementCountByAmount: (state, action) => {
      state.value += action.payload;
    },
    decrementCountByAmount: (state, action) => {
      state.value -= action.payload;
    },
  },
});

export const {
  incrementCount,
  incrementCountByAmount,
  decrementCount,
  decrementCountByAmount,
  resetCount,
} = counter.actions;
export default counter.reducer;
