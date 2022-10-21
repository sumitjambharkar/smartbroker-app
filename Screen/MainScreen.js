import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MatchPage from './MatchPage';
import OwnerPage from './OwnerPage';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ConnectPage from './ConnectPage';

const Tab = createBottomTabNavigator();

const MainScreen = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Owners" component={OwnerPage} options={{ headerShown: false,
    tabBarIcon: () => (
      <Icon name="home" color="blue" size={30} />
    )}}  />
      <Tab.Screen name="Match" component={MatchPage} options={{ headerShown: false,
    tabBarIcon: () => (
      <Icon name="save" color="blue" size={30} />
    )}}/>
      <Tab.Screen name="Connect" component={ConnectPage} options={{ headerShown: false,
    tabBarIcon: () => (
      <Icon name="perm-phone-msg" color="blue" size={30} />
    )}} />
    </Tab.Navigator>
  );
};

export default MainScreen;
