import React, { useState, useContext } from 'react'
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, TextInput, ScrollView, TouchableWithoutFeedback } from 'react-native'
import Feather from 'react-native-vector-icons/Feather'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { Context as RootContext } from '../contexts/RootContext'
import { Button } from 'react-native-elements'
const SearchScreen = ({ navigation }) => {
    console.disableYellowBox = true;
    const { state } = useContext(RootContext)
    const [search, setSearch] = useState("");
    const [height, setHeight] = useState(false)
    const [colorHeight, setColHeight] = useState(false)
    let labelNotes = state.label.map((item, index) => {
        return <TouchableWithoutFeedback
            onPress={() => {
                setSearch(item.label)
            }}
            key={item.id}>
            <View key={item.id} style={{
                height: 127,
                width: 127,
                backgroundColor: "lightgray",
                alignItems: "center",
                justifyContent: "center",
                marginRight: (index + 1) % 3 === 0 ? 0 : 5,
                marginBottom: 5
            }}>
                <MaterialIcons color="grey" name="label-outline" size={40} />
                <Text style={{
                    top: 20
                }}>{item.label}</Text>
            </View>
        </TouchableWithoutFeedback>
    })
    let colorArray = [];
    state.notes.forEach(element => {
        colorArray.push(element.color)
    });
    let filterColor = colorArray.filter((value, index, self) => {
        return self.indexOf(value) === index;
    })
    let colorObj = filterColor.map((item, index) => {
        return <TouchableOpacity onPress={() => {
            setSearch(item)
        }}>
            <View style={{
                height: 60,
                width: 60,
                borderRadius: 30,
                backgroundColor: item,
                borderWidth: 1,
                borderColor: "lightgray",
                margin: 2
            }} />
        </TouchableOpacity>
    })
    let allNotesCount = 0;
    let allNotes = state.notes.map((item, index) => {
        let labelCount = 0;
        let labelObj = item.noteLabels.map(item => {
            if (item.label.toLocaleLowerCase().startsWith(search.toLocaleLowerCase())) {
                labelCount++
            }
            return <View key={item.id}
                style={styles.labelNote}>
                <Text>{item.label}</Text>
            </View>
        })
        if (labelCount > 0 || item.title.toLocaleLowerCase().startsWith(search.toLocaleLowerCase()) || item.description.toLocaleLowerCase().startsWith(search.toLocaleLowerCase()) || item.color === search) {
            allNotesCount++;
            return <TouchableOpacity key={item.id} onPress={() => {
                navigation.navigate('EditNote', { notes: item })
            }}>
                <View
                    key={item.id}
                    style={{
                        backgroundColor: item.color,
                        width: 180,
                        marginRight: allNotesCount % 2 === 0 ? 0 : 10,
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
        if (item.reminder.length > 0) {
            reminderCount++
            return <TouchableOpacity onPress={() => {
                navigation.navigate('EditNote', { notes: item })
            }}>
                <View
                    key={item.id}
                    style={{
                        backgroundColor: item.color,
                        width: 180,
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
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => {
                    navigation.navigate('Home')
                }}>
                    <Feather
                        style={styles.icon} name="arrow-left" size={25} />
                </TouchableOpacity>
                <TextInput
                    autoFocus
                    style={styles.inputtext}
                    placeholder="Search your notes"
                    value={search}
                    onChangeText={setSearch}
                />
            </View>
            <ScrollView>
                {"Reminder" === search ?
                    <View style={styles.view}>{reminderNotes}</View> :
                    allNotesCount > 0 && search !== "" ? <View style={styles.view}>{allNotes}</View>
                        :
                        <><View style={styles.headerText}>
                            <Text style={styles.title}>TYPES</Text>
                        </View>
                            <TouchableWithoutFeedback onPress={() => {
                                setSearch("Reminder")
                            }}>
                                <View style={styles.typesContainer}>
                                    <MaterialCommunityIcons color="#fff" name="bell-plus-outline" size={25} />
                                    <Text
                                        style={{
                                            top: 40,
                                            color: "#fff"
                                        }}>Reminder</Text>
                                </View>
                            </TouchableWithoutFeedback>
                            <View style={styles.headerText}>
                                <Text style={styles.title}>LABELS</Text>
                                <Button
                                    onPress={() => {
                                        setHeight(!height)
                                    }}
                                    type="clear"
                                    title="more" />
                            </View>
                            <View style={{
                                height: height ? "auto" : 127,
                                width: "100%",
                                flexDirection: "row",
                                flexWrap: "wrap",
                                overflow: "hidden"
                            }}>
                                {labelNotes}
                            </View>
                            <View style={styles.headerText}>
                                <Text style={styles.title}>COLOURS</Text>
                                <Button
                                    onPress={() => {
                                        setColHeight(!colorHeight)
                                    }}
                                    type="clear"
                                    title="more" />
                            </View>
                            <View style={{
                                height: colorHeight ? "auto" : 65,
                                width: "100%",
                                flexDirection: "row",
                                flexWrap: "wrap",
                                overflow: "hidden"
                            }}>
                                {colorObj}
                            </View></>}
            </ScrollView>
        </SafeAreaView>
    )
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
    inputtext: {
        width: "80%",
        fontSize: 16
    },
    icon: {
        marginLeft: 15,
        marginRight: 30
    },
    typesContainer: {
        height: 127,
        width: 127,
        backgroundColor: "dodgerblue",
        alignItems: "center",
        justifyContent: "center"
    },
    headerText: {
        marginVertical: 10,
        justifyContent: "space-between",
        flexDirection: "row",
        alignItems: "center"
    },
    title: {
        marginLeft: 10,
        fontSize: 14
    },
    view: {
        flexDirection: "row",
        flexWrap: "wrap",
        flex: 1,
        marginBottom: 90,
        marginLeft: 10
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
    label: {
        flexDirection: "row",
        flexWrap: "wrap"
    },
})
SearchScreen.navigationOptions = () => {
    return {
        headerShown: false
    }
}
export default SearchScreen