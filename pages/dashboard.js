import useAuth from '../hooks/useAuth';
import { useDispatch } from 'react-redux';
import { logout } from '../store/authSlice';
import axios from '../utils/axiosClient';

export default function Dashboard() {
  const token = useAuth();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    await axios.post('/api/auth/logout');
    dispatch(logout());
  };

  if (!token) return null;

  return (
    <div className="max-w-lg mx-auto mt-20 p-6 border rounded">
      <h1 className="text-2xl mb-4">Welcome!</h1>
      <button onClick={handleLogout} className="px-4 py-2 bg-red-500 text-white rounded">Logout</button>
    </div>
  );
}
