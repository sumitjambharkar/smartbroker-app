import { View, Text,StyleSheet,TextInput, TouchableOpacity, KeyboardAvoidingView } from 'react-native'
import React, { useState } from 'react';
import { db } from '../firebase-config';
import { useNavigation } from '@react-navigation/native';
import useAuth from '../hooks/useAuth';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';

const ProfileScreen = () => {

  const {currentUser} = useAuth()
  const navigation = useNavigation()
    const [userName,setUserName] = useState("")
    const [organization,setOrganization] = useState("")
    const [location,setLocation] = useState("")
    const [error,setError] = useState("")

    const getData = ()=> {
      if (!userName || !location || !organization) {
        setError("please fill out the all details")
      } else {
        db.collection("users").doc(currentUser.uid).set({
          location:location,
          displayName:userName,
          organization:organization,
          uid:currentUser.uid,
          number:currentUser.phoneNumber,
          createdAt: new Date(),
      })
      navigation.navigate("HomePage")
        
      }
    }
  return (
   <SafeAreaView>
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
    <ScrollView showsVerticalScrollIndicator={false}>
    <View style={styles.container}>
      <Text style={styles.h1}>Create your Profile</Text>
      <Text style={{color:"red",textAlign:"center"}}>{error}</Text>
      <Text style={styles.h2}>Full Name :</Text>
      <TextInput value={userName} onChangeText={(text)=>setUserName(text)} style={styles.input} placeholder='Enter first name'/>
      <Text style={styles.h3}>Organization :</Text>
       <TextInput value={organization} onChangeText={(text)=>setOrganization(text)} style={styles.input} placeholder='Enter your organisation'/>
       <Text style={styles.h4}>Location :</Text>
       <TextInput value={location} onChangeText={(text)=>setLocation(text)} style={styles.input} placeholder='Enter your location '/>
       <TouchableOpacity onPress={getData}>
       <Text style={styles.button}>Continue</Text>
       </TouchableOpacity>
    </View>
    </ScrollView>
    </KeyboardAvoidingView>
   </SafeAreaView>
  )
}

export default ProfileScreen;

const styles = StyleSheet.create({

    container : {
        width:"100%",
        height:"100%",
        padding:20,
    },


 h1:{
    fontSize:35,
    color:'black',
    marginTop:'20%',
    textAlign:'center',
  
 },

 h2:{
    fontSize:20,
    paddingTop:'5%',
 },

 input:{
    height:42,
    borderWidth: 1,
    borderColor:'black',
    marginTop:10,
    borderRadius:10,
    paddingLeft:12
   
   },

   h3:{
    fontSize:20,
    paddingTop:'5%',
   },

   h4:{
    fontSize:20,
    paddingTop:'5%',
   },

   button:{
    fontSize:20,
    color:'white',
    backgroundColor:'blue',
     textAlign:'center',
    marginTop:30,
    marginBottom:10,
     padding:10,
     borderRadius:10,
     overflow: 'hidden',

   },

})