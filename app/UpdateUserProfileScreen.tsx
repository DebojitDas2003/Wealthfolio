import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, Image, TouchableOpacity, ScrollView } from 'react-native';
import { Feather } from '@expo/vector-icons';

export default function UpdateUserProfileScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>User Profile</Text>

        <View style={styles.profileCard}>
          <Image
            source={{ uri: 'https://example.com/profile-pic.jpg' }}
            style={styles.profilePic}
          />
          <View style={styles.profileInfo}>
            <Text style={styles.username}>Username</Text>
            <Text style={styles.email}>@user.email</Text>
          </View>
          <TouchableOpacity style={styles.editButton}>
            <Feather name="edit-2" size={20} color="#ffffff" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuItemText}>Set your financial goals</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuItemText}>Debt management</Text>
        </TouchableOpacity>

        <View style={styles.cardsSection}>
          <Text style={styles.cardsSectionTitle}>Cards</Text>
          <View style={styles.cardsContainer}>
            <TouchableOpacity style={styles.card}>
              <Feather name="credit-card" size={24} color="#ffffff" />
              <Text style={styles.cardText}>DEBIT CARD</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.card}>
              <Feather name="credit-card" size={24} color="#ffffff" />
              <Text style={styles.cardText}>CREDIT CARD</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      <View style={styles.navbar}>
        <TouchableOpacity style={styles.navItem}>
          <Feather name="home" size={24} color="#7f8c8d" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Feather name="clock" size={24} color="#7f8c8d" />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.navItem, styles.activeNavItem]}>
          <Feather name="bell" size={24} color="#ffffff" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Feather name="pie-chart" size={24} color="#7f8c8d" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Feather name="user" size={24} color="#7f8c8d" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#d4f5d4',
  },
  scrollContent: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 20,
  },
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4CAF50',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  profilePic: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  profileInfo: {
    marginLeft: 16,
    flex: 1,
  },
  username: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  email: {
    fontSize: 14,
    color: '#ffffff',
    opacity: 0.8,
  },
  editButton: {
    padding: 8,
  },
  menuItem: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
  },
  menuItemText: {
    fontSize: 16,
    color: '#2c3e50',
  },
  cardsSection: {
    marginTop: 20,
  },
  cardsSectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 12,
  },
  cardsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  card: {
    backgroundColor: '#4CAF50',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    width: '48%',
  },
  cardText: {
    color: '#ffffff',
    marginTop: 8,
    fontSize: 12,
    fontWeight: 'bold',
  },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  navItem: {
    alignItems: 'center',
  },
  activeNavItem: {
    backgroundColor: '#4CAF50',
    borderRadius: 20,
    padding: 8,
  },
});