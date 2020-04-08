import React, { createContext } from 'react'
import fundoo from '../api/fundoo'
import noteApi from '../constants/noteApiConstants'
import AsyncStorage from '@react-native-community/async-storage'
import createDataContext from './createDataContext'
import { navigate } from '../navigationRef'
import Axios from 'axios'
import Config from 'react-native-config'
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
        // case "updateNote":
        //     return{

        //     }
        default:
            return state
    }
}
const getNotes = dispatch => async () => {
    try {
        console.log("hello");

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

        dispatch({ type: "getLabel", payload: labelResponse.data.data.details })
    } catch (error) {
        console.log(error);
    }
}
const addNote = dispatch => async (field) => {
    try {
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
const updateNote = dispatch => async (field) => {
    try {
        console.log(field);

        const response = await fundoo.post(noteApi.updateNotes, field, {
            headers: {
                Authorization: JSON.parse(await AsyncStorage.getItem('token')).id
            }
        })
        if (response.data.data.sucess === true) {
            getNotes = (dispatch)
        }

    } catch (error) {
        console.log(error);

    }
}
const archiveNote = dispatch => async (field) => {
    try {
        console.log(field);

        const response = await fundoo.post(noteApi.archive, field, {
            headers: {
                Authorization: JSON.parse(await AsyncStorage.getItem('token')).id
            }
        })
        if (response.data.data.sucess === true) {
            getNotes = (dispatch)
        }

    } catch (error) {
        console.log(error);

    }
}
const colorNote = dispatch => async (field) => {
    try {
        console.log(field);

        const response = await fundoo.post(noteApi.changeColor, field, {
            headers: {
                Authorization: JSON.parse(await AsyncStorage.getItem('token')).id
            }
        })
        if (response.data.data.sucess === true) {
            getNotes = (dispatch)
        }

    } catch (error) {
        console.log(error);

    }
}
const pinNote = dispatch => async (field) => {
    try {
        console.log(field);

        const response = await fundoo.post(noteApi.pinNotes, field, {
            headers: {
                Authorization: JSON.parse(await AsyncStorage.getItem('token')).id
            }
        })
        console.log(response);

        if (response.data.data.sucess === true) {
            getNotes = (dispatch)
        }

    } catch (error) {
        console.log(error);

    }
}
const removeReminder = dispatch => async (field) => {
    try {
        console.log(field);

        const response = await fundoo.post(noteApi.removeReminder, field, {
            headers: {
                Authorization: JSON.parse(await AsyncStorage.getItem('token')).id
            }
        })
        if (response.data.data.sucess === true) {
            getNotes = (dispatch)
        }

    } catch (error) {
        console.log(error);

    }
}
const updateReminder = dispatch => async (field) => {
    try {
        console.log(field);

        const response = await fundoo.post(noteApi.updateReminder, field, {
            headers: {
                Authorization: JSON.parse(await AsyncStorage.getItem('token')).id
            }
        })
        if (response.data.data.sucess === true) {
            getNotes = (dispatch)
        }

    } catch (error) {
        console.log(error);

    }
}
const trashNote = dispatch => async (field) => {
    try {
        console.log(field);

        const response = await fundoo.post(noteApi.trashNote, field, {
            headers: {
                Authorization: JSON.parse(await AsyncStorage.getItem('token')).id
            }
        })
        if (response.data.data.sucess === true) {
            getNotes = (dispatch)
        }

    } catch (error) {
        console.log(error);

    }
}
const updateLabel = dispatch => async (field) => {
    try {
        console.log(`${Config.REACT_APP_BASE_URL}/notes/${field.userId}/addLabelToNotes/${field.id}/add`);

        const response = await Axios.post(`${Config.REACT_APP_BASE_URL}/notes/${field.userId}/addLabelToNotes/${field.id}/add`, {
            headers: {
                Authorization: JSON.parse(await AsyncStorage.getItem('token')).id
            }
        })
        console.log(response);
        if (response.data.data.sucess === true) {
            getNotes = (dispatch)
        }

    } catch (error) {
        console.log(error);

    }
}
const removeLabel = dispatch => async (field) => {
    try {
        console.log(Config);

        console.log(`${Config.REACT_APP_BASE_URL}/notes/${field.userId}/addLabelToNotes/${field.id}/remove`);

        const response = await Axios.post(`${Config.REACT_APP_BASE_URL}/notes/${field.userId}/addLabelToNotes/${field.id}/remove`, {
            headers: {
                Authorization: JSON.parse(await AsyncStorage.getItem('token')).id
            }
        })
        console.log(response);

        if (response.data.data.sucess === true) {
            getNotes = (dispatch)
        }

    } catch (error) {
        console.log(error);

    }
}
export const { Context, Provider } = createDataContext(noteReducer, { getNotes, addNote, addLabel, updateNote, archiveNote, colorNote, pinNote, updateReminder, removeReminder, trashNote, updateLabel, removeLabel }, {
    notes: null, label: null
})