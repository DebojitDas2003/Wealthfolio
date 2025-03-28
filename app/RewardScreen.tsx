import React, { memo } from 'react'
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native'
import { Feather } from '@expo/vector-icons'
import { NavigationProp } from '@react-navigation/native'
import {
  useFonts,
  Poppins_700Bold,
  Poppins_400Regular,
  Poppins_500Medium,
} from '@expo-google-fonts/poppins'

type RewardsScreenProps = {
  navigation: NavigationProp<any>
}

type RewardItemProps = {
  icon: React.ComponentProps<typeof Feather>['name']
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
  image?: any // optional image prop
  label: string
  value?: string | number
}

const ActionBox = memo(({ image, label, value }: ActionBoxProps) => (
  <TouchableOpacity style={styles.actionBox}>
    {image ? (
      <Image source={image} style={styles.actionImage} />
    ) : (
      // Render a default icon if no image is provided
      <View></View>
    )}
    {value && <Text style={styles.actionValue}>{value}</Text>}
    <Text style={styles.actionLabel}>{label}</Text>
  </TouchableOpacity>
))

const RewardsScreen: React.FC<RewardsScreenProps> = ({ navigation }) => {
  const [fontsLoaded] = useFonts({
    Poppins_700Bold,
    Poppins_400Regular,
    Poppins_500Medium,
  })

  if (!fontsLoaded) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.loadingText}>Loading...</Text>
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Icon Section */}
        <View style={styles.iconContainer}>
          <Image
            source={require('@/assets/images/rewards.png')}
            style={styles.giftIcon}
          />
        </View>

        {/* Action Boxes with optional images */}
        <View style={styles.actionBoxesContainer}>
          <ActionBox image={require('@/assets/images/tasks.png')} label="Tasks" />
          <ActionBox  label="Total Points" value="5553" />
          {/* This box doesn't provide an image so the default icon will show */}
          <ActionBox image={require('@/assets/images/refer.png')} label="Refer and Earn" />
        </View>

        {/* Rewards Section */}
        <Text style={styles.sectionTitle}>Rewards Earned</Text>
        <View style={styles.rewardsContainer}>
          <RewardItem icon="award" label="Free Days of Premium" value={28} />
          <RewardItem icon="user" label="Referral" value={14} />
          <RewardItem icon="dollar-sign" label="Points" value={7} />
        </View>

        {/* Redeem Section */}
        <Text style={styles.sectionTitle}>Redeem Points</Text>
        <View style={styles.redeemContainer}>
          {/* Add redeem options here */}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default RewardsScreen

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
    color: '#2c3e50',
  },
  scrollContent: {
    flexGrow: 1,
    padding: 16,
  },
  iconContainer: {
    alignItems: 'center',
    marginVertical: 10,
  },
  giftIcon: {
    width: 100,
    height: 100,
  },
  actionBoxesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  actionBox: {
    backgroundColor: '#204A69',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 8,
    alignItems: 'center',
    width: '32%',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  actionImage: {
    width: 40,
    height: 40,
  },
  actionLabel: {
    color: '#ffffff',
    fontSize: 12,
    marginTop: 8,
    textAlign: 'center',
    fontFamily: 'Poppins_400Regular',
  },
  actionValue: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'Poppins_500Medium',
  },
  rewardsContainer: {
    backgroundColor: '#C3F9C8',
    borderRadius: 8,
    padding: 16,
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Poppins_700Bold',
    color: '#2c3e50',
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
    fontWeight: 'bold',
    fontFamily: 'Poppins_500Medium',
    color: '#2c3e50',
  },
  rewardValue: {
    fontSize: 18,
    fontFamily: 'Poppins_500Medium',
    color: '#2c3e50',
  },
  redeemContainer: {
    backgroundColor: '#C3F9C8',
    borderRadius: 8,
    padding: 16,
  },
})
