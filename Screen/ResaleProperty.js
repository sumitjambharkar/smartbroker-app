import { View, Text, StyleSheet, TextInput, TouchableOpacity,KeyboardAvoidingView } from 'react-native';
import React, { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import SelectDropdown from 'react-native-select-dropdown';
import { SafeAreaView } from 'react-native-safe-area-context';
import useAuth from '../hooks/useAuth';
import { useNavigation } from '@react-navigation/native';
import { db } from '../firebase-config';
import { ScrollView } from 'react-native-gesture-handler';

const configArray = [
  'Studio/1RK',
  '1 BHK',
  '1.5 BHK',
  '2 BHK',
  '2.5 BHK',
  '3 BHK',
  '3.5 BHK',
  '4 BHK',
  '4+ BHK',
  'Plot',
  'Villa',
  'Commercial',
  'Office',
  'Farmland',
  'Commercial-Fractional',
];
const FloorsArray = ['Lower', 'Mid', 'Higher'];
const parkingArray = ['0', '1', '2', '3', '4', '4+'];

const ResaleProperty = () => {


  const navigation = useNavigation()

  const {currentUser} = useAuth()
  
  const [building, setBuilding] = useState('');
  const [config, setConfig] = useState('');
  const [price, setPrice] = useState('');
  const [sqft, setSqft] = useState('');
  const [floor, setFloor] = useState('');
  const [parking, setParking] = useState('');
  const [notes, setNotes] = useState('');
  const [user,setUser] = useState([])
  const [error,setError] = useState("")


  useEffect(() => {
    db.collection("users").doc(currentUser.uid).onSnapshot(snapshot=>(
      setUser(snapshot.data())
    ))
  }, [])
  
  
  const resaleProperty =async() => {
    const uid = currentUser.uid
    const number = currentUser.phoneNumber
    if (!building || !config || !price || !sqft || !floor || !parking || !notes) {
      setError("please fill out the all details")
    } else {
      db.collection("resale").add({
        building,config,price,sqft,floor,parking,
        notes,uid,number,
        displayName:user.userName,
        location:user.location,
        organization:user.organization,
        createdAt: new Date(),
      })
      navigation.navigate("Owners")
    }
    
  }
  return (
    <SafeAreaView>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <ScrollView showsVerticalScrollIndicator={false}>
     <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.resale}>I have a Resale Property</Text>
         <TouchableOpacity onPress={()=>navigation.navigate("HomePage")}>
         <Text><Icon name="close" size={30} color="black" /></Text>
         </TouchableOpacity>
        </View>
        <Text style={{color:"red",textAlign:"center"}}>{error}</Text>
        <Text style={styles.label}>Enter Building Name </Text>
        <TextInput
          style={styles.input}
          onChangeText={text => setBuilding(text)}
          placeholder="Enter building name"
        />
        <Text style={styles.label}>Config</Text>
        <SelectDropdown
          defaultButtonText={'Choose Config'}
          value={config}
          data={configArray}
          disableAutoScroll={true}
          buttonTextStyle={{ color: '#494B4D' }}
          buttonStyle={{
            borderColor: '#ccc',
            borderWidth: 1,
            width: '100%',
            borderRadius: 6,
            height: 45,
          }}
          onSelect={item => {
            setConfig(item);
          }}
        />
        <Text style={styles.label}>Price</Text>
        <TextInput
          keyboardType="numeric"
          onChangeText={text => setPrice(text)}
          style={styles.input}
          placeholder="Enter Price"
        />
        <Text style={styles.label}>Sqft</Text>
        <TextInput
          keyboardType="numeric"
          onChangeText={text => setSqft(text)}
          style={styles.input}
          placeholder="Enter Carpet Area"
        />
        <Text style={styles.label}>Floors</Text>
        <SelectDropdown
          defaultButtonText={'Choose Floors'}
          value={floor}
          data={FloorsArray}
          disableAutoScroll={true}
          buttonTextStyle={{ color: '#494B4D' }}
          buttonStyle={{
            borderColor: '#ccc',
            borderWidth: 1,
            width: '100%',
            borderRadius: 6,
            height: 45,
          }}
          onSelect={item => {
            setFloor(item);
          }}
        />
        <Text style={styles.label}>Parking</Text>
        <SelectDropdown
          defaultButtonText={'Choose Floors'}
          value={parking}
          data={parkingArray}
          disableAutoScroll={true}
          buttonTextStyle={{ color: '#494B4D' }}
          buttonStyle={{
            borderColor: '#ccc',
            borderWidth: 1,
            width: '100%',
            borderRadius: 6,
            height: 45,
          }}
          onSelect={item => {
            setParking(item);
          }}
        />
        <TextInput
          onChangeText={text => setNotes(text)}
          style={styles.input}
          placeholder="Add Notes"
        />
        <View style={styles.button}>
          <TouchableOpacity onPress={resaleProperty}>
          <Text style={styles.text}>Continue</Text>
          </TouchableOpacity>
        </View>
      </View>
      </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ResaleProperty;
const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    padding: 20,
  },
  header: {
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  resale: {
    color: '#000',
    fontSize: 20,
    fontWeight: '800',
  },
  label: {
    marginTop: 6,
    marginBottom: 6
  },
  input: {
    backgroundColor: '#e8eff0',
    marginTop: 10,
    borderRadius: 10,
    height: 42,
  },
  button: {
    alignItems: 'center',
    backgroundColor: 'blue',
    padding: 12,
    borderRadius: 24,
    marginTop: 12
  },
  text: {
    color: 'white',
    fontSize: 18,
  },
});
