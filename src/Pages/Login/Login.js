import './login.css';
import React,{useState} from 'react';
import {Link} from 'react-router-dom';
import { createInputError, removeChildbyIndex } from '../../utilities/Auth';
import {Clear} from '@material-ui/icons'
import {useHistory} from 'react-router-dom';
import axios from 'axios';



function Login() {

  const history = useHistory();
  const [Email, setEmail] = useState('');
  const [Pass, setPass] = useState('');


  axios.defaults.withCredentials = true;



 const Vailidate = () =>{
   let cont = true;


   if(Email.length < 1){
    const doc = document.querySelector(".email_form");
    createInputError("Cannot leave Email empty",doc,1)
    cont = false;

  }else if(!Email.includes("@") && !Email.includes(".com")){

    const doc = document.querySelector(".email_form");
    createInputError("We need real Email",doc,1)
    cont = false;
  }
  
  if(Pass.length < 1){
    const doc = document.querySelector(".pass_form");
    createInputError("Cannot leave Password empty",doc,1)
    cont = false;
  }


  return cont;
 }

  const Login = () => {

    if(Vailidate()){


      axios.post(process.env.REACT_APP_API+"/login",{
        email:Email,
        password:Pass
      })
      .then((response) => {
        console.log(response);
        if(response.data.res === "ok"){
              localStorage.setItem("token",response.data.token)
              history.go("/")
        }else if(response.data.msg){
              const div = document.querySelector(".err_box")
              div.style.display = "flex";
              document.getElementById("err_txt").textContent = response.data.msg;
              document.querySelector(".app").prepend(div);
        }else{
          const div = document.querySelector(".err_box")
          div.style.display = "flex";
          document.querySelector(".app").prepend(div);
        }
      })


    }    
     
  }






  return (

    <div className="app">

        <div className="err_box move_appear" onClick = {(e) => {document.querySelector(".err_box").style.display = "none"}}>
          <p id="err_txt">Something went wrong. Try again</p>
          <Clear className="cross" onClick = {(e) => {document.querySelector(".err_box").style.display = "none"}}/>
        </div>
        <div className="contanier">
            <h1 className="title">Login</h1>
            <p className="qute">Join now to chat with more than 120,000 user</p>

            <form className="login_form"  onSubmit={(e) =>{e.preventDefault()}}>

              <div className="email_form login_form">
                <input type="email" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$" placeholder="Email" autoComplete="off"  onChange={(e)=>{setEmail(e.target.value); removeChildbyIndex(document.querySelector(".email_form"),1)  }}/>
                
              </div>
              <div className="pass_form login_form">
                <input type="password" placeholder="Password"  onChange={(e)=>{setPass(e.target.value); removeChildbyIndex(document.querySelector(".pass_form"),1)}}/>  
               
              </div>

            


              <button className="login_btn" onClick={Login}>Login</button>



              <div className="forget">Forget your Password ?</div>

     

            </form>
            
            <div className="redirect_btn">Need an account? <Link to="/signup">Sign Up</Link></div>

        </div>
        

    </div>
  );
}

export default Login;
