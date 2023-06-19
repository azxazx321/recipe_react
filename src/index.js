import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Main from './pages/Main';
import NotFound from './pages/NotFound';
import Live from './pages/Live';
import Mall from './pages/Mall';

let router = createBrowserRouter([
  {path: '/',element: <Main />, errorElement: <NotFound/>},
  {path: '/',element: <Main />,
    children:[
      {
        path:'/live',
        element: <Live />
      },
      {
        path:'/mall',
        element: <Mall />
      }
    ]
}
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <RouterProvider router={router} />
)

