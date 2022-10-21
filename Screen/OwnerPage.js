import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, { useEffect, useState, useLayoutEffect } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { SafeAreaView } from 'react-native-safe-area-context';
import useAuth from '../hooks/useAuth';
import firebase, { db } from '../firebase-config';
import { Linking } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { doc, onSnapshot } from "firebase/firestore";

const OwnerPage = () => {

  const navigation = useNavigation()
  const { currentUser } = useAuth()
  const [resale, setResale] = useState([])
  const [rental, setRental] = useState([])
  const [user, setUser] = useState("")
  const [show, setShow] = useState(false)
  const [search, setSearch] = useState("");

  useLayoutEffect(
    () => onSnapshot(doc(db,"users",currentUser.uid),(snapshot)=>{
      console.log(snapshot);
      if (!snapshot.exists()) {
        navigation.navigate("ProfileScreen")
      }
    }),
   [])

  useEffect(() => {
    db.collection("users").doc(currentUser.uid).onSnapshot(snapshot => (
      setUser(snapshot.data())
    ))
  }, [])

  useEffect(() => {
    const unSub = firebase.firestore().collection("resale").onSnapshot(snapshot => (
      setResale(snapshot.docs.map((doc) => (doc.data())))
    ))
    return () => unSub()
  }, [])
  useEffect(() => {
    const unSub = firebase.firestore().collection("rental").onSnapshot(snapshot => (
      setRental(snapshot.docs.map((doc) => (doc.data())))
    ))
    return () => unSub()
  }, [])

  const getUser = (uid, displayName) => {
    console.log("sumit", uid);
    if (uid) {
      firebase.firestore().collection("users").doc(uid).collection("chat").doc(currentUser.uid).set({
        uid: currentUser.uid,
        displayName: user.displayName
      })
    }
    if (currentUser.uid) {
      firebase.firestore().collection("users").doc(currentUser.uid).collection("chat").doc(uid).set({
        uid: uid,
        displayName:displayName
      })
    }
    navigation.navigate("Chat", { uid,displayName })
  }

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.head}>
          <TouchableOpacity style={styles.menu} onPress={() => navigation.openDrawer()}>
            <Icon name='menu' size={30} />
          </TouchableOpacity>
          <Text style={{ fontSize: 24, fontWeight: "700", marginLeft: 10 }}>Residential Commercial</Text>
        </View>
        <TextInput
          value={search}
          onChangeText={(text)=>setSearch(text)}
          placeholder="Search locality or landmark"
          style={styles.input}
        />
        <View style={{ display: "flex", flexDirection: "row" }}>
          <TouchableOpacity onPress={() => setShow(true)}>
            <Text style={styles.resale}>Resale</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setShow(false)}>
            <Text style={styles.resale}>Rental</Text>
          </TouchableOpacity>
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          {show ?
            <>
              {resale
              .filter((doc)=>doc.building?.toLowerCase().indexOf(search.toString().toLowerCase()) !== -1 )
                .map((doc, i) => (
                  <View key={i} style={styles.card}>
                    <View style={styles.property}>
                      <View style={styles.home}>
                        <Icon name="home" size={30} color="white" />
                      </View>
                      <View style={{ width: "85%" }}>
                        <Text style={styles.name_resale}>Available For Sale in {doc.building.toLowerCase()}</Text>
                      </View>
                    </View>
                    <View style={styles.park}>
                      <View style={styles.bh}>
                        <Text><Icon name='single-bed' size={30} /></Text>
                        <Text style={{ fontSize: 18, fontWeight: "700" }}>{doc.config}</Text>
                      </View>
                      <View style={styles.bh}>
                        <Text><Icon name="local-atm" size={30} /></Text>
                        <Text style={{ fontSize: 18, fontWeight: "700" }}> ₹ {doc.price}</Text>
                      </View>
                    </View>
                    <View style={styles.park}>
                      <Text style={styles.bhk}>{doc.sqft} Sqft</Text>
                      <Text style={styles.bhk}>{doc.parking} Parking</Text>
                    </View>

                    <View style={styles.flat}>
                      <Text>
                        <Icon name="vpn-key" size={30} color="black" />
                      </Text>

                      <View>
                        <Text style={styles.ajay}>{doc.displayName}</Text>
                        <Text>owner</Text>
                      </View>
                      <View style={styles.chat}>
                        <TouchableOpacity onPress={() => getUser(doc.uid, doc.displayName)} style={styles.menu}>
                          <Text style={styles.text}>Chat</Text>
                          <Icon name="chat" size={30} color="white" />
                        </TouchableOpacity>
                      </View>
                      <View style={styles.chat}>
                        <TouchableOpacity style={styles.menu} onPress={() => { Linking.openURL(`tel:${doc.number}`) }}>
                          <Text style={styles.text}>Call</Text>
                          <Icon name="call" size={30} color="white" />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                ))}
            </> :
            <>
              {rental
              .filter((doc)=>doc.building?.toLowerCase().indexOf(search.toString().toLowerCase()) !== -1 )
                .map((doc, i) => (

                  <View key={i} style={styles.card}>
                    <View style={styles.property}>
                      <View style={styles.home_rent}>
                        <Icon name="home" size={30} color="white" />
                      </View>
                      <View style={{ width: "85%" }}>
                        <Text style={styles.name}>Available For Rent in {doc.building}</Text>
                      </View>
                    </View>
                    <View style={styles.park}>
                      <View style={styles.bh}>
                        <Text><Icon name='single-bed' size={30} /></Text>
                        <Text style={{ fontSize: 18, fontWeight: "700" }}>{doc.config}</Text>
                      </View>
                      <View style={styles.bh}>
                        <Text><Icon name="local-atm" size={30} /></Text>
                        <Text style={{ fontSize: 18, fontWeight: "700" }}> ₹ {doc.rent} K/month</Text>
                      </View>
                    </View>
                    <View style={styles.park}>
                      <Text style={styles.bhk}>Family {doc.bachelor}</Text>
                      <Text style={styles.bhk}>{doc.furnishing}</Text>
                    </View>

                    <View style={styles.flat}>
                      <Text>
                        <Icon name="vpn-key" size={30} color="black" />
                      </Text>

                      <View>
                        <Text style={styles.ajay}>{doc.displayName}</Text>
                        <Text>owner</Text>
                      </View>
                      <View style={styles.chat}>
                        <TouchableOpacity onPress={() => getUser(doc.uid, doc.displayName)} style={styles.menu}>
                          <Text style={styles.text}>Chat</Text>
                          <Icon name="chat" size={30} color="white" />
                        </TouchableOpacity>
                      </View>
                      <View style={styles.chat}>
                        <TouchableOpacity style={styles.menu} onPress={() => { Linking.openURL(`tel:${doc.number}`) }}>
                          <Text style={styles.text}>Call</Text>
                          <Icon name="call" size={30} color="white" />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                ))}
            </>}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default OwnerPage;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    padding: 10,
  },
  head: {
    display: "flex",
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    margin: 12,
  },
  input: {
    marginTop: 12,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 8,
    padding: 8,
  },

  resale: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingTop: 10,
    paddingBottom: 10,
    marginRight: 12
  },

  card: {
    width: '100%',
    height:"auto",
    backgroundColor: '#eaedf6',
    borderRadius: 10,
    marginBottom: 15
  },

  property: {
    flexDirection: 'row',
    padding: 10,
  },

  home: {
    width: 55,
    height: 55,
    color: '#fff',
    backgroundColor: '#d30101',
    borderRadius: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  home_rent: {
    width: 55,
    height: 55,
    color: '#fff',
    backgroundColor: '#0000ff',
    borderRadius: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  name: {
    fontSize: 21,
    color: '#d30101',
    fontWeight: 'bold',
    marginLeft: 24,
  },
  name_resale: {
    fontSize: 21,
    color: '#0000ff',
    fontWeight: 'bold',
    marginLeft: 24,
  },

  park: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center"
  },

  bhk: {
    margin: 6,
    color: '#000',
    fontSize: 18,
    fontWeight: '700',
    padding: 4,
    borderWidth: 1,
  },
  bh: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
    color: '#000',
    fontSize: 18,
    fontWeight: '700',
    padding: 4,
  },

  flat: {

    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 6,
    borderRadius: 10,
  },

  ajay: {
    fontSize: 20,
    fontWeight: 'bold',
  },

  chat: {
    display: 'flex',
    justifyContent: "center",
    alignItems: 'center',
    textAlign: "center",
    width: '30%',
    color: '#fff',
    borderRadius: 10,
    backgroundColor: '#1e1726',

  },
  text: {
    color: 'white',
    fontSize: 18,
    fontWeight: '700',
    marginRight: 6,
  },
  menu: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center"
  }
});
