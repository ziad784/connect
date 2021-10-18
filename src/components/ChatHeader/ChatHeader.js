import './ChatHeader.css'
import {ArrowBack} from '@material-ui/icons';
import {useHistory} from 'react-router-dom'

function ChatHeader({profileImg,Name}) {

    let history = useHistory();

    return (
        <header className="Header_chat">
           <div className="left_head_chat">
                <div className="back_arrow" onClick={()=>{history.replace("/")}}>
                    <ArrowBack  />
                </div>
                <img src={process.env.REACT_APP_API+"/"+profileImg} />
                <div style={{marginLeft:"10px"}}>{Name}</div>
           </div>


        </header>
    )
}

export default ChatHeader
