import createDataContext from "./createDataContext";
import fundooApi from '../api/fundoo'
import userApi from "../constants/userApiConstants";
import AsyncStorage from "@react-native-community/async-storage"
import { navigate } from "../navigationRef";
import Config from 'react-native-config'
import Snackbar from "react-native-snackbar"
import Axios from "axios";
const authReducer = (state, action) => {
    switch (action.type) {
        case "add_error":
            return {
                ...state,
                error: true,
                errorMessage: action.payload
            }
        case "signIn":
            return {
                ...state,
                token: action.payload,
                errorMessage: "",
                error: false
            }
        case "signUp":
            return {
                ...state,
                token: action.payload,
                errorMessage: "",
                error: false
            }
        case "signOut":
            return {
                ...state,
                token: null,
                errorMessage: ""
            }
        default:
            return state
    }
};

const localSignIn = dispatch => async () => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
        dispatch({ type: "signIn", payload: token })
        navigate('DrawerFlow')
    } else {
        navigate('Login')
    }
};

const signIn = dispatch => {
    return async ({ email, password }) => {
        try {
            const response = await Axios.post(Config.REACT_APP_BASE_URL + userApi.login, { email, password })
            console.log(response.data.id);
            await AsyncStorage.setItem('token', JSON.stringify(response.data))
            dispatch({ type: "signIn", payload: response.data })
            navigate('DrawerFlow')
        } catch (error) {
            dispatch({ type: "add_error", payload: JSON.stringify(error) })
        }
    }
}

const signOut = dispatch => async () => {
    await AsyncStorage.removeItem('token');
    dispatch({ type: "signOut" })
    navigate('Login')
}

const signUp = dispatch => {
    return async ({ firstName, lastName, email, password }) => {
        try {
            const response = await Axios.post(Config.REACT_APP_BASE_URL + userApi.registration, { firstName, lastName, email, password, service: "basic" })
            if (response.data) {
                await AsyncStorage.setItem('token', JSON.stringify(response.data))
            }
            dispatch({ type: "signUp", payload: response.data.id })
            console.warn(response);
            navigate('Login')
        } catch (error) {
            dispatch({ type: "add_error", payload: error })

        }
    }
}
const profilePic = dispatch => {
    return async (field) => {
        try {
            const response = await fundooApi.post(userApi.userPic, field)
            console.log(response);

            // await AsyncStorage.setItem('token', JSON.stringify(response.data))
            // dispatch({ type: "signUp", payload: response.data.id })
            // console.log(response.data);
            // navigate('Login')
        } catch (error) {
            console.warn(error);

        }
    }
}
export const { Provider, Context } = createDataContext(authReducer,
    { signIn, signUp, localSignIn, signOut, profilePic }
    , { token: null, error: false, errorMessage: "" })