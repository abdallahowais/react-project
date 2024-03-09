import axios from "axios";
import { useState } from "react";
import{ object, string } from 'yup';

export default function Signin() {
    const [user, setUser] = useState({
        email: "",
        password: "",
      });
    
      const [errors, setErrors] = useState([]);
    
      const handelchange = (e) => {
        const { name, value } = e.target;
        setUser({
          ...user,
          [name]: value,
        });
      };
    
      const validateData = async () => {
        const SignInSchema = object({
            email: string().email().required(),
            password: string().min(8).max(20).required(),
        });
    
        try{
        await SignInSchema.validate(user, {abortEarly:false});
        return true;
        }    
        catch(error){
            setErrors(error.errors)
            return false;
        }
    
    
      };
    
    
    
      const handelSubmit = async (e) => {
        e.preventDefault();
    
        const validate = await validateData();
        console.log(validate)
    
        const formData = new FormData();
        formData.append("email", user.email);
        formData.append("password", user.password);
    
        const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/auth/signup`,formData);
        console.log(data);
      };
      return (
        <>
        {errors.length > 0?errors.map(error=>
        <p className="alert alert-warning alert -block in" key={length}>{error}</p>
        ):''}
          <form onSubmit={handelSubmit}>
    
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
    
            <button type="submit">submit</button>
          </form>
        </>
      );
    }
    