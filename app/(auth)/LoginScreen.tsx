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
} from 'react-native'
import { Feather } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import Config from 'react-native-config'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

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
        'http://10.0.2.2:5000/auth_redirect/signin',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            Email: email,
            PasswordHash: password,
            client_id: Config.CLIENT_ID,
            client_secret: Config.CLIENT_SECRET,
          }),
        }
      )

      const result = await response.json()

      if (response.ok) {
        router.push('../(tabs)/HomeScreen')
      } else {
        setError(`Sign in failed: ${result.message}`)
      }
    } catch (err) {
      setError('Sign in failed. Please check your network and try again.')
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
                  color="#34495e"
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
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 30,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    color: '#2c3e50',
    marginBottom: 5,
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: 'white',
    borderRadius: 25,
    paddingHorizontal: 20,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 25,
  },
  passwordInput: {
    flex: 1,
    height: 50,
    paddingHorizontal: 20,
  },
  eyeIcon: {
    padding: 10,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: 20,
  },
  forgotPasswordText: {
    color: '#34495e',
    fontSize: 14,
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#34495e',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  signupContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  signupText: {
    color: '#2c3e50',
  },
  signupLink: {
    color: '#34495e',
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    marginBottom: 10,
  },
  buttonDisabled: {
    backgroundColor: '#95a5a6',
  },
})
