import {View, Text, StyleSheet,TouchableOpacity} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';

const CreatePost = ({navigation}) => {
  return (
   <SafeAreaView>
    <ScrollView showsVerticalScrollIndicator={false}>
    <View style={styles.container}>
      <Text style={styles.have}>I HAVE</Text>

      <View style={styles.red}>
        <TouchableOpacity onPress={()=>navigation.navigate("ResaleProperty")}>
        <View style={styles.button}>
          <Text style={styles.icon}>
            <Icon name="house" size={30} color="white" />
          </Text>
          <Text style={styles.icon}>I have a Resale Property</Text>
          <Text style={styles.icon}>
            <Icon name="navigate-next" size={30} color="white" />
          </Text>
        </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={()=>navigation.navigate("ResaleClient")}>
        <View style={styles.button}>
          <Text style={styles.icon}>
            <Icon name="person" size={30} color="white" />
          </Text>
          <Text style={styles.icon}>I have a Resale Client</Text>
          <Text style={styles.icon}>
            <Icon name="navigate-next" size={30} color="white" />
          </Text>
        </View>
        </TouchableOpacity>
      </View>

      <View style={styles.blue}>
        <TouchableOpacity onPress={()=>navigation.navigate("RentalProperty")}>
        <View style={styles.button1}>
          <Text style={styles.icon}>
            <Icon name="house" size={30} color="white" />
          </Text>
          <Text style={styles.icon}>I have a Rental Property</Text>
          <Text style={styles.icon}>
            <Icon name="navigate-next" size={30} color="white" />
          </Text>
        </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={()=>navigation.navigate("RentalClient")}>
        <View style={styles.button1}>
          <Text style={styles.icon}>
            <Icon name="person" size={30} color="white" />
          </Text>
          <Text style={styles.icon}>I have a Rental Client</Text>
          <Text style={styles.icon}>
            <Icon name="navigate-next" size={30} color="white" />
          </Text>
        </View>
        </TouchableOpacity>
      </View>
    </View>
    </ScrollView>
   </SafeAreaView>
  );
};

export default CreatePost;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    Height: '100%',
    padding: 20,
  },

  have: {
    color: '#000',
    fontSize: 30,
    textAlign: 'center',
    marginTop: 40,
    fontWeight: 'bold',
  },

  red: {
    marginTop: 30,
  },

  button: {
    width:"100%",
    flexDirection: 'row',
    backgroundColor: '#d30101',
    borderRadius: 50,
    padding:12,
    marginTop: 20,
    justifyContent: 'space-between',
  },

  icon: {
    fontSize: 20,
    color: '#fff',
    textAlign: 'center',
  },

  blue: {
    marginTop: 60,
  },

  button1: {
    width:"100%",
    flexDirection: 'row',
    backgroundColor: '#2461ef',
    borderRadius: 50,
    padding:12 ,
    marginTop: 20,
    justifyContent: 'space-between',
  },

  icon1: {
    fontSize: 20,
    color: '#fff',
    textAlign: 'center',
  },
});
