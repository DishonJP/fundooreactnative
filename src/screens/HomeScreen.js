import React, { useContext, useEffect, useState } from "react"
import { View, Text, StyleSheet, ScrollView, FlatList, TouchableOpacity, Dimensions, TouchableWithoutFeedback } from "react-native"
import { Divider } from "react-native-elements"
import { PieChart } from "react-native-chart-kit";
import { Context as AuthContext } from "../contexts/UserContext"
import { Context as NoteContext } from '../contexts/RootContext'
import { SafeAreaView } from 'react-navigation'
import Appbar from "../components/Appbar"
import Footer from "../components/Footer"
import Animated from "react-native-reanimated";
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
    let pinCount = 0;
    let upPinCount = 0;
    let archiveCount = 0;
    let trashCount = 0;
    const chartConfig = {
        backgroundGradientFrom: "#1E2923",
        backgroundGradientFromOpacity: 0,
        backgroundGradientTo: "#08130D",
        backgroundGradientToOpacity: 0.5,
        color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
        strokeWidth: 2,
        barPercentage: 0.5
    };
    const ridList = (data) => {
        setGridList(data)
    }
    if (state.notes === null) {
        return null
    }
    console.log(state);
    let allNotes = state.notes.map((item, index) => {
        let labelObj = item.noteLabels.map(item => {
            return <View key={item.id}
                style={styles.labelNote}>
                <Text>{item.label}</Text>
            </View>
        })
        if (item.isPined === false && item.isDeleted === false && item.isArchived === false) {
            upPinCount++;
            return <TouchableOpacity
                onPress={() => {
                    navigation.navigate('EditNote', { notes: item })
                }}>
                <View
                    key={item.id}
                    style={{
                        backgroundColor: item.color,
                        width: gridList ? Dimensions.get("screen").width - 20 : 180,
                        marginRight: upPinCount % 2 === 0 ? 0 : 10,
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
            return <TouchableWithoutFeedback
                onPress={() => {
                    navigation.navigate('EditNote', { notes: item })
                }}
            >
                <Animated.View key={item.id}
                    style={{
                        backgroundColor: item.color,
                        width: gridList ? Dimensions.get("screen").width - 20 : 180,
                        marginRight: pinCount % 2 === 0 ? 0 : 10,
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
                </Animated.View>
            </TouchableWithoutFeedback>
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
            archiveCount++;
            return <TouchableOpacity onPress={() => {
                navigation.navigate('EditNote', { notes: item })
            }}>
                <View
                    key={item.id}
                    style={{
                        backgroundColor: item.color,
                        width: gridList ? Dimensions.get("screen").width - 20 : 180,
                        marginRight: archiveCount % 2 === 0 ? 0 : 10,
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
            return <TouchableOpacity onPress={() => {
                navigation.navigate('EditNote', { notes: item })
            }}>
                <View
                    key={item.id}
                    style={{
                        backgroundColor: item.color,
                        width: gridList ? Dimensions.get("screen").width - 20 : 180,
                        marginRight: labelCount % 2 === 0 ? 0 : 10,
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
        let reminderCount = 0
        let labelObj = item.noteLabels.map(item => {
            return <View key={item.id}
                style={styles.labelNote}>
                <Text>{item.label}</Text>
            </View>
        })
        if (item.reminder.length > 0 && item.isDeleted === false) {
            reminderCount++
            return <TouchableOpacity onPress={() => {
                navigation.navigate('EditNote', { notes: item })
            }}>
                <View
                    key={item.id}
                    style={{
                        backgroundColor: item.color,
                        width: gridList ? Dimensions.get("screen").width - 20 : 180,
                        marginRight: reminderCount % 2 === 0 ? 0 : 10,
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
            trashCount++;
            return <TouchableOpacity onPress={() => {
                navigation.navigate('EditNote', { notes: item })
            }}>
                <View
                    key={item.id}
                    style={{
                        backgroundColor: item.color,
                        width: gridList ? Dimensions.get("screen").width - 20 : 180,
                        marginRight: trashCount % 2 === 0 ? 0 : 10,
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
                    {name === "Notes" ? <View>
                        <View style={{
                            alignItems: "center"
                        }}>
                            <PieChart
                                data={[
                                    {
                                        name: "Pinned Notes",
                                        notes: pinCount,
                                        color: "pink",
                                        legendFontColor: "#7F7F7F",
                                        legendFontSize: 15
                                    },
                                    {
                                        name: "Other Notes",
                                        notes: upPinCount,
                                        color: "dodgerblue",
                                        legendFontColor: "#7F7F7F",
                                        legendFontSize: 15
                                    },
                                    {
                                        name: "Archive Notes",
                                        notes: archiveCount,
                                        color: "orange",
                                        legendFontColor: "#7F7F7F",
                                        legendFontSize: 15
                                    },
                                    {
                                        name: "Trash Notes",
                                        notes: trashCount,
                                        color: "grey",
                                        legendFontColor: "#7F7F7F",
                                        legendFontSize: 15
                                    }
                                ]}
                                height={200}
                                width={Dimensions.get("screen").width}
                                accessor="notes"
                                backgroundColor="transparent"
                                chartConfig={chartConfig}
                                paddingLeft="15"
                                absolute
                            />
                        </View>
                        {pinCount > 0 ? <View style={styles.pinNote}>
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
        marginLeft: 10,
        width: "100%"
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