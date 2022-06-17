import React from 'react';
import axios from "axios";
import { useState,useEffect } from "react";
import { Link,useNavigate } from "react-router-dom";
import "./login.css";

const HOST = "https://ryuzaki-chatapp.herokuapp.com";


export default function Login() {

  // useStates declaration
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [user, setUser] = useState();


  const navigate = useNavigate();

  // useEffect to get user from local storage
  useEffect(() => {
    const userInfo =  JSON.parse(localStorage.getItem("userInfo"));
    setUser(userInfo);
      if(userInfo){
          navigate("/chats");
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])



  // Login function
  const handleSubmit = async (e) => {
    e.preventDefault();
      try {

        const config = {
          headers: {
            "Content-type": "application/json",
          },
        };
        const user={
          email : email,
          password : password,
        }


        const {data} = await axios.post(`${HOST}/api/user/login`,user,config);


        console.log(data);
        localStorage.setItem("userInfo", JSON.stringify(data));
        navigate("/chats");
      } catch (error) {
        alert("Invalid credentials");
        console.log(error);
      }
  }


  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">Login</h3>
          <span className="loginDesc">
            Connect with friends and the world around you.
          </span>
        </div>
        <form className="loginRight" onSubmit={handleSubmit}>
          <div className="loginBox">
            <input placeholder="Email" type="email" required className="loginInput" onChange={(e) => setEmail(e.target.value)}/>
            <input placeholder="Password" type="password" required minLength="6" className="loginInput" onChange={(e) => setPassword(e.target.value)}/> 
            <button className="loginButton">Log In</button>
            <span className="loginForgot">Forgot Password?</span>
            <Link to='/register'>
              <button className="loginRegisterButton">
                Create a New Account
              </button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}