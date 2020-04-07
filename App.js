import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createStackNavigator } from 'react-navigation-stack';
import LoginScreen from './src/screens/LoginScreen';
import RegistrationScreen from './src/screens/RegistrationScreen'
import HomeScreen from './src/screens/HomeScreen';
import CreateNoteScreen from './src/screens/CreateNoteScreen'
import { Provider as UserProvider } from './src/contexts/UserContext'
import { setNavigator } from './src/navigationRef'
import AuthLoadingScreen from './src/screens/AuthLoadingScreen';
import { Provider as RootProvider } from './src/contexts/RootContext'
import LabelScreen from './src/screens/LabelScreen';
import Drawer from './src/components/Drawer';
import EditNoteScreen from './src/screens/EditNoteScreen';
const SwitchNavigator = createSwitchNavigator({
  LoadingScreen: AuthLoadingScreen,
  loginFlow: createStackNavigator({
    Login: LoginScreen,
    Registration: RegistrationScreen
  }),
  DrawerFlow: createDrawerNavigator({
    Notes: createStackNavigator({
      Home: HomeScreen,
      CreateNote: CreateNoteScreen,
      LabelNote: LabelScreen,
      EditNote: EditNoteScreen
    })
  }, {
    contentComponent: Drawer
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