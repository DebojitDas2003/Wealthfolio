import React, { useState } from 'react'
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Modal,
  FlatList,
} from 'react-native'
import { Feather } from '@expo/vector-icons'
import { NavigationProp } from '@react-navigation/native'

type AddNewCardScreenProps = {
  navigation: NavigationProp<any>
}

interface DropdownProps {
  label: string
  options: string[]
  selectedValue: string
  onSelect: (value: string) => void
}

const Dropdown: React.FC<DropdownProps> = ({
  label,
  options,
  selectedValue,
  onSelect,
}) => {
  const [visible, setVisible] = useState(false)

  return (
    <View>
      <Text style={styles.label}>{label}</Text>
      <TouchableOpacity
        style={styles.dropdown}
        onPress={() => setVisible(true)}
      >
        <Text>{selectedValue}</Text>
        <Feather name="chevron-down" size={20} color="#2c3e50" />
      </TouchableOpacity>
      <Modal visible={visible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <FlatList
              data={options}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.option}
                  onPress={() => {
                    onSelect(item)
                    setVisible(false)
                  }}
                >
                  <Text>{item}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </Modal>
    </View>
  )
}

export default function AddNewCardScreen({
  navigation,
}: AddNewCardScreenProps) {
  const [cardType, setCardType] = useState('Master Card')
  const [expiryDate, setExpiryDate] = useState('09/26')
  const [cardholderName, setCardholderName] = useState('')
  const [cardNumber, setCardNumber] = useState('')
  const [cvv, setCvv] = useState('')

  const cardTypes = ['Master Card', 'Visa', 'American Express']
  const expiryDates = ['09/26', '10/26', '11/26', '12/26']

  const handleSaveCard = () => {
    console.log('Saving card:', {
      cardType,
      expiryDate,
      cardholderName,
      cardNumber,
      cvv,
    })
    // Implement card saving logic here
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Feather name="arrow-left" size={24} color="#2c3e50" />
        </TouchableOpacity>
        <Text style={styles.title}>Add New Card</Text>
      </View>

      <View style={styles.cardPreview}>
        <Image
          source={require('@/assets/images/CreditCard.webp')}
          style={styles.cardImage}
          resizeMode="contain"
        />
      </View>

      <View style={styles.form}>
        <View style={styles.row}>
          <View style={styles.dropdownContainer}>
            <Dropdown
              label="Card Type"
              options={cardTypes}
              selectedValue={cardType}
              onSelect={setCardType}
            />
          </View>
          <View style={styles.dropdownContainer}>
            <Dropdown
              label="Expiry"
              options={expiryDates}
              selectedValue={expiryDate}
              onSelect={setExpiryDate}
            />
          </View>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Cardholder Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Cardholder's Name"
            value={cardholderName}
            onChangeText={setCardholderName}
          />
        </View>

        <View style={styles.row}>
          <View style={[styles.inputContainer, styles.flex2]}>
            <Text style={styles.label}>Card Number</Text>
            <TextInput
              style={styles.input}
              placeholder="5023 **** **** **19"
              value={cardNumber}
              onChangeText={setCardNumber}
              keyboardType="numeric"
            />
          </View>
          <View style={[styles.inputContainer, styles.flex1]}>
            <Text style={styles.label}>CVV</Text>
            <TextInput
              style={styles.input}
              placeholder="***"
              value={cvv}
              onChangeText={setCvv}
              keyboardType="numeric"
              maxLength={3}
            />
          </View>
        </View>

        <TouchableOpacity style={styles.saveButton} onPress={handleSaveCard}>
          <Text style={styles.saveButtonText}>Save Card</Text>
        </TouchableOpacity>
      </View>
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
  cardPreview: {
    alignItems: 'center',
    marginVertical: 20,
  },
  cardImage: {
    width: '90%',
    height: 200,
  },
  form: {
    paddingHorizontal: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  dropdownContainer: {
    flex: 1,
    marginRight: 8,
  },
  dropdown: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    fontSize: 14,
    color: '#2c3e50',
    marginBottom: 4,
  },
  inputContainer: {
    marginBottom: 16,
  },
  input: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  flex2: {
    flex: 2,
    marginRight: 8,
  },
  flex1: {
    flex: 1,
  },
  saveButton: {
    backgroundColor: '#34495e',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginTop: 16,
  },
  saveButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 16,
    maxHeight: '50%',
  },
  option: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
})
