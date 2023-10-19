import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TextInput, Button } from 'react-native';
import Constants from 'expo-constants';
import { firestore, MESSAGES, collection, query, orderBy, onSnapshot, addDoc, serverTimestamp } from './firebase/Config';
import { convertFirebaseTimeStampToJS } from './helpers/Functions';

export default function App() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  const save = async () => {
    // Save the new message to Firebase
    const docRef = await addDoc(collection(firestore, MESSAGES), {
      text: newMessage,
      created: serverTimestamp()
    }).catch(error => console.log(error));

    // Clear the input field and print a notification about saving the message
    setNewMessage('');
    console.log('Message saved.');
  }

  useEffect(() => {
    // Get the messages from Firestore and update them whenever there are changes
    const q = query(collection(firestore, MESSAGES), orderBy('created', 'desc'));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const tempMessages = [];

      // Convert the Firestore timestamp to a readable timestamp
      querySnapshot.forEach((doc) => {
        const messageObject = {
          id: doc.id,
          text: doc.data().text,
          created: convertFirebaseTimeStampToJS(doc.data().created)
        }
        tempMessages.push(messageObject);
      });
      // Update the messages to the state of the component
      setMessages(tempMessages);
    });
    // Detach the listener when the component is removed
    return () => {
      unsubscribe();
    }
  }, [])

  return (
    <View style={styles.container}>
      <ScrollView>
        {messages.map((message) => (
          <View style={styles.message} key={message.id}>
            <Text style={styles.messageInfo}>{message.created}</Text>
            <Text>{message.text}</Text>
          </View>
        ))}
      </ScrollView>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder='Type your message...'
          value={newMessage}
          onChangeText={text => setNewMessage(text)}
        />
        <Button title="Send" type="button" onPress={save} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Constants.statusBarHeight,
  },
  message: {
    padding: 10,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: '#f5f5f5',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginLeft: 10,
    marginRight: 10,
  },
  messageInfo: {
    fontSize: 12,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderColor: '#ccc',
  },
});
