import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { login } from '../../store/authSlice';
import { API_CONFIG } from '../../config/index.config';

function Login() {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // optional loading state

  const userLogin = async (data) => {
    setError("");
    setLoading(true);

    try {
      const payload = {
        email: data.email,
        password: data.password
      };

      const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINT}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        credentials: "include" // include cookies if your backend sets them
      });

      const userdata = await response.json();

      if (!response.ok) {
        setError(userdata.message || "Invalid credentials");
        return;
      }

      
      if (userdata.token) {
        localStorage.setItem('token', userdata.token);
      }

      // Dispatch user info and token to Redux
      dispatch(login({
         token: userdata.token,
         data: userdata.user
      }));

      navigate("/dashboard"); 
    } catch (err) {
      console.error("Login error occurred:", err);
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-100 via-white to-blue-100 px-4">
      <form
        className="w-full max-w-sm bg-white p-8 rounded-xl shadow-lg space-y-6"
        onSubmit={handleSubmit(userLogin)}
      >
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Sign in to your account
        </h2>

        {error && (
          <p className="text-red-500 text-center font-medium">{error}</p>
        )}

        <div className="flex flex-col">
          <label htmlFor="email" className="mb-1 text-sm font-medium text-gray-700">
            Email address
          </label>
          <input
            id="email"
            type="email"
            placeholder="you@example.com"
            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
            {...register("email", { required: "Email is required" })}
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="password" className="mb-1 text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="••••••••"
            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
            {...register("password", { required: "Password is required" })}
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition duration-200"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="text-sm text-center text-gray-500">
          Don't have an account?{' '}
          <Link to="/signup" className="text-blue-600 hover:underline">
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
