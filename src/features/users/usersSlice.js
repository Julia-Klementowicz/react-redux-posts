import { createSlice } from '@reduxjs/toolkit';

const initialState = [
  {
    id: '0',
    name: 'Robert Lewandowski',
  },
  {
    id: '1',
    name: 'Taylor Swift',
  },
  {
    id: '2',
    name: 'Taco Hemingway',
  },
];

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
});

export const selectAllUsers = (state) => state.users;

const usersReducer = usersSlice.reducer;
export default usersReducer;