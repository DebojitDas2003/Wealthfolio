import React, { useState } from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Image,
  Alert,
} from 'react-native'
import { Feather } from '@expo/vector-icons'
import { Inter_400Regular } from '@expo-google-fonts/inter'
import { Poppins_700Bold } from '@expo-google-fonts/poppins'
import { useFonts } from 'expo-font'
import { useRouter } from 'expo-router'

const SignUp = () => {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Poppins_700Bold,
  })

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const validateEmail = (email: string) => {
    const emailRegex = /\S+@\S+\.\S+/
    return emailRegex.test(email)
  }

  if (!fontsLoaded) {
    return <ActivityIndicator size="large" color="#1E1F4B" />
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
      {/* Add GIF/illustration at the top */}
      <Image
        source={require('@/assets/images/registration.gif')} // Replace with your actual path
        style={styles.gifImage}
      />
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
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.passwordInput}
          placeholder="Confirm Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry={!showConfirmPassword}
        />
        <TouchableOpacity
          onPress={() => setShowConfirmPassword(!showConfirmPassword)}
          style={styles.eyeIcon}
        >
          <Feather
            name={showConfirmPassword ? 'eye-off' : 'eye'}
            size={24}
            color="#1E1F4B"
          />
        </TouchableOpacity>
      </View>
      {loading ? (
        <ActivityIndicator size="small" style={styles.loader} />
      ) : (
        <TouchableOpacity style={styles.button} onPress={signUp}>
          <Text style={styles.buttonText}>Create Account</Text>
        </TouchableOpacity>
      )}
      <View style={styles.footer}>
        <Text style={styles.footerText}>Already have an account?</Text>
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
    backgroundColor: '#d4f5d4',
  },
  gifImage: {
    width: 150,
    height: 150,
    marginBottom: 20,
    alignSelf: 'center',
    resizeMode: 'contain',
  },
  title: {
    fontSize: 28,
    color: '#30A13C',
    marginBottom: 20,
    fontFamily: 'Poppins_700Bold', // Specified, remains unchanged
    width: '90%',
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 15,
    paddingHorizontal: 10,
    marginBottom: 10,
    backgroundColor: '#fff',
    fontFamily: 'Inter_400Regular', // Specified, remains unchanged
  },
  passwordContainer: {
    height: 50,
    marginBottom: 10,
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
    paddingHorizontal: 10,
    fontFamily: 'Inter_400Regular',
  },
  eyeIcon: {
    padding: 10,
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
    fontFamily: 'Inter_400Regular', // Added default
  },
  loader: {
    marginVertical: 20,
  },
  errorText: {
    color: 'red',
    marginTop: 10,
    textAlign: 'center',
    fontFamily: 'Inter_400Regular', // Added default
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  footerText: {
    fontFamily: 'Inter_400Regular', // Added default
  },
  link: {
    color: '#1E1F4B',
    fontWeight: 'bold',
    marginLeft: 5,
    fontFamily: 'Inter_400Regular', // Added default
  },
})
