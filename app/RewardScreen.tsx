import React, { memo } from 'react'
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  TextStyle,
} from 'react-native'
import { Feather } from '@expo/vector-icons'
import { NavigationProp } from '@react-navigation/native'

type FeatherIconName = React.ComponentProps<typeof Feather>['name']

type RewardsScreenProps = {
  navigation: NavigationProp<any>
}

type RewardItemProps = {
  icon: FeatherIconName
  label: string
  value: string | number
}

const RewardItem = memo(({ icon, label, value }: RewardItemProps) => (
  <View style={styles.rewardItem}>
    <Feather name={icon} size={20} color="#2c3e50" style={styles.rewardIcon} />
    <Text style={styles.rewardLabel}>{label}</Text>
    <Text style={styles.rewardValue}>{value}</Text>
  </View>
))

type ActionBoxProps = {
  icon: FeatherIconName
  label: string
  value?: string | number
}

const ActionBox = memo(({ icon, label, value }: ActionBoxProps) => (
  <TouchableOpacity style={styles.actionBox}>
    <Feather name={icon} size={24} color="#ffffff" />
    <Text style={styles.actionLabel}>{label}</Text>
    {value && <Text style={styles.actionValue}>{value}</Text>}
  </TouchableOpacity>
))

const RewardsScreen: React.FC<RewardsScreenProps> = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <Feather name="arrow-left" size={24} color="#2c3e50" />
          </TouchableOpacity>
          <Text style={styles.title}>Rewards</Text>
        </View>

        {/* Icon Section */}
        <View style={styles.iconContainer}>
          <View style={styles.iconCircle}>
            <Feather name="refresh-cw" size={40} color="#FF9800" />
            <View style={styles.handIcon}>
              <Feather name="dollar-sign" size={24} color="#4CAF50" />
            </View>
          </View>
        </View>

        {/* Action Boxes */}
        <View style={styles.actionBoxesContainer}>
          <ActionBox icon="check-square" label="Tasks" />
          <ActionBox icon="star" label="Total Points" value="5553" />
          <ActionBox icon="users" label="Refer and Earn" />
        </View>

        {/* Rewards Section */}
        <View style={styles.rewardsContainer}>
          <Text style={styles.sectionTitle}>Rewards Earned</Text>
          <RewardItem icon="award" label="Free Days of Premium" value={28} />
          <RewardItem icon="user" label="Referral" value={14} />
          <RewardItem icon="dollar-sign" label="Points" value={7} />
        </View>

        {/* Redeem Section */}
        <View style={styles.redeemContainer}>
          <Text style={styles.sectionTitle}>Redeem Points</Text>
          {/* Add redeem options here */}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default RewardsScreen

// Common text styles for reusability
const textStyles = {
  color: '#2c3e50',
  fontWeight: 'bold' as TextStyle['fontWeight'],
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E0F2E9',
  },
  scrollContent: {
    flexGrow: 1,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  backButton: {
    marginRight: 16,
  },
  title: {
    ...textStyles,
    fontSize: 24,
  },
  iconContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  iconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  handIcon: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#ffffff',
    borderRadius: 15,
    padding: 5,
  },
  actionBoxesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  actionBox: {
    backgroundColor: '#34495e',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    width: '30%',
  },
  actionLabel: {
    color: '#ffffff',
    fontSize: 12,
    marginTop: 4,
    textAlign: 'center',
  },
  actionValue: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 4,
  },
  rewardsContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 20,
  },
  sectionTitle: {
    ...textStyles,
    fontSize: 18,
    marginBottom: 12,
  },
  rewardItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  rewardIcon: {
    marginRight: 8,
  },
  rewardLabel: {
    flex: 1,
    fontSize: 16,
    color: '#2c3e50',
  },
  rewardValue: {
    ...textStyles,
    fontSize: 16,
  },
  redeemContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 16,
  },
})
