import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider } from './hooks/useAuth';
import StackNavigation from './StackNavigation';

function App() {
  return (
    <NavigationContainer>
      <AuthProvider>
        <StackNavigation />
      </AuthProvider>
    </NavigationContainer>
  );
}
export default App