import axios from "axios";
import { useContext, useState } from "react";
import{ object, string } from 'yup';
import { Slide, toast } from 'react-toastify';
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/user";
import style from"../signin/signin.module.css";



export default function Forgetpassword() {
  const {setUserToken} = useContext(UserContext);

  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: "",
    code: "",


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
    const ForgetpasswordSchema = object({
        email: string().email().required(),
        password: string().min(8).max(20).required(),
        code: string().required(),

    });

    try{
    await ForgetpasswordSchema.validate(user, {abortEarly:false});
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
    const { data } = await axios.patch(`${import.meta.env.VITE_API_URL}/auth/forgotPassword`, 
    {
      email:user.email,
      password:user.password,
      code:user.code,

    });
      setUser({
        email:'',
        password:'',
        code:'',

      });
      console.log(data)
      if(data.message=='success'){
        toast.success('password change successfully', {
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
       setUserToken(data.token);


       navigate('/signIn');
         
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

  return (
    <>
    <div className={style.cotain}>

    <div className={style.eroor}>
    {errors.length > 0?errors.map(error=>
     <p className={`alert alert-warning alert -block in   ${style.error}`} key={length}>{error}</p>
    ):''}
    </div>

      <form onSubmit={handelSubmit}>
          <h1>Forget password</h1>

        <label>Email</label>
        <input
          type="email"
          value={user.email}
          name="email"
          onChange={handelchange}
        />

        <label>Password</label>
        <input
          type="password"
          value={user.password}
          name="password"
          onChange={handelchange}
        />
         <label>code</label>
        <input type="text"
          value={user.code}
          name="code"
          onChange={handelchange}
        />


        <button type="submit" className="btn btn-danger" disabled={loader?'disabled':null} >
          {!loader?"LogIn":"wait..."}</button>
      </form>
      </div>
    </>
  );
}

