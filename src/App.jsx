import {createBrowserRouter,RouterProvider} from 'react-router-dom';
import Home from './pages/home/Home';
import Roots from './routes/Roots';
import Products from './pages/products/Products';
import Cart from './pages/cart/Cart';

import Signin from './pages/signin/Signin';
import Signup from './pages/signup/Signup';
import Notfound from './pages/notfound/Notfound';

import { ToastContainer} from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import ProtectedRouter from './components/ProtectedRouter';
import UserContextProvider from './context/user';
import ProductPage from './pages/productpage/ProductPage';
import Sendcode from './pages/lostpassword/Sendcode';
import Forgetpassword from './pages/lostpassword/Forgetpassword';

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
        path: "/productpage",
        element: <ProductPage />
      },
      {
        path: "/products",
        element: <Products />
      },
      {
        path: "/cart",
        element:
        <ProtectedRouter>
           <Cart />
        </ProtectedRouter> 
        ,
       

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
        path: "/signin/signup",
        element: <Signup />
      },
      {
        path: "/signin/sendcode",
        element: <Sendcode />
      },
      
      {
        path: "/signin/sendcode/Forgetpassword",
        element: <Forgetpassword />
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
    <UserContextProvider>
    <RouterProvider router={router} />
    </UserContextProvider>

    <ToastContainer />
    </>
  );
}

