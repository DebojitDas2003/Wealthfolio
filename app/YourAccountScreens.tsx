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

type YourAccountsScreenProps = {
  navigation: NavigationProp<any>
}

type AccountInfo = {
  accountNumber: string
  ifscCode: string
  balance: number
}

const accounts: AccountInfo[] = [
  {
    accountNumber: '****************5372',
    ifscCode: 'BKID000****',
    balance: 12395,
  },
  {
    accountNumber: '****************5372',
    ifscCode: 'BKID000****',
    balance: 12395,
  },
]

export default function YourAccountsScreen({
  navigation,
}: YourAccountsScreenProps) {
  const handleAddAccount = () => {
    // Implement add account logic here
    console.log('Add bank account pressed')
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Feather name="arrow-left" size={24} color="#2c3e50" />
        </TouchableOpacity>
        <Text style={styles.title}>Your Accounts</Text>
      </View>
      <ScrollView style={styles.accountList}>
        {accounts.map((account, index) => (
          <View key={index} style={styles.accountCard}>
            <View style={styles.accountInfo}>
              <Text style={styles.label}>Account Number</Text>
              <View style={styles.valueContainer}>
                <Text style={styles.value}>{account.accountNumber}</Text>
                <TouchableOpacity>
                  <Feather name="copy" size={20} color="#2c3e50" />
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.accountInfo}>
              <Text style={styles.label}>IFSC Code</Text>
              <View style={styles.valueContainer}>
                <Text style={styles.value}>{account.ifscCode}</Text>
                <TouchableOpacity>
                  <Feather name="copy" size={20} color="#2c3e50" />
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.accountInfo}>
              <Text style={styles.label}>Account balance</Text>
              <View style={styles.valueContainer}>
                <Text style={styles.balanceValue}>
                  $ {account.balance.toLocaleString()}
                </Text>
                <TouchableOpacity>
                  <Feather name="refresh-cw" size={20} color="#2c3e50" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
      <TouchableOpacity
        style={styles.addAccountButton}
        onPress={handleAddAccount}
      >
        <Feather name="plus" size={20} color="#2c3e50" />
        <Text style={styles.addAccountText}>Add bank account</Text>
      </TouchableOpacity>
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
  accountList: {
    flex: 1,
  },
  accountCard: {
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
  accountInfo: {
    marginBottom: 12,
  },
  label: {
    fontSize: 14,
    color: '#7f8c8d',
    marginBottom: 4,
  },
  valueContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  value: {
    fontSize: 16,
    color: '#2c3e50',
    fontWeight: '500',
  },
  balanceValue: {
    fontSize: 18,
    color: '#2c3e50',
    fontWeight: 'bold',
  },
  addAccountButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 16,
    margin: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  addAccountText: {
    marginLeft: 8,
    fontSize: 16,
    color: '#2c3e50',
    fontWeight: '500',
  },
})
