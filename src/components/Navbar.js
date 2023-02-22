import React from 'react'
import { useEffect } from 'react';
import {
  Link,
  useLocation,
  useNavigate
} from "react-router-dom";

function Navbar(props) {
    let Navigate = useNavigate();
    let location = useLocation();

  useEffect(() => {
    console.log(location.pathname)
  }, [location]);
 
  const handleOnLogout =()=>{
    localStorage.removeItem('token')
    Navigate("/login");
    props.showEmail("")
  }

  return (
   <>
     <nav className="navbar navbar-expand-lg navbar-dark"  style={{background: "#045a68"}} >
            <div className="container-fluid">
            
                <Link className="navbar-brand" to="/">iNotebook</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname==="/"?"active" :""}`} aria-current="page" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname==="/about"?"active" :""}`} to="/about">About</Link>
                        </li>

                    </ul>
                    <label style={{color:"white",margin:"2px"}} htmlFor="username">{props.mail}</label>
                   
                    {!localStorage.getItem('token')?<form className="d-flex">
                    <Link className="btn btn-light mx-1" style={{background: "#045a68",color:"white"}} to="/login" role="button">Login</Link>
                    <Link className="btn btn-light" style={{background: "#045a68",color:"white"}}  to="signup" role="button">Sign  up</Link>
                   
                    </form> :<button onClick={handleOnLogout} style={{background: "#045a68",color:"white"}} className='btn btn-light'>Logout</button>} 
                </div>
            </div>
        </nav>
        </>
  )
}

export default Navbar
