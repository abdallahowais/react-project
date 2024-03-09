import axios from "axios";
import { useState } from "react";
import{ object, string } from 'yup';
import { Slide, toast } from 'react-toastify';


export default function Signup() {
  const [user, setUser] = useState({
    userName: "",
    email: "",
    password: "",
    image: "",
  });

  const [errors, setErrors] = useState([]);

  const handelchange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handelImagechange = (e) => {
    const { name, files } = e.target;
    setUser({
      ...user,
      [name]: files[0],
    });
  };
  const validateData = async () => {
    const SignUpSchema = object({
        userName: string().required().min(5).max(20),
        email: string().email().required(),
        password: string().min(8).max(20).required(),
        image: string().required(),
    });

    try{
    await SignUpSchema.validate(user, {abortEarly:false});
    return true;
    }    
    catch(error){
        setErrors(error.errors)
        return false;
    }


  };



  const handelSubmit = async (e) => {
    e.preventDefault();

    if(await validateData()){

    const formData = new FormData();
    formData.append("userName", user.userName);
    formData.append("email", user.email);
    formData.append("password", user.password);
    formData.append("image", user.image);

    try{
    const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/auth/signup`, formData);
      setUser({
        userName:'',
        email:'',
        password:'',
        image:'',
      });
      if(data.message=='success'){
        toast.success('Account created successfully', {
          position: "top-right",
          autoClose: false,
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
        if(error.response.status === 409 ){
          toast.error(error.response.data.message, {
            position: "bottom-right",
            autoClose: false,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false,
            progress: undefined,
            theme: "dark",
            transition: Slide,

            });
        }
    }

  }
}

  return (
    <>
    {errors.length > 0?errors.map(error=>
    <p className="alert alert-warning alert -block in" key={length}>{error}</p>

    ):''}
      <form onSubmit={handelSubmit}>
        <label>username</label>
        <input type="text"
          value={user.userName}
          name="userName"
          onChange={handelchange}
        />

        <label>email</label>
        <input
          type="email"
          value={user.email}
          name="email"
          onChange={handelchange}
        />

        <label>password</label>
        <input
          type="password"
          value={user.password}
          name="password"
          onChange={handelchange}
        />

        <label>image</label>
        <input type="file" name="image" onChange={handelImagechange} />

        <button type="submit">submit</button>
      </form>
    </>
  );
}
