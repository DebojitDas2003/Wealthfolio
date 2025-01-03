import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native'
import { Feather } from '@expo/vector-icons'
import { PieChart } from 'react-native-chart-kit'
import { NavigationProp } from '@react-navigation/native'

type LoanPaymentBreakdownScreenProps = {
  navigation: NavigationProp<any>
}

export default function LoanPaymentBreakdownScreen({
  navigation,
}: LoanPaymentBreakdownScreenProps) {
  const data = [
    {
      name: 'Principal Loan Amount',
      population: 29.8,
      color: '#1E90FF',
      legendFontColor: '#2c3e50',
      legendFontSize: 14,
    },
    {
      name: 'Total Interest',
      population: 70.2,
      color: '#87CEFA',
      legendFontColor: '#2c3e50',
      legendFontSize: 14,
    },
  ]

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Feather name="arrow-left" size={24} color="#2c3e50" />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Break Up of Total Payment</Text>
          <PieChart
            data={data}
            width={300}
            height={200}
            chartConfig={{
              color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            }}
            accessor="population"
            backgroundColor="transparent"
            paddingLeft="10"
            center={[10, 0]}
            hasLegend={true}
          />
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Loan EMI</Text>
          <Text style={styles.emiAmount}>₹ 30,862</Text>
          <View style={styles.separator} />
          <View style={styles.paymentDetails}>
            <View style={styles.paymentItem}>
              <Text style={styles.paymentLabel}>Total Interest Payable</Text>
              <Text style={styles.paymentValue}>11,03,495</Text>
            </View>
            <View style={styles.paymentItem}>
              <Text style={styles.paymentLabel}>Total Payment</Text>
              <Text style={styles.paymentValue}>37,03,495</Text>
            </View>
          </View>
        </View>
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
    padding: 16,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  card: {
    backgroundColor: '#E6F3FF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
    textAlign: 'center',
    marginBottom: 16,
  },
  emiAmount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
    textAlign: 'center',
    marginBottom: 16,
  },
  separator: {
    height: 1,
    backgroundColor: '#BDC3C7',
    marginBottom: 16,
  },
  paymentDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  paymentItem: {
    alignItems: 'center',
  },
  paymentLabel: {
    fontSize: 12,
    color: '#7f8c8d',
    marginBottom: 4,
  },
  paymentValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
})
