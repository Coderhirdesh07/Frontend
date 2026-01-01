import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { login } from "../../store/authSlice";
import { API_CONFIG } from '../../config/index.config';

function SignUp() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // optional loading state

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm();

  const password = watch("password");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const create = async (data) => {
    setError("");
    setLoading(true);

    const fullName = `${data.firstName} ${data.lastName}`;
    const payload = {
      name: fullName,
      email: data.email,
      password: data.password,
    };

    try {
      const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINT}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        credentials: "include" // include cookies if your backend sets them
      });

      const userdata = await response.json();

      if (!response.ok) {
        setError(userdata.message || "Registration failed");
        return;
      }

      dispatch(login(userdata));
      navigate("/login");
    } catch (err) {
      console.error("Registration error:", err);
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-purple-100 via-white to-purple-100 px-4">
      <form
        className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg space-y-6"
        onSubmit={handleSubmit(create)}
      >
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Create an account
        </h2>

        {error && <p className="text-red-500 text-center font-medium">{error}</p>}

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <label htmlFor="first-name" className="block mb-1 text-sm font-medium text-gray-700">
              First Name
            </label>
            <input
              id="first-name"
              type="text"
              placeholder="John"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
              {...register("firstName", { required: "First name is required" })}
            />
            {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName.message}</p>}
          </div>

          <div className="flex-1">
            <label htmlFor="last-name" className="block mb-1 text-sm font-medium text-gray-700">
              Last Name
            </label>
            <input
              id="last-name"
              type="text"
              placeholder="Doe"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
              {...register("lastName", { required: "Last name is required" })}
            />
            {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName.message}</p>}
          </div>
        </div>

        <div>
          <label htmlFor="email" className="block mb-1 text-sm font-medium text-gray-700">
            Email Address
          </label>
          <input
            id="email"
            type="email"
            placeholder="you@example.com"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
            {...register("email", { required: "Email is required" })}
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
        </div>

        <div>
          <label htmlFor="password" className="block mb-1 text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="••••••••"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
            {...register("password", { required: "Password is required" })}
          />
          {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
        </div>

        <div>
          <label htmlFor="confirm-password" className="block mb-1 text-sm font-medium text-gray-700">
            Confirm Password
          </label>
          <input
            id="confirm-password"
            type="password"
            placeholder="••••••••"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
            {...register("confirmPassword", {
              required: "Please confirm your password",
              validate: (value) =>
                value === password || "Passwords do not match"
            })}
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-lg transition"
          disabled={loading}
        >
          {loading ? "Creating account..." : "Sign Up"}
        </button>

        <p className="text-sm text-center text-gray-500">
           Already have an account?{" "}
          <Link to="/login" className="text-purple-600 hover:underline">
            Log in
          </Link>
        </p>
      </form>
    </div>
  );
}

export default SignUp;
