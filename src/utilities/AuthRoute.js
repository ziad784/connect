import {Route,Redirect } from 'react-router-dom';

function AuthRoute({islogin,Comp,redirect,...rest}) {
    return (
        <Route {...rest} render={(props)=>{
            if(islogin === false){
                 return <Comp />
            }else if(islogin === true){
                 return <Redirect to={{
                     pathname:"/",

                     state:{
                     from: props.location
                    }
                }} />
            }
        }}>
 
        </Route>
    )
}

export default AuthRoute
