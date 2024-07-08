import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'https://jsonplaceholder.typicode.com/posts';

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
    const response = await axios.get(API_URL);
    return response.data.sort((a, b) => b.id - a.id);;
});

export const addPost = createAsyncThunk('posts/addPost', async (newPost) => {
    const response = await axios.post(API_URL, newPost);
    return response.data;
});

export const updatePost = createAsyncThunk('posts/updatePost', async ({ id, updatedPost }) => {
    const response = await axios.put(`${API_URL}/${id}`, updatedPost);
    return response.data;
});

export const deletePost = createAsyncThunk('posts/deletePost', async (postId) => {
    await axios.delete(`${API_URL}/${postId}`);
    return postId;
});

const postsSlice = createSlice({
    name: 'posts',
    initialState: { posts: [], status: 'idle', error: null },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchPosts.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchPosts.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.posts = action.payload;
            })
            .addCase(fetchPosts.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(addPost.fulfilled, (state, action) => {
                state.posts.push(action.payload);
            })
            .addCase(updatePost.fulfilled, (state, action) => {
                const index = state.posts.findIndex(post => post.id === action.payload.id);
                state.posts[index] = action.payload;
            })
            .addCase(deletePost.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(deletePost.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.posts = state.posts.filter(post => post.id !== action.payload);
            })
            .addCase(deletePost.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export default postsSlice.reducer;
