import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native'
import { Feather } from '@expo/vector-icons'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { useNavigation } from '@react-navigation/native'
import {
  useFonts,
  Poppins_700Bold,
  Poppins_400Regular,
  Poppins_500Medium,
} from '@expo-google-fonts/poppins'
import AsyncStorage from '@react-native-async-storage/async-storage'

// Define types and navigation params
type RootStackParamList = {
  YourCardScreen: undefined
  TotalDebtsScreen: undefined
  AccountDetailScreens: undefined
  UpdateUserProfileScreen: undefined
  YourGoalsScreen: undefined
  YourGoalsProgressScreen: undefined
}

type ProfileScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  | 'YourCardScreen'
  | 'TotalDebtsScreen'
  | 'AccountDetailScreens'
  | 'UpdateUserProfileScreen'
  | 'YourGoalsScreen'
  | 'YourGoalsProgressScreen'
>

export default function UserProfileScreen() {
  const navigation = useNavigation<ProfileScreenNavigationProp>()

  // Load Poppins fonts
  const [fontsLoaded] = useFonts({
    Poppins_700Bold,
    Poppins_400Regular,
    Poppins_500Medium,
  })

  // State for user data (moved above the conditional return)
  const [userData, setUserData] = useState({
    username: 'Loading...',
    email: 'Loading...',
  })

  if (!fontsLoaded) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.loadingText}>Loading...</Text>
      </SafeAreaView>
    )
  }
  const [isLoading, setIsLoading] = useState(true)

  // Function to fetch user data
  const handleFetchData = async () => {
    setIsLoading(true)
    try {
      const token = await AsyncStorage.getItem('access_token')
      if (!token) {
        console.error('No token found')
        setUserData({
          username: 'Authentication Error',
          email: 'Please login again',
        })
        return
      }

      // Skip the non-working endpoint and go straight to the one that works
      const CLIENT_ID = 'b4db3b7b-502e-4df3-88c4-f509093769c6'
      const CLIENT_SECRET = 'd541a27e-b873-4f69-9f6f-6c7553e86d16'

      const url = `http://192.168.114.85:5000/auth_redirect/profile?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`)
      }

      const data = await response.json()
      console.log('Profile data received:', data)

      setUserData({
        username: data.username || 'No Name',
        email: data.email || 'No Email',
      })
    } catch (error) {
      console.error('Error fetching user data:', error)
      setUserData({
        username: 'Error loading data',
        email: 'Please check connection',
      })
    } finally {
      setIsLoading(false)
    }
  }

  // Fetch user data when the screen loads
  useEffect(() => {
    handleFetchData()

    // Add a refresh listener to reload data when the screen comes into focus
    const unsubscribe = navigation.addListener('focus', () => {
      handleFetchData()
    })

    return unsubscribe
  }, [navigation])

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Profile</Text>

        <View style={styles.profileCard}>
          <Image
            source={{ uri: 'https://example.com/profile-pic.jpg' }}
            style={styles.profilePic}
          />
          <View style={styles.profileInfo}>
            <Text style={styles.username}>{userData.username}</Text>
            <Text style={styles.email}>{userData.email}</Text>
          </View>
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => navigation.navigate('AccountDetailScreens')}
          >
            <Feather name="edit-2" size={20} color="#ffffff" />
          </TouchableOpacity>
        </View>

        {isLoading && (
          <View style={styles.loadingIndicator}>
            <Text>Loading profile data...</Text>
          </View>
        )}

        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => navigation.navigate('YourGoalsProgressScreen')}
        >
          <Text style={styles.menuItemText}>Set your financial goals</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => navigation.navigate('TotalDebtsScreen')}
        >
          <Text style={styles.menuItemText}>Debt management</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.refreshButton}
          onPress={handleFetchData}
        >
          <Text style={styles.refreshButtonText}>Refresh Profile</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  // Your existing styles...
  container: {
    flex: 1,
    backgroundColor: '#d4f5d4',
  },
  loadingText: {
    fontSize: 18,
    fontFamily: 'Poppins_400Regular',
    textAlign: 'center',
    marginTop: 20,
  },
  scrollContent: {
    padding: 16,
  },
  title: {
    marginTop: 20,
    fontSize: 24,
    fontFamily: 'Poppins_700Bold',
    color: '#2c3e50',
    marginBottom: 20,
    textAlign: 'center',
  },
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4CAF50',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  profilePic: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  profileInfo: {
    marginLeft: 16,
    flex: 1,
  },
  username: {
    fontSize: 18,
    fontFamily: 'Poppins_700Bold',
    color: '#ffffff',
  },
  email: {
    fontSize: 14,
    fontFamily: 'Poppins_400Regular',
    color: '#ffffff',
    opacity: 0.8,
  },
  editButton: {
    padding: 8,
  },
  menuItem: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
  },
  menuItemText: {
    fontSize: 16,
    fontFamily: 'Poppins_400Regular',
    color: '#2c3e50',
  },
  // New styles
  loadingIndicator: {
    padding: 10,
    alignItems: 'center',
  },
  refreshButton: {
    backgroundColor: '#30A13C',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    marginTop: 20,
  },
  refreshButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cardsSection: {
    marginTop: 20,
  },
  cardsSectionTitle: {
    fontSize: 18,
    fontFamily: 'Poppins_700Bold',
    color: '#2c3e50',
    marginBottom: 12,
  },
  cardsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  card: {
    backgroundColor: '#4CAF50',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    width: '48%',
  },
  cardText: {
    color: '#ffffff',
    marginTop: 8,
    fontSize: 12,
    fontFamily: 'Poppins_700Bold',
  },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  navItem: {
    alignItems: 'center',
  },
  activeNavItem: {
    backgroundColor: '#4CAF50',
    borderRadius: 20,
    padding: 8,
  },
})
