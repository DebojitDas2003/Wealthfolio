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

type YourCardScreenProps = {
  navigation: NavigationProp<any>
}

export default function YourCardsScreen({ navigation }: YourCardScreenProps) {
  const [activeTab, setActiveTab] = useState('Credit Card')

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
          style={[styles.tab, activeTab === 'Debit Card' && styles.activeTab]}
          onPress={() => setActiveTab('Debit Card')}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === 'Debit Card' && styles.activeTabText,
            ]}
          >
            Debit Card
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'Credit Card' && styles.activeTab]}
          onPress={() => setActiveTab('Credit Card')}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === 'Credit Card' && styles.activeTabText,
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
        <View style={styles.cardInfo}>
          <View style={styles.cardNumberContainer}></View>
        </View>
        <View style={styles.dotContainer}>
          <View style={[styles.dot, styles.activeDot]} />
          <View style={styles.dot} />
          <View style={styles.dot} />
        </View>
      </View>

      <View style={styles.limitContainer}>
        <Text style={styles.limitAmount}>₹1,05,284</Text>
        <Text style={styles.limitLabel}>Available Limit</Text>
      </View>

      <TouchableOpacity
        style={styles.addCardButton}
        onPress={() => console.log('Add card pressed')}
      >
        <View style={styles.addCardIcon}>
          <Feather name="plus" size={24} color="#4CAF50" />
        </View>
        <View>
          <Text style={styles.addCardText}>Add card</Text>
          <Text style={styles.addCardSubtext}>
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
    backgroundColor: '#d4f5d4',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    justifyContent: 'center',
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
    backgroundColor: '#e8f5e9',
    borderRadius: 25,
    margin: 16,
    padding: 4,
  },
  tab: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
  },
  activeTab: {
    backgroundColor: '#4CAF50',
    borderRadius: 25,
  },
  tabText: {
    color: '#4CAF50',
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
  cardInfo: {
    position: 'absolute',
    bottom: 20,
    left: 30,
  },
  cardType: {
    color: '#ffffff',
    fontSize: 16,
    marginBottom: 4,
  },
  cardNumberContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardNumber: {
    color: '#ffffff',
    fontSize: 18,
  },
  dotContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#bdbdbd',
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: '#4CAF50',
  },
  limitContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  limitAmount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  limitLabel: {
    fontSize: 14,
    color: '#7f8c8d',
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
    backgroundColor: '#e8f5e9',
    borderRadius: 20,
    padding: 8,
    marginRight: 16,
  },
  addCardText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  addCardSubtext: {
    fontSize: 12,
    color: '#7f8c8d',
  },
})
