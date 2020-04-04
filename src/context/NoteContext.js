import React,{createContext} from 'react'
import fundoo from '../api/fundoo'
import noteApi from '../api/constants/noteApiConstants'
import AsyncStorage from '@react-native-community/async-storage'
import createDataContext from './createDataContext'
import { navigate } from '../navigationRef'
const noteReducer=(state,action)=>{
    switch (action.type) {
        case "getNote":
            return {
                ...state,
                notes:action.payload
            }
        case "addNote":
            return{
                ...state,
                notes:action.payload
            }    
        default:
            return state
    }
}
const getNotes=dispatch=>async ()=>{
    try {
        const response=await fundoo.get(noteApi.getNotes,{
            headers:{
                Authorization:JSON.parse(await AsyncStorage.getItem('token')).id
            }
        })
        dispatch({type:"getNote",payload:response.data.data.data})
        console.log(response);
        
    } catch (error) {
        console.log(error);
    }
}
const addNote=dispatch=>async ()=>{
    try {
        const response=await fundoo.post(noteApi.createNote,{title:"gods",description:'thunder'},{
            headers:{
                Authorization:JSON.parse(await AsyncStorage.getItem('token')).id
            }
        })
        dispatch({type:"addNote",payload:response.data.data.data})
        navigate('Home')
    } catch (error) {
        
    }
}
export const {Context,Provider}=createDataContext(noteReducer,{getNotes,addNote},{
    notes:null
})