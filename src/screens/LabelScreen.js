import React, { useContext, useState } from 'react'
import Feather from 'react-native-vector-icons/Feather'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { StyleSheet, View, Text, FlatList, TouchableOpacity, TextInput, ScrollView } from 'react-native'
import { Context as RootContext } from '../contexts/RootContext'
import AsyncStorage from '@react-native-community/async-storage'
const LabelScreen = ({ navigation }) => {
    const { state, addLabel } = useContext(RootContext)
    const [search, setSearch] = useState("")
    let addlabel = [];
    for (let i = 0; i < state.label.length; i++) {
        addlabel.push({ label: state.label[i], check: false })
    }
    const [label, setLabel] = useState(addlabel);
    let labelObj = label.find(el => {
        return el.label.label.toLocaleLowerCase() === search.toLocaleLowerCase()
    })
    return (
        <ScrollView style={{
            backgroundColor: "#fff"
        }}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => {
                        navigation.navigate('CreateNote', { label: label })
                    }}>
                        <Feather
                            style={styles.icon} name="arrow-left" size={25} />
                    </TouchableOpacity>
                    <TextInput
                        style={styles.inputtext}
                        placeholder="Enter label name"
                        value={search}
                        onChangeText={setSearch}
                    />
                </View>
                {labelObj || search === "" ?
                    null : <TouchableOpacity onPress={async () => {
                        addLabel({
                            label: search, isDeleted: false,
                            userId: JSON.parse(await AsyncStorage.getItem('token')).userId
                        })
                        // let labelArray = []
                        // const data = { label: { label: search, id: Math.floor(Math.random() * 10000).toLocaleString() }, check: true }
                        // labelArray.push(data);
                        // label.forEach(element => {
                        //     labelArray.push(element)
                        // });
                        // setLabel(labelArray)
                    }}>
                        <View style={styles.create}>
                            <Feather style={styles.icon} name="plus" size={25} color="dodgerblue" />
                            <Text style={{
                                fontSize: 18
                            }}>Create "{search}"</Text>
                        </View>
                    </TouchableOpacity>}
                <FlatList
                    data={label}
                    keyExtractor={item => item.label.id}
                    renderItem={({ item }) => {
                        if (item.label.label.toLocaleLowerCase().startsWith(search.toLocaleLowerCase())) {
                            return (
                                <TouchableOpacity onPress={() => {
                                    let labelarray = [];
                                    if (item.check === false) {
                                        let labels = label.filter((el) => {
                                            return el.label.id === item.label.id
                                        })
                                        const data = { label: labels[0].label, check: true }
                                        for (let i = 0; i < label.length; i++) {
                                            if (label[i].label.id === labels[0].label.id) {
                                                labelarray.push(data)
                                            } else {
                                                labelarray.push(label[i])
                                            }
                                        }
                                        setLabel(labelarray)
                                    } else {
                                        let labelarray = [];
                                        let labels = label.filter((el) => {
                                            return el.label.id === item.label.id
                                        })
                                        const data = { label: labels[0].label, check: false }
                                        for (let i = 0; i < label.length; i++) {
                                            if (label[i].label.id === labels[0].label.id) {
                                                labelarray.push(data)
                                            } else {
                                                labelarray.push(label[i])
                                            }
                                        }
                                        setLabel(labelarray)
                                    }
                                }}>
                                    <View style={styles.labelContainer}>
                                        <MaterialIcons style={styles.icon} name="label-outline" size={25} />
                                        <Text style={{
                                            justifyContent: "flex-start",
                                            width: "auto",
                                            flexDirection: "row",
                                            flex: 1,
                                            fontSize: 18
                                        }}>{item.label.label}</Text>
                                        {item.check ? <Feather style={styles.checkBox} name="check-square" size={25} /> :
                                            <Feather style={styles.checkBox} name="square" size={25} />}
                                    </View>
                                </TouchableOpacity>
                            );
                        }
                    }}
                />
            </View>
        </ScrollView>
    )
}
LabelScreen.navigationOptions = () => {
    return {
        headerShown: false
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff"
    },
    header: {
        width: "100%",
        height: 60,
        borderBottomWidth: 1,
        borderColor: "lightgray",
        flexDirection: "row",
        alignItems: "center",
    },
    labelContainer: {
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
        height: 50,
        justifyContent: "space-between"
    },
    icon: {
        marginLeft: 15,
        marginRight: 30
    },
    checkBox: {
        marginRight: 15
    },
    inputtext: {
        width: "80%",
        fontSize: 20
    },
    create: {
        flexDirection: "row",
        alignItems: "center",
        height: 50
    }
})
export default LabelScreen