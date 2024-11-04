import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: { name: '', age: 0 },
  reducers: {
    setUser(state, action) {
      state.name = action.payload.name;
      state.age = action.payload.age;
    },
    clearUser(state) {
      state.name = '';
      state.age = 0;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export const userReducer= userSlice.reducer;
export default userReducer;