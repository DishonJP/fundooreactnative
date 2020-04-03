import React,{useContext} from "react"
import {View,Text,StyleSheet,Button} from "react-native"
import { Context as AuthContext } from "../context/AuthContext"
import {AntDesign} from 'react-native-vector-icons'
import {SafeAreaView} from 'react-navigation'
import Appbar from "../Components/Appbar"
const HomeScreen=({navigation})=>{
    const {signOut}=useContext(AuthContext)
    return(
        <SafeAreaView forceInset={{top:"always"}}>
            <View>
            <Appbar/>
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
        flex:1,
        backgroundColor:"#fff"
    }
})
export default HomeScreen;