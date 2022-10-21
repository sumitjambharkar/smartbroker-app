import {createDrawerNavigator} from '@react-navigation/drawer';
import MainScreen from './MainScreen';
import ProfilePage from './ProfilePage'
import Icon from 'react-native-vector-icons/MaterialIcons';
const Drawer = createDrawerNavigator();
const HomePage = () => {
  
  return (
    <Drawer.Navigator>
    <Drawer.Screen name="Owner" component={MainScreen}  options={{ headerShown: false}} />
    <Drawer.Screen  name="Profile" component={ProfilePage}  options={{ headerShown: false,drawerIcon: () => (
      <Icon name="person" color="black" size={30} />
    )}}/>
    </Drawer.Navigator>
  );
};

export default HomePage;
