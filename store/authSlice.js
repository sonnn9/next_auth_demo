// store/authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../utils/axiosClient';

export const loginUser = createAsyncThunk('auth/login', async creds => {
  const { data } = await axios.post('/api/auth/login', creds);
  return data.accessToken;
});

export const fetchRefreshToken = createAsyncThunk('auth/refresh', async () => {
  const { data } = await axios.post('/api/auth/refresh');
  return data.accessToken;
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: null,
    status: 'idle'
  },
  reducers: {
    setToken(state, action) {
      state.token = action.payload;
      localStorage.setItem('accessToken', action.payload);
    },
    logout(state) {
      state.token = null;
      localStorage.removeItem('accessToken');
    }
  },
  extraReducers: builder => {
    builder
      .addCase(loginUser.fulfilled, (state, action) => {
        state.token = action.payload;
        localStorage.setItem('accessToken', action.payload);
      })
      .addCase(fetchRefreshToken.fulfilled, (state, action) => {
        state.token = action.payload;
        localStorage.setItem('accessToken', action.payload);
      });
  }
});

export const { setToken, logout } = authSlice.actions;
export default authSlice.reducer;
