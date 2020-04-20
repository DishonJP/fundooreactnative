import React, { useState } from 'react'
import Feather from 'react-native-vector-icons/Feather'
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Entypo from 'react-native-vector-icons/Entypo'
import { StyleSheet, View, TouchableOpacity, TextInput, Image } from 'react-native'
import { } from 'react-native-elements'
import { withNavigation } from 'react-navigation'
const Footer = ({ navigation }) => {
    console.disableYellowBox = true;
    return (
        <View style={styles.container}>
            <View style={{
                flexDirection: "row"
            }}>
                <AntDesign style={styles.icon} name="checksquareo" size={25} />
                <Entypo name="brush" size={25} />
                <Feather style={styles.icon} name="mic" size={25} />
                <Feather name="image" size={25} />
            </View>
            <View style={styles.button}>
                <TouchableOpacity onPress={() => {
                    navigation.navigate('CreateNote')
                }}>
                    <Feather name="plus" size={60} color="coral" />
                </TouchableOpacity>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        height: 50,
        borderWidth: 1,
        borderColor: '#fff',
        borderTopColor: "lightgray",
        position: "absolute",
        bottom: 0,
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        flex: 1,
        justifyContent: "space-between",
        backgroundColor: "#fff",
        zIndex: 9
    },
    icon: {
        marginHorizontal: 20
    },
    button: {
        height: 70,
        width: 70,
        borderRadius: 70 / 2,
        right: 30,
        bottom: 20,
        backgroundColor: "#fff",
        borderWidth: 1,
        borderColor: "lightgray",
        justifyContent: "center",
        alignItems: "center"
    }
})
export default withNavigation(Footer)