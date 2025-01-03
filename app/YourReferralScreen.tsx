import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native'
import { Feather } from '@expo/vector-icons'

interface FriendItemProps {
  username: string
}

const FriendItem: React.FC<FriendItemProps> = ({ username }) => (
  <View style={styles.friendItem}>
    <Image
      source={{ uri: 'https://example.com/placeholder-avatar.jpg' }}
      style={styles.friendAvatar}
    />
    <Text style={styles.friendUsername}>{username}</Text>
  </View>
)

interface ReferralProgramScreenProps {
  navigation: {
    goBack: () => void
  }
}

const ReferralProgramScreen: React.FC<ReferralProgramScreenProps> = ({
  navigation,
}) => {
  const referralCode = '87394'
  const referralLink = `https://aiwealthmanager.com/invite/${referralCode}`

  const handleWhatsappShare = () => {
    console.log('Share via Whatsapp')
  }

  const handleSendLink = () => {
    console.log('Send link')
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Feather name="arrow-left" size={24} color="#2c3e50" />
        </TouchableOpacity>

        <View style={styles.content}>
          <Image
            source={require('@/assets/images/goal.jpg')}
            style={styles.giftIcon}
          />

          <Text style={styles.title}>
            1 week of Premium for you{'\n'}and for each of your friends
          </Text>

          <Text style={styles.subtitle}>
            Saving money is more fun and{'\n'}effective when you connect with
            {'\n'}friends
          </Text>

          <View style={styles.referralCodeContainer}>
            <Text style={styles.referralCodeLabel}>Your Referral Code :</Text>
            <Text style={styles.referralCode}>{referralCode}</Text>
          </View>

          <Text style={styles.shareLabel}>Share your link</Text>

          <View style={styles.linkContainer}>
            <Text style={styles.link} numberOfLines={1}>
              {referralLink}
            </Text>
            <TouchableOpacity onPress={() => console.log('Copy link')}>
              <Feather name="copy" size={20} color="#4CAF50" />
            </TouchableOpacity>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.whatsappButton}
              onPress={handleWhatsappShare}
            >
              <Feather name="message-circle" size={20} color="#ffffff" />
              <Text style={styles.buttonText}>Whatsapp</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.sendLinkButton}
              onPress={handleSendLink}
            >
              <Feather name="share" size={20} color="#ffffff" />
              <Text style={styles.buttonText}>Send link</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.friendsSection}>
            <Text style={styles.friendsLabel}>Friends</Text>
            <Text style={styles.friendsCount}>2</Text>
          </View>

          <FriendItem username="Username" />
          <FriendItem username="Username" />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default ReferralProgramScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#d4f5d4',
  },
  scrollContent: {
    flexGrow: 1,
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
    paddingTop: 20,
  },
  giftIcon: {
    width: 80,
    height: 80,
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2c3e50',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    color: '#34495e',
    textAlign: 'center',
    marginBottom: 20,
  },
  referralCodeContainer: {
    marginBottom: 20,
  },
  referralCodeLabel: {
    fontSize: 14,
    color: '#34495e',
    textAlign: 'center',
    marginBottom: 5,
  },
  referralCode: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
    textAlign: 'center',
  },
  shareLabel: {
    fontSize: 14,
    color: '#34495e',
    marginBottom: 5,
  },
  linkContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 20,
  },
  link: {
    flex: 1,
    fontSize: 14,
    color: '#2c3e50',
    marginRight: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
  },
  whatsappButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#25D366',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 20,
    flex: 1,
    marginRight: 10,
  },
  sendLinkButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#3498db',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 20,
    flex: 1,
    marginLeft: 10,
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    marginLeft: 8,
  },
  friendsSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 10,
  },
  friendsLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  friendsCount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  friendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
    width: '100%',
  },
  friendAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  friendUsername: {
    fontSize: 16,
    color: '#2c3e50',
  },
})
