import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native'
import { Feather } from '@expo/vector-icons'
import { NavigationProp } from '@react-navigation/native'
import { router } from 'expo-router'

type Transaction = {
  id: number
  type: string
  date: string
  time: string
  amount: number
  description: string
}

type TransactionsScreenProps = {
  navigation: NavigationProp<any>
}

export default function TransactionsScreen({
  navigation,
}: TransactionsScreenProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [balance, setBalance] = useState<number>(0)
  const [loading, setLoading] = useState<boolean>(false)

  // TODO: In a real app, you would get the userId from your authentication context
  const userId = '1' // Replace with actual user ID from auth context

  const fetchTransactions = async () => {
    setLoading(true)
    try {
      const response = await fetch(
        `http://10.0.2.2:5000/transactions?user_id=${userId}`
      )

      if (!response.ok) {
        throw new Error('Failed to fetch transactions')
      }

      const data = await response.json()
      setTransactions(data.transactions || [])
      setBalance(data.balance || 0)
    } catch (error) {
      console.error('Error fetching transactions:', error)
      Alert.alert('Error', 'Failed to load transactions')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTransactions()
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Transactions</Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <View>
              <Text style={styles.greeting}>Hi User</Text>
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
              <TouchableOpacity onPress={fetchTransactions} disabled={loading}>
                <Feather
                  name={loading ? 'loader' : 'refresh-cw'}
                  size={20}
                  color="#2c3e50"
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

        {transactions.length === 0 && (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>No transactions found</Text>
          </View>
        )}

        {transactions.map((transaction, index) => (
          <View key={index} style={styles.transactionItem}>
            <View>
              <Text style={styles.transactionType}>
                {transaction.description || transaction.type}
              </Text>
              <Text style={styles.transactionDate}>
                {transaction.date} | {transaction.time}
              </Text>
            </View>
            <Text
              style={[
                styles.transactionAmount,
                { color: transaction.amount < 0 ? '#e74c3c' : '#4CAF50' },
              ]}
            >
              ${Math.abs(transaction.amount).toLocaleString()}
            </Text>
          </View>
        ))}

        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => router.push('/AddTransaction')}
        >
          <Text style={styles.filterButtonText}>Add Transaction</Text>
        </TouchableOpacity>
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
    alignItems: 'center',
    padding: 16,
  },

  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
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
    fontWeight: 'bold',
    color: '#ffffff',
  },
  welcomeBack: {
    fontSize: 16,
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
    color: '#2c3e50',
  },
  expenseAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  balanceContainer: {
    marginBottom: 12,
  },
  balanceLabel: {
    fontSize: 14,
    color: '#ffffff',
  },
  balanceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  balanceAmount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  cryptoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cryptoItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cryptoAmount: {
    marginLeft: 4,
    fontSize: 16,
    color: '#ffffff',
  },
  transactionsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  transactionsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  todayText: {
    fontSize: 14,
    color: '#4CAF50',
  },
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
  filterButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 8,
    padding: 16,
    margin: 16,
    alignItems: 'center',
  },
  filterButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  navItem: {
    alignItems: 'center',
  },
  navItemActive: {
    backgroundColor: '#4CAF50',
    borderRadius: 20,
    padding: 8,
  },
  emptyState: {
    padding: 20,
    alignItems: 'center',
  },
  emptyStateText: {
    color: '#7f8c8d',
    fontSize: 16,
  },
})
