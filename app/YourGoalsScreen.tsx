import React, { useState } from 'react'
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

type YourGoalsScreenProps = {
  navigation: NavigationProp<any>
}

export default function YourGoalsScreen({ navigation }: YourGoalsScreenProps) {
  const [goals, setGoals] = useState<string[]>([]) // Track user's goals

  const handleAddGoal = () => {
    console.log('Add a goal pressed')
    // Implement goal addition logic here, e.g., add a goal to the list
    setGoals([...goals, 'New Goal']) // Example of adding a goal
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}></View>

      <View style={styles.content}>
        <Image
          source={require('@/assets/images/goal.jpg')}
          style={styles.illustration}
          resizeMode="contain"
        />
        <Text style={styles.title}>Your Goals</Text>

        {/* Conditional rendering based on whether there are goals */}
        {goals.length === 0 ? (
          <TouchableOpacity
            style={styles.addGoalButton}
            onPress={handleAddGoal}
          >
            <Text style={styles.addGoalButtonText}>Add a goal</Text>
            <Text style={styles.addGoalButtonSubtext}>NOW</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.goalList}>
            {goals.map((goal, index) => (
              <Text key={index} style={styles.goalItem}>
                {goal}
              </Text>
            ))}
          </View>
        )}
      </View>

      <TouchableOpacity
        style={styles.floatingActionButton}
        onPress={handleAddGoal}
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
  addGoalButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  addGoalButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  addGoalButtonSubtext: {
    color: '#ffffff',
    fontSize: 14,
  },
  goalList: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  goalItem: {
    fontSize: 18,
    color: '#2c3e50',
    marginVertical: 5,
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
