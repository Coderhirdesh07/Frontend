import React from "react";
import { Link } from "react-router-dom";
import taskImg from "../assets/pexels-solliefoto-298863.jpg";

function HomePage() {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 flex flex-col">

      <section
        className="relative bg-cover bg-center h-[500px] flex items-center justify-center"
        style={{ backgroundImage: `url(${taskImg})` }}
      >
        <div className="bg-black bg-opacity-60 p-10 rounded text-center max-w-xl">
          <h2 className="text-white text-4xl md:text-5xl font-bold mb-4">
            Task Management System
          </h2>
          <p className="text-white text-lg mb-6">
            Organize your tasks, set priorities, and track progress efficiently.
          </p>

          <div className="flex gap-4 justify-center">
            <Link
              to="/login"
              className="bg-blue-600 text-white px-6 py-2 rounded font-semibold hover:bg-blue-700 transition"
            >
              Login
            </Link>

            <Link
              to="/signup"
              className="bg-green-600 text-white px-6 py-2 rounded font-semibold hover:bg-green-700 transition"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </section>

      
      <section className="p-10 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
        <div className="bg-white shadow rounded p-6 border-t-4 border-green-500">
          <h3 className="text-xl font-bold mb-2">
            Low Priority
          </h3>
          <p className="text-gray-600">
            Manage tasks that are not urgent but important.
          </p>
        </div>

        <div className="bg-white shadow rounded p-6 border-t-4 border-yellow-400">
          <h3 className="text-xl font-bold mb-2">Medium Priority</h3>
          <p className="text-gray-600">
            Track tasks that need attention soon.
          </p>
        </div>

        <div className="bg-white shadow rounded p-6 border-t-4 border-red-500">
          <h3 className="text-xl font-bold mb-2">High Priority</h3>
          <p className="text-gray-600">
            Focus on critical and urgent tasks first.
          </p>
        </div>
      </section>

      
      <footer className="bg-gray-900 text-white text-center py-4 mt-auto">
        © {new Date().getFullYear()} Task Manager | MERN Stack
      </footer>

    </div>
  );
}

export default HomePage;
