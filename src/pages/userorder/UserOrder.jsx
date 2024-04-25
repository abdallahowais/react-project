import React, { useEffect, useState } from "react";
import style from './userorder.module.css'
import axios from "axios";
export default function UserOrder(){
    const [order,setOrder] =useState([]);
   

    const getInfo = async () => {
        try {
            const token = localStorage.getItem('userToken');

            const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/order`,
            {
                headers:{
                  Authorization:`Tariq__${token}`
                },
              });
              setOrder(data);
              console.log(data)
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        getInfo();
    }, []);

    return(

        <>

            UserOrder
        </>
    )
}
