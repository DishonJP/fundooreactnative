import React from 'react';
import { createAppContainer,createSwitchNavigator } from 'react-navigation'
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createStackNavigator } from 'react-navigation-stack';
import LoginScreen from './src/screens/LoginScreen';
import RegistrationScreen from './src/screens/RegistrationScreen'
import HomeScreen from './src/screens/HomeScreen';
import ArchiveScreen from './src/screens/ArchiveScreen';
import CreateNoteScreen from './src/screens/CreateNoteScreen'
import {Provider as AuthProvider} from './src/context/AuthContext'
import {setNavigator} from './src/navigationRef'
import AuthLoadingScreen from './src/screens/AuthLoadingScreen';
const SwitchNavigator=createSwitchNavigator({
  LoadingScreen:AuthLoadingScreen,
  loginFlow:createStackNavigator({
    Login:LoginScreen,
    Registration:RegistrationScreen
  }),
  DrawerFlow:createDrawerNavigator({
    NoteFlow:createStackNavigator({
      Home:HomeScreen,
      CreateNote:CreateNoteScreen
    }),
    Home:HomeScreen,
    Archive:ArchiveScreen
  })
})
const App= createAppContainer(SwitchNavigator)
export default ()=>{
  return <AuthProvider>
    <App ref={(navigator)=>{
      setNavigator(navigator)
    }} />
  </AuthProvider>
}