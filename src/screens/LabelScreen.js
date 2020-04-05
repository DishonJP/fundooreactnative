import React, { useContext, useState } from 'react'
import Feather from 'react-native-vector-icons/Feather'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { StyleSheet, View, Text, FlatList, TouchableOpacity, TextInput } from 'react-native'
import { Context as RootContext } from '../contexts/RootContext'
import { CheckBox } from 'react-native-elements'
const LabelScreen = ({ navigation }) => {
    const { state } = useContext(RootContext)
    const [checkBox, setCheckBox] = useState(false)
    const [search, setSearch] = useState("")
    let addlabel = [];
    for (let i = 0; i < state.label.length; i++) {
        addlabel.push({ label: state.label[i], check: false })
    }
    const [label, setLabel] = useState(addlabel)
    console.log(label)
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity>
                    <Feather
                        onPress={() => {
                            navigation.navigate('CreateNote')
                        }}
                        style={styles.icon} name="arrow-left" size={25} />
                </TouchableOpacity>
                <TextInput
                    style={styles.text}
                    placeholder="Enter label name"
                    value={search}
                    onChangeText={setSearch}
                />
            </View>
            <FlatList
                data={label}
                keyExtractor={item => item.label.id}
                renderItem={({ item }) => {
                    return (
                        <TouchableOpacity onPress={() => {
                            setCheckBox(!checkBox)
                            if (checkBox) {
                                let labels = label.filter((el) => {
                                    return el.label.id === item.label.id
                                })
                                const data = { label: labels[0].label, check: true }
                                setLabel([...label, data])
                            } else {
                                let labels = label.filter((el) => {
                                    return el.label.id === item.label.id
                                })
                                const data = { label: labels[0].label, check: false }
                                setLabel({ ...label, data })
                            }
                        }}>
                            <View style={styles.labelContainer}>
                                <MaterialIcons style={styles.icon} name="label-outline" size={25} />
                                <Text style={{
                                    justifyContent: "flex-start",
                                    width: "68%"
                                }}>{item.label.label}</Text>
                                <CheckBox
                                    onIconPress={() => {
                                        setCheckBox(!checkBox)

                                    }}
                                    center containerStyle={styles.checkBox} checked={item.check} />
                            </View>
                        </TouchableOpacity>
                    );
                }}
            />
        </View>
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
        alignSelf: "flex-start"
    },
    text: {
        width: "80%",
        fontSize: 20
    }
})
export default LabelScreen