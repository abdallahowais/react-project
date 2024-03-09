import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (


    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container">
        <a className="navbar-brand" href="#">title</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">

          <ul className="navbar-nav me-auto mb-2 mb-lg-0">

            <li className="nav-item">
              <NavLink className="nav-link" to='/'>Home</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to='/products?id=656afd2a5f24a07ecd5a5090'>Products</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to='cart'>Cart</NavLink>
            </li>


          </ul>
          <ul className="navbar-nav  mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink className="nav-link" to='signup'>Sign Up</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to='signin'>Sign In</NavLink>
            </li>
          </ul>

        </div>
      </div>
    </nav>






  )
}