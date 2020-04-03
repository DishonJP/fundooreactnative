import React,{useContext,useEffect} from "react"
import {View,Text,StyleSheet,Button} from "react-native"
import { Context as AuthContext } from "../context/AuthContext"
import {Context as NoteContext } from '../context/NoteContext'
import {SafeAreaView} from 'react-navigation'
import Appbar from "../Components/Appbar"
import Footer from "../Components/Footer"
const HomeScreen=({navigation})=>{
    const {state,getNotes}=useContext(NoteContext)
    useEffect(()=>{
        getNotes();
    },[])
    console.log(state);
    
    return(
        <SafeAreaView forceInset={{top:"always"}}>
            <View style={styles.container}>
            <Appbar/>
            <Footer/>
            </View>
        </SafeAreaView>
    )
}
HomeScreen.navigationOptions=()=>{
    return{
        headerShown:false
    }
}
const styles=StyleSheet.create({
    container:{
        height:"100%",
        width:"100%",
        backgroundColor:"#fff"
    }
})
export default HomeScreen;