import axios from "axios";
import { useEffect, useState } from "react";
import style from './home.module.css'

export default function Home(){
    const [products,setProducts] = useState([]);

    const getProducts= async ()=>{
       
        const {data}= await axios.get('https://ecommerce-node4.vercel.app/categories/active?page=1&limit=10');
        const categories = data.categories;
        setProducts(categories);
    }

    useEffect( ()=>{
        getProducts();
    },[])
 
    return (
        <>
        <h2 className={style.h2}> welcome in my project</h2>
        <div className={style.products}>
        {
            products.map( product => 
                <div className={style.product} key={product.id}>
                    <h2 className={style.h2}>{product.name}</h2>
                    <img src={product.image.secure_url}  />
                </div>
            ) }
            </div>
        </>
       

    );
}