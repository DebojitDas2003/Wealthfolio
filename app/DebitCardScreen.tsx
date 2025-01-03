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

type DebitCardScreenProps = {
  navigation: NavigationProp<any>
}

export default function DebitCardScreen({ navigation }: DebitCardScreenProps) {
  const [activeTab, setActiveTab] = useState('debit')

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Feather name="arrow-left" size={24} color="#2c3e50" />
        </TouchableOpacity>
        <Text style={styles.title}>Your Cards</Text>
      </View>

      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'debit' && styles.activeTab]}
          onPress={() => setActiveTab('debit')}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === 'debit' && styles.activeTabText,
            ]}
          >
            Debit Card
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'credit' && styles.activeTab]}
          onPress={() => setActiveTab('credit')}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === 'credit' && styles.activeTabText,
            ]}
          >
            Credit Card
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.cardContainer}>
        <Image
          source={require('@/assets/images/CreditCard.webp')}
          style={styles.cardImage}
          resizeMode="contain"
        />
        <View style={styles.cardDots}>
          <View style={[styles.dot, styles.activeDot]} />
          <View style={styles.dot} />
          <View style={styles.dot} />
        </View>
      </View>

      <View style={styles.balanceContainer}>
        <Text style={styles.balanceAmount}>₹1,05,284</Text>
        <Text style={styles.balanceLabel}>Available Balance</Text>
      </View>

      <TouchableOpacity style={styles.addCardButton}>
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
  balanceContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  balanceAmount: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  balanceLabel: {
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
