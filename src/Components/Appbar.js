import React,{useState} from 'react'
import Feather from 'react-native-vector-icons/Feather'
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import {StyleSheet,View,TouchableOpacity,TextInput,Image} from 'react-native'
import {} from 'react-native-elements'
import {withNavigation} from 'react-navigation'
const Appbar=({navigation})=>{
    const [listGrid,setListGrid]=useState(false)
    return(
        <View style={styles.header}>
        <TouchableOpacity>
            <Feather 
                style={{
                    marginLeft:10
                }}
                name="menu" size={25} onPress={()=>{
                navigation.openDrawer();
            }}/>
            </TouchableOpacity>
            <View style={styles.searchBox}>
                <Feather name="search" size={20}/>
                <TextInput
                    style={styles.search} 
                    placeholder="Search..."

                />
                <EvilIcons name="close" size={20}/>
            </View>
            <View style={styles.lastView}>
                {listGrid?
                <TouchableOpacity onPress={()=>{
                    setListGrid(!listGrid)
                }}>
                <Feather name="list" size={25}/>
                </TouchableOpacity>:
                <TouchableOpacity onPress={()=>{
                    setListGrid(!listGrid)
                }}>
                    <Feather name="grid" size={25} />
                    </TouchableOpacity>
                }
                <Image style={styles.userImg}/>
            </View>
            </View>
    )
};
const styles=StyleSheet.create({
    header:{
        height:50,
        width:"95%",
        backgroundColor:"#fff",
        margin:10,
        display:"flex",
        flexDirection:"row",
        alignItems:"center",
        borderRadius:10,
        borderColor:'lightgray',
        borderWidth:1,
        position:"absolute",
        top:0
    },
    searchBox:{
        flexDirection:'row',
        alignItems:"center",
        flex:1,
        marginHorizontal:10,
    },
    search:{
        flex:1,
        marginLeft:5
    },
    lastView:{
        flexDirection:"row",
        alignItems:"center"
    },
    userImg:{
        width:35,
        height:35,
        borderWidth:1,
        borderColor:"lightgray",
        borderRadius:35/2,
        marginHorizontal:10
    }
})
export default withNavigation(Appbar)