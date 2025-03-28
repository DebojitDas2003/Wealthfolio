import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Alert,
  RefreshControl,
  ActivityIndicator,
} from 'react-native'
import { Feather } from '@expo/vector-icons'
import { router } from 'expo-router'
import {
  useFonts,
  Poppins_700Bold,
  Poppins_400Regular,
  Poppins_500Medium,
} from '@expo-google-fonts/poppins'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { jwtDecode } from 'jwt-decode'

type Transaction = {
  id: number
  type: string
  date: string
  time: string
  amount: number
  description: string
}

type JwtPayload = {
  sub: string
  exp: number
  iat: number
}

export default function TransactionsScreen() {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [balance, setBalance] = useState<number>(0)
  const [loading, setLoading] = useState<boolean>(false)
  const [refreshing, setRefreshing] = useState<boolean>(false)
  const [userId, setUserId] = useState<string | null>(null)

  const [fontsLoaded] = useFonts({
    Poppins_700Bold,
    Poppins_400Regular,
    Poppins_500Medium,
  })

  // Extract user ID from token on component mount
  useEffect(() => {
    const getUserIdFromToken = async () => {
      try {
        const token = await AsyncStorage.getItem('access_token')
        if (token) {
          try {
            const decoded = jwtDecode<JwtPayload>(token)
            setUserId(decoded.sub)
          } catch (error) {
            console.error('Error decoding token:', error)
          }
        } else {
          Alert.alert('Error', 'Not logged in. Please login first.')
          router.push('/(auth)/LoginScreen')
        }
      } catch (error) {
        console.error('Error retrieving token:', error)
      }
    }

    getUserIdFromToken()
  }, [])

  const fetchTransactions = async () => {
    if (!userId) {
      console.log('No user ID available')
      return
    }

    setLoading(true)
    try {
      // Get the token from AsyncStorage
      const token = await AsyncStorage.getItem('access_token')

      if (!token) {
        Alert.alert('Session Expired', 'Please login again')
        router.push('/(auth)/LoginScreen')
        return
      }

      console.log('Sending request to fetch transactions')

      // Remove user_id from URL query parameter since we're using JWT
      const response = await fetch('http://192.168.114.85:5000/transactions', {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
          // Only include these if your middleware decorator requires them
          'X-Client-ID': 'b4db3b7b-502e-4df3-88c4-f509093769c6',
          'X-Client-Secret': 'd541a27e-b873-4f69-9f6f-6c7553e86d16',
        },
      })

      console.log('Response status:', response.status)

      if (response.status === 401) {
        Alert.alert('Session Expired', 'Please login again')
        await AsyncStorage.removeItem('access_token')
        router.push('/(auth)/LoginScreen')
        return
      }

      if (!response.ok) {
        const errorText = await response.text()
        console.error('Error response:', errorText)
        throw new Error(`Failed to fetch transactions: ${response.status}`)
      }

      const data = await response.json()
      console.log('Transactions data:', data)
      setTransactions(data.transactions || [])
      setBalance(data.balance || 0)
    } catch (error) {
      console.error('Error fetching transactions:', error)
      Alert.alert('Error', 'Failed to load transactions')
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }

  // Fetch transactions when userId is available
  useEffect(() => {
    if (userId) {
      fetchTransactions()
    }
  }, [userId])

  const onRefresh = () => {
    setRefreshing(true)
    fetchTransactions()
  }

  // Helper function to group transactions by date
  const groupedTransactions = transactions.reduce(
    (groups: Record<string, Transaction[]>, transaction) => {
      const date = transaction.date
      if (!groups[date]) {
        groups[date] = []
      }
      groups[date].push(transaction)
      return groups
    },
    {}
  )

  // Get user name from AsyncStorage or use a default
  const [userName, setUserName] = useState('User')
  useEffect(() => {
    const getUserName = async () => {
      try {
        const name = await AsyncStorage.getItem('user_name')
        if (name) setUserName(name)
      } catch (error) {
        console.error('Error retrieving user name:', error)
      }
    }
    getUserName()
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      {!fontsLoaded ? (
        <ActivityIndicator
          style={styles.loadingIndicator}
          color="#4CAF50"
          size="large"
        />
      ) : (
        <>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Transactions</Text>
          </View>

          <ScrollView
            style={styles.content}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          >
            <View style={styles.card}>
              <View style={styles.cardHeader}>
                <View>
                  <Text style={styles.greeting}>Hi {userName}</Text>
                  <Text style={styles.welcomeBack}>Welcome back</Text>
                </View>
                <View style={styles.expenseCircle}>
                  <Text style={styles.expenseLabel}>Your Expense</Text>
                  <Text style={styles.expenseAmount}>
                    ${Math.abs(balance < 0 ? balance : 0).toLocaleString()}
                  </Text>
                </View>
              </View>
              <View style={styles.balanceContainer}>
                <Text style={styles.balanceLabel}>Your balance</Text>
                <View style={styles.balanceRow}>
                  <Text style={styles.balanceAmount}>
                    ${balance.toLocaleString()}
                  </Text>
                  <TouchableOpacity
                    onPress={fetchTransactions}
                    disabled={loading}
                  >
                    <Feather
                      name={loading ? 'loader' : 'refresh-cw'}
                      size={20}
                      color="#ffffff"
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            <View style={styles.transactionsHeader}>
              <Text style={styles.transactionsTitle}>Your Transactions</Text>
              <TouchableOpacity>
                <Text style={styles.todayText}>Today</Text>
              </TouchableOpacity>
            </View>

            {loading && transactions.length === 0 ? (
              <View style={styles.emptyState}>
                <ActivityIndicator size="large" color="#4CAF50" />
                <Text style={styles.emptyStateText}>
                  Loading transactions...
                </Text>
              </View>
            ) : transactions.length === 0 ? (
              <View style={styles.emptyState}>
                <Feather name="inbox" size={60} color="#7f8c8d" />
                <Text style={styles.emptyStateText}>No transactions found</Text>
                <Text style={styles.emptyStateSubText}>
                  Add your first transaction to get started
                </Text>
              </View>
            ) : (
              Object.entries(groupedTransactions).map(
                ([date, dayTransactions]) => (
                  <View key={date}>
                    <View style={styles.dateHeader}>
                      <Text style={styles.dateText}>{date}</Text>
                    </View>

                    {dayTransactions.map((transaction, index) => (
                      <View
                        key={transaction.id || index}
                        style={styles.transactionItem}
                      >
                        <View style={styles.transactionIcon}>
                          <Feather
                            name={
                              transaction.amount < 0
                                ? 'arrow-up-right'
                                : 'arrow-down-left'
                            }
                            size={20}
                            color={
                              transaction.amount < 0 ? '#e74c3c' : '#4CAF50'
                            }
                          />
                        </View>
                        <View style={styles.transactionInfo}>
                          <Text style={styles.transactionType}>
                            {transaction.description || transaction.type}
                          </Text>
                          <Text style={styles.transactionDate}>
                            {transaction.time} |{' '}
                            {transaction.amount < 0 ? 'Expense' : 'Income'}
                          </Text>
                        </View>
                        <Text
                          style={[
                            styles.transactionAmount,
                            {
                              color:
                                transaction.amount < 0 ? '#e74c3c' : '#4CAF50',
                            },
                          ]}
                        >
                          {transaction.amount < 0 ? '-' : '+'}$
                          {Math.abs(transaction.amount).toLocaleString()}
                        </Text>
                      </View>
                    ))}
                  </View>
                )
              )
            )}
          </ScrollView>

          <TouchableOpacity
            style={styles.addButton}
            onPress={() => router.push('/AddTransaction')}
          >
            <Feather name="plus" size={24} color="#ffffff" />
          </TouchableOpacity>
        </>
      )}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#d4f5d4',
  },
  loadingIndicator: {
    flex: 1,
    justifyContent: 'center',
  },
  loadingText: {
    fontSize: 18,
    fontFamily: 'Poppins_400Regular',
    textAlign: 'center',
    marginTop: 20,
  },
  header: {
    alignItems: 'center',
    padding: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontFamily: 'Poppins_700Bold',
    color: '#2c3e50',
    marginTop: 20,
  },
  content: {
    flex: 1,
  },
  card: {
    backgroundColor: '#4CAF50',
    borderRadius: 16,
    padding: 16,
    margin: 16,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  greeting: {
    fontSize: 24,
    fontFamily: 'Poppins_700Bold',
    color: '#ffffff',
  },
  welcomeBack: {
    fontSize: 16,
    fontFamily: 'Poppins_400Regular',
    color: '#ffffff',
  },
  expenseCircle: {
    backgroundColor: '#ffffff',
    borderRadius: 50,
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  expenseLabel: {
    fontSize: 12,
    fontFamily: 'Poppins_400Regular',
    color: '#2c3e50',
  },
  expenseAmount: {
    fontSize: 16,
    fontFamily: 'Poppins_700Bold',
    color: '#2c3e50',
  },
  balanceContainer: {
    marginBottom: 12,
  },
  balanceLabel: {
    fontSize: 14,
    fontFamily: 'Poppins_400Regular',
    color: '#ffffff',
  },
  balanceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  balanceAmount: {
    fontSize: 24,
    fontFamily: 'Poppins_700Bold',
    color: '#ffffff',
  },
  transactionsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginTop: 16,
    marginBottom: 8,
  },
  transactionsTitle: {
    fontSize: 18,
    fontFamily: 'Poppins_700Bold',
    color: '#2c3e50',
  },
  todayText: {
    fontSize: 14,
    fontFamily: 'Poppins_500Medium',
    color: '#4CAF50',
  },
  dateHeader: {
    paddingHorizontal: 16,
    marginBottom: 8,
    marginTop: 16,
  },
  dateText: {
    fontSize: 14,
    fontFamily: 'Poppins_500Medium',
    color: '#7f8c8d',
  },
  transactionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 8,
  },
  transactionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  transactionInfo: {
    flex: 1,
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
  },
  addButton: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
    paddingHorizontal: 20,
  },
  emptyStateText: {
    color: '#7f8c8d',
    fontSize: 18,
    fontFamily: 'Poppins_500Medium',
    marginTop: 16,
  },
  emptyStateSubText: {
    color: '#7f8c8d',
    fontSize: 14,
    fontFamily: 'Poppins_400Regular',
    textAlign: 'center',
    marginTop: 8,
  },
  filterButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    margin: 16,
  },
  filterButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontFamily: 'Poppins_500Medium',
  },
})
