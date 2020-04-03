import React,{useState,useContext} from "react"
import {View,StyleSheet,ScrollView} from "react-native"
import {Text,Button,Input} from 'react-native-elements'
import Spacer from "../Components/Spacer"
import {Context as AuthContext} from '../context/AuthContext'
const LoginScreen=({navigation})=>{
    const {state,signIn}=useContext(AuthContext)
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState('');
    return(
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
        <Spacer>
            <Text style={styles.text} h3>Login</Text>
            </Spacer>
            <Spacer>
            <Input 
                label="Email" 
                value={email}
                autoCapitalize="none"
                autoCorrect={false}
                onChangeText={setEmail}
            />
            </Spacer>
            <Spacer>
            <Input 
                autoCorrect={false}
                label="Password" 
                value={password}
                autoCapitalize="none"
                onChangeText={setPassword}
                secureTextEntry={true}
            />
            </Spacer>
            <Button title="Don't have an account?"
                type="clear"
            onPress={()=>{
                navigation.navigate('Registration')
            }} 
            />
            <Spacer>
            <Button title="Sign in" onPress={()=>{
                signIn({email,password})
            }} />
            </Spacer>
            </ScrollView>
            </View>
    );
};
LoginScreen.navigationOptions=()=>{
    return{
        headerShown:false
    };
};
const styles=StyleSheet.create({
    container:{
        flex:1,
        justifyContent:"center",
        backgroundColor:"lightgray"
    },
    text:{
        alignSelf:'center'
    }
})
export default LoginScreen;