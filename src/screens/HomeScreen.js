import React, { useContext, useEffect } from "react"
import { View, Text, StyleSheet, ScrollView } from "react-native"
import { Context as AuthContext } from "../contexts/UserContext"
import { Context as NoteContext } from '../contexts/RootContext'
import { SafeAreaView } from 'react-navigation'
import Appbar from "../components/Appbar"
import Footer from "../components/Footer"
const HomeScreen = ({ navigation }) => {
    const { state, getNotes } = useContext(NoteContext)
    console.log(state);

    useEffect(() => {
        getNotes();
    }, [])
    if (state.notes === null) {
        return null
    }
    let allNotes = state.notes.map((item, index) => {
        return <View
            key={item.id}
            style={{
                backgroundColor: item.color,
                width: 180,
                marginRight: index % 2 === 0 ? 5 : "auto",
                marginLeft: index % 2 === 0 ? "auto" : 5,
                borderRadius: 10,
                minHeight: 100,
                padding: 10,
                elevation: 2,
                marginVertical: 5,
                // borderWidth: item.color == "#fff" ? 1 : null,
                // borderColor: item.color
            }} >
            <Text>{item.title}</Text>
            <Text>{item.description}</Text>
        </View>
    })
    return (
        <SafeAreaView forceInset={{ top: "always" }}>
            <View style={styles.container}>
                <ScrollView>
                    <Appbar />
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