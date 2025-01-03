import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native'
import { Feather } from '@expo/vector-icons'
import { NavigationProp } from '@react-navigation/native'

type Transaction = {
  type: string
  date: string
  time: string
  amount: number
}

type TransactionsScreenProps = {
  navigation: NavigationProp<any>
}

const transactions: Transaction[] = [
  { type: 'Paypal', date: 'Today', time: '10AM', amount: -1590 },
  { type: 'Paypal', date: 'Today', time: '10AM', amount: -1590 },
  { type: 'Paypal', date: 'Today', time: '10AM', amount: -1590 },
  { type: 'Paypal', date: 'Today', time: '10AM', amount: -1590 },
  { type: 'Paypal', date: 'Today', time: '10AM', amount: -1590 },
  { type: 'Paypal', date: 'Today', time: '10AM', amount: -1590 },
  { type: 'Paypal', date: 'Today', time: '10AM', amount: -1590 },
  { type: 'Paypal', date: 'Today', time: '10AM', amount: -1590 },
]

export default function TransactionsScreen({
  navigation,
}: TransactionsScreenProps) {
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
              <Text style={styles.expenseAmount}>$2,004</Text>
            </View>
          </View>
          <View style={styles.balanceContainer}>
            <Text style={styles.balanceLabel}>Your balance</Text>
            <View style={styles.balanceRow}>
              <Text style={styles.balanceAmount}>$12,395</Text>
              <Feather name="refresh-cw" size={20} color="#2c3e50" />
            </View>
          </View>
          <View style={styles.cryptoContainer}>
            <View style={styles.cryptoItem}>
              <Feather name="dollar-sign" size={16} color="#4169E1" />
              <Text style={styles.cryptoAmount}>$10,000</Text>
            </View>
            <View style={styles.cryptoItem}>
              <Feather name="triangle" size={16} color="#FFD700" />
              <Text style={styles.cryptoAmount}>$2,395</Text>
            </View>
          </View>
        </View>

        <View style={styles.transactionsHeader}>
          <Text style={styles.transactionsTitle}>Your Transactions</Text>
          <TouchableOpacity>
            <Text style={styles.todayText}>Today</Text>
          </TouchableOpacity>
        </View>

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

        <TouchableOpacity style={styles.filterButton}>
          <Text style={styles.filterButtonText}>Filter</Text>
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
})
