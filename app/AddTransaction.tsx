import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  SafeAreaView,
  ScrollView,
  Switch,
  ActivityIndicator,
} from 'react-native'
import { router } from 'expo-router'
import { Feather } from '@expo/vector-icons'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { jwtDecode } from 'jwt-decode'

type Category = {
  CategoryId: number
  Name: string
}

type JwtPayload = {
  sub: string
  exp: number
  iat: number
}

function formatDateForMySQL(date: Date): string {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  const seconds = String(date.getSeconds()).padStart(2, '0')

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
}

export default function AddTransaction() {
  const [amount, setAmount] = useState('')
  const [description, setDescription] = useState('')
  const [isExpense, setIsExpense] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [categories, setCategories] = useState<Category[]>([])
  const [selectedCategoryId, setSelectedCategoryId] = useState<number>(1)
  const [loadingCategories, setLoadingCategories] = useState(false)
  const [userId, setUserId] = useState<string | null>(null)
  const [token, setToken] = useState<string | null>(null)

  // Default categories to use if API call fails
  const defaultCategories = [
    { CategoryId: 1, Name: 'Food' },
    { CategoryId: 2, Name: 'Transportation' },
    { CategoryId: 3, Name: 'Entertainment' },
    { CategoryId: 4, Name: 'Shopping' },
    { CategoryId: 5, Name: 'Bills' },
    { CategoryId: 6, Name: 'Salary' },
    { CategoryId: 7, Name: 'Other' },
  ]

  // Get user ID and token on component mount
  useEffect(() => {
    const getUserData = async () => {
      try {
        const storedToken = await AsyncStorage.getItem('access_token')
        if (storedToken) {
          setToken(storedToken)
          const decoded = jwtDecode<JwtPayload>(storedToken)
          setUserId(decoded.sub)
        } else {
          Alert.alert('Error', 'Not logged in. Please login first.')
          router.push('/(auth)/LoginScreen')
        }
      } catch (error) {
        console.error('Error retrieving token:', error)
      }
    }

    getUserData()
  }, [])

  // Fetch categories when userId and token are available
  useEffect(() => {
    if (userId && token) {
      fetchCategories()
    }
  }, [userId, token])

  const fetchCategories = async () => {
    if (!userId || !token) return

    setLoadingCategories(true)
    try {
      // Try to fetch categories from the backend
      const response = await fetch(`http://192.168.114.85:5000/categories`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
          'X-Client-ID': 'b4db3b7b-502e-4df3-88c4-f509093769c6',
          'X-Client-Secret': 'd541a27e-b873-4f69-9f6f-6c7553e86d16',
        },
      })

      // Check if the endpoint exists and returns valid data
      if (response.ok) {
        const data = await response.json()
        if (data.categories && Array.isArray(data.categories)) {
          setCategories(data.categories)
          return
        }
      }

      // If categories endpoint isn't implemented or returns invalid data, use default categories
      console.log(
        'Using default categories due to API failure or missing endpoint'
      )
      setCategories(defaultCategories)
    } catch (error) {
      console.error('Error fetching categories:', error)
      // Use default categories if API call fails
      setCategories(defaultCategories)
    } finally {
      setLoadingCategories(false)
    }
  }

  const handleAddTransaction = async () => {
    if (!userId || !token) {
      Alert.alert('Error', 'Not logged in. Please login first.')
      router.push('/(auth)/LoginScreen')
      return
    }

    if (!amount || isNaN(parseFloat(amount))) {
      Alert.alert('Error', 'Please enter a valid amount')
      return
    }

    setIsLoading(true)

    // Convert amount to negative if it's an expense
    const finalAmount = isExpense
      ? -Math.abs(parseFloat(amount))
      : Math.abs(parseFloat(amount))

    try {
      const response = await fetch('http://192.168.114.85:5000/transactions', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
          'X-Client-ID': 'b4db3b7b-502e-4df3-88c4-f509093769c6',
          'X-Client-Secret': 'd541a27e-b873-4f69-9f6f-6c7553e86d16',
        },
        body: JSON.stringify({
          CategoryId: selectedCategoryId,
          Amount: finalAmount,
          TransactionDate: formatDateForMySQL(new Date()),
          Description: description || 'Transaction',
        }),
      })

      if (response.status === 401) {
        Alert.alert('Session Expired', 'Please login again')
        await AsyncStorage.removeItem('access_token')
        router.push('/(auth)/LoginScreen')
        return
      }

      if (!response.ok) {
        const errorText = await response.text()
        console.error('Error response:', errorText)
        throw new Error(`Failed to add transaction: ${response.status}`)
      }

      Alert.alert('Success', 'Transaction added successfully', [
        { text: 'OK', onPress: () => router.back() },
      ])
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
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Feather name="arrow-left" size={24} color="#2c3e50" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Add Transaction</Text>
        <View style={styles.placeholderView} />
      </View>

      <ScrollView style={styles.form}>
        <View style={styles.transactionTypeContainer}>
          <Text style={styles.label}>Transaction Type</Text>
          <View style={styles.switchContainer}>
            <Text style={[styles.switchLabel, !isExpense && styles.activeType]}>
              Income
            </Text>
            <Switch
              value={isExpense}
              onValueChange={setIsExpense}
              trackColor={{ false: '#4CAF50', true: '#e74c3c' }}
              thumbColor="#ffffff"
            />
            <Text style={[styles.switchLabel, isExpense && styles.activeType]}>
              Expense
            </Text>
          </View>
        </View>

        <Text style={styles.label}>Amount</Text>
        <TextInput
          style={[styles.input, styles.amountInput]}
          value={amount}
          onChangeText={setAmount}
          placeholder="Enter amount"
          keyboardType="numeric"
          placeholderTextColor="#7f8c8d"
        />

        <Text style={styles.label}>Description</Text>
        <TextInput
          style={styles.input}
          value={description}
          onChangeText={setDescription}
          placeholder="Enter description"
          placeholderTextColor="#7f8c8d"
        />

        <Text style={styles.label}>Category</Text>
        {loadingCategories ? (
          <ActivityIndicator color="#4CAF50" size="small" />
        ) : (
          <View style={styles.categoriesContainer}>
            {categories.map((category) => (
              <TouchableOpacity
                key={category.CategoryId}
                style={[
                  styles.categoryItem,
                  selectedCategoryId === category.CategoryId &&
                    styles.selectedCategory,
                ]}
                onPress={() => setSelectedCategoryId(category.CategoryId)}
              >
                <Text
                  style={[
                    styles.categoryText,
                    selectedCategoryId === category.CategoryId &&
                      styles.selectedCategoryText,
                  ]}
                >
                  {category.Name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        <TouchableOpacity
          style={[styles.button, isLoading && styles.disabledButton]}
          onPress={handleAddTransaction}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="#ffffff" size="small" />
          ) : (
            <Text style={styles.buttonText}>Add Transaction</Text>
          )}
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#bae1ba',
  },
  backButton: {
    padding: 8,
  },
  placeholderView: {
    width: 40,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2c3e50',
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
  amountInput: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  transactionTypeContainer: {
    marginBottom: 16,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 12,
  },
  switchLabel: {
    fontSize: 16,
    marginHorizontal: 12,
    color: '#7f8c8d',
  },
  activeType: {
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  categoriesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
  },
  categoryItem: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
    margin: 4,
  },
  selectedCategory: {
    backgroundColor: '#4CAF50',
  },
  categoryText: {
    color: '#2c3e50',
  },
  selectedCategoryText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#4CAF50',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 30,
  },
  disabledButton: {
    backgroundColor: '#7f8c8d',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
})
