import React, { useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput,
  ActivityIndicator,
  Platform,
} from 'react-native'
import { Feather } from '@expo/vector-icons'
import { useFonts } from 'expo-font'
import { Poppins_700Bold } from '@expo-google-fonts/poppins'
import { Inter_400Regular } from '@expo-google-fonts/inter'

export default function UpdateUserProfileScreen() {
  // Load fonts to match your Login screen style
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Poppins_700Bold,
  })

  // Local state for the user profile fields
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')

  if (!fontsLoaded) {
    return (
      <SafeAreaView style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#1E1F4B" />
      </SafeAreaView>
    )
  }

  const handleUpdateProfile = () => {
    // Handle your update logic here
    console.log('Update Profile Pressed!')
    console.log({
      firstName,
      lastName,
      email,
      phoneNumber,
    })
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.contentContainer}
        keyboardShouldPersistTaps="handled"
      >
        {/* Profile avatar + dashed border container */}
        <View style={styles.avatarContainer}>
          <View style={styles.avatarPlaceholder}>
            <Image
              source={{ uri: 'https://example.com/profile-pic.jpg' }}
              style={styles.avatar}
            />
          </View>
        </View>

        {/* Username and Email */}
        <Text style={styles.username}>Username</Text>
        <Text style={styles.email}>user@gmail.com</Text>

        {/* Input fields */}
        <View style={styles.inputWrapper}>
          <Text style={styles.label}>First Name</Text>
          <TextInput
            style={styles.input}
            placeholder="John"
            value={firstName}
            onChangeText={setFirstName}
          />
        </View>

        <View style={styles.inputWrapper}>
          <Text style={styles.label}>Last Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Doe"
            value={lastName}
            onChangeText={setLastName}
          />
        </View>

        <View style={styles.inputWrapper}>
          <Text style={styles.label}>Email address</Text>
          <TextInput
            style={styles.input}
            placeholder="john.doe@example.com"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />
        </View>

        <View style={styles.inputWrapper}>
          <Text style={styles.label}>Phone Number</Text>
          <TextInput
            style={styles.input}
            placeholder="+1 555 123 4567"
            keyboardType={Platform.OS === 'ios' ? 'numbers-and-punctuation' : 'numeric'}
            value={phoneNumber}
            onChangeText={setPhoneNumber}
          />
        </View>

        {/* Update Profile Button */}
        <TouchableOpacity style={styles.updateButton} onPress={handleUpdateProfile}>
          <Text style={styles.updateButtonText}>Update Profile</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  )
}

// ---------------- STYLES ----------------
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#d4f5d4', // same background as your login screen
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#d4f5d4',
  },
  contentContainer: {
    padding: 10,
    alignItems: 'center',
  },
  // Avatar
  avatarContainer: {
    marginVertical: 20,
  },
  avatarPlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#30A13C',
    borderStyle: 'dashed', // to mimic the dotted placeholder in the reference
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  avatar: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  // Username & Email
  username: {
    fontFamily: 'Poppins_700Bold',
    fontSize: 18,
    color: '#1E1F4B',
    marginBottom: 4,
  },
  email: {
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
    color: '#1E1F4B',
    marginBottom: 20,
  },
  // Input fields
  inputWrapper: {
    width: '100%',
    marginBottom: 10,
  },
  label: {
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
    color: '#2c3e50',
    marginBottom: 5,
    marginLeft: 5,
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 15,
    paddingHorizontal: 20,
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
  },
  // Update Button
  updateButton: {
    width: '100%',
    height: 50,
    backgroundColor: '#30A13C',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  updateButtonText: {
    fontFamily: 'Inter_400Regular',
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
})
