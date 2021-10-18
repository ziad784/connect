
function ProtectedPath({islogin,Comp}) {
    
    if(islogin){
        return <Comp />;
    }else{
        return <div></div>
    }
}

export default ProtectedPath
