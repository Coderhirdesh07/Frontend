import React from "react";
import { Link, Outlet } from "react-router-dom";

function RootLayout() {
  return (
    <div className="min-h-screen bg-green-300 text-gray-800 flex flex-col">
      <header className="bg-white shadow p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-green-600">ShopEasy</h1>
        <div className="space-x-4">
          <Link
            to="/login"
            className="text-green-600 hover:text-green-800 font-medium"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
          >
            Sign Up
          </Link>
        </div>
      </header>

      <main className="flex-grow">
        <Outlet />
      </main>
    </div>
  );
}

export default RootLayout;
