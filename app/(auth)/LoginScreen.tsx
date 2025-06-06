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
  Alert,
  Image,
} from 'react-native'
import { Feather } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import { useFonts } from 'expo-font'
import { Poppins_700Bold } from '@expo-google-fonts/poppins'
import { Inter_400Regular } from '@expo-google-fonts/inter'
import AsyncStorage from '@react-native-async-storage/async-storage'

const Login = () => {
  // Load both fonts
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Poppins_700Bold,
  })

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  if (!fontsLoaded) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color="#1E1F4B" />
      </SafeAreaView>
    )
  }

  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const handleLogin = async () => {
    if (!isValidEmail(email)) {
      Alert.alert('Invalid Email', 'Please enter a valid email address.')
      return
    }
    if (!password) {
      Alert.alert('Missing Password', 'Password cannot be empty.')
      return
    }

    setLoading(true)
    setError('')

    try {
      const response = await fetch(
        'http://192.168.114.85:5000/auth_redirect/signin',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            Email: email,
            PasswordHash: password,
            client_id: 'b4db3b7b-502e-4df3-88c4-f509093769c6',
            client_secret: 'd541a27e-b873-4f69-9f6f-6c7553e86d16',
          }),
        }
      )

      const result = await response.json()

      if (response.ok && result.access_token) {
        try {
          await AsyncStorage.setItem('access_token', result.access_token)
          console.log('Access Token Saved:', result.access_token)
          const storedToken = await AsyncStorage.getItem('access_token')
          console.log('Retrieved Token from Storage:', storedToken)
        } catch (error) {
          console.error('Error saving token:', error)
        }

        router.push('../(tabs)/HomeScreen')
      } else {
        console.error('No token received from backend:', result)
        Alert.alert('Sign In Failed', result.message || 'Invalid credentials.')
      }
    } catch (err) {
      Alert.alert('Sign In Failed', 'Please check your network and try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingView}
      >
        <View style={styles.content}>
          {/* Insert GIF at the top */}
          <Image
            source={require('@/assets/images/login.gif')}
            style={styles.gifImage}
          />

          <Text style={styles.title}>Log in</Text>
          {error ? <Text style={styles.errorText}>{error}</Text> : null}

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Email address</Text>
            <TextInput
              style={styles.input}
              placeholder="Your email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Password</Text>
            <View style={styles.passwordContainer}>
              <TextInput
                style={styles.passwordInput}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity
                onPress={() => setShowPassword(!showPassword)}
                style={styles.eyeIcon}
              >
                <Feather
                  name={showPassword ? 'eye-off' : 'eye'}
                  size={24}
                  color="#1E1F4B"
                />
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity
            style={styles.forgotPassword}
            onPress={() => router.push('/ForgotPasswordScreen')}
          >
            <Text style={styles.forgotPasswordText}>Forgot password?</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.forgotPassword}
            onPress={() => router.push('/HomeScreen')}
          >
            <Text style={styles.forgotPasswordText}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, loading && styles.buttonDisabled]}
            onPress={handleLogin}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#ffffff" />
            ) : (
              <Text style={styles.buttonText}>Log in</Text>
            )}
          </TouchableOpacity>

          <View style={styles.signupContainer}>
            <Text style={styles.signupText}>Don't have an account? </Text>
            <TouchableOpacity
              onPress={() => router.push('/(auth)/SignUpScreen')}
            >
              <Text style={styles.signupLink}>Sign up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default Login

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
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  gifImage: {
    width: 200,
    height: 200,
    marginBottom: 20,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 32,
    color: '#30A13C',
    marginBottom: 20,
    fontFamily: 'Poppins_700Bold',
    width: '90%',
    textAlign: 'left',
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    color: '#2c3e50',
    marginBottom: 5,
    fontFamily: 'Inter_400Regular',
    marginLeft: 10,
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 15,
    paddingHorizontal: 20,
    fontFamily: 'Inter_400Regular',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: 'white',
    borderRadius: 15,
  },
  passwordInput: {
    flex: 1,
    height: 50,
    paddingHorizontal: 20,
    fontFamily: 'Inter_400Regular',
  },
  eyeIcon: {
    padding: 10,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: 20,
  },
  forgotPasswordText: {
    color: '#1E1F4B',
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#1E1F4B',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'Inter_400Regular',
  },
  buttonDisabled: {
    backgroundColor: '#95a5a6',
  },
  signupContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  signupText: {
    color: '#2c3e50',
    fontFamily: 'Inter_400Regular',
  },
  signupLink: {
    color: '#1E1F4B',
    fontWeight: 'bold',
    fontFamily: 'Inter_400Regular',
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    marginBottom: 10,
    fontFamily: 'Inter_400Regular',
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
  },
})
