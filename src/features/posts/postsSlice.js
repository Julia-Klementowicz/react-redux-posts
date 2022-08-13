import { createSlice, nanoid, createAsyncThunk } from '@reduxjs/toolkit';
import sub from 'date-fns/sub';
import axios from 'axios';

const POSTS_URL = 'https://jsonplaceholder.typicode.com/posts';

// const initialState = [
//   {
//     id: 1,
//     title: 'Learning Redux toolkit',
//     content: 'Nice tool to manage state',
//     date: sub(new Date(), { minutes: 10 }).toISOString(),
//     reactions: {
//       thumbsUp: 0,
//       heart: 0,
//       wow: 0,
//       rocket: 0,
//       coffee: 0,
//     },
//   },
//   {
//     id: 2,
//     title: 'Slices...',
//     content: 'The more I say slice, the more I want pizza',
//     date: sub(new Date(), { minutes: 5 }).toISOString(),
//     reactions: {
//       thumbsUp: 0,
//       heart: 0,
//       wow: 0,
//       rocket: 0,
//       coffee: 0,
//     },
//   },
// ];

const initialState = {
  posts: [],
  status: 'idle', // idle | loading | succeeded | failed
  error: null,
};

export const fetchPosts = createAsyncThunk(
  'posts/fetchPosts',
  async () => {

  }
)

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    postAdded: {
      reducer: (state, action) => {
        state.posts.push(action.payload);
      },
      prepare: (title, content, userId) => {
        return {
          payload: {
            id: nanoid(),
            title,
            content,
            date: new Date().toISOString(),
            userId,
            reations: {
              thumbsUp: 0,
              heart: 0,
              wow: 0,
              rocket: 0,
              coffee: 0,
            },
          },
        };
      },
    },
    reactionAdded: (state, action) => {
      const { postId, reaction } = action.payload;
      const existingPost = state.posts.find((post) => post.id === postId);
      if (existingPost) {
        existingPost.reactions[reaction]++;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // adding date and reactions
        let min = 1;
        const loadedPosts = action.payload.map((post) => {
          post.date = sub(new Date(), {minutes: min++}).toISOString();
          // TODO post.reactions
        })
      })
  },
});

export const selectAllPosts = (state) => state.posts.posts;

export const { postAdded, reactionAdded } = postsSlice.actions;

const postsReducer = postsSlice.reducer;
export default postsReducer;
