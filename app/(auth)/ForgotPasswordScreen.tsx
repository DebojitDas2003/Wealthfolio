import React, { useState } from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from 'react-native'
import { Feather } from '@expo/vector-icons'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { useFonts } from 'expo-font'
import { Inter_400Regular } from '@expo-google-fonts/inter'
import { Poppins_700Bold } from '@expo-google-fonts/poppins'

type RootStackParamList = {
  LoginScreen: undefined
  Home: undefined
  ForgotPassword: undefined
  // Add other screen names and their param types here
}

type ForgotPasswordScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'LoginScreen'
>

type Props = {
  navigation: ForgotPasswordScreenNavigationProp
}

export default function ForgotPasswordScreen({ navigation }: Props) {
  const [email, setEmail] = useState('')

  // Load fonts
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Poppins_700Bold,
  })

  if (!fontsLoaded) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color="#1E1F4B" />
      </SafeAreaView>
    )
  }

  const handleResetPassword = () => {
    console.log('Reset password for:', email)
    // Implement password reset logic here
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingView}
      >
        <View style={styles.content}>
          <Text style={styles.title}>Forgot Password</Text>

          <Text style={styles.description}>
            Oh sorry! Enter your email address below and we will send you a reset link.
          </Text>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Enter your email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
            <Text style={styles.rememberPasswordText}>
              Remember your password?{' '}
              <Text style={styles.clickHere}>Click here</Text>
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={handleResetPassword}>
            <Text style={styles.buttonText}>Next</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#d4f5d4',
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  title: {
    marginTop: 50,
    fontSize: 24,
    // Use Poppins_700Bold for the title
    fontFamily: 'Poppins_700Bold',
    color: '#2c3e50',
    marginBottom: 10,
  },
  description: {
    fontSize: 15,
    // Use Inter_400Regular for regular text
    fontFamily: 'Inter_400Regular',
    color: '#34495e',
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    fontSize: 15,
    // Use Inter_400Regular for input text
    fontFamily: 'Inter_400Regular',
  },
  rememberPasswordText: {
    fontSize: 14,
    // Use Inter_400Regular for small texts
    fontFamily: 'Inter_400Regular',
    color: '#34495e',
    marginBottom: 20,
  },
  clickHere: {
    color: '#2c3e50',
    // Bold text for emphasis
    fontFamily: 'Poppins_700Bold',
  },
  button: {
    backgroundColor: '#95a5a6',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    // Use Inter_400Regular for button text (or switch to a bold font if desired)
    fontFamily: 'Inter_400Regular',
    fontWeight: 'bold',
  },
})
