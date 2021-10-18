import './header.css'
import {Chat,NotificationsOutlined} from '@material-ui/icons';

function Header({profileImg}) {
    return (
        <header>
            <div className="left_head">
                <Chat style={{color:"#747fff"}} />
                <h2>Connect</h2>
            </div>


            <div className="right_head">
                <div className="notify">
                    <NotificationsOutlined />
                </div>
                <img src={profileImg} />
            </div>

        </header>
    )
}

export default Header
