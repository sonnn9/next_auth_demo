// pages/_app.js
import { Provider, useDispatch } from 'react-redux';
import { store } from '../store';
import { fetchRefreshToken, setToken } from '../store/authSlice';
import { useEffect, useState } from 'react';

function Inner({ Component, pageProps }) {
  const dispatch = useDispatch();
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    // 1. Đọc token cũ từ localStorage (chỉ client)
    const saved = localStorage.getItem('accessToken');
    if (saved) dispatch(setToken(saved));

    // 2. Luôn gọi refresh để lấy token mới từ cookie
    dispatch(fetchRefreshToken());

    // Cờ hydrated để bạn có thể show loading/spinner nếu cần
    setHydrated(true);
  }, [dispatch]);

  // (Tuỳ chọn) Chờ hydrated mới render
  if (!hydrated) return null;

  return <Component {...pageProps} />;
}

export default function MyApp(props) {
  return (
    <Provider store={store}>
      <Inner {...props} />
    </Provider>
  );
}
