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
  const [loadingCategories, setLoadingCategories] = useState(false)
  const [userId, setUserId] = useState<string | null>(null)
  const [token, setToken] = useState<string | null>(null)

  // Start with default categories to ensure UI always has something to show
  const [categories, setCategories] = useState<Category[]>([
    { CategoryId: 1, Name: 'Food' },
    { CategoryId: 2, Name: 'Transportation' },
    { CategoryId: 3, Name: 'Entertainment' },
    { CategoryId: 4, Name: 'Shopping' },
    { CategoryId: 5, Name: 'Bills' },
    { CategoryId: 6, Name: 'Salary' },
    { CategoryId: 7, Name: 'Other' },
  ])
  const [selectedCategoryId, setSelectedCategoryId] = useState<number>(1)

  // Get user ID and token on component mount
  useEffect(() => {
    const getUserData = async () => {
      try {
        const storedToken = await AsyncStorage.getItem('access_token')
        if (storedToken) {
          setToken(storedToken)
          try {
            const decoded = jwtDecode<JwtPayload>(storedToken)
            console.log('Decoded token:', decoded)
            setUserId(decoded.sub)
            console.log('User ID set to:', decoded.sub)
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

    getUserData()
  }, [])

  // Try to fetch categories from API when userId and token are available
  useEffect(() => {
    if (userId && token) {
      fetchCategories()
    }
  }, [userId, token])

  const fetchCategories = async () => {
    if (!userId || !token) return

    setLoadingCategories(true)

    try {
      console.log('Fetching categories...')

      // First try the new combined endpoint that creates categories if needed
      const response = await fetch(
        'http://192.168.114.85:5000/categories/transactions/categories',
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
            'X-Client-ID': 'b4db3b7b-502e-4df3-88c4-f509093769c6',
            'X-Client-Secret': 'd541a27e-b873-4f69-9f6f-6c7553e86d16',
          },
        }
      )

      // If that fails, try the regular categories endpoint
      if (!response.ok) {
        const regularResponse = await fetch(
          'http://192.168.114.85:5000/categories',
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
              'X-Client-ID': 'b4db3b7b-502e-4df3-88c4-f509093769c6',
              'X-Client-Secret': 'd541a27e-b873-4f69-9f6f-6c7553e86d16',
            },
          }
        )

        if (regularResponse.ok) {
          const data = await regularResponse.json()
          console.log('Categories data received:', data)

          if (Array.isArray(data) && data.length > 0) {
            const mappedCategories = data.map((cat) => ({
              CategoryId: cat.CategoryId,
              Name: cat.category_name || cat.Name,
            }))
            setCategories(mappedCategories)
            console.log('Categories updated from API:', mappedCategories)
          }
        }
      } else {
        // Process the response from the combined endpoint
        const data = await response.json()
        console.log('Categories data received from combined endpoint:', data)

        if (Array.isArray(data) && data.length > 0) {
          const mappedCategories = data.map((cat) => ({
            CategoryId: cat.CategoryId,
            Name: cat.category_name || cat.Name,
          }))
          setCategories(mappedCategories)
          console.log('Categories updated from combined API:', mappedCategories)
        }
      }
    } catch (error) {
      console.error('Error fetching categories:', error)
      // Keep using default categories that were set in state initially
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
      // Ensure we have a valid category ID
      const categoryId = selectedCategoryId || 7 // Default to "Other" if nothing selected

      // Log the request data for debugging
      const requestData = {
        CategoryId: categoryId,
        Amount: finalAmount,
        TransactionDate: formatDateForMySQL(new Date()),
        Description: description || 'Transaction',
      }
      console.log('Sending transaction request with data:', requestData)

      const response = await fetch('http://192.168.114.85:5000/transactions', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
          'X-Client-ID': 'b4db3b7b-502e-4df3-88c4-f509093769c6',
          'X-Client-Secret': 'd541a27e-b873-4f69-9f6f-6c7553e86d16',
        },
        body: JSON.stringify(requestData),
      })

      console.log('Transaction response status:', response.status)

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

      const responseData = await response.json()
      console.log('Transaction created successfully:', responseData)

      Alert.alert('Success', 'Transaction added successfully', [
        { text: 'OK', onPress: () => router.back() },
      ])
    } catch (error) {
      console.error('Error adding transaction:', error)
      Alert.alert('Error', 'Failed to add transaction. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  // Debug information component
  const renderDebugInfo = () => {
    if (__DEV__) {
      return (
        <View
          style={{
            padding: 10,
            margin: 10,
            backgroundColor: 'rgba(0,0,0,0.05)',
            borderRadius: 5,
          }}
        >
          <Text style={{ fontSize: 12, fontWeight: 'bold' }}>Debug Info:</Text>
          <Text style={{ fontSize: 12 }}>User ID: {userId || 'Not set'}</Text>
          <Text style={{ fontSize: 12 }}>
            Categories Count: {categories.length}
          </Text>
          <Text style={{ fontSize: 12 }}>
            Selected Category:{' '}
            {categories.find((c) => c.CategoryId === selectedCategoryId)
              ?.Name || 'None'}
          </Text>
          <Text style={{ fontSize: 12 }}>
            Loading Categories: {loadingCategories ? 'Yes' : 'No'}
          </Text>
        </View>
      )
    }
    return null
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

        {/* Render debug info component */}
        {renderDebugInfo()}

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
