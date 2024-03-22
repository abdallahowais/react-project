import axios from "axios";
import { useEffect, useState } from "react";
import Loader from "../../components/loader/Loader";
import style from "./products.module.css";
import { useSearchParams } from "react-router-dom";


export default function Products() {
   let [searchParams] = useSearchParams();
   let id = searchParams.get('id');
  


  const [productCategories, setproductCategories] = useState([]);
  const [loder, setLoder] = useState(true);
  const [error, setError] = useState("");

  const getProductsCategories = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL }/products/category/${id}`);
      setproductCategories(data.products);
      setError("");
    } catch {
      setError("Error to load data");
    } finally {
      setLoder(false);
    }
  };

  useEffect(() => {
    getProductsCategories();
  }, []);

  if (loder) {
    return <Loader />;
  }

  const addToCart=async(productId)=>{
    const token = localStorage.getItem('userToken');
    const {data}= await axios.post(`${import.meta.env.VITE_API_URL}/cart`,{
      productId
    },
    {
      headers:{
        Authorization:`Tariq__${token}`
      },
    });
  };

  return (
    <>
      <h2 className={style.title}>Welcome to our store</h2>
      {error ? <p className={style.error}>{error}</p> : null}
      <div className={`container ${style.products}`}>
        {productCategories.length === 0 ? (

            <div className={style.noProductsContainer}>
            <h2 className={style.noProductsTitle}>Sorry, there are currently no products to display</h2>
            <p className={style.noProductsMessage}>Please check back later for updates.</p>
          </div>

        ) : (
          productCategories.map((product) => (
            <div key={product._id}>
              <h6>{product.name}</h6>
              <img src={product.mainImage.secure_url} className="card-img-top" alt={product.name} />
              <h5>${product.price} </h5>
              <button onClick={()=>addToCart(product._id)} className="btn btn-outline-dark">add to cart successfully</button>
            </div>
          ))
        )}
      </div>
    </>
  );
}
