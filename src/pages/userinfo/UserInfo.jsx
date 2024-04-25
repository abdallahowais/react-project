import React, { useEffect, useState } from "react";
import style from './userinfo.module.css'
import axios from "axios";

export default function UserInfo(){
    const [user,setUser] =useState([]);
   

    const getInfo = async () => {
        try {
            const token = localStorage.getItem('userToken');

            const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/user/profile`,
            {
                headers:{
                  Authorization:`Tariq__${token}`
                },
              });
              setUser(data);
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
          <div>
         

          </div>

        </>
    )
}
