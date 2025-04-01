import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { NavigationProp } from '@react-navigation/native';
import {
  useFonts,
  Poppins_700Bold,
  Poppins_400Regular,
  Poppins_500Medium,
} from '@expo-google-fonts/poppins';

type YourAccountsScreenProps = {
  navigation: NavigationProp<any>;
};

type AccountInfo = {
  accountNumber: string;
  ifscCode: string;
  balance: number;
};

const accounts: AccountInfo[] = [
  {
    accountNumber: '****************5372',
    ifscCode: 'BKID000****',
    balance: 12395,
  },
  {
    accountNumber: '****************5372',
    ifscCode: 'BKID000****',
    balance: 12395,
  },
];

// A separate component for each account card so that each one can manage its own balance visibility state.
const AccountCard: React.FC<{ account: AccountInfo }> = ({ account }) => {
  const [showBalance, setShowBalance] = useState(true);

  const toggleBalanceVisibility = () => {
    setShowBalance((prev) => !prev);
  };

  return (
    <View style={styles.accountCard}>
      <View style={styles.accountInfo}>
        <Text style={styles.label}>Account Number</Text>
        <View style={styles.valueContainer}>
          <Text style={styles.value}>{account.accountNumber}</Text>
          <TouchableOpacity>
            <Feather name="copy" size={20} color="#2c3e50" />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.accountInfo}>
        <Text style={styles.label}>IFSC Code</Text>
        <View style={styles.valueContainer}>
          <Text style={styles.value}>{account.ifscCode}</Text>
          <TouchableOpacity>
            <Feather name="copy" size={20} color="#2c3e50" />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.accountInfo}>
        <Text style={styles.label}>Account balance</Text>
        <View style={styles.valueContainer}>
          {showBalance ? (
            <Text style={styles.balanceValue}>
              $ {account.balance.toLocaleString()}
            </Text>
          ) : (
            // Display hidden text when balance is not visible
            <Text style={styles.balanceValue}>****</Text>
          )}
          <TouchableOpacity onPress={toggleBalanceVisibility}>
            <Feather
              name={showBalance ? 'eye-off' : 'eye'}
              size={20}
              color="#2c3e50"
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default function YourAccountsScreen({
  navigation,
}: YourAccountsScreenProps) {
  // Load Poppins fonts
  const [fontsLoaded] = useFonts({
    Poppins_700Bold,
    Poppins_400Regular,
    Poppins_500Medium,
  });

  if (!fontsLoaded) {
    return null;
  }

  const handleAddAccount = () => {
    // Implement add account logic here
    console.log('Add bank account pressed');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.accountList}>
        {accounts.map((account, index) => (
          <AccountCard key={index} account={account} />
        ))}
      </ScrollView>
      <TouchableOpacity
        style={styles.addAccountButton}
        onPress={handleAddAccount}
      >
        <Feather name="plus" size={20} color="#2c3e50" />
        <Text style={styles.addAccountText}>Add bank account</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#d4f5d4',
  },
  accountList: {
    flex: 1,
    padding: 10,
  },
  accountCard: {
    backgroundColor: '#ffffff',
    borderRadius: 18,
    padding: 16,
    marginBottom: 16,
  },
  accountInfo: {
    marginBottom: 10,
  },
  label: {
    fontSize: 12,
    color: '#7f8c8d',
    fontFamily: 'Poppins_400Regular',
  },
  valueContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  value: {
    fontSize: 16,
    color: '#2c3e50',
    fontFamily: 'Poppins_500Medium',
  },
  balanceValue: {
    fontSize: 18,
    color: '#2c3e50',
    fontFamily: 'Poppins_700Bold',
  },
  addAccountButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 16,
    margin: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  addAccountText: {
    marginLeft: 8,
    fontSize: 16,
    color: '#2c3e50',
    fontFamily: 'Poppins_500Medium',
  },
});
