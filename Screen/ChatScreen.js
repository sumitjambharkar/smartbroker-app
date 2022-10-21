import { View, Text, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView } from 'react-native'
import React, { useEffect, useState } from 'react'
import useAuth from '../hooks/useAuth';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { auth, db } from '../firebase-config';
import { useNavigation } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';


const ChatScreen = ({ route }) => {

  const navigation = useNavigation()
  const { currentUser } = useAuth()
  const { uid, displayName } = route.params;

  const [msge, setMsge] = useState("")
  const [chat, setChat] = useState([])
  console.log(chat);

  const sendMessage = () => {
    const generateId =
      uid > currentUser.uid
        ? currentUser.uid + "-" + uid
        : uid + "-" + currentUser.uid;
    db.collection("message").doc(generateId).collection("chat").add({
      user1: currentUser.uid,
      user2: uid,
      text: msge,
      createdAt: new Date(),

    })
    setMsge("")
  }

  useEffect(() => {
    const generateId =
      uid > currentUser.uid
        ? currentUser.uid + "-" + uid
        : uid + "-" + currentUser.uid;
    db.collection("message").doc(generateId).collection("chat")
      .orderBy("createdAt", "asc")
      .onSnapshot(snapshot => (
        setChat(snapshot.docs.map((doc) => (doc.data())))
      ))
  }, [])

  return (
    <SafeAreaView>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View style={styles.container}>
          <View style={styles.arrow}>
            <TouchableOpacity onPress={() => navigation.navigate("Owners")}>
              <Text><Icon name="arrow-back" size={30} /></Text>
            </TouchableOpacity>
            <View style={{ marginLeft: 24 }}>
              <Text style={{ fontSize: 18, fontWeight: "700" }}>{displayName}</Text>
              <Text>1.2pm</Text>
            </View>
            <Text></Text>
          </View>

          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.chat}>
              <View style={{ width: "100%" }}>
                {chat.map((doc, i) => (
                  <View key={i} style={doc.user2 === currentUser.uid ? styles.right : styles.left}>
                    <View style={styles.main}>
                      <Text style={styles.text}>{doc.text}</Text>
                    </View>
                  </View>
                ))}
              </View>
            </View>
          </ScrollView>

          <View style={styles.input} >

            <TextInput style={{ width: "90%" }} value={msge} onChangeText={(text) => setMsge(text)} placeholder='write a message' />
            <TouchableOpacity disabled={!msge} onPress={sendMessage}>
            <Text style={styles.send}><Icon name="send" size={20} color="white" /></Text>
          </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default ChatScreen;
const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    padding: 10,
  },

  arrow: {
    flexDirection: 'row',
    borderColor: '#0001',
    borderBottomWidth: 3,
  },

  chat: {
    width: "100%",
    height: '75%',
    marginTop: 20,
    flexDirection: 'row',
  },
  input: {
    height: "10%",
    bottom: 0,
    flexDirection: 'row',
    width: "100%"
  },
  send: {
    padding: 10,
    backgroundColor: '#6c8bff',
  },
  text: {
    color: 'white',
    fontSize: 14,

  },
  right: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    padding: 4,

  },
  left: {
    flexDirection: "row-reverse",
    padding: 4,

  },
  main: {
    backgroundColor: '#6988fc',
    padding: 4,
    borderRadius: 10,
  }
});