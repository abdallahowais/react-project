import { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/user";
import { CgProfile } from "react-icons/cg";
import style from './navbar.module.css';
import { TiShoppingCart } from "react-icons/ti";


export default function Navbar() {
 const {userName,setUserName,setUserToken,cartCount} = useContext(UserContext);
  


  const navigate =useNavigate();
 const logout = ()=>{
  localStorage.removeItem('userToken');
  setUserToken(null);
  setUserName(null);
  navigate('/signin');
 };
  return (


    <nav  className="navbar navbar-expand-lg bg-body-tertiary sticky-top">
      <div className={`container position-sticky ${style.aa}`}>
        <div className={style.title}>
        <img className={style.titleImg} src="../title.PNG" alt="" />
        <a className="navbar-brand" href="#">haven style</a>
        </div>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">

          {
            userName ? <>
             <ul className="navbar-nav me-auto mb-2 mb-lg-0">

            <li className="nav-item">
              <NavLink className="nav-link" to='/'>Home</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to='/productpage'>Products</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to='cart'><TiShoppingCart  size={25} color="white" className={style.carticon}/> 
              <span className="position-absolute top-1 translate-middle badge rounded-pill bg-danger">
              {`${cartCount}`}  </span>
              </NavLink>
            </li>


          </ul>
          <ul className="navbar-nav  mb-2 mb-lg-0">
          <li className="nav-item">
              <NavLink className="nav-link" to='profile'><CgProfile size={20}/> {userName}</NavLink>
            </li>
            <li className="nav-item">
              <button className={`btn btn-outline-primary m-2 ${style.buttonColor}`} onClick={logout}>Sign Out</button>
            </li>
           
          </ul>
            
            </>:
            <>
             <ul className="navbar-nav me-auto mb-2 mb-lg-0">

            <li className="nav-item">
              <NavLink className="nav-link" to='/'>Home</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to='/productpage'>Products</NavLink>
            </li>


          </ul>
          <ul className="navbar-nav  mb-2 mb-lg-0">
          <li className="nav-item">
              <NavLink className={`btn btn-outline-primary m-2 ${style.buttonColor}`} to='signin'>Sign In</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={`btn btn-outline-primary m-2 ${style.buttonColor}`} to='signup'>Sign Up</NavLink>
            </li>
            
          </ul>
            
            </>
          }
         

        </div>
      </div>
    </nav>






  )
}