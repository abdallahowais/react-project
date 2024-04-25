import axios from "axios";
import { useEffect, useState } from "react";
import Loader from "../../components/loader/Loader";
import style from "./oneproduct.module.css";
import { useParams } from "react-router-dom";
import { Slide, toast } from "react-toastify";
import SmallLoader from "../../components/loader/SmallLoader";





export default function OneProduct() {
    const {id} =useParams('id');

  const [product, setProduct] = useState([]);
  const [loder, setLoder] = useState(true);
  const [error, setError] = useState("");

  const getProducts = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL }/products/${id}`);
      setProduct(data);
      setError("");
      console.log(data)
    } catch {
      setError("Error to load data");
    } finally {
      setLoder(false);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  if (loder) {
    return <Loader />;
  }
  function renderRatingStars(avgRating, starSize) {
    const rating = parseFloat(avgRating);
    const stars = [];
    
    const starStyle = {
        fontSize: starSize 
    };

    for (let i = 1; i <= 5; i++) {
        if (i <= rating) {
            stars.push(<span key={i} style={starStyle}>&#9733;</span>);
        } else {
            stars.push(<span key={i} style={starStyle}>&#9734;</span>);
        }
    }
    return stars;
}
const addToCart=async(productId)=>{
  setLoder(true);

  
  try { 
  const token = localStorage.getItem('userToken');
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
    setLoder(false);
  }
}


  return (
    <>
   <div className="container">
      <h2 className={style.title}>Welcome to our store</h2>
      {error ? <p className={style.error}>{error}</p> : null}
      <div className={` ${style.products}`}>
        {product.message != 'success' ? (

            <div className={style.noProductsContainer}>
            <h2 className={style.noProductsTitle}>Sorry, there are currently no products to display</h2>
            <p className={style.noProductsMessage}>Please check back later for updates.</p>
          </div>

        ) : (
          <div className={style.maincontainer} >
          {
            <div className={style.productContainer} >

           <div className={`${style.imgcontainer}`}>
              <img  className={`img-fluid ${style.mainimage}`} src={product.product.mainImage.secure_url}  alt={product.product.name} />
               {/* subimage */}
               <div id="carouselExampleDark" className={`carousel carousel-dark slide ${style.subimage}`}>
  <div className="carousel-indicators">
    {product.product.subImages.map((subImage, index) => (
      <button 
        key={index}
        type="button"
        data-bs-target="#carouselExampleDark"
        data-bs-slide-to={index}
        className={index === 0 ? "active" : ""}
        aria-current={index === 0 ? "true" : ""}
        aria-label={`Slide ${index + 1}`}
      ></button>
    ))}
  </div>
  <div className="carousel-inner">
    {product.product.subImages.map((subImage, index) => (
      <div className={`carousel-item ${index === 0 ? "active" : ""}`} key={index}>
        <img src={subImage.secure_url} className="d-block w-100" alt={product.name} />
        
      </div>
    ))}
  </div>
  <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Previous</span>
  </button>
  <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Next</span>
  </button>
</div>
{/* end of supimage */} 
</div>

                <div className={style.info}>
                    <div className={`${style.namerate}`}>
                    <h2>{product.product.name}</h2>

                    <div className={style.avgRating}>
                    <p>{Math.floor(`${product.avgRating}`)} </p>
                    <p className={style.avgRate}>{renderRatingStars(product.avgRating, '24px')}</p>
                    </div>

                    </div>
                    <hr />

                    <h5 className={style.price}>price:  ${product.product.price} </h5>
                    <hr />

                    <h5 className={style.discrip}>{product.product.description}</h5>
                    <hr />
                    <div className={`${style.addtocart}`}>
                    <button disabled={loder?'disabled':null} onClick={()=>addToCart(product.product._id)} className="btn btn-dark"> {!loder?"add to cart":<SmallLoader />}</button>
                    </div>

                </div>

            </div>
          }



          <div className={style.reviewsContainer}>
  <ul className={style.ull}>
    
    {product.product.reviews.map((review, index) => (
      <li className={style.lii} key={index}>
        <img  className={style.userimage} src={review.createdBy.image.secure_url}  alt={product.product.name} />
        <p>{review.createdBy.userName}</p>
        <p className={style.avgRate}>{review.rating} {renderRatingStars(review.rating,'18px')}</p>
        <p>{review.comment}</p>       
        <hr />

      </li>
    ))}
  </ul>
</div>



          
          </div>
        )}
      </div>
      </div>
    </>
  );
}
