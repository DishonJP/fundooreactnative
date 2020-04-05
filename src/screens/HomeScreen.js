import React, { useContext, useEffect, useState } from "react"
import { View, Text, StyleSheet, ScrollView } from "react-native"
import { Context as AuthContext } from "../contexts/UserContext"
import { Context as NoteContext } from '../contexts/RootContext'
import { SafeAreaView } from 'react-navigation'
import Appbar from "../components/Appbar"
import Footer from "../components/Footer"
const HomeScreen = ({ navigation }) => {
    const { state, getNotes } = useContext(NoteContext)
    const [gridList, setGridList] = useState(false)
    useEffect(() => {
        getNotes();
    }, [])
    const ridList = (data) => {
        setGridList(data)
    }
    if (state.notes === null) {
        return null
    }
    let allNotes = state.notes.map((item, index) => {
        return <View
            key={item.id}
            style={{
                backgroundColor: item.color,
                width: gridList ? "96%" : 180,
                // marginRight: index % 2 === 0 ? 5 : "auto",
                // marginLeft: index % 2 === 0 ? "auto" : 5,
                borderRadius: 10,
                padding: 10,
                elevation: 2,
                margin: 7,
            }} >
            <Text>{item.title}</Text>
            <Text>{item.description}</Text>
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
        </View>
    })
    return (
        <SafeAreaView forceInset={{ top: "always" }}>
            <View style={styles.container}>
                <ScrollView>
                    <Appbar gridList={ridList} />
                    <View style={styles.view}>
                        {allNotes}
                    </View>
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
        marginBottom: 51
    }
})
export default HomeScreen;