import React, { createContext } from 'react'
import fundoo from '../api/fundoo'
import noteApi from '../constants/noteApiConstants'
import AsyncStorage from '@react-native-community/async-storage'
import createDataContext from './createDataContext'
import { navigate } from '../navigationRef'
const noteReducer = (state, action) => {
    switch (action.type) {
        case "getNote":
            return {
                ...state,
                notes: action.payload
            }
        case "addNote":
            return {
                ...state,
                notes: [...state.notes, action.payload]
            }
        case "getLabel":
            return {
                ...state,
                label: action.payload
            }
        case "addLabel":
            return {
                ...state,
                label: [...state.label, action.payload]
            }
        default:
            return state
    }
}
const getNotes = dispatch => async () => {
    try {
        const response = await fundoo.get(noteApi.getNotes, {
            headers: {
                Authorization: JSON.parse(await AsyncStorage.getItem('token')).id
            }
        })
        dispatch({ type: "getNote", payload: response.data.data.data })
        const labelResponse = await fundoo.get(noteApi.getLabel, {
            headers: {
                Authorization: JSON.parse(await AsyncStorage.getItem('token')).id
            }
        })
        console.log(labelResponse);

        dispatch({ type: "getLabel", payload: labelResponse.data.data.details })
    } catch (error) {
        console.log(error);
    }
}
const addNote = dispatch => async (field) => {
    try {
        console.log(field);

        const response = await fundoo.post(noteApi.createNote, field, {
            headers: {
                Authorization: JSON.parse(await AsyncStorage.getItem('token')).id
            }
        })
        console.log(response);

        dispatch({ type: "addNote", payload: response.data.status.details })
        navigate('Home')
    } catch (error) {
        console.log(error);

    }
}
const addLabel = dispatch => async (field) => {
    try {
        console.log(field);

        const response = await fundoo.post(noteApi.labelNote, field, {
            headers: {
                Authorization: JSON.parse(await AsyncStorage.getItem('token')).id
            }
        })
        dispatch({ type: "addLabel", payload: response.data })
    } catch (error) {
        console.log(error);

    }
}
export const { Context, Provider } = createDataContext(noteReducer, { getNotes, addNote, addLabel }, {
    notes: null
})