import React, { useRef, useState } from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
} from 'react-native'

interface Message {
  id: string
  text: string
  sender: 'user' | 'ai'
}

const AIScreen = () => {
  const [userInput, setUserInput] = useState('')
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', text: 'Hello! How can I help you today?', sender: 'ai' },
  ])

  const flatListRef = useRef<FlatList<Message>>(null)

  const handleSend = () => {
    if (userInput.trim()) {
      const userMessage: Message = {
        id: Date.now().toString(),
        text: userInput,
        sender: 'user',
      }

      setMessages((prevMessages) => [...prevMessages, userMessage])

      // Simulate AI response (replace this with actual API call)
      setTimeout(() => {
        const aiResponse: Message = {
          id: Date.now().toString(),
          text: `You asked: "${userInput}". I'm here to help!`,
          sender: 'ai',
        }
        setMessages((prevMessages) => [...prevMessages, aiResponse])
        flatListRef.current?.scrollToEnd({ animated: true })
      }, 1000)

      setUserInput('')
      flatListRef.current?.scrollToEnd({ animated: true })
    }
  }

  const renderMessage = ({ item }: { item: Message }) => (
    <View
      style={[
        styles.messageContainer,
        item.sender === 'user' ? styles.userMessage : styles.aiMessage,
      ]}
    >
      <Text style={styles.messageText}>{item.text}</Text>
    </View>
  )

  return (
    <SafeAreaView style={styles.safeArea}>
      <Text style={styles.title}>Wiffy</Text>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <FlatList
          ref={flatListRef}
          data={messages}
          renderItem={renderMessage}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.chatContainer}
          onContentSizeChange={() =>
            flatListRef.current?.scrollToEnd({ animated: true })
          }
          onLayout={() => flatListRef.current?.scrollToEnd({ animated: true })}
        />
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Ask me anything..."
            value={userInput}
            onChangeText={setUserInput}
          />
          <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
            <Text style={styles.sendButtonText}>Send</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#d4f5d4',
  },
  container: {
    flex: 1,
    backgroundColor: '#d4f5d4',
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    marginTop: '10%',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  chatContainer: {
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
  messageContainer: {
    marginVertical: 5,
    padding: 10,
    borderRadius: 10,
    maxWidth: '75%',
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#0078fe',
  },
  aiMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#159515',
  },
  messageText: {
    color: '#fff',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#d4f5d4',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 10,
    marginRight: 10,
    backgroundColor: '#fff',
  },
  sendButton: {
    backgroundColor: '#0078fe',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 5,
  },
  sendButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
})

export default AIScreen