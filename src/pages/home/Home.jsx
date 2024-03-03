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
        <h2 className={style.title}> welcome in our store</h2>

            <div className={style.products}>
        {
            products.map( product =>            
                 <div className="card" style={{width: '18rem'}} key={product.id}>
                <img src={product.image.secure_url} className="card-img-top"/>
                <div className="card-body">
                    <h5 className="card-title">{product.name}</h5>
                </div>
                </div>

            ) }
            </div>



        </>
       

    );
}