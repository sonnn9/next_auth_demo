import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function useAuth() {
  const token = useSelector(state => state.auth.token);
  const router = useRouter();

  useEffect(() => {
    if (!token) router.replace('/login');
  }, [token]);

  return token;
}
