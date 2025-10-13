import React from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider, Route, createRoutesFromElements } from 'react-router-dom';
import "./index.css"
import HomePage from './Pages/HomePage.jsx';
import Login from './component/Forms/Login.jsx';
import SignUp from './component/Forms/SignUp.jsx';
import { Provider } from 'react-redux';
import store from "../src/store/store.js"
import ProductDetails from './Pages/ProductDetail.jsx';
import RootLayout from './component/RootLayout.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout/>}>
      <Route index element={<HomePage/>}/>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="products/:id" element={<ProductDetails/>}/>
    </Route>
  )
);

createRoot(document.getElementById('root')).render(
    <Provider store={store}>
    <RouterProvider router={router} />
    </Provider>
  
);
