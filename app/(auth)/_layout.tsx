import { createStackNavigator } from '@react-navigation/stack'
import Login from './LoginScreen'
import SignUp from './SignUpScreen'
import ForgotPasswordScreen from './ForgotPasswordScreen'
import React from 'react'

const Stack = createStackNavigator()

function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="LoginScreen">
      <Stack.Screen
        name="LoginScreen"
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SignUpScreen"
        component={SignUp}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ForgotPasswordScreen"
        component={ForgotPasswordScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  )
}

export default AppNavigator
