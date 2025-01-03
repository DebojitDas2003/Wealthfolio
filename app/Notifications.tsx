import React from 'react'
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

type NotificationScreenProps = {
  navigation: NavigationProp<any>
}

type NotificationItem = {
  title: string
  description: string
}

const notifications: NotificationItem[] = [
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

export default function NotificationsScreen({
  navigation,
}: NotificationScreenProps) {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.notificationList}>
        {notifications.map((item, index) => (
          <View key={index} style={styles.notificationItem}>
            <Text style={styles.notificationTitle}>{item.title}</Text>
            <Text style={styles.notificationDescription}>
              {item.description}
            </Text>
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#a8e6cf',
  },
  backButton: {
    marginRight: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2c3e50',
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
})
