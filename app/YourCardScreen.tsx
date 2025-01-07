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
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { useNavigation } from 'expo-router'

type RootStackParamList = {
  AddNewCardScreen: undefined
}

type CardScreenProps = NativeStackNavigationProp<
  RootStackParamList,
  'AddNewCardScreen'
>

export default function CardScreen() {
  const navigation = useNavigation<CardScreenProps>()
  const [activeTab, setActiveTab] = useState('Debit Card')

  return (
    <SafeAreaView style={styles.container}>
      {/* Tabs */}
      <View style={styles.tabContainer}>
        {['Debit Card', 'Credit Card'].map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, activeTab === tab && styles.activeTab]}
            onPress={() => setActiveTab(tab)}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === tab && styles.activeTabText,
              ]}
            >
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Card Preview */}
      <View style={styles.cardContainer}>
        <Image
          source={require('@/assets/images/CreditCard.webp')}
          style={styles.cardImage}
          resizeMode="contain"
        />
        <View style={styles.cardDots}>
          {[...Array(3)].map((_, index) => (
            <View
              key={index}
              style={[styles.dot, index === 0 && styles.activeDot]}
            />
          ))}
        </View>
      </View>

      {/* Balance or Limit */}
      <View style={styles.infoContainer}>
        <Text style={styles.infoAmount}>₹1,05,284</Text>
        <Text style={styles.infoLabel}>
          {activeTab === 'Debit Card' ? 'Available Balance' : 'Available Limit'}
        </Text>
      </View>

      {/* Add Card Button */}
      <TouchableOpacity
        style={styles.addCardButton}
        onPress={() => navigation.navigate('AddNewCardScreen')}
      >
        <View style={styles.addCardIcon}>
          <Feather name="plus" size={24} color="#4CAF50" />
        </View>
        <View style={styles.addCardTextContainer}>
          <Text style={styles.addCardTitle}>Add card</Text>
          <Text style={styles.addCardSubtitle}>
            Add your credit / debit card
          </Text>
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E0F2E9',
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#34495e',
    borderRadius: 25,
    margin: 16,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
  },
  activeTab: {
    backgroundColor: '#4CAF50',
    borderRadius: 25,
  },
  tabText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
  activeTabText: {
    color: '#ffffff',
  },
  cardContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  cardImage: {
    width: '90%',
    height: 200,
    borderRadius: 10,
  },
  cardDots: {
    flexDirection: 'row',
    marginTop: 10,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#bdc3c7',
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: '#4CAF50',
  },
  infoContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  infoAmount: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  infoLabel: {
    fontSize: 14,
    color: '#7f8c8d',
    marginTop: 4,
  },
  addCardButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 16,
    margin: 16,
  },
  addCardIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#E0F2E9',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  addCardTextContainer: {
    flex: 1,
  },
  addCardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  addCardSubtitle: {
    fontSize: 14,
    color: '#7f8c8d',
  },
})
