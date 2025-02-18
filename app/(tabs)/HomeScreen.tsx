import React, { useState, useEffect } from 'react'
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
import { useRouter } from 'expo-router'
import {
  useFonts,
  Poppins_700Bold,
  Poppins_400Regular,
  Poppins_500Medium,
} from '@expo-google-fonts/poppins'

type Transaction = {
  type: string
  date: string
  time: string
  amount: number
}

export default function HomeScreen() {
  const router = useRouter()

  const [fontsLoaded] = useFonts({
    Poppins_700Bold,
    Poppins_400Regular,
    Poppins_500Medium,
  })

  if (!fontsLoaded) {
    return null
  }

  const pieData = [
    {
      name: 'Groceries',
      value: 30,
      color: '#FFA500',
      strokeWidth: 2,
      strokeColor: '#FFFFFF',
    },
    {
      name: 'Restaurant',
      value: 30,
      color: '#00CED1',
      strokeWidth: 2,
      strokeColor: '#FFFFFF',
    },
    {
      name: 'Cosmetics',
      value: 20,
      color: '#FF69B4',
      strokeWidth: 2,
      strokeColor: '#FFFFFF',
    },
    {
      name: 'Salon',
      value: 20,
      color: '#6A5ACD',
      strokeWidth: 2,
      strokeColor: '#FFFFFF',
    },
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
      return 'GOOD\nMORNING!'
    } else if (hour === 12) {
      return 'GOOD\nNOON!'
    } else if (hour > 12 && hour < 18) {
      return 'GOOD\nAFTERNOON!'
    } else if (hour > 18 && hour < 20) {
      return 'GOOD\nEVENING!'
    } else {
      return 'GOOD\nNIGHT!'
    }
  }

  const calculator = require('../../assets/images/calculator.png')
  const pie = require('../../assets/images/pie.png')
  const bp = require('../../assets/images/bp.png')

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
          <TouchableOpacity onPress={() => router.push('/Notifications')}>
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
              accessor="value"
              width={350}
              height={200}
              chartConfig={{
                backgroundColor: '#C3F9C8',
                backgroundGradientFrom: '#C3F9C8',
                backgroundGradientTo: '#C3F9C8',
                color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                strokeWidth: 2,
              }}
              paddingLeft="100"
              absolute
              backgroundColor="#C3F9C8"
            />

            <View style={styles.totalExpense}>
              <Text style={styles.totalExpenseLabel}>Total Expense</Text>
              <Text style={styles.totalExpenseValue}>7200</Text>
            </View>
          </View>
        </View>

        <View style={styles.actionButtons}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => router.push('/LoanCalculatorScreen')}
          >
            <Image source={calculator} style={{ height: 50, width: 50 }} />
            <Text style={styles.actionButtonText}>EMI Calculator</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Image source={pie} style={{ height: 50, width: 50 }} />
            <Text style={styles.actionButtonText}>Remaining budget</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Image source={bp} style={{ height: 50, width: 50 }} />
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
            onPress={() => router.push('/(tabs)/TransactionsScreen')}
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
    fontSize: 35,
    color: '#30A13C',
    marginBottom: 20,
    fontFamily: 'Poppins_700Bold',
  },
  expensesCard: {
    backgroundColor: '#C3F9C8',
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
  },
  expensesTitle: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: 'center',
    fontFamily: 'Poppins_500Medium',
  },
  chartContainer: {
    left: 20,
    width: '80%',
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },

  totalExpense: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#C3F9C8', // Circular background color
    borderRadius: 60, // Circular shape
    width: 120, // Adjust size
    height: 120, // Adjust size
    top: '50%', // Center vertically relative to the PieChart
    left: '50%', // Center horizontally relative to the PieChart
    transform: [
      { translateX: -48 }, // Adjust horizontal center (half of width)
      { translateY: -60 }, // Adjust vertical center (half of height)
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
    backgroundColor: '#C3F9C8',
    borderRadius: 15,
    padding: 15,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 5,
  },
  actionButtonText: {
    color: '#1E1F4B',
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
    position: 'absolute',
    bottom: 30,
    left: 100,
    right: 100,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
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
