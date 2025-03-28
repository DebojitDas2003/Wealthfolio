import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
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
import AsyncStorage from '@react-native-async-storage/async-storage'

type Transaction = {
  type: string
  date: string
  time: string
  amount: number
}

export default function HomeScreen() {
  const router = useRouter()

  // 1. ALL hooks at the top
  const [fontsLoaded] = useFonts({
    Poppins_700Bold,
    Poppins_400Regular,
    Poppins_500Medium,
  })

  const [isLoading, setIsLoading] = useState(true)
  const [userData, setUserData] = useState({
    username: 'Loading...',
    email: 'Loading...',
  })

  // 2. Add the missing useEffect hook
  useEffect(() => {
    if (fontsLoaded) {
      handleFetchData()
    }
  }, [fontsLoaded])

  // 3. Early return AFTER all hooks are defined
  if (!fontsLoaded) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#30A13C" />
          <Text style={styles.loadingText}>Loading fonts...</Text>
        </View>
      </SafeAreaView>
    )
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
  const mic = require('../../assets/images/mic.png')
  const scan = require('../../assets/images/scan.png')

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

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerCard}>
          <View style={styles.userInfo}>
            <View>
              <Text style={styles.welcomeText}>Welcome Back 👋</Text>
              <Text style={styles.userName}>{userData.username}</Text>
            </View>
          </View>
          <View style={styles.headerIcons}>
            <TouchableOpacity onPress={() => router.push('/Notifications')}>
              <Feather
                name="bell"
                size={24}
                color="black"
                style={styles.icon}
              />
            </TouchableOpacity>
            <Ionicons name="sync" size={24} color="black" style={styles.icon} />
          </View>
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
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => router.push('/RewardScreen')}
          >
            <Image source={calculator} style={{ height: 50, width: 50 }} />
            <Text style={styles.actionButtonText}>Your Rewards</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => router.push('/YourReferralScreen')}
          >
            <Image source={calculator} style={{ height: 50, width: 50 }} />
            <Text style={styles.actionButtonText}>Your Referrals</Text>
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
      <View style={styles.buttonOverlay}>
        <TouchableOpacity style={styles.addWithScan}>
          <Image source={mic} style={{ height: 30, width: 30 }} />
          <Text style={styles.voiceText}>Add With{`\n`}voice</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.scanBill}>
          <Text style={styles.ScanBillText}>Scan{`\n`}bill</Text>
          <Image source={scan} style={{ height: 30, width: 30 }} />
        </TouchableOpacity>
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
    marginTop: 20,
    padding: 20,
    paddingBottom: 10,
  },
  headerCard: {
    backgroundColor: '#C3F9C8',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 15,
    color: '#666',
    fontFamily: 'Poppins_400Regular',
  },
  userName: {
    fontSize: 20,
    fontFamily: 'Poppins_700Bold',
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
    fontFamily: 'Poppins_700Bold',
  },
  expensesCard: {
    backgroundColor: '#C3F9C8',
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
  },
  expensesTitle: {
    fontSize: 20,
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
    backgroundColor: '#C3F9C8',
    borderRadius: 60,
    width: 120,
    height: 120,
    top: '50%',
    left: '50%',
    transform: [{ translateX: -48 }, { translateY: -60 }],
  },
  totalExpenseValue: {
    fontSize: 24,
    fontFamily: 'Poppins_700Bold',
    color: '#000',
  },
  totalExpenseLabel: {
    fontSize: 12,
    fontFamily: 'Poppins_400Regular',
    color: '#000',
  },
  actionButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  actionButton: {
    backgroundColor: '#C3F9C8',
    borderRadius: 15,
    padding: 15,
    alignItems: 'center',
    width: '30%',
    marginBottom: 10,
  },
  actionButtonText: {
    color: '#1E1F4B',
    marginTop: 5,
    fontSize: 12,
    textAlign: 'center',
    fontFamily: 'Poppins_400Regular',
  },
  accountInfo: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
  },
  accountInfoTitle: {
    fontSize: 16,
    fontFamily: 'Poppins_700Bold',
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
    fontFamily: 'Poppins_500Medium',
    marginLeft: 5,
  },
  lastTransaction: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  lastTransactionTitle: {
    fontSize: 16,
    fontFamily: 'Poppins_700Bold',
  },
  viewAllText: {
    color: '#4CAF50',
    fontFamily: 'Poppins_400Regular',
  },
  transactionContainer: {
    marginBottom: 60,
  },
  transactionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,

    marginBottom: 8,
  },
  transactionType: {
    fontSize: 16,
    fontFamily: 'Poppins_700Bold',
    color: '#2c3e50',
  },
  transactionDate: {
    fontSize: 12,
    fontFamily: 'Poppins_400Regular',
    color: '#7f8c8d',
  },
  transactionAmount: {
    fontSize: 16,
    fontFamily: 'Poppins_700Bold',
    color: '#4CAF50',
  },
  buttonOverlay: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    position: 'absolute',
    bottom: 30,
    left: 20,
    right: 20,
  },
  addWithScan: {
    width: 120,
    height: 50,
    backgroundColor: '#204A69',
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
    borderStartStartRadius: 50,
    borderStartEndRadius: 50,
  },
  scanBill: {
    width: 120,
    height: 50,
    backgroundColor: '#4CAF50',
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
    borderEndStartRadius: 50,
    borderEndEndRadius: 50,
  },
  voiceText: {
    color: 'white',
    marginLeft: 5,
    textAlign: 'right',
    fontFamily: 'Poppins_400Regular',
    fontSize: 12,
  },
  ScanBillText: {
    color: 'white',
    marginLeft: 5,
    textAlign: 'left',
    fontFamily: 'Poppins_400Regular',
    fontSize: 12,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#30A13C',
  },
})
