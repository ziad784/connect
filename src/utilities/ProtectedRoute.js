import {Route,Redirect } from 'react-router-dom';

function ProtectedRoute({islogin,Comp,redirect,...rest}) {
    return (
       <Route {...rest} render={(props)=>{
           if(islogin === true){
                return <Comp />
           }else if(islogin === false){
                return <Redirect to={{
                    pathname: "/login",
                    state: {
                        from: props.location
                    }
                }} />
           }
       }}>

       </Route>
    )
}

export default ProtectedRoute
