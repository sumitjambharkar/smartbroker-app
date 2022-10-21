import { View, Text, StyleSheet, TouchableOpacity,KeyboardAvoidingView } from 'react-native';
import React, { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { db } from '../firebase-config';
import useAuth from '../hooks/useAuth';
import { useNavigation } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';

const ConnectPage = () => {

  const navigation = useNavigation()
  const [user,setUser] = useState([])
  const {currentUser}= useAuth()

  console.log(currentUser.uid);

   useEffect(() => {
     db.collection("users").doc(currentUser.uid).collection("chat").onSnapshot(snapshot=>(
      setUser(snapshot.docs.map((doc)=>(doc.data())))
     ))
   }, [])

   const getChat =(uid,displayName)=>{
     navigation.navigate("Chat", { uid,displayName })
   }
   
  return (
    <SafeAreaView>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        <View style={styles.menu}>
            <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <Icon name='menu' size={30} />
            </TouchableOpacity>
            <Text style={{fontSize:20,fontWeight:"700",marginLeft:12}}>Chats</Text>
          </View>
        {user.map((doc,i)=>(
          <View style={styles.list} key={i}>
           <TouchableOpacity onPress={()=>getChat(doc.uid,doc.displayName)}>
           <Text style={{fontSize:24,fontWeight:"700",marginLeft:8}}>{doc.displayName}</Text>
           </TouchableOpacity>
            </View>
            
        ))}
      </View>
      </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ConnectPage;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    padding: 20,
  },
  menu: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginBottom:6
  },
  list : {
    borderBottomWidth:1,
    padding:12,
    borderColor:"#aeaeae"
  }
});
