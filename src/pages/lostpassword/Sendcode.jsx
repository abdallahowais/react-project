import axios from "axios";
import { useState } from "react";
import{ object, string } from 'yup';
import { Slide, toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import style from"../lostpassword/sendcode.module.css";



export default function Sendcode() {

  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
  });

  const [errors, setErrors] = useState([]);

  const [loader, setLoader] = useState(false);

  const handelchange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const validateData = async () => {
    const SendcodeSchema = object({
        email: string().email().required(),
    });

    try{
    await SendcodeSchema.validate(user, {abortEarly:false});
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
    const { data } = await axios.patch(`${import.meta.env.VITE_API_URL}/auth/sendcode`, 
    {
      email:user.email,
    });
      setUser({
        email:'',
      });
      if(data.message=='success'){
        toast.success('code send successfully check your email', {
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
       localStorage.setItem('userToken',data.token);


       navigate('/signin/sendcode/Forgetpassword');
         
     }
     console.log(data)
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

  return (
    <>
    <div className={style.cotain}>

    <div className={style.eroor}>
    {errors.length > 0?errors.map(error=>
     <p className={`alert alert-warning alert -block in   ${style.error}`} key={length}>{error}</p>
    ):''}
    </div>

      <form onSubmit={handelSubmit}>
          <h6>Please, enter your email to retrieve your password</h6>

        <label>Email</label>
        <input
          type="email"
          value={user.email}
          name="email"
          onChange={handelchange}
        />



        <button type="submit" className="btn btn-danger" disabled={loader?'disabled':null} >
          {!loader?"Send code":"wait..."}</button>
      </form>
      </div>
    </>
  );
}
