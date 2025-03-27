import React, { useState } from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from 'react-native'
import { useRouter } from 'expo-router'

const SignUp = () => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const validateEmail = (email: string) => {
    const emailRegex = /\S+@\S+\.\S+/
    return emailRegex.test(email)
  }

  const validatePassword = (password: string) => {
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

  const signUp = async () => {
    setLoading(true)

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match.')
      setLoading(false)
      return
    }

    if (!validateEmail(email)) {
      Alert.alert('Error', 'Please enter a valid email address.')
      setLoading(false)
      return
    }

    if (!validatePassword(password)) {
      Alert.alert(
        'Error',
        'Password must be at least 8 characters long, include uppercase and lowercase letters, a number, a special character, and cannot contain your name.'
      )
      setLoading(false)
      return
    }

    try {
      const response = await fetch(
        'http://192.168.114.85:5000/auth_redirect/signup',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            FirstName: firstName,
            LastName: lastName,
            PhoneNumber: phoneNumber,
            UserName: email,
            Email: email,
            PasswordHash: password,
            client_id: '0037a3a1-5ca9-4120-95ad-cfca2736232b',
            client_secret: 'b4285a0e-19cf-40a4-8853-42bd4d50e3d3',
          }),
        }
      )

      const result = await response.json()

      if (response.ok) {
        Alert.alert('Success', 'User account created!', [
          { text: 'OK', onPress: () => router.push('/(auth)/LoginScreen') },
        ])
      } else {
        Alert.alert(
          'Registration Failed',
          result.message || 'An error occurred during registration.'
        )
      }
    } catch (error) {
      Alert.alert(
        'Registration Failed',
        error instanceof Error ? error.message : 'An unknown error occurred.'
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Account</Text>
      <View style={styles.row}>
        <TextInput
          style={[styles.input, styles.inputHalf]}
          placeholder="First Name"
          value={firstName}
          onChangeText={setFirstName}
        />
        <TextInput
          style={[styles.input, styles.inputHalf]}
          placeholder="Last Name"
          value={lastName}
          onChangeText={setLastName}
        />
      </View>
      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        keyboardType="phone-pad"
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
      />
      {loading ? (
        <ActivityIndicator size="small" style={styles.loader} />
      ) : (
        <TouchableOpacity style={styles.button} onPress={signUp}>
          <Text style={styles.buttonText}>Create Account</Text>
        </TouchableOpacity>
      )}
      <View style={styles.footer}>
        <Text>Already have an account?</Text>
        <Text
          style={styles.link}
          onPress={() => router.push('/(auth)/LoginScreen')}
        >
          Log in
        </Text>
      </View>
    </View>
  )
}

export default SignUp

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#D1FFD6',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#2b822b',
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  inputHalf: {
    width: '48%',
  },
  button: {
    backgroundColor: '#1E1F4B',
    borderRadius: 10,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  loader: {
    marginVertical: 20,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  link: {
    color: '#1E1F4B',
    fontWeight: 'bold',
    marginLeft: 5,
    textDecorationLine: 'underline',
  },
})
