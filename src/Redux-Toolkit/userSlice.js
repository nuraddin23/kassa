import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    users: JSON.parse(localStorage.getItem('Users_checheckout')) || [],
  },
  reducers: {
    addUser: (state, action) => {
      state.users.push(action.payload);
      localStorage.setItem('Users_checheckout', JSON.stringify(state.users));
    },
    removeUser: (state, action) => {
      state.users = state.users.filter((user) => user.id !== action.payload);
      localStorage.setItem('Users_checheckout', JSON.stringify(state.users));
    },
  },
});

export const { addUser, removeUser } = userSlice.actions;

export default userSlice.reducer;
