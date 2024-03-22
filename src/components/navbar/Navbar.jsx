import { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/user";

export default function Navbar() {
 const {userName,setUserName,setUserToken} = useContext(UserContext);
  const navigate =useNavigate();
 const logout = ()=>{
  localStorage.removeItem('userToken');
  setUserToken(null);
  setUserName(null);
  navigate('/signin');
 };
  return (


    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container">
        <a className="navbar-brand" href="#">title</a>
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
              <NavLink className="nav-link" to='cart'>Cart</NavLink>
            </li>


          </ul>
          <ul className="navbar-nav  mb-2 mb-lg-0">
          <li className="nav-item">
              <NavLink className="nav-link" to='signin'>Hi {userName}</NavLink>
            </li>
            <li className="nav-item">
              <button className="btn btn-outline-info m-2" onClick={logout}>Sign Out</button>
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
              <NavLink className="btn btn-outline-info m-2" to='signin'>Sign In</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="btn btn-outline-info  m-2" to='signup'>Sign Up</NavLink>
            </li>
            
          </ul>
            
            </>
          }
         

        </div>
      </div>
    </nav>






  )
}