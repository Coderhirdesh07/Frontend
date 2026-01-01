import React from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider, Route, createRoutesFromElements } from 'react-router-dom';
import "./index.css"
import HomePage from './Pages/HomePage.jsx';
import Login from './component/Forms/Login.jsx';
import SignUp from './component/Forms/SignUp.jsx';
import { Provider } from 'react-redux';
import store from "../src/store/store.js"
import RootLayout from './component/RootLayout.jsx';
import DashBoard from './Pages/DashBoard.jsx';
import TaskCreationForm from './component/Forms/TaskCreationForm.jsx';

import TaskDetails from './Pages/TaskDetails.jsx';
import TaskEdit from './Pages/TaskEdit.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<HomePage />} />
      <Route path="login" element={<Login />} />
      <Route path="signup" element={<SignUp />} />
      <Route path="dashboard" element={<DashBoard />} />
      <Route path="task-form" element={<TaskCreationForm />} />
      <Route path="task/:id" element={<TaskDetails />} />      
      <Route path="task-edit/:id" element={<TaskEdit />} />
      <Route path="*" element={<div className="p-6 text-center text-red-500">Page Not Found</div>} />
     
    </Route>
  )
);


createRoot(document.getElementById('root')).render(
    <Provider store={store}>
    <RouterProvider router={router} />
    </Provider>
  
);
