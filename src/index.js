import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Main from './pages/Main';
import NotFound from './pages/NotFound';

let router = createBrowserRouter([
  {path: '/',element: <Main />, errorElement: <NotFound/>}
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <RouterProvider router={router} />
)

