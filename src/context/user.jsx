import { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
export const UserContext = createContext();

const UserContextProvider =({children})=>{
    const [userToken,setUserToken] = useState(localStorage.getItem('userToken'));
    const [userName,setUserName] = useState(null);
    
    const getUserData = ()=>{
        if(userToken != null){
            const decoded = jwtDecode(userToken);
            setUserName(decoded.userName);
        }

    }

    useEffect( ()=>{
        getUserData();
    },[userToken])


    //هان ارسلت count للنافبار
    const [cartCount, setCartCount]= useState([]);
    const getCart = async ()=>{
        const token = localStorage.getItem('userToken');
        const {data} = await axios.get(`${import.meta.env.VITE_API_URL}/cart`,
        {headers:{
            Authorization:`Tariq__${token}`
          }},)
          setCartCount(data.count);
        };
    useEffect(() => {
        getCart();
      }, []);


    return <UserContext.Provider  value={{setUserToken, userName,setUserName,cartCount}}>
        {children}
    </UserContext.Provider>
};

export default UserContextProvider;