import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  data: [],
};
export const tasks = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    resetTasks: () => initialState,
    addTask: (state, action) => {
      console.log('action.', action.payload.text);
      state.data.push(action.payload.text);
    },
    removeTask: (state, action) => {
      const { id } = action.payload;
      const result = state.data.filter((item, i) => i !== id);
      state.data = result;
    },
  },
});

export const { addTask, removeTask, resetTasks } = tasks.actions;
export default tasks.reducer;
