import React, { useState, useContext } from 'react'
import Feather from 'react-native-vector-icons/Feather'
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import { StyleSheet, View, TouchableOpacity, TextInput, Image, Text } from 'react-native'
import { Overlay, Divider, Button } from 'react-native-elements'
import { withNavigation } from 'react-navigation'
import AsyncStorage from '@react-native-community/async-storage'
import { Context as AuthContext } from '../contexts/UserContext'
const Appbar = ({ navigation, gridList }) => {
    const { state, signOut } = useContext(AuthContext);
    const [listGrid, setListGrid] = useState(true)
    const [menu, setMenu] = useState(false)
    if (state.token === null) {
        return null
    }

    return (
        <View style={styles.header}>
            <TouchableOpacity>
                <Feather
                    style={{
                        marginLeft: 10
                    }}
                    name="menu" size={25} onPress={() => {
                        navigation.openDrawer();
                    }} />
            </TouchableOpacity>
            <View style={styles.searchBox}>
                <Feather name="search" size={20} />
                <TextInput
                    style={styles.search}
                    placeholder="Search..."

                />
                <EvilIcons name="close" size={20} />
            </View>
            <View style={styles.lastView}>
                {listGrid ?
                    <TouchableOpacity onPress={() => {
                        setListGrid(!listGrid)
                        gridList(listGrid)
                    }}>
                        <Feather name="list" size={25} />
                    </TouchableOpacity> :
                    <TouchableOpacity onPress={async () => {
                        setListGrid(!listGrid)
                        gridList(listGrid)
                    }}>
                        <Feather name="grid" size={25} />
                    </TouchableOpacity>
                }
                <TouchableOpacity onPress={() => {
                    setMenu(!menu)
                }}>
                    <Image style={styles.userImg} />
                </TouchableOpacity>
            </View>
            <Overlay
                overlayStyle={styles.overlay}
                isVisible={menu}
                onBackdropPress={() => {
                    setMenu(!menu)
                }}
            >
                <Image style={styles.menuUserImg} />
                <Divider />
                <Text style={styles.text}>
                    {(JSON.parse(state.token).firstName) + ((JSON.parse(state.token).lastName))}
                </Text>
                <Text style={styles.text}>
                    {(JSON.parse(state.token).email)}
                </Text>
                <Divider />
                <Button
                    onPress={signOut}
                    containerStyle={styles.button} title="Sign out" />
            </Overlay>
        </View>
    )
};
const styles = StyleSheet.create({
    header: {
        height: 50,
        width: "95%",
        backgroundColor: "#fff",
        margin: 10,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        borderRadius: 10,
        borderColor: 'lightgray',
        borderWidth: 1,
        zIndex: 9
    },
    searchBox: {
        flexDirection: 'row',
        alignItems: "center",
        flex: 1,
        marginHorizontal: 10,
    },
    search: {
        flex: 1,
        marginLeft: 5
    },
    lastView: {
        flexDirection: "row",
        alignItems: "center"
    },
    userImg: {
        width: 35,
        height: 35,
        borderWidth: 1,
        borderColor: "lightgray",
        borderRadius: 35 / 2,
        marginHorizontal: 10,
    },
    overlay: {
        height: 300,
        width: 300,
        padding: 0,
        backgroundColor: "#fff",
        borderRadius: 10
    },
    menuUserImg: {
        height: 70,
        width: 70,
        borderRadius: 70 / 2,
        backgroundColor: "coral",
        alignSelf: "center",
        marginVertical: 20,
        borderWidth: 3,
        borderColor: "lightgray"
    },
    text: {
        fontSize: 18,
        letterSpacing: 1,
        marginVertical: 10,
        alignSelf: "center"
    },
    button: {
        marginVertical: 30,
        width: 80,
        alignSelf: 'center'
    }
})
export default withNavigation(Appbar)