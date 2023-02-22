import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from "./components/About";
import NoteState from "./context/NoteState";
import Alert from "./components/Alert";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { useState } from "react";

function App() {
  const[alert,setAlert]=useState(null);
  const [mail,setMail]=useState("")

  const showAlert=(message,type)=>{
     
     setAlert({
      msg:message,
      type:type
      } )

    setTimeout(()=>{
    setAlert(null);
    },3000)

  }
  
  const showEmail =(mail)=>{
      setMail(mail);
  }

  return (
    <>
       <NoteState>
       <Router>
       <Navbar mail={mail} showEmail={showEmail} />
       
       <Alert alert={alert}/>
       
       <div className="container">
       <Routes>
          <Route   path="/" element={<Home showAlert={showAlert} />}/>
          <Route  path="/about" element={<About/>}/>
          <Route  path="/login" element={<Login showAlert={showAlert} showEmail={showEmail} />}/>
          <Route  path="/signup" element={<Signup  showAlert={showAlert} showEmail={showEmail} />}/>
          </Routes>
          </div>
          </Router>
          </NoteState>
      
      
      
      
    </>
  );
}

export default App;
