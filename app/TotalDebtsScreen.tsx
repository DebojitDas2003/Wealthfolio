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
import { PieChart } from 'react-native-chart-kit'
import Svg, { Circle } from 'react-native-svg'
import { NavigationProp } from '@react-navigation/native'

type TotalDebtsScreenprops = {
  navigation: NavigationProp<any>
}

interface Loan {
  id: string
  name: string
  amount: number
  total: number
  percentage: number
}

const loans: Loan[] = [
  { id: '1', name: 'Home loan', amount: 7000, total: 8000, percentage: 87.5 },
  { id: '2', name: 'Home loan', amount: 7000, total: 8000, percentage: 87.5 },
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

const LoanItem = ({ loan, isLast }: { loan: Loan; isLast: boolean }) => (
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
      <TouchableOpacity style={styles.actionButton}>
        <Text style={styles.actionButtonText}>Edit details</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.actionButton}>
        <Text style={styles.actionButtonText}>Delete</Text>
      </TouchableOpacity>
    </View>
    {isLast && (
      <TouchableOpacity style={styles.addButton}>
        <Feather name="plus" size={24} color="#4CAF50" />
      </TouchableOpacity>
    )}
  </View>
)

export default function TotalDebtsScreen({
  navigation,
}: TotalDebtsScreenprops) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Feather name="arrow-left" size={24} color="#2c3e50" />
        </TouchableOpacity>
        <Text style={styles.title}>Your total debts</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.totalDebtsChart}>
          <PieChart
            style={styles.pieChart}
            data={totalDebtsData}
            accessor="value" // Specify the field for the values
            width={350} // Specify the chart width
            height={200} // Specify the chart height
            chartConfig={{
              backgroundColor: '#C3F9C8', // Background color in chartConfig
              backgroundGradientFrom: '#C3F9C8',
              backgroundGradientTo: '#C3F9C8',
              color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            }}
            paddingLeft="0" // Add padding
            absolute // Show absolute values
            backgroundColor="#C3F9C8"
          />
        </View>

        <Text style={styles.sectionTitle}>Your Loans</Text>

        {loans.map((loan, index) => (
          <LoanItem
            key={loan.id}
            loan={loan}
            isLast={index === loans.length - 1}
          />
        ))}
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
    padding: 16,
  },
  backButton: {
    marginRight: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2c3e50',
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
    fontWeight: 'bold',
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
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  loanDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  loanPercentage: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#9C27B0',
    marginRight: 8,
  },
  loanAmount: {
    fontSize: 14,
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
    fontWeight: 'bold',
    textAlign: 'center',
  },
  addButton: {
    position: 'absolute',
    right: 16,
    bottom: 16,
    backgroundColor: '#ffffff',
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
})
