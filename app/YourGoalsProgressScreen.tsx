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
import Svg, { Circle } from 'react-native-svg'
import { NavigationProp } from '@react-navigation/native'

type YourGoalProgressScreenProps = {
  navigation: NavigationProp<any>
}

interface Goal {
  id: string
  name: string
  current: number
  target: number
}

const goals: Goal[] = [
  { id: '1', name: 'Headphones', current: 280, target: 400 },
  { id: '2', name: 'Laptop', current: 7000, target: 8000 },
]

const ProgressCircle = ({ percentage }: { percentage: number }) => {
  const size = 120
  const strokeWidth = 10
  const center = size / 2
  const radius = size / 2 - strokeWidth / 2
  const circumference = 2 * Math.PI * radius
  const progressStroke = circumference - (circumference * percentage) / 100

  return (
    <Svg width={size} height={size}>
      <Circle
        stroke="#E0E0E0"
        fill="none"
        cx={center}
        cy={center}
        r={radius}
        strokeWidth={strokeWidth}
      />
      <Circle
        stroke="#4CAF50"
        fill="none"
        cx={center}
        cy={center}
        r={radius}
        strokeWidth={strokeWidth}
        strokeDasharray={circumference}
        strokeDashoffset={progressStroke}
        strokeLinecap="round"
      />
    </Svg>
  )
}

const GoalItem = ({ goal }: { goal: Goal }) => {
  const percentage = Math.round((goal.current / goal.target) * 100)

  return (
    <View style={styles.goalItem}>
      <Text style={styles.goalName}>{goal.name}</Text>
      <View style={styles.progressContainer}>
        <ProgressCircle percentage={percentage} />
        <View style={styles.progressTextContainer}>
          <Text style={styles.progressPercentage}>{percentage}%</Text>
          <Text style={styles.progressAmount}>
            ${goal.current}/{goal.target}
          </Text>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => console.log(`Edit goal ${goal.id}`)}
        >
          <Text style={styles.buttonText}>Edit goal</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => console.log(`Delete goal ${goal.id}`)}
        >
          <Text style={styles.buttonText}>Delete goal</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default function YourGoalProgressScreen({
  navigation,
}: YourGoalProgressScreenProps) {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {goals.map((goal) => (
          <GoalItem key={goal.id} goal={goal} />
        ))}
      </ScrollView>

      <TouchableOpacity
        style={styles.floatingActionButton}
        onPress={() => console.log('Add new goal')}
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
  scrollContent: {
    padding: 16,
  },
  goalItem: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  goalName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 8,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  progressTextContainer: {
    alignItems: 'center',
  },
  progressPercentage: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  progressAmount: {
    fontSize: 14,
    color: '#7f8c8d',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    backgroundColor: '#4CAF50',
    borderRadius: 4,
    paddingVertical: 8,
    paddingHorizontal: 16,
    flex: 1,
    marginHorizontal: 4,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 'bold',
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
