import React, { useState, useContext, useEffect } from "react"
import { View, StyleSheet, ScrollView } from "react-native"
import { Text, Button, Input } from 'react-native-elements'
import Toast from "../ToastExample"
import { Context as AuthContext } from '../contexts/UserContext'
import { SafeAreaView } from "react-navigation"
import Snackbar from "react-native-snackbar"
const LoginScreen = ({ navigation }) => {
    console.disableYellowBox = true;
    const { state, signIn } = useContext(AuthContext)
    const [email, setEmail] = useState("");
    const [emailErr, setEmaErr] = useState(false);
    const [passErr, setPassErr] = useState(false)
    const [password, setPassword] = useState('');
    const handleSubmit = () => {
        let count = 0;
        /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(email) ? (setEmaErr(false), count++) : setEmaErr(true);
        password !== "" ? (setPassErr(false), count++) : setPassErr(true);
        count === 2 ? signIn({ email, password }) : null
    }
    useEffect(() => {
        state.error === true ?
            Toast.show("Somthing went wrong", Toast.SHORT) : null
    }, [state])
    return (
        <SafeAreaView style={{
            flex: 1
        }}>
            <View style={styles.container}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <Text style={styles.text} h3>Login</Text>
                    <View style={styles.view}>
                        <Input
                            labelStyle={{
                                color: "cyan"
                            }}
                            inputContainerStyle={{
                                borderColor: "#fff",
                                height: 40
                            }}
                            inputStyle={{
                                color: "#fff"
                            }}
                            errorStyle={{
                                padding: 0,
                                margin: 0
                            }}
                            label="Email"
                            value={email}
                            errorMessage={emailErr ? "invalid Email" : null}
                            autoCapitalize="none"
                            autoCorrect={false}
                            onChangeText={setEmail}
                        />
                    </View>
                    <View style={styles.view}>
                        <Input
                            labelStyle={{
                                color: "cyan"
                            }}
                            errorStyle={{
                                padding: 0,
                                margin: 0
                            }}
                            inputContainerStyle={{
                                borderColor: "#fff",
                                height: 40
                            }}
                            inputStyle={{
                                color: "#fff"
                            }}
                            autoCorrect={false}
                            errorMessage={passErr ? "field is empty" : null}
                            label="Password"
                            value={password}
                            autoCapitalize="none"
                            onChangeText={setPassword}
                            secureTextEntry={true}
                        />
                    </View>
                    <Button
                        containerStyle={{ marginTop: 10 }}
                        titleStyle={{
                            color: "cyan"
                        }}
                        title="Don't have an account?"
                        type="clear"
                        onPress={() => {
                            setEmail("");
                            setPassword("")
                            navigation.navigate('Registration')
                        }}
                    />
                    <Button
                        containerStyle={{ marginTop: 20 }}
                        buttonStyle={{
                            backgroundColor: "cyan",
                            width: 150,
                            alignSelf: "center"
                        }} title="Sign in" onPress={handleSubmit} />
                </ScrollView>
            </View>
        </SafeAreaView>
    );
};
LoginScreen.navigationOptions = () => {
    return {
        headerShown: false
    };
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "slategrey",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        padding: 20
    },
    text: {
        alignSelf: 'center',
        color: "cyan",
        letterSpacing: 1,
        marginBottom: 30
    },
    view: {
        height: 80
    }
})
export default LoginScreen;