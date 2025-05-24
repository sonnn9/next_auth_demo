import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../utils/axiosClient';

export const loginUser = createAsyncThunk('auth/login', async (creds) => {
  const { data } = await axios.post('/api/auth/login', creds);
  return data.accessToken;
});

export const fetchRefreshToken = createAsyncThunk('auth/refresh', async () => {
  const { data } = await axios.post('/api/auth/refresh');
  return data.accessToken;
});

const authSlice = createSlice({
  name: 'auth',
  initialState: { token: null, status: 'idle' },
  reducers: {
    logout(state) { state.token = null; }
  },
  extraReducers: builder => {
    builder
      .addCase(loginUser.fulfilled, (s, a) => { s.token = a.payload; })
      .addCase(fetchRefreshToken.fulfilled, (s, a) => { s.token = a.payload; });
  }
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
