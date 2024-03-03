import {createBrowserRouter,RouterProvider} from 'react-router-dom';
import Home from './pages/home/Home';
import Roots from './routes/Roots';
import Products from './pages/products/Products';
import Cart from './pages/cart/Cart';

import Signin from './pages/signin/Signin';
import Signup from './pages/signup/Signup';
import Notfound from './pages/notfound/Notfound';
import Categories from './pages/categories/Categories';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Roots />,
    children:[
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/categories",
        element: <Categories />
      },
      {
        path: "/products",
        element: <Products />
      },
      {
        path: "/cart",
        element: <Cart />
      },
   
   
      {
        path: "/signin",
        element: <Signin />
      },
      {
        path: "/signup",
        element: <Signup />
      },
      {
        path:'*',
        element:<Notfound/>
      }
   
    ]
  },

]);

export default function App() {
  return (
    <>
    <RouterProvider router={router} />
    </>
  );
}

