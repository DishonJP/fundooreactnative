import React, { useState, useContext } from "react"
import { View, StyleSheet, ScrollView } from "react-native"
import { Text, Button, Input } from 'react-native-elements'
import Spacer from "../components/Spacer"
import { Context as AuthContext } from '../contexts/UserContext'
const RegistrationScreen = ({ navigation }) => {
    const { state, signUp } = useContext(AuthContext)
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repassword, setrepassword] = useState("")
    return (
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <Spacer>
                    <Text style={{
                        alignSelf: "center",
                        color: "coral"
                    }} h3>Registration</Text>
                </Spacer>
                <Spacer>
                    <Input
                        label="firstname"
                        value={firstName}
                        onChangeText={setFirstName}
                        autoCapitalize="none"
                        autoCorrect={false}
                    />
                </Spacer>
                <Spacer>
                    <Input
                        label="lastname"
                        value={lastName}
                        onChangeText={setLastName}
                        autoCapitalize="none"
                        autoCorrect={false}
                    />
                </Spacer>
                <Spacer>
                    <Input
                        label="email"
                        value={email}
                        onChangeText={setEmail}
                        autoCapitalize="none"
                        autoCorrect={false}
                    />
                </Spacer>
                <Spacer>
                    <Input
                        secureTextEntry
                        label="password"
                        value={password}
                        onChangeText={setPassword}
                        autoCapitalize="none"
                        autoCorrect={false}
                    />
                </Spacer>
                <Spacer>
                    <Input
                        secureTextEntry
                        label="re-enter-password"
                        value={repassword}
                        onChangeText={setrepassword}
                        autoCapitalize="none"
                        autoCorrect={false}
                    />
                </Spacer>
                <Button
                    titleStyle={{
                        color: "coral"
                    }}
                    type="clear"
                    title="Already have an account?"
                    onPress={() => {
                        navigation.navigate('Login')
                    }}
                />
                <Spacer>
                    <Button
                        buttonStyle={{
                            backgroundColor: "coral",
                            width: 150,
                            alignSelf: "center"
                        }}
                        title="Sign Up"
                        onPress={() => {
                            signUp({ firstName, lastName, email, password })
                        }}
                    />
                </Spacer>
            </ScrollView>
        </View>
    )
}
RegistrationScreen.navigationOptions = () => {
    return {
        headerShown: false
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        backgroundColor: "#fff"
    }
})
export default RegistrationScreen;