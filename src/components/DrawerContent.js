import React, { useState } from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
const DrawerContent = ({ navigation, name, icon, index }) => {
    const [color, setColor] = useState(null)
    const changeColor = (index) => {
        if (color === index) {
            return "#feefc3";
        }
        return "#fff";
    }
    return (
        <TouchableOpacity onPress={() => {
            setColor(index)
            navigation.closeDrawer()
            navigation.navigate('Home', { name: name })

        }}>
            <View style={{
                flexDirection: "row",
                alignItems: "center",
                height: 50,
                backgroundColor: changeColor(index),
                borderTopRightRadius: 50,
                borderBottomRightRadius: 50,
                marginRight: 10
            }}>
                {icon}
                <Text style={styles.contentText}>{name}</Text>
            </View>
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({


    contentText: {
        letterSpacing: 1,
        fontSize: 16
    }
})
export default DrawerContent