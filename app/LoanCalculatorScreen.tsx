import React, { useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
} from 'react-native'
import { Feather } from '@expo/vector-icons'
import { NavigationProp } from '@react-navigation/native'

type LoanCalculatorScreenProps = {
  navigation: NavigationProp<any>
}

export default function LoanCalculatorScreen({
  navigation,
}: LoanCalculatorScreenProps) {
  const [loanAmount, setLoanAmount] = useState<number>(0)
  const [interestRate, setInterestRate] = useState<number>(0)
  const [loanTenure, setLoanTenure] = useState<number>(0)
  const [tenureType, setTenureType] = useState<'YR' | 'MO'>('YR')
  const [emi, setEmi] = useState<number | null>(null)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const handleCalculateEMI = (): void => {
    // Input validation
    if (loanAmount <= 0) {
      setErrorMessage('Loan amount must be greater than 0.')
      return
    }
    if (interestRate <= 0 || interestRate > 100) {
      setErrorMessage('Interest rate must be between 1% and 100%.')
      return
    }
    if (loanTenure <= 0) {
      setErrorMessage('Loan tenure must be greater than 0.')
      return
    }

    setErrorMessage(null) // Clear error messages if inputs are valid

    const monthlyRate = interestRate / 12 / 100 // Monthly interest rate
    const totalMonths = tenureType === 'YR' ? loanTenure * 12 : loanTenure // Tenure in months
    const emiValue =
      (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) /
      (Math.pow(1 + monthlyRate, totalMonths) - 1)
    setEmi(emiValue)
  }

  return (
    <SafeAreaView style={styles.container}>

      <View style={styles.content}>
        {/* Loan Amount Input */}
        <View style={styles.inputSection}>
          <Text style={styles.label}>Loan Amount</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              value={loanAmount.toString()}
              onChangeText={(text) => {
                const sanitized = text.replace(/[^0-9]/g, '')
                setLoanAmount(sanitized ? Number(sanitized) : 0)
              }}
              keyboardType="numeric"
              placeholder="Enter loan amount"
            />
            <Text style={styles.inputSymbol}>₹</Text>
          </View>
        </View>

        {/* Interest Rate Input */}
        <View style={styles.inputSection}>
          <Text style={styles.label}>Interest Rate</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              value={interestRate.toString()}
              onChangeText={(text) => {
                const sanitized = text.replace(/[^0-9.]/g, '')
                setInterestRate(sanitized ? parseFloat(sanitized) : 0)
              }}
              keyboardType="numeric"
              placeholder="Enter interest rate"
            />
            <Text style={styles.inputSymbol}>%</Text>
          </View>
        </View>

        {/* Loan Tenure Input */}
        <View style={styles.inputSection}>
          <Text style={styles.label}>Loan Tenure</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              value={loanTenure.toString()}
              onChangeText={(text) => {
                const sanitized = text.replace(/[^0-9]/g, '')
                setLoanTenure(sanitized ? Number(sanitized) : 0)
              }}
              keyboardType="numeric"
              placeholder="Enter loan tenure"
            />
            <View style={styles.tenureToggle}>
              <TouchableOpacity
                style={[
                  styles.tenureButton,
                  tenureType === 'YR' && styles.activeTenureButton,
                ]}
                onPress={() => setTenureType('YR')}
              >
                <Text
                  style={[
                    styles.tenureButtonText,
                    tenureType === 'YR' && styles.activeTenureButtonText,
                  ]}
                >
                  YR
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.tenureButton,
                  tenureType === 'MO' && styles.activeTenureButton,
                ]}
                onPress={() => setTenureType('MO')}
              >
                <Text
                  style={[
                    styles.tenureButtonText,
                    tenureType === 'MO' && styles.activeTenureButtonText,
                  ]}
                >
                  MO
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>}

        <TouchableOpacity
          style={styles.calculateButton}
          onPress={handleCalculateEMI}
        >
          <Text style={styles.calculateButtonText}>Calculate EMI</Text>
        </TouchableOpacity>

        {/* EMI Output */}
        {emi !== null && (
          <View style={styles.resultContainer}>
            <Text style={styles.resultText}>Your EMI is ₹{emi.toFixed(2)}</Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#d4f5d4' },
  content: { flex: 1, padding: 16 },
  inputSection: { marginBottom: 24 },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 8,
  },
  input: { flex: 1, fontSize: 18, color: '#2c3e50', paddingVertical: 8 },
  inputSymbol: { fontSize: 18, color: '#2c3e50' },
  tenureToggle: { flexDirection: 'row', borderRadius: 4, overflow: 'hidden' },
  tenureButton: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: '#E0E0E0',
  },
  activeTenureButton: { backgroundColor: '#4CAF50' },
  tenureButtonText: { fontSize: 14, color: '#2c3e50' },
  activeTenureButtonText: { color: '#ffffff' },
  calculateButton: {
    backgroundColor: '#34495e',
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
  },
  calculateButtonText: { color: '#ffffff', fontSize: 18, fontWeight: 'bold' },
  resultContainer: {
    marginTop: 16,
    padding: 16,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    alignItems: 'center',
  },
  resultText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#34495e',
  },
  errorText: { color: 'red', fontSize: 16, marginBottom: 16 },
})
