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
import DeleteGoalConfirmationModal from '../components/DeleteGoalModal' // Import the modal component

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
  const [notifications, setNotifications] = useState<NotificationItem[]>(initialNotifications)
  const [notificationModalVisible, setNotificationModalVisible] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const [goalModalVisible, setGoalModalVisible] = useState(false)

  // Handler for deleting a notification
  const handleNotificationDelete = () => {
    if (selectedIndex !== null) {
      const updatedNotifications = notifications.filter((_, index) => index !== selectedIndex)
      setNotifications(updatedNotifications)
      setNotificationModalVisible(false)
      setSelectedIndex(null)
    }
  }

  // Handler for deleting a goal (or any other goal-related logic)
  const handleGoalDelete = () => {
    // Your goal delete logic here
    setGoalModalVisible(false)
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
              onPress={() => {
                setSelectedIndex(index)
                setNotificationModalVisible(true)
              }}
            >
              <Feather name="trash-2" size={20} color="white" />
              <Text style={styles.deleteButtonText}>Delete Notification</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>

      {/* Button for Deleting a Goal */}
      <View style={styles.goalDeleteContainer}>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => setGoalModalVisible(true)}
        >
          <Feather name="trash-2" size={20} color="white" />
          <Text style={styles.deleteButtonText}>Delete Goal</Text>
        </TouchableOpacity>
      </View>

      {/* Modal for Notification deletion */}
      <DeleteGoalConfirmationModal
        visible={notificationModalVisible}
        onCancel={() => setNotificationModalVisible(false)}
        onDelete={handleNotificationDelete}
        itemName="notification"
      />

      {/* Modal for Goal deletion */}
      <DeleteGoalConfirmationModal
        visible={goalModalVisible}
        onCancel={() => setGoalModalVisible(false)}
        onDelete={handleGoalDelete}
        itemName="goal"
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#d4f5d4',
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
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 4,
  },
  notificationDescription: {
    fontSize: 14,
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
    fontWeight: 'bold',
    marginLeft: 8,
  },
  goalDeleteContainer: {
    padding: 16,
    alignItems: 'center',
  },
})
