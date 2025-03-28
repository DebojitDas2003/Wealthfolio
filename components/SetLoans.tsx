import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Dimensions,
  Keyboard,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {
  useFonts,
  Poppins_700Bold,
  Poppins_400Regular,
  Poppins_500Medium,
} from '@expo-google-fonts/poppins';

const { height } = Dimensions.get('window');

interface SetLoanProps {
  visible: boolean;
  onClose: () => void;
  onSave: (loanData: {
    description: string;
    amount: string;
    interestRate: string;
    duration: string;
  }) => void;
}

const LoanBottomSheet: React.FC<SetLoanProps> = ({ visible, onClose, onSave }) => {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [duration, setDuration] = useState('');

  const slideAnim = useRef(new Animated.Value(height)).current;
  const backdropOpacity = useRef(new Animated.Value(0)).current;

  // Load the fonts
  const [fontsLoaded] = useFonts({
    Poppins_700Bold,
    Poppins_400Regular,
    Poppins_500Medium,
  });

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(backdropOpacity, {
          toValue: 0.5,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: height,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(backdropOpacity, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible, slideAnim, backdropOpacity]);

  const handleSave = () => {
    onSave({
      description,
      amount,
      interestRate,
      duration,
    });
    setDescription('');
    setAmount('');
    setInterestRate('');
    setDuration('');
  };

  const handleClose = () => {
    onClose();
    setDescription('');
    setAmount('');
    setInterestRate('');
    setDuration('');
  };

  if (!visible || !fontsLoaded) return null;

  return (
    <View style={styles.container}>
      {/* Backdrop to dismiss modal */}
      <TouchableWithoutFeedback onPress={handleClose}>
        <Animated.View style={[styles.backdrop, { opacity: backdropOpacity }]} />
      </TouchableWithoutFeedback>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <Animated.View style={[styles.bottomSheet, { transform: [{ translateY: slideAnim }] }]}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.contentContainer}>
              <Text style={styles.title}>Set your loan</Text>
              
              <TextInput
                style={styles.input}
                placeholder="Description"
                value={description}
                onChangeText={setDescription}
                placeholderTextColor="#888"
              />

              <TextInput
                style={styles.input}
                placeholder="Amount"
                value={amount}
                onChangeText={setAmount}
                keyboardType="numeric"
                placeholderTextColor="#888"
              />

              <TextInput
                style={styles.input}
                placeholder="Interest Rate (%)"
                value={interestRate}
                onChangeText={setInterestRate}
                keyboardType="numeric"
                placeholderTextColor="#888"
              />

              <TextInput
                style={styles.input}
                placeholder="Loan Duration (in years)"
                value={duration}
                onChangeText={setDuration}
                keyboardType="numeric"
                placeholderTextColor="#888"
              />

              <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                <Text style={styles.saveButtonText}>Save loan</Text>
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
        </Animated.View>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
    zIndex: 1000,
  },
  backdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#000',
  },
  keyboardView: {
    width: '100%',
    justifyContent: 'flex-end',
  },
  bottomSheet: {
    backgroundColor: '#1e2761',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    paddingBottom: Platform.OS === 'ios' ? 40 : 20,
    width: '100%',
    alignSelf: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  contentContainer: {
    paddingVertical: 20,
  },
  title: {
    fontSize: 24,
    fontFamily: 'Poppins_700Bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 30,
  },
  input: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    fontSize: 16,
    fontFamily: 'Poppins_400Regular',
  },
  saveButton: {
    backgroundColor: '#2ea043',
    borderRadius: 15,
    padding: 15,
    alignItems: 'center',
    marginTop: 20,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 18,
    fontFamily: 'Poppins_500Medium',
  },
});

export default LoanBottomSheet;
