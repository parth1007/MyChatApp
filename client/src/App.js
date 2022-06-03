import './App.css';
import { BrowserRouter as Router, Routes, Route  } from "react-router-dom";
import ChatPage from './Pages/ChatPage/ChatPage';
import HomePage from './Pages/HomePage';
import Login from './Pages/login/Login';
import Register from './Pages/register/Register';


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<HomePage/>}/>
          <Route exact path="/chats" element={ <ChatPage/>}/>
          <Route exact path="/login" element={ <Login /> }/>

          <Route exact path="/register" element={ <Register/>}/>

        </Routes>
      </Router>
    </div>
  );
}

export default App;
