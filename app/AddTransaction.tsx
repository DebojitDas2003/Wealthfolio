import React, { useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  SafeAreaView,
} from 'react-native'
import { NavigationProp } from '@react-navigation/native'

type AddTransactionProps = {
  navigation: NavigationProp<any>
}

export default function AddTransaction({ navigation }: AddTransactionProps) {
  const [amount, setAmount] = useState('')
  const [description, setDescription] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  // TODO: In a real app, you would get the userId from your authentication context
  const userId = '1' // Replace with actual user ID from auth context

  const handleAddTransaction = async () => {
    if (!amount || isNaN(parseFloat(amount))) {
      Alert.alert('Error', 'Please enter a valid amount')
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch('http://10.0.2.2:5000/transactions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          UserId: userId,
          CategoryId: 1, // Default category - you might want to add category selection UI
          Amount: parseFloat(amount),
          TransactionDate: new Date().toISOString(),
          Description: description || 'Transaction',
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to add transaction')
      }

      Alert.alert('Success', 'Transaction added successfully')
      navigation.goBack()
    } catch (error) {
      console.error('Error adding transaction:', error)
      Alert.alert('Error', 'Failed to add transaction')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Add Transaction</Text>
      </View>

      <View style={styles.form}>
        <Text style={styles.label}>Amount</Text>
        <TextInput
          style={styles.input}
          value={amount}
          onChangeText={setAmount}
          placeholder="Enter amount"
          keyboardType="numeric"
        />

        <Text style={styles.label}>Description</Text>
        <TextInput
          style={styles.input}
          value={description}
          onChangeText={setDescription}
          placeholder="Enter description"
        />

        <TouchableOpacity
          style={styles.button}
          onPress={handleAddTransaction}
          disabled={isLoading}
        >
          <Text style={styles.buttonText}>
            {isLoading ? 'Adding...' : 'Add Transaction'}
          </Text>
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
  form: {
    padding: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: '#2c3e50',
    fontWeight: 'bold',
  },
  input: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#4CAF50',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginTop: 16,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
})
