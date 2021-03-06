import React from 'react';
import { Routes, Route  } from "react-router-dom";
import './App.css';

import ChatPage from './Pages/ChatPage/ChatPage';
import HomePage from './Pages/HomePage';
import Login from './Pages/login/Login';
import Register from './Pages/register/Register';


function App() {
  return (
    <div className="App">
        <Routes>
          <Route exact path="/" element={<HomePage/>}/>
          <Route exact path="/chats" element={ <ChatPage/>}/>
          <Route exact path="/login" element={ <Login /> }/>
          <Route exact path="/register" element={ <Register/>}/>
        </Routes>
    </div>
  );
}

export default App;
