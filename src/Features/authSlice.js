import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk for login
export const LoginUser = createAsyncThunk(
    'auth/loginUser',
    async ({ email, password }, { rejectWithValue }) => {
        try {
            const response = await axios.post('https://web-city-server.vercel.app/api/user/login', { email, password });
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
            const response = await axios.get('https://web-city-server.vercel.app/api/user/me', config);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: JSON.parse(localStorage.getItem('user')) || null,
        token: localStorage.getItem('token') || null,
        loading: false,
        isSuccess: false,
        isError: false,
        message: '',
    },
    reducers: {
        logout: (state) => {
            state.user = null;
            state.token = null;
            state.isSuccess = false;
            state.isError = false;
            state.message = '';
            localStorage.removeItem('token');
            localStorage.removeItem('user');
        },

        reset: (state) => {
            state.loading = false;
            state.isError = false;
            state.isSuccess = false;
            state.message = '';
        }
    },
    extraReducers: (builder) => {
        // Handle login
        builder.addCase(LoginUser.pending, (state) => {
            state.loading = true;
            state.isError = false;
            state.message = '';
        });
        builder.addCase(LoginUser.fulfilled, (state, action) => {
            state.loading = false;
            state.isSuccess = true;
            state.token = action.payload.token;
            localStorage.setItem('token', action.payload.token);
            // Optionally, you can directly fetch the user here or update the user state
        });
        builder.addCase(LoginUser.rejected, (state, action) => {
            state.loading = false;
            state.isError = true;
            state.message = action.payload.message || 'Login failed';
        });

        // Handle fetching user data
        builder.addCase(getMe.pending, (state) => {
            state.loading = true;
            state.isError = false;
        });
        builder.addCase(getMe.fulfilled, (state, action) => {
            state.loading = false;
            state.isSuccess = true;
            state.user = action.payload;
            localStorage.setItem('user', JSON.stringify(action.payload)); // Store user data in localStorage
        });
        builder.addCase(getMe.rejected, (state, action) => {
            state.loading = false;
            state.isError = true;
            state.message = action.payload.message || 'Fetching user failed';
        });
    },
});

export const { logout, reset } = authSlice.actions;
export default authSlice.reducer;
