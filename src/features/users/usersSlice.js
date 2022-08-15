import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const USERS_URL = 'https://jsonplaceholder.typicode.com/users';

// const initialState = [
//   {
//     id: '0',
//     name: 'Robert Lewandowski',
//   },
//   {
//     id: '1',
//     name: 'Taylor Swift',
//   },
//   {
//     id: '2',
//     name: 'Taco Hemingway',
//   },
// ];

const initialState = [];

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  try {
    const response = await axios.get(USERS_URL);
    return response.data;
  } catch (err) {
    return err.message;
  }
});

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      return action.payload; // overwrite whole state by returning
    });
  },
});

export const selectAllUsers = (state) => state.users;

const usersReducer = usersSlice.reducer;
export default usersReducer;
