import React,{useContext,useEffect} from "react"
import {View,Text,StyleSheet,ScrollView} from "react-native"
import { Context as AuthContext } from "../context/AuthContext"
import {Context as NoteContext } from '../context/NoteContext'
import {SafeAreaView} from 'react-navigation'
import Appbar from "../components/Appbar"
import Footer from "../components/Footer"
import { Card } from "react-native-elements"
const HomeScreen=({navigation})=>{
    const {state,getNotes}=useContext(NoteContext)
    console.log(state);
    
    useEffect(()=>{
        getNotes();
    },[])
    if (state.notes===null) {
        return null
    }
    let allNotes=state.notes.map((item,index)=>{
        return <Card 
            key={item.id}
            containerStyle={{
            backgroundColor:item.color,
            width:180,
            marginRight:index%2===0?5:"auto",
            marginLeft:index%2===0?"auto":5,
            borderRadius:10
        }} >
            <Text>{item.title}</Text>
    <Text>{item.description}</Text>
        </Card>
    })
    return(
        <SafeAreaView forceInset={{top:"always"}}>
            <View style={styles.container}>
                <ScrollView>
            <Appbar/>
                <View style={styles.view}>
                    {allNotes}
                </View>
                </ScrollView>
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
        backgroundColor:"#fff",
    },
    view:{
        flexDirection:"row",
        flexWrap:"wrap",
        flex:1
    }
})
export default HomeScreen;