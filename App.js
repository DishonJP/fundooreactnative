import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createStackNavigator } from 'react-navigation-stack';
import LoginScreen from './src/screens/LoginScreen';
import RegistrationScreen from './src/screens/RegistrationScreen'
import HomeScreen from './src/screens/HomeScreen';
import ArchiveScreen from './src/screens/ArchiveScreen';
import CreateNoteScreen from './src/screens/CreateNoteScreen'
import { Provider as UserProvider } from './src/contexts/UserContext'
import { setNavigator } from './src/navigationRef'
import AuthLoadingScreen from './src/screens/AuthLoadingScreen';
import { Provider as RootProvider } from './src/contexts/RootContext'
import LabelScreen from './src/screens/LabelScreen';
const SwitchNavigator = createSwitchNavigator({
  LoadingScreen: AuthLoadingScreen,
  loginFlow: createStackNavigator({
    Login: LoginScreen,
    Registration: RegistrationScreen
  }),
  DrawerFlow: createDrawerNavigator({
    NoteFlow: createStackNavigator({
      Home: HomeScreen,
      CreateNote: CreateNoteScreen,
      LabelNote: LabelScreen
    }),
    Archive: ArchiveScreen
  })
})
const App = createAppContainer(SwitchNavigator)
export default () => {
  return <UserProvider>
    <RootProvider>
      <App ref={(navigator) => {
        setNavigator(navigator)
      }} />
    </RootProvider>
  </UserProvider>
}