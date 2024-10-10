import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk for login
export const LoginUser = createAsyncThunk(
    'auth/loginUser',
    async ({ email, password }, { rejectWithValue }) => {
        try {
            const response = await axios.post('http://localhost:3000/api/user/login', { email, password });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

// Async thunk to get user info (with token)
export const getMe = createAsyncThunk(
    'auth/getMe',
    async (_, { rejectWithValue, getState }) => {
        try {
            const token = getState().auth.token; // Get token from the state
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            const response = await axios.get('http://localhost:3000/api/user/me', config);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        token: localStorage.getItem('token') || null,
        loading: false,
        error: null,
    },
    reducers: {
        logout: (state) => {
            state.user = null;
            state.token = null;
            localStorage.removeItem('token');
        },
    },
    extraReducers: (builder) => {
        // Handle login
        builder.addCase(LoginUser.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(LoginUser.fulfilled, (state, action) => {
            state.loading = false;
            state.token = action.payload.token;
            localStorage.setItem('token', action.payload.token);
        });
        builder.addCase(LoginUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload.message;
        });

        // Handle fetching user data
        builder.addCase(getMe.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getMe.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload;
        });
        builder.addCase(getMe.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload.message;
        });
    },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
