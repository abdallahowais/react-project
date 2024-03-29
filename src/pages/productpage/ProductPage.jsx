import React, { useEffect, useState } from "react";
import Loader from "../../components/loader/Loader";
import axios from "axios";
import style from "../categories/categories.module.css"
import { NavLink } from "react-router-dom";

export default function ProductPage() {
    const [products, setProducts] = useState([]);
    const [datapagination, setDatapagination] = useState({ page: 1, total: 1 });
    const [loder, setLoder] = useState(true);
    const [error, setError] = useState("");

    const getProducts = async () => {
        try {
            const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/products?page=1&limit=4`);
            setProducts(data.products);
            setDatapagination(data);
            setError("");
        } catch (error) {
            console.error('Error fetching data:', error);
            setError("Error to load data");
        } finally {
            setLoder(false);
        }
    };

    useEffect(() => {
        getProducts();
    }, []);
    const [aa, setAa] = useState(true);

    function handlePageChange(pageNumber) {
      setAa(pageNumber)
        async function fetchData() {
            try {
                const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/products?page=${pageNumber}&limit=4`);
                setProducts(data.products);
                setDatapagination(data);
                setError("");
            } catch (error) {
                console.error('Error fetching data:', error);
                setError("Error to load data");
            } finally {
                setLoder(false);
            }
        }

        fetchData();
    }

    if (loder) {
        return <Loader />;
    }

    function renderRatingStars(avgRating) {
        const rating = parseFloat(avgRating);
        const stars = [];

        for (let i = 1; i <= 5; i++) {
            if (i <= rating) {
                stars.push(<span key={i}>&#9733;</span>);
            } else {
                stars.push(<span key={i}>&#9734;</span>);
            }
        }
        return stars;
    }

    return (
        <>
            <div className='container d-flex flex-column gap-3 align-items-center' >
                <h2 className={style.title}> Welcome in our store</h2>

                {error ? <p className={style.error}>{error}</p> : null}

                <div className={style.products}>
                    {products.map((product) => (
                        <div className={`card ${style.card}`} style={{ width: "18rem" }} key={product.id}>
                            <img src={product.mainImage.secure_url} className="card-img-top" />
                            <div className="card-body">
                                <h6>{product.name}</h6>
                                <div>
                                    {`${product.discount}` != 0 ? <del> <h6>${product.price}</h6> </del> : <h6>${product.price}</h6>}


                                    {`${product.discount}` != 0 ? <h6>${product.finalPrice}</h6> : null}
                                </div>
                                <p>{renderRatingStars(product.avgRating)}</p>

                                <NavLink className="btn btn-outline-dark" to={`/products?id=${product.id}`}>details</NavLink>

                            </div>
                        </div>
                    ))}
                </div>
                <nav aria-label="Page navigation example">
                    <ul className="pagination">
                        <li className={`page-item ${aa=== 1 ? 'disabled' : ''}`}>
                            <button className="page-link"  aria-label="Previous" onClick={() => handlePageChange(aa- 1)}>
                                <span aria-hidden="true">«</span>
                            </button>
                        </li>
                        {Array.from({ length: Math.ceil(datapagination.total /datapagination.page) }, (_, index) => index + 1).map(pageNumber => (
                            <li key={pageNumber} className={`page-item ${pageNumber === aa ? 'active' : ''}`}>
                                <button className="page-link" onClick={() => handlePageChange(pageNumber)}>{pageNumber}</button>
                            </li>
                        ))}
                         <li className={`page-item ${aa === Math.ceil(datapagination.total /datapagination.page) ? "disabled" : ''}`}>
                            <button className="page-link"  aria-label="next" onClick={() => handlePageChange(aa+ 1)}>
                                <span aria-hidden="true">»</span>
                            </button>
                        </li>
                       
                    </ul>
                </nav>

            </div>
        </>
    );
}