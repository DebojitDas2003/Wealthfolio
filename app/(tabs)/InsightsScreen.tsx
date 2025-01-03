import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native'
import { Feather } from '@expo/vector-icons'
import { PieChart } from 'react-native-chart-kit'

interface ExpenseItem {
  label: string
  value: number
  percentage: number
  color: string
}

const expenseData: ExpenseItem[] = [
  { label: 'Medicines', value: 1440, percentage: 20, color: '#00CED1' },
  { label: 'Wine Shop', value: 2880, percentage: 40, color: '#4169E1' },
  { label: 'Mobile Recharge', value: 720, percentage: 10, color: '#6A5ACD' },
  { label: 'Cigarette', value: 432, percentage: 6, color: '#FF69B4' },
  { label: 'Grocery', value: 576, percentage: 8, color: '#FFA500' },
  { label: 'Electric Bill', value: 1152, percentage: 16, color: '#FFD700' },
]

const aiInsights = [
  'AI can verify compliance with policies and approved spending limits.',
  'AI analyzes historical spending patterns to identify trends and anomalies.',
]

export default function InsightsScreen() {
  const pieData = expenseData.map((item) => ({
    name: item.label,
    population: isNaN(item.value) ? 0 : item.value, // Ensure it's a valid number
    color: item.color,
    legendFontColor: '#2c3e50',
    legendFontSize: 15,
  }))

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Insights</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.chartContainer}>
          <PieChart
            data={pieData}
            width={350}
            height={200}
            chartConfig={{
              backgroundColor: '#C3F9C8',
              backgroundGradientFrom: '#C3F9C8',
              backgroundGradientTo: '#C3F9C8',
              color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            }}
            accessor="population" // Use "population" as the field for values
            backgroundColor="transparent"
            paddingLeft="15"
            hasLegend={true}
          />

          <View style={styles.totalExpense}>
            <Text style={styles.totalExpenseLabel}>Total Expense</Text>
            <Text style={styles.totalExpenseValue}>7200</Text>
          </View>
        </View>

        <View style={styles.expenseTable}>
          <View style={styles.tableHeader}>
            <Text style={styles.tableHeaderText}>Label</Text>
            <Text style={styles.tableHeaderText}>Value</Text>
            <Text style={styles.tableHeaderText}>%</Text>
          </View>
          {expenseData.map((item, index) => (
            <View key={index} style={styles.expenseRow}>
              <View style={styles.labelContainer}>
                <View
                  style={[styles.colorDot, { backgroundColor: item.color }]}
                />
                <Text style={styles.expenseLabel}>{item.label}</Text>
              </View>
              <Text style={styles.expenseValue}>{item.value}</Text>
              <Text style={styles.expensePercentage}>{item.percentage}%</Text>
            </View>
          ))}
        </View>

        <View style={styles.aiInsightsContainer}>
          <View style={styles.aiInsightsHeader}>
            <Text style={styles.aiInsightsTitle}>AI Insights</Text>
            <Feather name="info" size={20} color="#ffffff" />
          </View>
          <View style={styles.aiInsightsList}>
            {aiInsights.map((insight, index) => (
              <View key={index} style={styles.aiInsightItem}>
                <Feather
                  name="check"
                  size={16}
                  color="#ffffff"
                  style={styles.checkIcon}
                />
                <Text style={styles.aiInsightText}>{insight}</Text>
              </View>
            ))}
          </View>
        </View>
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
    justifyContent: 'center',
    padding: 16,
    marginTop: 20,
  },
  profilePic: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  content: {
    padding: 16,
  },
  chartContainer: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  chart: {
    height: 200,
  },
  totalExpense: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#d4f5d4', // Circular background color
    borderRadius: 50, // Circular shape
    width: 100, // Adjust size
    height: 100, // Adjust size
    top: '50%', // Center vertically relative to the PieChart
    left: '50%', // Center horizontally relative to the PieChart
    transform: [
      { translateX: -122 }, // Adjust horizontal center (half of width)
      { translateY: -50 }, // Adjust vertical center (half of height)
    ],
  },
  totalExpenseValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  totalExpenseLabel: {
    fontSize: 14,
    color: '#7f8c8d',
  },
  expenseTable: {
    marginTop: 20,
  },
  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  tableHeaderText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  expenseRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  colorDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 8,
  },
  expenseLabel: {
    fontSize: 14,
    color: '#2c3e50',
  },
  expenseValue: {
    fontSize: 14,
    color: '#2c3e50',
    flex: 1,
    textAlign: 'right',
  },
  expensePercentage: {
    fontSize: 14,
    color: '#2c3e50',
    flex: 1,
    textAlign: 'right',
  },
  aiInsightsContainer: {
    backgroundColor: '#4CAF50',
    borderRadius: 8,
    padding: 16,
    marginTop: 20,
  },
  aiInsightsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  aiInsightsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  aiInsightsList: {
    marginTop: 8,
  },
  aiInsightItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  checkIcon: {
    marginRight: 8,
    marginTop: 2,
  },
  aiInsightText: {
    fontSize: 14,
    color: '#ffffff',
    flex: 1,
  },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  navItem: {
    alignItems: 'center',
  },
  activeNavItem: {
    backgroundColor: '#4CAF50',
    borderRadius: 20,
    padding: 8,
  },
})