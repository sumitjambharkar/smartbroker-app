import {View, Text, StyleSheet, TouchableOpacity,KeyboardAvoidingView} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';

const MatchPage = ({navigation}) => {
  return (
    <SafeAreaView>
   <ScrollView>
   <View style={styles.container}>
      <View style={styles.menu}>
            <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <Icon name='menu' size={30} />
            </TouchableOpacity>
            <Text style={{fontSize:20,fontWeight:"700",marginLeft:12}}>Matches</Text>
          </View>

      <View style={styles.div}>
        <View style={styles.box}>
          <Icon name="post-add" color="white" size={60} />
        </View>
        <Text style={styles.content}>
          You do not have any active posts. Create post to find matches!
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate('CreatePost')}>
          <Text style={styles.button}>Create post</Text>
        </TouchableOpacity>
      </View>
    </View>
   </ScrollView>
    </SafeAreaView>
  );
};

export default MatchPage;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    padding: 20,
  },

  match: {
    color: '#000',
    fontSize: 40,
    fontWeight: 'bold',
  },

  div: {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },

  box: {
    width: 120,
    height: 120,
    color: '#fff',
    textAlign: 'center',
    fontSize: 30,
    backgroundColor: '#1b1c21',
    borderRadius: 40,
    shadowColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },

  content: {
    color: '#000',
    fontSize: 30,
    textAlign: 'center',
    marginTop: 50,
  },

  button: {
    width: 270,
    color: '#fff',
    fontSize:18,
    backgroundColor: '#2360ec',
    marginTop: 50,
    padding:12,
    borderRadius:20,
    textAlign: 'center',
    overflow: 'hidden',
  },
  menu: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center"
  },
});
