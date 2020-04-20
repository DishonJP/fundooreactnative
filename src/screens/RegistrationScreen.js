import React, { useState, useContext } from "react"
import { View, StyleSheet, ScrollView } from "react-native"
import { Text, Button, Input } from 'react-native-elements'
import Spacer from "../components/Spacer"
import { Context as AuthContext } from '../contexts/UserContext'
import Snackbar from "react-native-snackbar"
const RegistrationScreen = ({ navigation }) => {
    console.disableYellowBox = true;
    const { state, signUp } = useContext(AuthContext)
    const [firstName, setFirstName] = useState("");
    const [fError, setFError] = useState(false)
    const [lastName, setLastName] = useState("");
    const [lError, setLError] = useState(false)
    const [email, setEmail] = useState("");
    const [emailErr, setEmErr] = useState(false)
    const [password, setPassword] = useState("");
    const [passErr, setPassErr] = useState(false)
    const [repassword, setrepassword] = useState("")
    const [rePasErr, setRePasErr] = useState(false)
    const handleSubmit = () => {
        let count = 0;
        /^[a-zA-Z ]{2,30}$/.test(firstName) ? (setFError(false), count++) : setFError(true);
        /^[a-zA-Z ]{2,30}$/.test(lastName) ? (setLError(false), count++) : setLError(true);
        /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(email) ? (setEmErr(false), count++) : setEmErr(true);
        password.length > 5 ? (setPassErr(false), count++) : setPassErr(true);
        password === repassword ? (setRePasErr(false), count++) : setRePasErr(true);
        count === 5 ? signUp({ firstName, lastName, email, password }) : null
    }
    state.error === true ?
        Snackbar.show({
            title: "Registration Unsuccessful",
            duration: Snackbar.LENGTH_LONG,
            color: "black",
            backgroundColor: "coral"
        }) : null
    return (
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <Text style={{
                    alignSelf: "center",
                    color: "coral",
                    marginBottom: 30
                }} h3>Registration</Text>
                <View style={styles.view}>
                    <Input
                        errorStyle={{
                            padding: 0,
                            margin: 0
                        }}
                        inputContainerStyle={{
                            height: 40
                        }}
                        label="firstname"
                        value={firstName}
                        onChangeText={setFirstName}
                        errorMessage={fError ? "invalid first name" : null}
                        autoCapitalize="none"
                        autoCorrect={false}
                    />
                </View>
                <View style={styles.view}>
                    <Input
                        errorStyle={{
                            padding: 0,
                            margin: 0
                        }}
                        inputContainerStyle={{
                            height: 40
                        }}
                        label="lastname"
                        value={lastName}
                        onChangeText={setLastName}
                        errorMessage={lError ? "invalid last name" : null}
                        autoCapitalize="none"
                        autoCorrect={false}
                    />
                </View>
                <View style={styles.view}>
                    <Input
                        errorStyle={{
                            padding: 0,
                            margin: 0
                        }}
                        inputContainerStyle={{
                            height: 40
                        }}
                        label="email"
                        value={email}
                        errorMessage={emailErr ? "invalid email" : null}
                        onChangeText={setEmail}
                        autoCapitalize="none"
                        autoCorrect={false}
                    />
                </View>
                <View style={styles.view}>
                    <Input
                        errorStyle={{
                            padding: 0,
                            margin: 0
                        }}
                        inputContainerStyle={{
                            height: 40
                        }}
                        secureTextEntry
                        label="password"
                        errorMessage={passErr ? "minimum character of 6" : null}
                        value={password}
                        onChangeText={setPassword}
                        autoCapitalize="none"
                        autoCorrect={false}
                    />
                </View>
                <View style={styles.view}>
                    <Input
                        errorStyle={{
                            padding: 0,
                            margin: 0
                        }}
                        inputContainerStyle={{
                            height: 40
                        }}
                        secureTextEntry
                        label="re-enter-password"
                        errorMessage={rePasErr ? "password does not match" : null}
                        value={repassword}
                        onChangeText={setrepassword}
                        autoCapitalize="none"
                        autoCorrect={false}
                    />
                </View>
                <Button
                    containerStyle={{ marginTop: 10 }}
                    titleStyle={{
                        color: "coral"
                    }}
                    type="clear"
                    title="Already have an account?"
                    onPress={() => {
                        setFirstName("");
                        setLastName("");
                        setEmail("");
                        setPassword("");
                        setrepassword("")
                        navigation.navigate('Login')
                    }}
                />
                <Button
                    containerStyle={{ marginTop: 20 }}
                    buttonStyle={{
                        backgroundColor: "coral",
                        width: 150,
                        alignSelf: "center"
                    }}
                    title="Sign Up"
                    onPress={handleSubmit}
                />
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
        flexDirection: "row",
        justifyContent: "center",
        backgroundColor: "#fff",
        alignItems: "center",
        padding: 20
    },
    view: {
        height: 80
    }
})
export default RegistrationScreen;