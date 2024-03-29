import axios from "axios";
import { useEffect, useState } from "react";
import Loader from "../../components/loader/Loader";
import style from "./products.module.css";
import { useSearchParams } from "react-router-dom";
import { Slide, toast } from 'react-toastify';
import SmallLoader from "../../components/loader/SmallLoader";




export default function Products() {
   let [searchParams] = useSearchParams();
   const [loader, setLoader] = useState(false);

   let id = searchParams.get('id');
  


  const [productCategories, setproductCategories] = useState([]);
  const [loder, setLoder] = useState(true);
  const [error, setError] = useState("");

  const getProductsCategories = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL }/products/category/${id}`);
      setproductCategories(data.products);
      setError("");
      console.log(data.products.length)
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
    setLoader(true);

    
  try { const token = localStorage.getItem('userToken');
      const {data}= await axios.post(`${import.meta.env.VITE_API_URL}/cart`,{
        productId
      },
      {
        headers:{
          Authorization:`Tariq__${token}`
        },
      });
    }
    catch(error){
      console.log(error);
          toast.error(error.response.data.message, {
            position: "bottom-right",
            autoClose: 4000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false,
            progress: undefined,
            theme: "dark",
            transition: Slide,

            });
        
    }
    finally{
      setLoader(false);
    }
  };

  return (
    <>
    <div className="container">
      <h2 className={style.title}>Welcome to our store</h2>
      {error ? <p className={style.error}>{error}</p> : null}
      <div className={` ${style.products}`}>
        {productCategories.length === 0 ? (

            <div className={style.noProductsContainer}>
            <h2 className={style.noProductsTitle}>Sorry, there are currently no products to display</h2>
            <p className={style.noProductsMessage}>Please check back later for updates.</p>
          </div>

        ) : (
          <div className={style.product}>
          {
          productCategories.map((product) => (
            <div className={`card ${style.card}`} key={product._id}>
              <h6>{product.name}</h6>
              <img src={product.mainImage.secure_url} className="card-img-top" alt={product.name} />
              <h5>${product.price} </h5>
              <button disabled={loader?'disabled':null} onClick={()=>addToCart(product._id)} className="btn btn-outline-dark"> {!loader?"add to cart":<SmallLoader />}</button>
            </div>
          ))
          }
          </div>
        )}
      </div>
      </div>
    </>
  );
}
