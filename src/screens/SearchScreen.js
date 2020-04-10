import React, { useState, useContext } from 'react'
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, TextInput, ScrollView, TouchableWithoutFeedback } from 'react-native'
import Feather from 'react-native-vector-icons/Feather'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { Context as RootContext } from '../contexts/RootContext'
import { Button } from 'react-native-elements'
const SearchScreen = ({ navigation }) => {
    const { state } = useContext(RootContext)
    const [search, setSearch] = useState("");
    const [height, setHeight] = useState(false)
    const [colorHeight, setColHeight] = useState(false)
    let labelNotes = state.label.map((item, index) => {
        return <TouchableWithoutFeedback key={item.id}>
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
        return <TouchableOpacity>
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
                <View style={styles.headerText}>
                    <Text style={styles.title}>TYPES</Text>
                </View>
                <View style={styles.typesContainer}>
                    <MaterialCommunityIcons color="#fff" name="bell-plus-outline" size={25} />
                    <Text
                        style={{
                            top: 40,
                            color: "#fff"
                        }}>Reminder</Text>
                </View>
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
                </View>
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
})
SearchScreen.navigationOptions = () => {
    return {
        headerShown: false
    }
}
export default SearchScreen