import { useState } from "react"
import  axios from "axios"  //calling api 
import {useCookies} from 'react-cookie'  //storing cookie
import {useNavigate} from 'react-router-dom' //for redirecting to page
import '../css/auth.css';
import { Navbar } from "./Navbar.js"



export const Auth = () => {
    const [username,setUsername]=useState("")
    const [password,setPassword]=useState("")
    const [_,setCookies]=useCookies(["access_token"]);
    const Navigate=useNavigate();
    const [isSignIn, setIsSignIn] = useState(true);
    const [rightPanelActive, setRightPanelActive] = useState(false);

    const validateUsername = () => {
  if (username.length === 0) {
    return "Username is required";
  } else {
    return null;
  }
};

const validatePassword = () => {
  if (password.length === 0) {
    return "Password is required";
  } else {
    return null;
  }
};

    const makeChanges = (rightPanelActive) => {
      if (rightPanelActive) {
        return "container right-panel-active";
      } else {
        return "container";
      }
    };
  const onSignIn=()=>{
    setIsSignIn(true);
    setRightPanelActive(false);
  }
  const onSignUp=()=>{
    setIsSignIn(false);
    setRightPanelActive(true);
  }
  const handleSignUpClick = async(event) => {
    event.preventDefault()  //this prevents react default onsubmit bheaviour
    //can use try catch or promiss
    try{
        const response=await axios.post("https://ispay.onrender.com/register",{username,password});
       alert(response.data.message)
        
    }catch(err){
       alert(err.data.message)
       
    }
   
  };

  const handleSignInClick = async (event) => {
    event.preventDefault();
  
    try {
      const response = await axios.post("https://ispay.onrender.com/login", { username, password });
  
      setCookies("access_token", response.data.token);
      window.localStorage.setItem("username", response.data.username);
  
      if (response.data.isAdmin) {
        Navigate("/adminPanel");
      } else {
        // Redirect to the dashboard only if the user exists
        if (response.data.username) {
          Navigate("/dashboard");
        } else {
          alert("User does not exist. Please check your credentials.");
        }
      }
    } catch (err) {
      if (err.response && err.response.status === 401) {
        alert(err.data.message);
      } else {
        alert("An error occurred. Please try again later.");
      }
    }
  };
  
 
  return (
    <>
    <Navbar />
    <div className="main">
    <div className={makeChanges(rightPanelActive)}>
            <div className="form-container sign-up-container">
                <form className="form-field-login-inner" onSubmit={handleSignUpClick}>
                  <h1>Register</h1>
                    <input
                    type="text"
                    placeholder="Username"
                    onChange={(e) => setUsername(e.target.value)}
                    required error={validateUsername()}
                    />
                    <input className="passField"
                    type="password"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    error={validatePassword()}
                    />
                    <button  className="register-button" type="submit">Register</button>
                </form>
            </div>

            <div className="form-container sign-in-container">
                <form className="form-field-login-inner" onSubmit={handleSignInClick}>
                <h1>Login</h1>
                    <input
                    type="text"
                    placeholder="Username"
                    onChange={(e) => setUsername(e.target.value)}
                    required error={validateUsername()}
                    />
                    <input className="passField"
                    type="password"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                    required error={validatePassword()}
                   
                    />
                    <button  className="register-button" type="submit">Login</button>
                </form>
            </div>
            <div className="overlay-container">
                <div className="overlay">
                        <div className="overlay-panel overlay-left" >
                            <h1>Already,
                               isPay user</h1>
                            <p>Login to to nextGen Banking Services</p>
                            <button className="ghost" id="signIn" onClick={onSignIn}>Sign In</button>
                        </div>
                        <div className="overlay-panel overlay-right" >
                            <h1>New to isPay</h1>
                            <p>Create an account in 5 seconds and Experience nextGen Financing</p>
                            <button className="ghost" id="signUp"  onClick={onSignUp}>Sign Up</button>
                        </div>
                 </div>
             </div>

         </div>
     </div>
    </>
  );
};


