import React, { useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from 'react-native'
import { Feather } from '@expo/vector-icons'
import { PieChart } from 'react-native-chart-kit'
import Svg, { Circle } from 'react-native-svg'
import { NavigationProp } from '@react-navigation/native'
import DeleteLoanConfirmationModal from '../components/DeleteLoanModal'
import LoanBottomSheet from '../components/SetLoans'
import {
  useFonts,
  Poppins_700Bold,
  Poppins_400Regular,
  Poppins_500Medium,
} from '@expo-google-fonts/poppins'

type TotalDebtsScreenProps = {
  navigation: NavigationProp<any>
}

interface Loan {
  id: string
  name: string
  amount: number
  total: number
  percentage: number
}

const initialLoans: Loan[] = [
  { id: '1', name: 'Home loan', amount: 7000, total: 8000, percentage: 87.5 },
  { id: '2', name: 'Car loan', amount: 15000, total: 20000, percentage: 75 },
]

const totalDebtsData = [
  { value: 30, svg: { fill: '#4CAF50' } },
  { value: 20, svg: { fill: '#FFC107' } },
  { value: 25, svg: { fill: '#2196F3' } },
  { value: 25, svg: { fill: '#00BCD4' } },
]

const ProgressCircle = ({ percentage }: { percentage: number }) => {
  const size = 60
  const strokeWidth = 6
  const radius = (size - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI
  const strokeDashoffset = circumference - (percentage / 100) * circumference

  return (
    <Svg width={size} height={size}>
      <Circle
        stroke="#E0E0E0"
        fill="none"
        cx={size / 2}
        cy={size / 2}
        r={radius}
        strokeWidth={strokeWidth}
      />
      <Circle
        stroke="#9C27B0"
        fill="none"
        cx={size / 2}
        cy={size / 2}
        r={radius}
        strokeWidth={strokeWidth}
        strokeDasharray={`${circumference} ${circumference}`}
        strokeDashoffset={strokeDashoffset}
        strokeLinecap="round"
      />
    </Svg>
  )
}

type LoanItemProps = {
  loan: Loan
  onDelete: (id: string) => void
}

const LoanItem = ({ loan, onDelete }: LoanItemProps) => (
  <View style={styles.loanItem}>
    <View style={styles.loanHeader}>
      <Text style={styles.loanName}>{loan.name}</Text>
      <ProgressCircle percentage={loan.percentage} />
    </View>
    <View style={styles.loanDetails}>
      <Text style={styles.loanPercentage}>{loan.percentage}%</Text>
      <Text style={styles.loanAmount}>
        ${loan.amount}/{loan.total}
      </Text>
    </View>
    <View style={styles.loanActions}>
      <TouchableOpacity
        style={styles.actionButton}
        onPress={() => console.log(`Edit details for ${loan.id}`)}
      >
        <Text style={styles.actionButtonText}>Edit details</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.actionButton}
        onPress={() => onDelete(loan.id)}
      >
        <Text style={styles.actionButtonText}>Delete</Text>
      </TouchableOpacity>
    </View>
  </View>
)

export default function TotalDebtsScreen({ navigation }: TotalDebtsScreenProps) {
  // Load fonts
  const [fontsLoaded] = useFonts({
    Poppins_700Bold,
    Poppins_400Regular,
    Poppins_500Medium,
  })

  // Manage loans as state for dynamic updates
  const [loans, setLoans] = useState<Loan[]>(initialLoans)
  const [loanDeleteModalVisible, setLoanDeleteModalVisible] = useState(false)
  const [selectedLoanId, setSelectedLoanId] = useState<string | null>(null)
  const [loanSetModalVisible, setLoanSetModalVisible] = useState(false)

  // Display loading screen until fonts are ready
  if (!fontsLoaded) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.loadingText}>Loading...</Text>
      </SafeAreaView>
    )
  }

  const handleDeleteLoan = () => {
    if (selectedLoanId) {
      setLoans(loans.filter(loan => loan.id !== selectedLoanId))
      setLoanDeleteModalVisible(false)
      setSelectedLoanId(null)
    }
  }

  const handlePressDelete = (id: string) => {
    setSelectedLoanId(id)
    setLoanDeleteModalVisible(true)
  }

  const handleSaveNewLoan = (loanData: { description: string; amount: string; interestRate: string; duration: string }) => {
    // Create a new loan object.
    const newLoan: Loan = {
      id: Math.random().toString(),
      name: loanData.description,
      amount: parseFloat(loanData.amount),
      total: parseFloat(loanData.amount), // Assume initial total equals amount.
      percentage: 0,
    }
    setLoans([...loans, newLoan])
    setLoanSetModalVisible(false)
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.totalDebtsChart}>
          <PieChart
            style={styles.pieChart}
            data={totalDebtsData}
            accessor="value"
            width={350}
            height={200}
            chartConfig={{
              backgroundColor: '#C3F9C8',
              backgroundGradientFrom: '#C3F9C8',
              backgroundGradientTo: '#C3F9C8',
              color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            }}
            paddingLeft="0"
            absolute
            backgroundColor="#C3F9C8"
          />
        </View>

        <Text style={styles.sectionTitle}>Your Loans</Text>

        {loans.map((loan) => (
          <LoanItem key={loan.id} loan={loan} onDelete={handlePressDelete} />
        ))}
      </ScrollView>

      {/* Floating plus button to open the Set Loan modal */}
      <TouchableOpacity style={styles.floatingActionButton} onPress={() => setLoanSetModalVisible(true)}>
        <Feather name="plus" size={24} color="#ffffff" />
      </TouchableOpacity>

      {/* Delete Loan Modal */}
      <DeleteLoanConfirmationModal
        visible={loanDeleteModalVisible}
        onCancel={() => setLoanDeleteModalVisible(false)}
        onDelete={handleDeleteLoan}
        itemName="loan"
      />

      {/* Set Loan Modal */}
      <LoanBottomSheet
        visible={loanSetModalVisible}
        onClose={() => setLoanSetModalVisible(false)}
        onSave={handleSaveNewLoan}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#d4f5d4',
  },
  loadingText: {
    fontSize: 18,
    fontFamily: 'Poppins_400Regular',
    textAlign: 'center',
    marginTop: 20,
  },
  content: {
    padding: 16,
  },
  totalDebtsChart: {
    height: 200,
    marginBottom: 20,
  },
  pieChart: {
    height: 200,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Poppins_700Bold',
    color: '#2c3e50',
    marginBottom: 16,
  },
  loanItem: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  loanHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  loanName: {
    fontSize: 16,
    fontFamily: 'Poppins_700Bold',
    color: '#2c3e50',
  },
  loanDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  loanPercentage: {
    fontSize: 24,
    fontFamily: 'Poppins_700Bold',
    color: '#9C27B0',
    marginRight: 8,
  },
  loanAmount: {
    fontSize: 14,
    fontFamily: 'Poppins_400Regular',
    color: '#7f8c8d',
  },
  loanActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 4,
    paddingVertical: 8,
    paddingHorizontal: 16,
    flex: 1,
    marginHorizontal: 4,
  },
  actionButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontFamily: 'Poppins_500Medium',
    textAlign: 'center',
  },
  floatingActionButton: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    backgroundColor: '#4CAF50',
    borderRadius: 28,
    width: 56,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
})
