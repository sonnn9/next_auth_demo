import axios from 'axios';
import { store } from '../store';
import { fetchRefreshToken } from '../store/authSlice';

const client = axios.create();

client.interceptors.request.use(config => {
  const token = store.getState().auth.token;
  if (token) config.headers['Authorization'] = `Bearer ${token}`;
  return config;
});

client.interceptors.response.use(
  res => res,
  async err => {
    if (err.response?.status === 401) {
      const result = await store.dispatch(fetchRefreshToken());
      if (result.payload) {
        err.config.headers['Authorization'] = `Bearer ${result.payload}`;
        return axios(err.config);
      }
    }
    return Promise.reject(err);
  }
);

export default client;
