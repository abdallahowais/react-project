import axios from 'axios';
import  { useEffect, useState } from 'react';
import { CiCircleMinus } from "react-icons/ci";
import { CiCirclePlus } from "react-icons/ci";
import style from "./cart.module.css";

export default function Cart() {
    const [cart, setCart]= useState([]);
    const getCart = async ()=>{
        const token = localStorage.getItem('userToken');
        const {data} = await axios.get(`${import.meta.env.VITE_API_URL}/cart`,
        {headers:{
            Authorization:`Tariq__${token}`
          }},)
          setCart(data.products);
          console.log(data.products)
        };
    useEffect(() => {
        getCart();
      }, []);


      const clearCart=async(productId)=>{
        const token = localStorage.getItem('userToken');
        const {data}= await axios.patch(`${import.meta.env.VITE_API_URL}/cart/clear`,{
          productId
        },
        {
          headers:{
            Authorization:`Tariq__${token}`
          },
        });
        if(data.message=='success'){
          const {data} = await axios.get(`${import.meta.env.VITE_API_URL}/cart`,
          {headers:{
              Authorization:`Tariq__${token}`
            }},)
            setCart(data.products);
        
          }
      };

      const plusItem=async(productId)=>{
        const token = localStorage.getItem('userToken');
        const {data}= await axios.patch(`${import.meta.env.VITE_API_URL}/cart/incraseQuantity`,{
          productId
        },
        {
          headers:{
            Authorization:`Tariq__${token}`
          },
        });
        if(data.message=='success'){
          const {data} = await axios.get(`${import.meta.env.VITE_API_URL}/cart`,
          {headers:{
              Authorization:`Tariq__${token}`
            }},)
            setCart(data.products);
        
          }
      };
      const minusItem=async(productId)=>{
        const token = localStorage.getItem('userToken');
        const {data}= await axios.patch(`${import.meta.env.VITE_API_URL}/cart/decraseQuantity`,{
          productId
        },
        {
          headers:{
            Authorization:`Tariq__${token}`
          },
        });
        if(data.message=='success'){
          const {data} = await axios.get(`${import.meta.env.VITE_API_URL}/cart`,
          {headers:{
              Authorization:`Tariq__${token}`
            }},)
            setCart(data.products);
          }
      };
      const removeItem=async(productId)=>{
        const token = localStorage.getItem('userToken');
        const {data}= await axios.patch(`${import.meta.env.VITE_API_URL}/cart/removeItem`,{
          productId
        },
        {
          headers:{
            Authorization:`Tariq__${token}`
          },
        });
        if(data.message=='success'){
            const {data} = await axios.get(`${import.meta.env.VITE_API_URL}/cart`,
            {headers:{
                Authorization:`Tariq__${token}`
              }},)
              setCart(data.products);
          
            }
          }
      
      

    return (
      <>
      <div className={`container  ${style.aaa}`}>
        {cart.map((carts, index) => (
          <div className={`container col-md-12 ${style.aa}`} key={index}>
            <img
              src={carts.details.mainImage.secure_url}
              alt={carts.details.name}
            />

            <h6>{carts.details.name} </h6>
            <h6>Price per Unit: ${carts.details.price}</h6>
            <h6>Total Price: ${carts.details.price * carts.quantity}</h6>

            <div>
            <CiCirclePlus onClick={()=>plusItem(carts.details._id)}/>
            <h6>{carts.quantity}</h6>
            <CiCircleMinus disabled={`${carts.quantity<=0}`?'disabled':null} onClick={()=>minusItem(carts.details._id)}/>
            </div>
            
            <button className="btn btn-outline-dark" onClick={()=>removeItem(carts.details._id)}>Remove item</button>
          </div>
          
        ))}
        <button onClick={()=>clearCart()} className="btn btn-outline-dark">clear all</button>

        </div>
      </>
    );
}