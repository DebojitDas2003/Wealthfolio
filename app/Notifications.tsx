import React, { useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from 'react-native'
import { Feather } from '@expo/vector-icons'
import { NavigationProp } from '@react-navigation/native'
import {
  useFonts,
  Poppins_700Bold,
  Poppins_400Regular,
  Poppins_500Medium,
} from '@expo-google-fonts/poppins'

type NotificationScreenProps = {
  navigation: NavigationProp<any>
}

type NotificationItem = {
  title: string
  description: string
}

const initialNotifications: NotificationItem[] = [
  {
    title: 'Electricity Bill',
    description: 'Electricity Bill of $500 pending on 22/07.',
  },
  {
    title: 'Prepaid Mobile',
    description: 'Your Jio-prepaid recharge has expired.',
  },
  {
    title: 'AI Suggestions',
    description: 'Tap here to check how to lower your monthly expenses',
  },
]

export default function NotificationsScreen({ navigation }: NotificationScreenProps) {
  // Call all hooks unconditionally
  const [fontsLoaded] = useFonts({
    Poppins_700Bold,
    Poppins_400Regular,
    Poppins_500Medium,
  })

  const [notifications, setNotifications] = useState<NotificationItem[]>(initialNotifications)

  if (!fontsLoaded) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.loadingText}>Loading...</Text>
      </SafeAreaView>
    )
  }

  // Immediately delete notification without modal confirmation
  const handleNotificationDelete = (indexToDelete: number) => {
    const updatedNotifications = notifications.filter((_, index) => index !== indexToDelete)
    setNotifications(updatedNotifications)
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.notificationList}>
        {notifications.map((item, index) => (
          <View key={index} style={styles.notificationItem}>
            <Text style={styles.notificationTitle}>{item.title}</Text>
            <Text style={styles.notificationDescription}>{item.description}</Text>
            {/* Delete Button for Notification */}
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => handleNotificationDelete(index)}
            >
              <Feather name="trash-2" size={20} color="white" />
              <Text style={styles.deleteButtonText}>Delete Notification</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
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
  notificationList: {
    flex: 1,
  },
  notificationItem: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 16,
    marginHorizontal: 16,
    marginTop: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  notificationTitle: {
    fontSize: 16,
    fontFamily: 'Poppins_700Bold',
    color: '#2c3e50',
    marginBottom: 4,
  },
  notificationDescription: {
    fontSize: 14,
    fontFamily: 'Poppins_400Regular',
    color: '#34495e',
  },
  deleteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#d9534f',
    borderRadius: 8,
    padding: 10,
    marginTop: 10,
  },
  deleteButtonText: {
    color: 'white',
    fontFamily: 'Poppins_500Medium',
    fontWeight: 'bold',
    marginLeft: 8,
  },
})
