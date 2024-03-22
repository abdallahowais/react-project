import axios from "axios";
import { useEffect, useState } from "react";
import style from "./categories.module.css";
import { NavLink } from "react-router-dom";
import Loader from "../../components/loader/Loader";

export default function Categories() {
  const [products, setProducts] = useState([]);
  const [loder, setLoder] = useState(true);
  const [error, setError] = useState("");

  const getProducts = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/categories/active?page=1&limit=10`);
      setProducts(data.categories);
      setError("");
    } catch {
      console.log("catch error");
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

  return (
    <>
    <div className='container'>
      <h2 className={style.title}> welcome in our store</h2>

      {error ? <p className={style.error}>{error}</p> : null}

      <div className={style.products}>
        {products.map((product) => (
          <div className={`card ${style.card}`} style={{ width: "18rem" }} key={product.id}>
            <img src={product.image.secure_url} className="card-img-top" />
            <div className="card-body">
              <NavLink className="btn btn-dark" to={`/products?id=${product.id}`}> {product.name}</NavLink>

            </div>
          </div>
        ))}
      </div>
      </div>
    </>
  );
}
