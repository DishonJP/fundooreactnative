import React,{useState,useContext} from "react"
import {TextInput,FlatList} from 'react-native'
import {View,Text,StyleSheet,TouchableOpacity,ScrollView} from "react-native"
import {Overlay} from 'react-native-elements'
import Feather from 'react-native-vector-icons/Feather'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import {Context as NoteContext} from '../context/NoteContext'
const CreateNoteScreen=()=>{
    const colors = [
        {id:"1",color:"#fff"},
        {id:"2",color:'#f28b82'},
        {id:"3",color:'#fbbc04'},
        {id:"4",color:'#fff475'},
        {id:"5",color:'#ccff90'},
        {id:"6",color:'#a7ffeb'},
        {id:"7",color:'#cbf0f8'},
        {id:"8",color:'#aecbfa'},
        {id:"9",color:'#d7aefb'},
        {id:"10",color:'#fdcfe8'},
        {id:"11",color:'#e6c9a8'},
        {id:"12",color:'#e8eaed'},
      ];
    const {state,addNote}=useContext(NoteContext)
    const [moremenu,setMoreMenu]=useState(false)
    const [title,setTitle]=useState("");
    const [description,setDescription]=useState("");
    const [isPinned,setPin]=useState(false)
    const [isDeleted,setDelete]=useState(false)
    const [isArchived,setArchive]=useState(false)
    const [reminder,setRemain]=useState([])
    const [color,setColor]=useState("#fff")
    const [Collaborators,setCollab]=useState([])
    return(
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={addNote}>
                <Feather style={{
                    marginLeft:15
                }} name="arrow-left" size={25} />
                </TouchableOpacity>
                <View style={styles.headerIcons}>
                    <TouchableOpacity>
                        {isPinned?
                        <TouchableOpacity onPress={()=>{
                            setPin(!isPinned)
                        }}>
                    <MaterialCommunityIcons name="pin" size={25} />
                    </TouchableOpacity>
                    :
                    <TouchableOpacity
                    onPress={()=>{
                        setPin(!isPinned)
                    }}>
                    <MaterialCommunityIcons name="pin-outline" size={25} />
                    </TouchableOpacity>
                    }
                    </TouchableOpacity>
                    <TouchableOpacity>
                    <MaterialCommunityIcons style={{
                        marginHorizontal:30
                    }} name="bell-plus-outline" size={25} />
                    </TouchableOpacity>
                    <TouchableOpacity>
                    <MaterialIcons style={{
                        marginRight:15
                    }} name="archive" size={25}/>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.textContainer}>
            <TextInput style={{
                fontSize:20
            }} placeholder="Title" />
            <TextInput style={{
                fontSize:18,
                marginVertical:10
            }} placeholder="Note"/>
            </View>
            <View style={styles.footer}>
                <TouchableOpacity>
                <AntDesign style={{
                    marginLeft:15
                }} name="plussquareo" size={25}/>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>setMoreMenu(!moremenu)}>
                <MaterialCommunityIcons style={{
                    marginRight:15
                }} name="dots-vertical" size={25}/>
                </TouchableOpacity>
            </View>
            <Overlay
                isVisible={moremenu}
                containerStyle={{
                        backgroundColor:"#fff",
                        opacity:.1
                    }}
                overlayStyle={styles.moremenu}
                onBackdropPress={()=>{
                    setMoreMenu(!moremenu)
                }}
            >
                <View style={styles.View}>
                    <AntDesign style={styles.moreIcon} name="delete" size={25}/>
                    <Text>Delete</Text>
                </View>
                <View style={styles.View}>
                    <MaterialCommunityIcons style={styles.moreIcon} name="content-copy" size={25}/>
                    <Text>Make a copy</Text>
                </View>
                <View style={styles.View}>
                    <EvilIcons style={styles.moreIcon} name="share-google" size={25}/>
                    <Text>
                        Send
                    </Text>
                </View>
                <View style={styles.View}>
                    <MaterialIcons style={styles.moreIcon} name="person-add" size={25}/>
                    <Text>Collaborator</Text>
                </View>
                <View style={styles.View}>
                    <MaterialIcons style={styles.moreIcon} name="label-outline" size={25}/>
                    <Text>Labels</Text>
                </View>
                <FlatList
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    data={colors}
                    keyExtractor={item=>item.id}
                    renderItem={({item})=>{
                           return <TouchableOpacity>
                                <View 
                                    style={{
                                    height:35,
                                    width:35,
                                    borderRadius:35/2,
                                    backgroundColor:item.color,
                                    margin:5,
                                    borderWidth:1,
                                    borderColor:"lightgray"
                            }}/>
                            </TouchableOpacity>
                    }}
                />
                {/* <ScrollView >
                <View style={{
                    flexDirection:"row",
                    marginLeft:10
                }}>
                {colorObj}
                </View>
                </ScrollView> */}
            </Overlay>
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
        height:"100%",
        flex:1,
        backgroundColor:"#fff"
    },
    header:{
        height:50,
        width:"100%",
        position:"absolute",
        top:0,
        borderBottomWidth:1,
        borderBottomColor:"lightgray",
        backgroundColor:"#fff",
        alignItems:"center",
        justifyContent:"space-between",
        flexDirection:"row"
    },
    headerIcons:{
        flexDirection:"row",
        alignItems:"center",
    },
    footer:{
        height:50,
        width:"100%",
        position:"absolute",
        bottom:0,
        borderTopWidth:1,
        borderTopColor:"lightgray",
        backgroundColor:"#fff",
        alignItems:"center",
        justifyContent:"space-between",
        flexDirection:"row"
    },
    textContainer:{
        top:90,
        padding:10
    },
    moremenu:{
        width:"100%",
        height:320,
        position:"absolute",
        bottom:51,
        backgroundColor:"#fff",
        borderTopWidth:1,
        borderTopColor:"lightgray"
    },
    View:{
        flexDirection:"row",
        width:"100%",
        height:50,
        alignItems:"center"
    },
    moreIcon:{
        marginLeft:15,
        marginRight:30
    }
})
export default CreateNoteScreen;