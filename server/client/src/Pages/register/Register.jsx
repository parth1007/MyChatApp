import React from 'react';
import axios from "axios";
import { useRef,useState } from "react";
import {Link,useNavigate} from 'react-router-dom';
import "./register.css";
import CircularProgress from '@mui/material/CircularProgress';

export default function Register() {

  // useStates declaration
  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [confirmPassword,setConfirmPassword] = useState("");
  const [profilePic, setProfilePic] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [picLoading, setPicLoading] = useState(false)



  const navigate = useNavigate();
  const passwordref = useRef();



  // function to add image to cloudinary
  const postPic = (pics) => {
    setPicLoading(true);
    if(pics === undefined){
      alert("Please Select an Image!")
      return;
    }

    if(pics.type === "image/jpeg" || pics.type === "image/png" || pics.type === "image/svg" || pics.type === "image/jpg"){
      const data = new FormData();
      data.append("file",pics);
      data.append("upload_preset","chat-app");
      data.append("cloud_name","ryuzaki")
      fetch("https://api.cloudinary.com/v1_1/ryuzaki/image/upload",{
        method:"post",
        body: data,
      }).then((res) => res.json())
        .then(data => {
          setProfilePic(data.url.toString());
          console.log(data.url.toString());
          setPicLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setPicLoading(false);
        })
    }

  }


  // function to register user
  const handleSubmit = async (e) => {
    e.preventDefault();
    if(password !== confirmPassword){
      passwordref.current.setCustomValidity("Passwords don't match");
    }
    else{
      try {

        const config = {
          headers: {
            "Content-type": "application/json",
          },
        };
        const user={
          name : name,
          email : email,
          password : password,
          profilePic: profilePic
        }


        const {data} = await axios.post("http://localhost:8000/api/user/register",user,config);
        console.log(data);
        localStorage.setItem("userInfo", JSON.stringify(data));
        navigate("/chats");
      } catch (error) {
        alert("User already exist, please go to login page");
        console.log(error);
      }

    }

  }

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">Register</h3>
          <span className="loginDesc">
            Connect with friends and the world around you.
          </span>
        </div>
        <div className="loginRight">
          <form className="loginBox" style={{height: '600px'}} onSubmit={handleSubmit}>

            <input placeholder="name" required  className="loginInput" style={{height: '55px'}} onChange={(e) => setName(e.target.value)}
            />
            <input placeholder="Email" required  className="loginInput" type="email" style={{height: '55px'}} onChange={(e) => setEmail(e.target.value)}
            />
            <input placeholder="Password" required  className="loginInput" ref={passwordref} type="password" minLength="6" style={{height: '55px'}} onChange={(e) => setPassword(e.target.value)}
            />
            <input placeholder="Password Again" required  className="loginInput" type="password" style={{height: '55px'}} onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <input type="file" style={{height: '2rem',padding:"1rem",fontSize:"1rem"}} onChange={(e) => postPic(e.target.files[0])}
            />
            <button className="loginButton">{picLoading ? <CircularProgress style={{color:"white",height: '2rem',width: '2rem'}}/> :"Sign Up"}</button>
            
            
            <Link to='/login'>
              <button className="loginRegisterButton">
                Log into Account
              </button>  
            </Link> 
          </form>
        </div>
      </div>
    </div>
  );
}