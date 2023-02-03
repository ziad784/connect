import './home.css'
import axios from 'axios';
import React,{useState,useEffect} from 'react'
import {useHistory} from 'react-router-dom'
import Header from '../../components/Header/Header';
import SideBar from '../../components/SideBar/SideBar';
import chatImg from '../../imgs/chat_img.svg'


function Home() {


    const [username, setusername] = useState('');
    const [img, setimg] = useState('');
    const [Id, setId] = useState('')
    axios.defaults.withCredentials = true;

   



    useEffect(() => {


        
        
        

        axios.post(process.env.REACT_APP_API+"/getUser",{token:localStorage.getItem("token")})
        .then((data) => {



            setusername(data.data[0].username);
            setimg(data.data[0].img)
            setId(data.data[0].id)
        })

      



    }, [setusername,setimg,setId])



   



   

    return (
        <div className="body">



            <Header profileImg={process.env.REACT_APP_API+"/"+img} />
           
   
                <div className="chat">
                    
                    <SideBar ischat={true} Class={"SideBar"}/>
                
                    <div className="chats">
                        <img src={chatImg} width={350} height={350} alt="img" />
                        <p>Choose someone to chat with</p>
                    </div>
            
                </div>
        
            
          

        </div>
    )
}

export default Home
