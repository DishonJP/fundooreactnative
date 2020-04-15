import React, { useState, useContext } from "react"
import { View, StyleSheet, ScrollView } from "react-native"
import { Text, Button, Input } from 'react-native-elements'
import Spacer from "../components/Spacer"
import { Context as AuthContext } from '../contexts/UserContext'
import { SafeAreaView } from "react-navigation"
import Snackbar from "react-native-snackbar"
const LoginScreen = ({ navigation }) => {
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
    state.error === true ?
        Snackbar.show({
            title: "Login Unsuccessful",
            duration: Snackbar.LENGTH_LONG,
            textColor: "black",
            backgroundColor: "cyan"
        }) : null
    return (
        <SafeAreaView style={{
            flex: 1
        }}>
            <View style={styles.container}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <Spacer>
                        <Text style={styles.text} h3>Login</Text>
                    </Spacer>
                    <Spacer>
                        <Input
                            inputContainerStyle={{
                                borderColor: "#fff"
                            }}
                            inputStyle={{
                                color: "#fff"
                            }}
                            label="Email"
                            value={email}
                            errorMessage={emailErr ? "invalid Email" : null}
                            autoCapitalize="none"
                            autoCorrect={false}
                            onChangeText={setEmail}
                        />
                    </Spacer>
                    <Spacer>
                        <Input
                            inputContainerStyle={{
                                borderColor: "#fff",
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
                    </Spacer>
                    <Button
                        titleStyle={{
                            color: "cyan"
                        }}
                        title="Don't have an account?"
                        type="clear"
                        onPress={() => {
                            navigation.navigate('Registration')
                        }}
                    />
                    <Spacer>
                        <Button buttonStyle={{
                            backgroundColor: "cyan",
                            width: 150,
                            alignSelf: "center"
                        }} title="Sign in" onPress={handleSubmit} />
                    </Spacer>
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
        justifyContent: "center",
        backgroundColor: "slategray"
    },
    text: {
        alignSelf: 'center',
        color: "cyan",
        letterSpacing: 1
    }
})
export default LoginScreen;