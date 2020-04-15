import React, { useState, useContext } from "react"
import { View, StyleSheet, ScrollView } from "react-native"
import { Text, Button, Input } from 'react-native-elements'
import Spacer from "../components/Spacer"
import { Context as AuthContext } from '../contexts/UserContext'
const LoginScreen = ({ navigation }) => {
    const { state, signIn } = useContext(AuthContext)
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState('');
    return (
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
                    }} title="Sign in" onPress={() => {
                        signIn({ email, password })
                    }} />
                </Spacer>
            </ScrollView>
        </View>
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
        backgroundColor: "slategray",
    },
    text: {
        alignSelf: 'center',
        color: "cyan",
        letterSpacing: 1
    }
})
export default LoginScreen;