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
import Order from './pages/order/Order';
import OneProduct from './pages/oneProduct/OneProduct';
import Profile from './pages/profile/profilehome/Profile';
import UserInfo from './pages/userinfo/UserInfo';
import UserOrder from './pages/userorder/UserOrder';



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
        path: "/productpage/:id",
        element: <OneProduct />
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
        path: "/order",
        element: <Order />
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
        path: "/profile",
        element: <Profile />,
        children:[
          {
            path: "/profile",
            element: <UserInfo />
          },
          {
            path: "userorder",
            element: <UserOrder />
          },
       
          

        ]

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

