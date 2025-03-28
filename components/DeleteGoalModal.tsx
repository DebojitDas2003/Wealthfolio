import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { useFonts, Poppins_700Bold, Poppins_400Regular, Poppins_500Medium } from '@expo-google-fonts/poppins';

interface DeleteGoalModalProps {
  visible: boolean;
  onCancel: () => void;
  onDelete: () => void;
  itemName?: string;
}

const DeleteGoalConfirmationModal: React.FC<DeleteGoalModalProps> = ({
  visible,
  onCancel,
  onDelete,
  itemName = "goal",
}) => {
  // Load the Poppins fonts
  const [fontsLoaded] = useFonts({
    Poppins_700Bold,
    Poppins_400Regular,
    Poppins_500Medium,
  });

  if (!fontsLoaded) return null;

  return (
    <Modal animationType="fade" transparent={true} visible={visible} onRequestClose={onCancel}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Your {itemName} will be permanently deleted</Text>
          
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={onCancel}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={[styles.button, styles.deleteButton]} onPress={onDelete}>
              <Text style={styles.deleteButtonText}>Delete</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const { width } = Dimensions.get('window');
const modalWidth = width * 0.85;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    width: modalWidth,
    backgroundColor: '#d8f8d8', // Light green background
    borderRadius: 20,
    padding: 25,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 20,
    textAlign: 'center',
    fontSize: 20,
    // Using Poppins_700Bold for a strong header
    fontFamily: 'Poppins_700Bold',
    color: '#2c3e2c',
  },
  buttonContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
  },
  button: {
    borderRadius: 15,
    padding: 12,
    elevation: 2,
    width: '48%',
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#8bab8b', // Grayish green for cancel
  },
  deleteButton: {
    backgroundColor: '#2ea043', // Green for delete
  },
  cancelButtonText: {
    color: 'white',
    fontSize: 16,
    // Using Poppins_500Medium for button text
    fontFamily: 'Poppins_500Medium',
  },
  deleteButtonText: {
    color: 'white',
    fontSize: 16,
    // Using Poppins_500Medium for button text
    fontFamily: 'Poppins_500Medium',
  },
});

export default DeleteGoalConfirmationModal;
