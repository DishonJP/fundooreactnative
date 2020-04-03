import React from 'react'
import Feather from 'react-native-vector-icons/Feather'
import {StyleSheet,View,TouchableOpacity} from 'react-native'
import {Header} from 'react-native-elements'
import {withNavigation} from 'react-navigation'
const Appbar=({navigation})=>{
    return(
        <View style={styles.header}>
        <TouchableOpacity>
            <Feather name="menu" size={30} onPress={()=>{
                navigation.openDrawer();
            }}/>
            </TouchableOpacity>
            </View>
    )
};
const styles=StyleSheet.create({
    header:{
        height:70,
        width:"100%",
        backgroundColor:"#fff"
    },
})
export default withNavigation(Appbar)