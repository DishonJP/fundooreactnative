import React, { useState } from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
const DrawerContent = ({ navigation, name, icon }) => {
    const [color, setColor] = useState(false)
    return (
        <TouchableOpacity onPress={() => {
            setColor(!color)
            navigation.closeDrawer()
            navigation.navigate('Home', { name: name })

        }}>
            <View style={{
                flexDirection: "row",
                alignItems: "center",
                height: 50,
                backgroundColor: color ? "#feefc3" : "#fff",
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