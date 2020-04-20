import React, { useEffect, useState, useContext } from 'react'
import { View, SafeAreaView, Text, StyleSheet, TouchableOpacity, Image, TextInput, FlatList, ScrollView } from 'react-native'
import Feather from 'react-native-vector-icons/Feather'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import EvilIcons from "react-native-vector-icons/EvilIcons"
import AsyncStorage from '@react-native-community/async-storage'
import { Context as RootContext } from '../contexts/RootContext'
const CollaboratorScreen = ({ navigation }) => {
    console.disableYellowBox = true;
    const { state } = useContext(RootContext);
    const [email, setEmail] = useState("");
    const [search, setSearch] = useState("");
    const [collaborator, setColab] = useState([])
    useEffect(() => {
        settingEmail()
    }, [])
    const settingEmail = async () => {
        let email = await JSON.parse(await AsyncStorage.getItem('token')).email
        setEmail(email)
    }
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => {
                    if (navigation.state.params.id == 1) {
                        navigation.navigate('CreateNote')
                    } else {
                        navigation.navigate('EditNote')
                    }
                }}>
                    <Feather
                        onPress={() => {
                            navigation.state.params.id == 2 ? navigation.navigate('EditNote', { collaborator }) :
                                navigation.navigate("CreateNote", { collaborator })
                        }}
                        style={styles.icon} name="arrow-left" size={25} />
                </TouchableOpacity>
                <Text style={styles.headerText}>Collaborator</Text>
            </View>
            <View style={styles.userContainer}>
                <View style={styles.userIcon}><MaterialIcons name="person" color="#fff" size={40} /></View>
                <Text style={styles.email}>{email}(owner)</Text>
            </View>
            <ScrollView>
                {collaborator.length !== 0 ? <FlatList
                    data={collaborator}
                    keyExtractor={item => item.userId}
                    renderItem={({ item }) => {
                        console.log(item.email);

                        return <View style={styles.userContainer}>
                            <View style={styles.userIcon}><MaterialIcons name="person" color="#fff" size={40} /></View>
                            <Text style={styles.email}>{item.email}</Text>
                            <EvilIcons onPress={() => {
                                let tempArray = [];
                                for (let i = 0; i < collaborator.length; i++) {
                                    if (collaborator[i].email == item.email) {

                                    } else {
                                        tempArray.push(collaborator[i])
                                    }
                                }
                                setColab(tempArray)
                            }} style={{
                                position: "absolute",
                                right: 20
                            }} name="close" size={30} />
                        </View>
                    }}
                /> : null}
                <View style={styles.userContainer}>
                    <View style={styles.userIcon}><MaterialIcons name="person-add" color="#fff" size={40} /></View>
                    <TextInput style={{
                        fontSize: 18,
                        width: "65%",
                    }}
                        value={search}
                        onChangeText={setSearch}
                        placeholder="add Collaborator" />
                    <Feather name="check" size={25} />
                </View>
                <View style={{
                    height: 200
                }}>
                    <FlatList
                        data={state.userList}
                        keyExtractor={item => item.userId}
                        renderItem={({ item }) => {
                            return item.email.toLocaleLowerCase().startsWith(search.toLocaleLowerCase()) && search !== "" ?
                                <TouchableOpacity onPress={() => {
                                    setColab([...collaborator, item])
                                }}>
                                    <View style={{
                                        height: 70,
                                        flexDirection: "row",
                                        alignItems: "center",
                                        padding: 20,
                                        justifyContent: "center",
                                        backgroundColor: "lightgray"
                                    }}>
                                        <Text style={styles.email}>{item.email}</Text>
                                    </View>
                                </TouchableOpacity> : null
                        }}
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}
CollaboratorScreen.navigationOptions = () => {
    return {
        headerShown: false
    }
}
const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "100%",
        backgroundColor: "#fff",
        flex: 1
    }, header: {
        width: "100%",
        height: 60,
        borderBottomWidth: 1,
        borderColor: "lightgray",
        flexDirection: "row",
        alignItems: "center",
    },
    icon: {
        marginLeft: 15,
        marginRight: 30
    },
    userContainer: {
        height: 70,
        flexDirection: "row",
        alignItems: "center"
    },
    headerText: {
        fontSize: 22,
        fontWeight: "500",
        letterSpacing: 1
    },
    userIcon: {
        marginLeft: 15,
        marginRight: 15,
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: "lightgray",
        alignItems: "center",
        justifyContent: "center"
    },
    email: {
        fontSize: 18
    }
})
export default CollaboratorScreen