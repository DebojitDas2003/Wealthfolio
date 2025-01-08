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
import { useRouter } from 'expo-router'

const SignUp = () => {
  const router = useRouter()
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value.trim() }))
  }

  const validateInputs = () => {
    const {
      firstName,
      lastName,
      phoneNumber,
      username,
      email,
      password,
      confirmPassword,
    } = formData

    if (
      !firstName ||
      !lastName ||
      !username ||
      !email ||
      !password ||
      !confirmPassword
    ) {
      return 'All fields are required.'
    }
    if (username.length < 3) {
      return 'Username must be at least 3 characters.'
    }
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      return 'Enter a valid email address.'
    }
    if (!/^\d{10}$/.test(phoneNumber)) {
      return 'Phone number must be 10 digits.'
    }
    if (password !== confirmPassword) {
      return 'Passwords do not match.'
    }
    if (!validatePassword(password)) {
      return 'Password must be at least 8 characters long, include uppercase, lowercase, a number, and a special character, and not contain your name.'
    }
    return ''
  }

  const validatePassword = (password: string) => {
    const { firstName, lastName } = formData
    const hasUpperCase = /[A-Z]/.test(password)
    const hasLowerCase = /[a-z]/.test(password)
    const hasNumber = /\d/.test(password)
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password)
    const isValidLength = password.length >= 8
    const doesNotContainName =
      !password.toLowerCase().includes(firstName.toLowerCase()) &&
      !password.toLowerCase().includes(lastName.toLowerCase())

    return (
      hasUpperCase &&
      hasLowerCase &&
      hasNumber &&
      hasSpecialChar &&
      isValidLength &&
      doesNotContainName
    )
  }

  const handleSignUp = async () => {
    const validationError = validateInputs()
    if (validationError) {
      setError(validationError)
      return
    }

    setLoading(true)
    setError('')

    try {
      const response = await fetch(
        'http://127.0.0.1:5000/auth_redirect/signup',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...formData,
            client_id: process.env.CLIENT_ID,
            client_secret: process.env.CLIENT_SECRET,
          }),
        }
      )

      const result = await response.json()

      if (response.ok) {
        alert('User account created successfully!')
        router.push('/LoginScreen')
      } else {
        setError(`Registration failed: ${result.message}`)
      }
    } catch (err) {
      setError('Registration failed: ' + (err as Error).message)
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
          <Text style={styles.title}>Sign Up</Text>

          {error ? <Text style={styles.errorText}>{error}</Text> : null}

          {Object.keys(formData).map((field) => (
            <View style={styles.inputContainer} key={field}>
              <Text style={styles.label}>
                {field.replace(/([A-Z])/g, ' $1')}
              </Text>
              <TextInput
                style={styles.input}
                placeholder={`Your ${field}`}
                value={formData[field as keyof typeof formData]}
                onChangeText={(value) => handleInputChange(field, value)}
                secureTextEntry={
                  field === 'password' || field === 'confirmPassword'
                }
                autoCapitalize={field === 'email' ? 'none' : 'sentences'}
              />
            </View>
          ))}

          <TouchableOpacity
            style={styles.button}
            onPress={handleSignUp}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text style={styles.buttonText}>Sign Up</Text>
            )}
          </TouchableOpacity>

          <View style={styles.loginContainer}>
            <Text style={styles.loginText}>Already have an account? </Text>
            <TouchableOpacity onPress={() => router.push('/LoginScreen')}>
              <Text style={styles.loginLink}>Log in</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default SignUp

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
  loginContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  loginText: {
    color: '#2c3e50',
  },
  loginLink: {
    color: '#34495e',
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
    textAlign: 'center',
  },
})
