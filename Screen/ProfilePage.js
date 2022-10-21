import { View, Text, TouchableOpacity,StyleSheet } from 'react-native'
import React,{useState,useEffect} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import useAuth from '../hooks/useAuth'
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import firebase from '../firebase-config';

const ProfilePage = () => {
  
  const {logout,currentUser} = useAuth()
  const navigation = useNavigation()
  const [user,setUser] = useState("")

  useEffect(() => {
    const unSub = firebase.firestore().collection("users").doc(currentUser.uid).onSnapshot(snapshot=>(
      setUser(snapshot.data())
    ))
    return ()=> unSub()
  }, [currentUser.uid])
  return (
    <SafeAreaView>
      <View style={styles.container}>
      <TouchableOpacity onPress={()=>navigation.navigate("Owner")}>
      <View style={styles.li}>
      <Icon name="arrow-back" size={36} color="blue"/>
      <Text style={styles.text}>Back</Text>
      </View>
      </TouchableOpacity>
      <View style={styles.avtar}>
      </View>
      <View style={styles.li}>
      <Icon name="person" size={36} color="blue"/>
      <Text style={styles.text}>{user.userName}</Text>
      </View>
      <View style={styles.li}>
      <Icon name="room" size={36} color="blue"/>
      <Text style={styles.text}>{user.location}</Text>
      </View>
      <View style={styles.li}>
      <Icon name="phone" size={36} color="blue"/>
      <Text style={styles.text}>{user.number}</Text>
      </View>
      <TouchableOpacity onPress={logout}>
      <View style={styles.li}>
      <Icon name="logout" size={36} color="blue"/>
      <Text style={styles.text}>Logout</Text>
      </View>
      </TouchableOpacity>
    </View>
    </SafeAreaView>
  )
}

export default ProfilePage;

const styles = StyleSheet.create({
  container : {
      width:"100%",
      height:"100%",
      padding:18
  },
  avtar : {
    backgroundColor:"#0008",
    height:"30%",
  },
  li : {
    display:"flex",
    flexDirection:"row",
    alignItems:"center",
    margin:8,
  },
  text : {
    marginLeft:12,
    fontWeight:"bold"
  }
})