import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../store/authSlice";
import { useRouter } from "next/router";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const router = useRouter();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await dispatch(loginUser(form)).unwrap();
      router.push("/dashboard");
    } catch {
      setError("Sai email hoặc mật khẩu");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 border rounded">
      <h1 className="text-xl mb-4">Đăng nhập</h1>
      {error && <p className="text-red-500 mb-2">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <button
          type="submit"
          className="w-full p-2 bg-green-600 text-white rounded"
        >
          Đăng nhập
        </button>
      </form>
    </div>
  );
}
