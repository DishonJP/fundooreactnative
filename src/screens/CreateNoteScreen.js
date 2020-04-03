import React from "react"
import {View,Text,StyleSheet} from "react-native"
const CreateNoteScreen=()=>{
    return(
        <View style={styles.container}>
            <Text>Hello</Text>
        </View>
    )
}
CreateNoteScreen.navigationOptions=()=>{
    return{
        headerShown:false
    }
}
const styles=StyleSheet.create({
    container:{
        width:"100%",
        height:"100%"
    }
})
export default CreateNoteScreen;