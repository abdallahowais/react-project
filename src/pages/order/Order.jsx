import axios from "axios";
import { useEffect, useState } from "react";
import style from './order.module.css'
import { number, object, string } from "yup";
import { Slide, toast } from "react-toastify";

export default function Order(){    
    const [cart, setCart]= useState([]);
    const [errors, setErrors] = useState([]);

    const [loader, setLoader] = useState(false);
  
    const getCart = async ()=>{
        const token = localStorage.getItem('userToken');
        const {data} = await axios.get(`${import.meta.env.VITE_API_URL}/cart`,
        {headers:{
            Authorization:`Tariq__${token}`
          }},)
          setCart(data.products);

        };
    useEffect(() => {
        getCart();
      }, []);



    // orderr
    const [user, setUser] = useState({
      couponName: "",
      address: "",
      phone: "",


    });
    const handelchange = (e) => {
      const { name, value } = e.target;
      setUser({
        ...user,
        [name]: value,
      });
    };
  
    const validateData = async () => {
      const SignInSchema = object({
        couponName: string(),
        address: string().required(),
        phone: number().required(),

      });
  
      try{
      await SignInSchema.validate(user, {abortEarly:false});
      return true;
      }    
      catch(error){
          setErrors(error.errors)
          setLoader(false);
          return false;
      }
    };

  
  
    
  const handelSubmit = async (e) => {
    e.preventDefault();

    setLoader(true);
    
    if(await validateData()){

   

    try{
      const token = localStorage.getItem('userToken');

    const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/order`, 
    {
      couponName:user.couponName,
      address:user.address,
      phone:user.phone,

    },
    {
      headers:{
      Authorization:`Tariq__${token}`
     }},
  
    );

    
      setUser({
        couponName: "",
        address: "",
        phone: "",
      });
      if(data.message=='success'){
        toast.success(`order ${data.message}`,data.message,{
          position: "top-right",
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

    }catch(error){
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

  }
}
    //end if order
    return(
    <>
    <div className={style.container}>
    <div className={`container col-md-12  col-lg-12 ${style.contain}`}>
        {cart.map((carts, index) => (
          <div className={` ${style.cartWithInage} `} key={index}>
            <img
              src={carts.details.mainImage.secure_url}
              alt={carts.details.name}
            />
            <div className={` ${style.cartWithOutInage} `} >
            <h3>{carts.details.name} </h3>
            <h6>The price after discount: ${carts.details.finalPrice}</h6>
            <h6>quantity: {carts.quantity} </h6>
            <h6>Total Price: ${carts.details.finalPrice * carts.quantity}</h6>
            </div>
          </div>
          
        ))}
    </div> 


    <form className={style.aa} onSubmit={handelSubmit}>
          <h1>order</h1>

        <label>coupon Name</label>
        <input
          type="text"
          value={user.couponName}
          name="couponName"
          onChange={handelchange}
        />

        <label>address</label>
        <input
          type="text"
          value={user.address}
          name="address"
          onChange={handelchange}
        />
         <label>phone</label>
        <input
          type="text"
          value={user.phone}
          name="phone"
          onChange={handelchange}
        />


        <button type="submit" className="btn btn-danger" disabled={loader?'disabled':null} >
          {!loader?"Order":"wait..."}</button>
         

      </form>
      </div>
    </>
    )
}