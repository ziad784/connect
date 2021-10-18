import "./chat.css";
import {useParams,Link} from 'react-router-dom'
import axios from 'axios'
import {useEffect,useState} from 'react'
import io from 'socket.io-client';
import ChatHeader from "../../components/ChatHeader/ChatHeader";
import SideBar from "../../components/SideBar/SideBar";
import Header from "../../components/Header/Header";


let socket = null;
function Chat() {

    const { id } = useParams();
    const [Exist, setExist] = useState(null);
    const [Id, setId] = useState('')


    const [Msg, setMsg] = useState('')

    const [Messages, setMessages] = useState([])
    const [ToImg, setToImg] = useState('');
    const [ToName, setToName] = useState('')


    const appeandMsg = (txt,isleft) => {

        const msgs = document.querySelector(".messages");

        if(msgs){
            
            const div = document.createElement("div");
            const msg = document.createElement("div");
            msg.className = "txt";
            msg.textContent = txt;
            div.className = "msg";
            if(isleft){
                div.classList.add("left");
            }else{
                div.classList.add("right");
            }

            div.appendChild(msg);
            msgs.appendChild(div)

            if(document.querySelector(".messages").childNodes[0].className === "no_msg"){
                document.querySelector(".messages").removeChild(document.querySelector(".messages").childNodes[0])
            }
        
            setMsg("")
            msgs.scrollTo({
                top:msgs.scrollHeight,
                behavior:"smooth"
            })
        }
        

    }
 


    useEffect(() => {

    

        socket = io(process.env.REACT_APP_API);

        socket.on("new message",txt=>{

           if(txt.from === parseInt(id)){
            appeandMsg(txt.msg,false)
           }
        })

        

        axios.post(process.env.REACT_APP_API+"/Exist",{
            id:id
        })
        .then((data) => {
            if(data.data.res === "bad"){
                setExist(false);
            }else{
                setToImg(data.data.img);
                setToName(data.data.username);
                setExist(true);
            }
        })


        axios.post(process.env.REACT_APP_API+"/getUser",{token:localStorage.getItem("token")})
        .then((data) => {
            socket.emit("user_connected",data.data[0].id)
            setId(data.data[0].id)

            axios.post(process.env.REACT_APP_API+"/Messages",{
                from:data.data[0].id,
                to:parseInt(id)
            })
            .then((data) =>{

                 if(!data.data.res){

                    setMessages(data.data)
                    
                }else{
                    setMessages([])
                    const messages = document.querySelector(".messages")
                    const p = document.createElement("p");
                    p.className = "no_msg"
                    p.textContent = "No messages Yet";
                    if(messages.children.length < 1){
                        messages.appendChild(p);
                      
                    }
                  
                }
            })
        })


     



    
       
        
    }, [id,Id,setExist,setMessages,setToImg,setToName])



  

 


    const ChatRoom = ({exist}) =>{

        const [Msg, setMsg] = useState('')
        
        useEffect(() => {
           
            return () =>{
                if(document.querySelector(".messages")){
                    ScrollBottom()
                 }
            }
          }, [])

        const ScrollBottom = () =>{
            
            document.querySelector(".messages").scrollTo({
                top:document.querySelector(".messages").scrollHeight,
                behavior:"smooth"
            })
        }
       

        const Send = () =>{
            appeandMsg(Msg,true)
        }
    
    
        const appeandMsg = (txt,isleft) => {
            if(txt.length > 0){
                const div = document.createElement("div");
                const msg = document.createElement("div");
                msg.className = "txt";
                msg.textContent = txt;
                div.className = "msg";
                if(isleft){
                    div.classList.add("left");
                }else{
                    div.classList.add("right");
                }
    
                if(document.querySelector(".messages").childNodes[0].className === "no_msg"){
                    document.querySelector(".messages").removeChild(document.querySelector(".messages").childNodes[0])
                }
        
                div.appendChild(msg);
                document.querySelector(".messages").appendChild(div)
                console.log("ID:",id);
                
                socket.emit("send",{from:Id,to:parseInt(id),msg:Msg})
                setMsg("")
                ScrollBottom()
            }
            
    
        }


       
    

        if(exist === true){
            console.log(Messages.length);

            if(Messages.length > 0){
                return (
                    
                    

                        <div className="content_con">

                           <ChatHeader profileImg={ToImg} Name={ToName} />

                            <div className="contn">

                            <SideBar ischat={false} Class={"hidden_SideBar"}/>
                                
                               <div className="contentar">
                                    <div className="messages" >

                                                        {
                                                            Messages.map((o,i)=>{
                                                                
                                                                if(o.from_id === Id){
                                                                    return (
                                                                        <div className="msg left" key={i}>
                                                                            <div className="txt">{o.txt}</div>
                                                                        </div>
                                                                    )
                                                                }else{
                                                                    return (
                                                                        <div className="msg right" key={i}>
                                                                            <div className="txt">{o.txt}</div>
                                                                        </div>
                                                                    )
                                                                }
                                                            }
                                                                
                                                                
                                                            )
                                                        }

                                    </div>

                                    <form className="chat_form" onSubmit = {(e) => {e.preventDefault()}}>
                                    <input value={Msg} type="text" className="msg_input" placeholder="Type a message" autoComplete="off" onChange={(e) => {setMsg(e.target.value)}} />
                                    <button className="send_btn " onClick={Send} >Send</button>
                                    </form>
                               </div>
                            </div>

                        </div>
                )
            }else{
                return (
                   
                    <div>
                            <ChatHeader profileImg={ToImg} Name={ToName} />

                            <div className="contn">

                            <SideBar ischat={false} Class={"hidden_SideBar"}/>
                                
                            <div className="contentar">
                                    <div className="messages" >

                                                

                                    </div>

                                    <form className="chat_form" onSubmit = {(e) => {e.preventDefault()}}>
                                    <input value={Msg} type="text" className="msg_input" placeholder="Type a message" autoComplete="off" onChange={(e) => {setMsg(e.target.value)}} />
                                    <button className="send_btn " onClick={Send} >Send</button>
                                    </form>
                            </div>
                            </div>
                    </div>

                )
            }

        }else if(exist === false) {
            return (
                <div style={{height:"100vh",display:"flex",flexDirection:"column",justifyContent:"center", alignItems:"center"}}>
                    <div >
                    <p style={{fontSize:"20px"}}>User doest <span style={{color:"red"}}> NOT </span> exist yet</p>
                    </div>
                    
                    <Link to="/" style={{marginTop:"5vh"}}>GO back ?</Link>
                    
                </div>
                
            )
        }else{
            return (
                <div>
                  
                </div>
            )
        }
    }

    return (

        <>
      

            <ChatRoom exist={Exist} />
        </>
    )
}

export default Chat
