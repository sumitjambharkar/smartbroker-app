import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React,{useState,useEffect} from 'react';
import CreatePost from './Screen/CreatePost';
import HomePage from './Screen/HomePage';
import HomeScreen from './Screen/HomeScreen';
import RentalClient from './Screen/RentalClient';
import RentalProperty from './Screen/RentalProperty';
import ResaleClinet from './Screen/ResaleClinet';
import ResaleProperty from './Screen/ResaleProperty';
import useAuth from './hooks/useAuth';
import ProfileScreen from './Screen/ProfileScreen';
import ChatScreen from './Screen/ChatScreen';

const StackNavigation = () => {
  
  const Stack = createNativeStackNavigator();
  const {currentUser} = useAuth()
  
  return (
    <Stack.Navigator>
      {!currentUser ?
        <Stack.Group>
          <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        </Stack.Group> :
        <>
        <Stack.Group>
          <Stack.Screen name="HomePage" component={HomePage} options={{ headerShown: false }} />
          <Stack.Screen name="CreatePost" component={CreatePost} options={{ headerShown: false }} />
          <Stack.Screen name="ResaleProperty" component={ResaleProperty} options={{ headerShown: false }} />
          <Stack.Screen name="ResaleClient" component={ResaleClinet} options={{ headerShown: false }} />
          <Stack.Screen name="RentalProperty" component={RentalProperty} options={{ headerShown: false }} />
          <Stack.Screen name="RentalClient" component={RentalClient} options={{ headerShown: false }} />
          <Stack.Screen name="Chat" component={ChatScreen} options={{ headerShown:false }} />
        </Stack.Group>
        <Stack.Group >
          <Stack.Screen name="ProfileScreen" component={ProfileScreen} options={{ headerShown: false }} />
        </Stack.Group>
        </>
        }
    </Stack.Navigator>
  )
}

export default StackNavigation