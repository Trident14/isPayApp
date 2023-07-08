import { Link } from "react-router-dom";

import logoTextStyle from '../asset/logoTextStyle.png'

import '../css/Navbar.css';
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";


export const Navbar = () => {
  const[cookies,setCookies]=useCookies(["access_token"])
  const Navigate=useNavigate();
  const logout =()=>{
    //seting the cookie to ""
    //removing from localstorage, navigate back to home page
    setCookies("access_token","");
    window.localStorage.removeItem("username");
    Navigate("/");
  }
  const handleLogo=()=>{
    cookies.access_token?Navigate("/dashboard"):Navigate("/")
  }

  return (
    <div className="nav">
      <div className="nav-items">
      <div className="logo">
          <Link  onClick={handleLogo}> 
            <img  className="nav-logo " src={logoTextStyle} alt="Logo" />
          </Link>
      </div>
        <div className="nav-item">
        <div className='auth'>
             {!cookies.access_token?<div></div>
                  : <button className="logout-btn" onClick={logout}>
                    <h1 className="text-btn">logout</h1>
              </button>}
        </div>
           
        </div>
      </div>
    </div>
  );
};
