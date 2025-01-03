import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from 'react-native'
import { Feather } from '@expo/vector-icons'
import { NavigationProp } from '@react-navigation/native'

type YourLoansScreenProps = {
  navigation: NavigationProp<any>
}

export default function YourLoansScreen({ navigation }: YourLoansScreenProps) {
  const handleTrackLoans = () => {
    console.log('Track your loans pressed')
    // Implement loan tracking logic here
  }

  const handleAddLoan = () => {
    console.log('Add loan pressed')
    // Implement add loan logic here
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
      </View>

      <View style={styles.content}>
        <Image
          source={require('@/assets/images/goal.jpg')}
          style={styles.illustration}
          resizeMode="contain"
        />

        <Text style={styles.title}>Your Loans</Text>

        <TouchableOpacity
          style={styles.trackLoansButton}
          onPress={handleTrackLoans}
        >
          <Text style={styles.trackLoansButtonText}>Track your</Text>
          <Text style={styles.trackLoansButtonTextBold}>LOANS</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.floatingActionButton}
        onPress={handleAddLoan}
      >
        <Feather name="plus" size={24} color="#ffffff" />
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
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  illustration: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 20,
  },
  trackLoansButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  trackLoansButtonText: {
    color: '#ffffff',
    fontSize: 18,
  },
  trackLoansButtonTextBold: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
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
