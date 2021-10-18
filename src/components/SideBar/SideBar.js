import axios from 'axios';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router'
import './SideBar.css'
import {Search} from '@material-ui/icons'


function SideBar({ischat,Class}) {


    const history = useHistory();
    const [SearchTxt, setSearchTxt] = useState('')

    const onChat = (id) =>{
        if(ischat === true){
            history.push("chat/"+id)
        }else if(ischat === false){
            history.push(id.toString())
        }
    }

    const [people, setpeople] = useState([])


    useEffect(() => {
        axios.post(process.env.REACT_APP_API+"/allUsers",{
            token:localStorage.getItem("token")
        })
        .then((data) => {
            setpeople(data.data);
        })


        


        return ()=>{
            setpeople([])
          
        }

    }, [setpeople])



    const currnet_chat = window.location.pathname[window.location.pathname.length - 1];

    return (
       <div className={Class}>

            <div className="search_con">
                <div className="search">
                    <Search style={{color:"gray"}} />
                    <input type="text" autoComplete="off" onChange={(e)=>{setSearchTxt(e.target.value)}} placeholder="Search on name" />
                </div>
            </div>
           
           <div className="people">
                {people.filter((val) => {
                    if(SearchTxt.length === 0){
                        return val;
                    }else if(val.username.toLowerCase().includes(SearchTxt)){
                        return val;
                    }
                }).map((o,i) => {

                    if(o.id === parseInt(currnet_chat)){

                        return (
                            <div className="person active"  key={i} onClick={() => {onChat(o.id)}} >
                                <img src={process.env.REACT_APP_API+"/"+ o.img} alt="profile img" width={40} height={40} style={{borderRadius:"50%"}}/> 
                                <div className="name">{o.username}</div>
                            </div>
                        )
                    }else{
                        return (
                            <div className="person"  key={i} onClick={() => {onChat(o.id)}} >
                                <img src={process.env.REACT_APP_API+"/"+ o.img} alt="profile img" width={40} height={40} style={{borderRadius:"50%"}}/> 
                                <div className="name">{o.username}</div>
                            </div>
                        )
                    }
                })}
           </div>


       </div>
    )
}

export default SideBar;
