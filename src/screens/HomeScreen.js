import React,{useContext} from "react"
import {View,Text,StyleSheet,Button} from "react-native"
import { Context as AuthContext } from "../context/AuthContext"
import {AntDesign} from 'react-native-vector-icons'
import {SafeAreaView} from 'react-navigation'
import Appbar from "../Components/Appbar"
import Footer from "../Components/Footer"
const HomeScreen=({navigation})=>{
    const {signOut}=useContext(AuthContext)
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