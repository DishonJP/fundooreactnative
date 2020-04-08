import React, { useContext, useEffect, useState } from "react"
import { View, Text, StyleSheet, ScrollView, FlatList } from "react-native"
import { Divider } from "react-native-elements"
import { Context as AuthContext } from "../contexts/UserContext"
import { Context as NoteContext } from '../contexts/RootContext'
import { SafeAreaView } from 'react-navigation'
import Appbar from "../components/Appbar"
import Footer from "../components/Footer"
import { TouchableOpacity } from "react-native-gesture-handler"
const HomeScreen = ({ navigation }) => {
    const { state, getNotes } = useContext(NoteContext)
    const [gridList, setGridList] = useState(false)
    const [name, setName] = useState("Notes")
    useEffect(() => {
        if (navigation.state.params !== undefined) {
            setName(navigation.state.params.name)
        }
        getNotes();
    }, [navigation])
    const ridList = (data) => {
        setGridList(data)
    }
    if (state.notes === null) {
        return null
    }
    console.log(state);
    let pinCount = 0;
    let allNotes = state.notes.map((item, index) => {
        let labelObj = item.noteLabels.map(item => {
            return <View key={item.id}
                style={styles.labelNote}>
                <Text>{item.label}</Text>
            </View>
        })
        if (item.isPined === false && item.isDeleted === false && item.isArchived === false) {
            return <TouchableOpacity
                onPress={() => {
                    navigation.navigate('EditNote', { notes: item })
                }}>
                <View
                    key={item.id}
                    style={{
                        backgroundColor: item.color,
                        width: gridList ? "96%" : 180,
                        marginRight: index % 2 === 0 ? 10 : "auto",
                        // marginLeft: index % 2 === 0 ? "auto" : 5,
                        borderRadius: 10,
                        padding: 10,
                        elevation: 2,
                        marginTop: 10
                    }} >
                    <Text>{item.title}</Text>
                    <Text style={{
                        marginVertical: 5
                    }}>{item.description}</Text>
                    {item.reminder.length === 0 ? null : item.reminder[0].length !== 0 ?
                        <View style={{
                            padding: 5,
                            borderWidth: 1,
                            borderColor: "lightgray",
                            borderRadius: 30,
                            backgroundColor: item.color,
                            width: item.reminder[0].length + 92,
                            left: -5
                        }}>
                            <Text>{item.reminder[0].split('').filter((el, index) => {
                                return index < 21 && index > 3
                            })}</Text>
                        </View> : null}
                    <View style={styles.label}>
                        {labelObj}
                    </View>
                </View>
            </TouchableOpacity>
        }

    })
    let pinNotes = state.notes.map((item, index) => {
        let labelObj = item.noteLabels.map(item => {
            return <View key={item.id}
                style={styles.labelNote}>
                <Text>{item.label}</Text>
            </View>
        })
        if (item.isPined === true && item.isDeleted === false && item.isArchived === false) {
            pinCount++
            return <View
                onTouchStart={() => {
                    navigation.navigate('EditNote', { notes: item })
                }}
                key={item.id}
                style={{
                    backgroundColor: item.color,
                    width: gridList ? "96%" : 180,
                    marginRight: index % 2 === 0 ? 10 : "auto",
                    borderRadius: 10,
                    padding: 10,
                    elevation: 2,
                    marginTop: 10
                }} >
                <Text>{item.title}</Text>
                <Text style={{
                    marginVertical: 5
                }}>{item.description}</Text>
                {item.reminder.length === 0 ? null : item.reminder[0].length !== 0 ?
                    <View style={{
                        padding: 5,
                        borderWidth: 1,
                        borderColor: "lightgray",
                        borderRadius: 30,
                        backgroundColor: item.color,
                        width: item.reminder[0].length + 92,
                        left: -5
                    }}>
                        <Text>{item.reminder[0].split('').filter((el, index) => {
                            return index < 21 && index > 3
                        })}</Text>
                    </View> : null}
                <View style={styles.label}>
                    {labelObj}
                </View>
            </View>
        }
    })
    let archiveNotes = state.notes.map((item, index) => {
        let labelObj = item.noteLabels.map(item => {
            return <View key={item.id}
                style={styles.labelNote}>
                <Text>{item.label}</Text>
            </View>
        })
        if (item.isArchived === true && item.isDeleted === false) {
            pinCount++
            return <TouchableOpacity>
                <View
                    key={item.id}
                    style={{
                        backgroundColor: item.color,
                        width: gridList ? "96%" : 180,
                        marginRight: index % 2 === 0 ? 10 : "auto",
                        // marginLeft: index % 2 === 0 ? "auto" : 5,
                        borderRadius: 10,
                        padding: 10,
                        elevation: 2,
                        marginTop: 10
                    }} >
                    <Text>{item.title}</Text>
                    <Text style={{
                        marginVertical: 5
                    }}>{item.description}</Text>
                    {item.reminder.length === 0 ? null : item.reminder[0].length !== 0 ?
                        <View style={{
                            padding: 5,
                            borderWidth: 1,
                            borderColor: "lightgray",
                            borderRadius: 30,
                            backgroundColor: item.color,
                            width: item.reminder[0].length + 92,
                            left: -5
                        }}>
                            <Text>{item.reminder[0].split('').filter((el, index) => {
                                return index < 21 && index > 3
                            })}</Text>
                        </View> : null}
                    <View style={styles.label}>
                        {labelObj}
                    </View>
                </View>
            </TouchableOpacity>
        }

    })
    let labelNotes = state.notes.map((item, index) => {
        let labelCount = 0;
        let labelObj = item.noteLabels.map(item => {
            if (item.label === name) {
                labelCount++
            }
            return <View key={item.id}
                style={styles.labelNote}>
                <Text>{item.label}</Text>
            </View>
        })
        if (labelCount > 0 && item.isDeleted === false) {
            return <TouchableOpacity>
                <View
                    key={item.id}
                    style={{
                        backgroundColor: item.color,
                        width: gridList ? "96%" : 180,
                        marginRight: index % 2 === 0 ? 10 : "auto",
                        borderRadius: 10,
                        padding: 10,
                        elevation: 2,
                        marginTop: 10
                    }} >
                    <Text>{item.title}</Text>
                    <Text style={{
                        marginVertical: 5
                    }}>{item.description}</Text>
                    {item.reminder.length === 0 ? null : item.reminder[0].length !== 0 ?
                        <View style={{
                            padding: 5,
                            borderWidth: 1,
                            borderColor: "lightgray",
                            borderRadius: 30,
                            backgroundColor: item.color,
                            width: item.reminder[0].length + 92,
                            left: -5
                        }}>
                            <Text>{item.reminder[0].split('').filter((el, index) => {
                                return index < 21 && index > 3
                            })}</Text>
                        </View> : null}
                    <View style={styles.label}>
                        {labelObj}
                    </View>
                </View>
            </TouchableOpacity>
        }

    })
    let reminderNotes = state.notes.map((item, index) => {
        let labelObj = item.noteLabels.map(item => {
            return <View key={item.id}
                style={styles.labelNote}>
                <Text>{item.label}</Text>
            </View>
        })
        if (item.reminder.length > 0 && item.isDeleted === false) {
            return <TouchableOpacity>
                <View
                    key={item.id}
                    style={{
                        backgroundColor: item.color,
                        width: gridList ? "96%" : 180,
                        marginRight: index % 2 === 0 ? 10 : "auto",
                        borderRadius: 10,
                        padding: 10,
                        elevation: 2,
                        marginTop: 10
                    }} >
                    <Text>{item.title}</Text>
                    <Text style={{
                        marginVertical: 5
                    }}>{item.description}</Text>
                    {item.reminder.length === 0 ? null : item.reminder[0].length !== 0 ?
                        <View style={{
                            padding: 5,
                            borderWidth: 1,
                            borderColor: "lightgray",
                            borderRadius: 30,
                            backgroundColor: item.color,
                            width: item.reminder[0].length + 92,
                            left: -5
                        }}>
                            <Text>{item.reminder[0].split('').filter((el, index) => {
                                return index < 21 && index > 3
                            })}</Text>
                        </View> : null}
                    <View style={styles.label}>
                        {labelObj}
                    </View>
                </View>
            </TouchableOpacity>
        }

    })
    let trashNotes = state.notes.map((item, index) => {
        let labelObj = item.noteLabels.map(item => {
            return <View key={item.id}
                style={styles.labelNote}>
                <Text>{item.label}</Text>
            </View>
        })
        if (item.isDeleted === true) {
            return <TouchableOpacity>
                <View
                    key={item.id}
                    style={{
                        backgroundColor: item.color,
                        width: gridList ? "96%" : 180,
                        marginRight: index % 2 === 0 ? 10 : "auto",
                        borderRadius: 10,
                        padding: 10,
                        elevation: 2,
                        marginTop: 10
                    }} >
                    <Text>{item.title}</Text>
                    <Text style={{
                        marginVertical: 5
                    }}>{item.description}</Text>
                    {item.reminder.length === 0 ? null : item.reminder[0].length !== 0 ?
                        <View style={{
                            padding: 5,
                            borderWidth: 1,
                            borderColor: "lightgray",
                            borderRadius: 30,
                            backgroundColor: item.color,
                            width: item.reminder[0].length + 92,
                            left: -5
                        }}>
                            <Text>{item.reminder[0].split('').filter((el, index) => {
                                return index < 21 && index > 3
                            })}</Text>
                        </View> : null}
                    <View style={styles.label}>
                        {labelObj}
                    </View>
                </View>
            </TouchableOpacity>
        }

    })
    return (
        <SafeAreaView forceInset={{ top: "always" }}>
            <View style={styles.container}>
                <ScrollView>
                    <Appbar gridList={ridList} />
                    {name === "Notes" ? <View>{pinCount > 0 ? <View style={styles.pinNote}>
                        <View style={{ width: "100%" }}>
                            <Text>Pined</Text>
                        </View>
                        {pinNotes}
                    </View> : null}
                        {pinCount > 0 ?
                            <Divider /> : null}
                        <View style={styles.view}>
                            {pinCount > 0 ? <View style={{ width: "100%" }}>
                                <Text>Others</Text></View> : null}
                            {allNotes}
                        </View>
                    </View> : name === "Archive" ?
                            <View style={styles.view}>
                                {archiveNotes}
                            </View> : name === "Reminder" ? <View style={styles.view}>
                                {reminderNotes}
                            </View> : name === "Trash" ? <View style={styles.view}>
                                {trashNotes}
                            </View> : <View style={styles.view}>
                                        {labelNotes}
                                    </View>}
                </ScrollView>
                <Footer />
            </View>
        </SafeAreaView>
    )
}
HomeScreen.navigationOptions = () => {
    return {
        headerShown: false
    }
}
const styles = StyleSheet.create({
    container: {
        height: "100%",
        width: "100%",
        backgroundColor: "#fff",
    },
    view: {
        flexDirection: "row",
        flexWrap: "wrap",
        flex: 1,
        marginBottom: 90,
        marginLeft: 10
    },
    label: {
        flexDirection: "row",
        flexWrap: "wrap"
    },
    labelNote: {
        borderWidth: 1,
        borderRadius: 20,
        borderColor: "lightgray",
        padding: 5,
        marginRight: 5,
        marginTop: 5,
        left: -5
    },
    pinNote: {
        flexDirection: "row",
        flexWrap: "wrap",
        flex: 1,
        marginVertical: 10,
        marginLeft: 10
    }
})
export default HomeScreen;