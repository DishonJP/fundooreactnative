import React, { useState, useContext } from 'react'
import { SafeAreaView, View, ScrollView, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native'
import { Divider } from 'react-native-elements'
import AntDesign from 'react-native-vector-icons/AntDesign'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import DrawerContent from './DrawerContent'
import { Context as RootContext } from '../contexts/RootContext'
const Drawer = ({ navigation }) => {
    const { state } = useContext(RootContext);
    const [color, setColor] = useState(false)
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView>
                <View style={styles.header}>
                    <Text style={styles.fundoo}>Fundoo</Text>
                    <Text style={styles.note}>Note</Text>
                </View>
                <DrawerContent
                    navigation={navigation}
                    name="Notes"
                    icon={<AntDesign style={styles.icon} name="bulb1" size={20} />} />

                <DrawerContent
                    navigation={navigation}
                    name="Reminder"
                    icon={<MaterialCommunityIcons style={styles.icon} name="bell-plus-outline" size={20} />} />
                <Divider />
                <View style={styles.label}>
                    <Text style={{
                        marginLeft: 25,
                        letterSpacing: 1,
                        fontSize: 12
                    }}>LABELS</Text>
                    <TouchableOpacity>
                        <Text style={{
                            marginRight: 25,
                            letterSpacing: 1,
                            fontSize: 12
                        }}>EDIT</Text>
                    </TouchableOpacity>
                </View>
                <FlatList
                    data={state.label}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => {
                        return (
                            <TouchableOpacity onPress={() => {
                                navigation.closeDrawer()
                                navigation.navigate('Home', { name: item.label })

                            }}>
                                <View style={{
                                    flexDirection: "row",
                                    alignItems: "center",
                                    height: 50,
                                    //backgroundColor: color ? "#feefc3" : "#fff",
                                    borderTopRightRadius: 50,
                                    borderBottomRightRadius: 50,
                                    marginRight: 10
                                }}>
                                    <MaterialIcons style={styles.icon} name="label-outline" size={20} />
                                    <Text style={{
                                        letterSpacing: 1,
                                        fontSize: 16
                                    }}>{item.label}</Text>
                                </View>
                            </TouchableOpacity>
                        )
                    }}
                />
                <Divider />
                <DrawerContent
                    navigation={navigation}
                    name="Archive"
                    icon={<MaterialIcons style={styles.icon} name="archive" size={20} />} />
                <DrawerContent
                    navigation={navigation}
                    name="Trash"
                    icon={<AntDesign style={styles.icon} name="delete" size={20} />} />
            </ScrollView>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        height: 70,
        backgroundColor: "#fff",
        borderBottomWidth: 1,
        borderColor: "lightgray"
    },
    fundoo: {
        fontSize: 22,
        letterSpacing: 1,
        fontWeight: "500"
    },
    note: {
        marginLeft: 10,
        fontSize: 26,
        letterSpacing: 1,
        fontWeight: "600"
    },
    icon: {
        marginLeft: 25,
        marginRight: 20
    },
    label: {
        flexDirection: "row",
        height: 30,
        alignItems: "center",
        justifyContent: "space-between"
    }
})
export default Drawer