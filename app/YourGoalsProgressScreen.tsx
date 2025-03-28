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
import Svg, { Circle } from 'react-native-svg'
import { NavigationProp } from '@react-navigation/native'
import DeleteGoalConfirmationModal from '../components/DeleteGoalModal' // For delete confirmation
import GoalBottomSheet from '../components/SetGoal' // For setting a new goal
import {
  useFonts,
  Poppins_700Bold,
  Poppins_400Regular,
  Poppins_500Medium,
} from '@expo-google-fonts/poppins'

type YourGoalProgressScreenProps = {
  navigation: NavigationProp<any>
}

interface Goal {
  id: string
  name: string
  current: number
  target: number
}

const initialGoals: Goal[] = [
  { id: '1', name: 'Headphones', current: 280, target: 400 },
  { id: '2', name: 'Laptop', current: 7000, target: 8000 },
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

/* Updated GoalItem styled similar to your LoanItem design */
type GoalItemProps = {
  goal: Goal
  onDelete: (id: string) => void
}

const GoalItem = ({ goal, onDelete }: GoalItemProps) => {
  const percentage = Math.round((goal.current / goal.target) * 100)
  return (
    <View style={styles.item}>
      <View style={styles.itemHeader}>
        <Text style={styles.itemName}>{goal.name}</Text>
        <ProgressCircle percentage={percentage} />
      </View>
      <View style={styles.itemDetails}>
        <Text style={styles.itemPercentage}>{percentage}%</Text>
        <Text style={styles.itemAmount}>
          ${goal.current}/{goal.target}
        </Text>
      </View>
      <View style={styles.itemActions}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => console.log(`Edit goal ${goal.id}`)}
        >
          <Text style={styles.buttonText}>Edit goal</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => onDelete(goal.id)}
        >
          <Text style={styles.buttonText}>Delete goal</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default function YourGoalProgressScreen({ navigation }: YourGoalProgressScreenProps) {
  // Load fonts unconditionally
  const [fontsLoaded] = useFonts({
    Poppins_700Bold,
    Poppins_400Regular,
    Poppins_500Medium,
  })

  // All hooks are called first to keep order consistent
  const [goals, setGoals] = useState<Goal[]>(initialGoals)
  const [goalDeleteModalVisible, setGoalDeleteModalVisible] = useState(false)
  const [selectedGoalId, setSelectedGoalId] = useState<string | null>(null)
  const [goalSetModalVisible, setGoalSetModalVisible] = useState(false)

  if (!fontsLoaded) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.loadingText}>Loading...</Text>
      </SafeAreaView>
    )
  }

  const handleDeleteGoal = () => {
    if (selectedGoalId) {
      setGoals(goals.filter(goal => goal.id !== selectedGoalId))
      setGoalDeleteModalVisible(false)
      setSelectedGoalId(null)
    }
  }

  const handlePressDelete = (id: string) => {
    setSelectedGoalId(id)
    setGoalDeleteModalVisible(true)
  }

  const handleSaveNewGoal = (goalData: { description: string; budget: string }) => {
    const newGoal: Goal = {
      id: Math.random().toString(),
      name: goalData.description,
      current: 0,
      target: parseFloat(goalData.budget),
    }
    setGoals([...goals, newGoal])
    setGoalSetModalVisible(false)
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {goals.map((goal) => (
          <GoalItem key={goal.id} goal={goal} onDelete={handlePressDelete} />
        ))}
      </ScrollView>

      {/* Floating plus button to open the Set Goal modal */}
      <TouchableOpacity
        style={styles.floatingActionButton}
        onPress={() => setGoalSetModalVisible(true)}
      >
        <Feather name="plus" size={24} color="#ffffff" />
      </TouchableOpacity>

      {/* Delete Goal Modal */}
      <DeleteGoalConfirmationModal
        visible={goalDeleteModalVisible}
        onCancel={() => setGoalDeleteModalVisible(false)}
        onDelete={handleDeleteGoal}
        itemName="goal"
      />

      {/* Set Goal Modal */}
      <GoalBottomSheet
        visible={goalSetModalVisible}
        onClose={() => setGoalSetModalVisible(false)}
        onSave={handleSaveNewGoal}
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
  scrollContent: {
    padding: 16,
  },
  /* Styles for the updated item (GoalItem) */
  item: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  itemName: {
    fontSize: 18,
    fontFamily: 'Poppins_700Bold',
    color: '#2c3e50',
  },
  itemDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  itemPercentage: {
    fontSize: 24,
    fontFamily: 'Poppins_700Bold',
    color: '#4CAF50',
    marginRight: 8,
  },
  itemAmount: {
    fontSize: 14,
    fontFamily: 'Poppins_400Regular',
    color: '#7f8c8d',
  },
  itemActions: {
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
    fontFamily: 'Poppins_500Medium',
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
