import React,{useContext,useEffect} from 'react'
import { Context as AuthContext} from '../context/AuthContext'

const AuthLoadingScreen = ()=>{
    const {localSignIn}=useContext(AuthContext);
    useEffect(()=>{
        localSignIn();
    },[])
    return null;
}
export default AuthLoadingScreen;