import React, { useContext, useEffect } from 'react'
import { View, ActivityIndicator } from "react-native"
import { Context as AuthContext } from '../contexts/UserContext'

const AuthLoadingScreen = () => {
    const { localSignIn } = useContext(AuthContext);
    useEffect(() => {
        localSignIn();
    }, [])
    return <View style={{
        flex: 1,
        justifyContent: "center",
        alignContent: "center"
    }}><ActivityIndicator size="large" color="coral" /></View>;
}
export default AuthLoadingScreen;