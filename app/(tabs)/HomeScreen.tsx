import React, { useState } from 'react'
import {
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from 'react-native'
import { Feather, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import { PieChart } from 'react-native-chart-kit'
import { useNavigation } from 'expo-router'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'

type RootStackParamList = {
  Notifications: undefined
  TransactionsScreen: undefined // Add other screens here if needed
}

type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Notifications',
  'Transactions'
>

type Transaction = {
  type: string
  date: string
  time: string
  amount: number
}

export default function HomeScreen() {
  const navigation = useNavigation<HomeScreenNavigationProp>()
  const pieData = [
    { name: 'Groceries', value: 30, color: '#FFA500' },
    { name: 'Restaurant', value: 30, color: '#00CED1' },
    { name: 'Cosmetics', value: 20, color: '#FF69B4' },
    { name: 'Salon', value: 20, color: '#6A5ACD' },
  ]

  const transactions: Transaction[] = [
    { type: 'Paypal', date: 'Today', time: '10AM', amount: -1590 },
    { type: 'Paypal', date: 'Today', time: '10AM', amount: -1590 },
    { type: 'Paypal', date: 'Today', time: '10AM', amount: -1590 },
    { type: 'Paypal', date: 'Today', time: '10AM', amount: -1590 },
  ]

  const greet = (): string => {
    const hour = new Date().getHours()
    if (hour > 8 && hour < 12) {
      return 'GOOD MORNING!'
    } else if (hour === 12) {
      return 'GOOD NOON!'
    } else if (hour > 12 && hour < 18) {
      return 'GOOD AFTERNOON!'
    } else if (hour > 18 && hour < 20) {
      return 'GOOD EVENING!'
    } else {
      return 'GOOD NIGHT!'
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.userInfo}>
          <View>
            <Text style={styles.welcomeText}>Welcome Back 👋</Text>
            <Text style={styles.userName}>Nicky Johnson</Text>
          </View>
        </View>
        <View style={styles.headerIcons}>
          <TouchableOpacity
            onPress={() => navigation.navigate('Notifications')}
          >
            <Feather name="bell" size={24} color="black" style={styles.icon} />
          </TouchableOpacity>

          <Ionicons name="sync" size={24} color="black" style={styles.icon} />
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.greeting}>{greet()}</Text>

        <View style={styles.expensesCard}>
          <Text style={styles.expensesTitle}>Today's Expenses</Text>
          <View style={styles.chartContainer}>
            <PieChart
              data={pieData}
              accessor="value" // Specify the field for the values
              width={350} // Specify the chart width
              height={200} // Specify the chart height
              chartConfig={{
                backgroundColor: '#C3F9C8', // Background color in chartConfig
                backgroundGradientFrom: '#C3F9C8',
                backgroundGradientTo: '#C3F9C8',
                color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              }}
              paddingLeft="0" // Add padding
              absolute // Show absolute values
              backgroundColor="#C3F9C8"
            />

            <View style={styles.totalExpense}>
              <Text style={styles.totalExpenseLabel}>Total Expense</Text>
              <Text style={styles.totalExpenseValue}>7200</Text>
            </View>
          </View>
        </View>

        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.actionButton}>
            <Feather name="plus" size={24} color="white" />
            <Text style={styles.actionButtonText}>Add money</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <MaterialCommunityIcons
              name="cash-refund"
              size={24}
              color="white"
            />
            <Text style={styles.actionButtonText}>Remaining budget</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Feather name="trending-up" size={24} color="white" />
            <Text style={styles.actionButtonText}>Budget predictor</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.accountInfo}>
          <Text style={styles.accountInfoTitle}>Account balance</Text>
          <View style={styles.balanceRow}>
            <View style={styles.balanceItem}>
              <Feather name="dollar-sign" size={24} color="#4169E1" />
              <Text style={styles.balanceValue}>$12,395</Text>
            </View>
            <View style={styles.balanceItem}>
              <MaterialCommunityIcons
                name="ethereum"
                size={24}
                color="#3CB371"
              />
              <Text style={styles.balanceValue}>$3,395</Text>
            </View>
          </View>
        </View>

        <View style={styles.lastTransaction}>
          <Text style={styles.lastTransactionTitle}>Last Transaction</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('TransactionsScreen')}
          >
            <Text style={styles.viewAllText}>view all</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.transactionContainer}>
          {transactions.map((transaction, index) => (
            <View key={index} style={styles.transactionItem}>
              <View>
                <Text style={styles.transactionType}>{transaction.type}</Text>
                <Text style={styles.transactionDate}>
                  {transaction.date} | {transaction.time} | Deposit
                </Text>
              </View>
              <Text style={styles.transactionAmount}>
                ${Math.abs(transaction.amount).toLocaleString()}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>
      <View style={styles.addWithScan}>
        <View style={styles.scanOption}>
          <Feather name="plus" size={20} color="white" />
          <Text style={styles.addWithScanText}>Add Transaction</Text>
        </View>
        <View style={styles.scanOption}>
          <MaterialCommunityIcons name="qrcode-scan" size={20} color="white" />
          <Text style={styles.addWithScanText}>Scan bill</Text>
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#d4f5d4',
  },
  scrollContent: {
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    padding: 20,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  welcomeText: {
    fontSize: 18,
    color: '#666',
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  headerIcons: {
    flexDirection: 'row',
  },
  icon: {
    marginLeft: 15,
  },
  greeting: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 20,
  },
  expensesCard: {
    backgroundColor: '#C3F9C8',
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
  },
  expensesTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  chartContainer: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },

  totalExpense: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#C3F9C8', // Circular background color
    borderRadius: 50, // Circular shape
    width: 100, // Adjust size
    height: 100, // Adjust size
    top: '50%', // Center vertically relative to the PieChart
    left: '50%', // Center horizontally relative to the PieChart
    transform: [
      { translateX: -135 }, // Adjust horizontal center (half of width)
      { translateY: -50 }, // Adjust vertical center (half of height)
    ],
  },

  totalExpenseValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  totalExpenseLabel: {
    fontSize: 12,
    color: '#000',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  actionButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 15,
    padding: 15,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 5,
  },
  actionButtonText: {
    color: 'white',
    marginTop: 5,
    fontSize: 12,
    textAlign: 'center',
  },
  accountInfo: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
  },
  accountInfoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  balanceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  balanceItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  balanceValue: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 5,
  },

  lastTransaction: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  lastTransactionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  viewAllText: {
    color: '#4CAF50',
  },

  transactionContainer: { marginBottom: 80 },

  transactionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 12,
    marginHorizontal: 16,
    marginBottom: 8,
  },
  transactionType: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  transactionDate: {
    fontSize: 12,
    color: '#7f8c8d',
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  addWithScan: {
    width: 200,
    flexDirection: 'row',
    backgroundColor: '#4CAF50',
    borderRadius: 20,
    padding: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'absolute', // Make the view float
    bottom: 10, // Position it above the bottom of the screen
    left: 100, // Adjust the left position
    right: 100, // Adjust the right position
    shadowColor: '#000', // Add shadow for elevation
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5, // For Android elevation
  },
  scanOption: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
  },
  addWithScanText: {
    color: 'white',
    justifyContent: 'center',
    textAlign: 'center',
    marginLeft: 5,
  },
})
