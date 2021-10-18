import React,{useState,useEffect} from 'react';
import {BrowserRouter as Router,Switch} from 'react-router-dom'
import Login from './Pages/Login/Login';
import Signup from './Pages/Signup/Signup';
import ProtectedRoute from './utilities/ProtectedRoute';
import Home from './Pages/Home/Home';
import AuthRoute from './utilities/AuthRoute';
import axios from 'axios';
import Chat from './Pages/Chat/Chat';
import './App.css'




function App() {
  const [islogin, setislogin] = useState(null)
  axios.defaults.withCredentials = true;

  useEffect(() => {



    axios.post(process.env.REACT_APP_API+"/islogin",{token:localStorage.getItem("token")})
    .then((data) => {



      setislogin(data.data.islogin)

      document.querySelector(".loader").remove();
    }).catch((e)=>{

      document.querySelector(".loader").remove();

    })

 

   
    
  }, [setislogin])


  

  return (
    <Router>
      <div className="loader" style={{width:"100%",height:"100vh",display:"flex",justifyContent:"center",alignItems:"center"}}>
        <p style={{width:"100px",height:"100px",borderRadius:"50%",borderTop:"5px red solid",borderBottom:"5px red solid"}} ></p>
      </div>
    
      <Switch>
        
        
        <ProtectedRoute path="/" exact redirect="/login" Comp={Home} islogin={islogin} />
        <ProtectedRoute path="/chat/:id" exact  redirect="/login" Comp={Chat} islogin={islogin} />
        <AuthRoute path="/login" exact redirect="/" Comp={Login} islogin={islogin} />
        <AuthRoute path="/signup" exact redirect="/" Comp={Signup} islogin={islogin} />
        
      </Switch>
    </Router>
  );
}

export default App;
