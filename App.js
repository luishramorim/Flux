import '@expo/metro-runtime';
import { PaperProvider } from 'react-native-paper';
import theme from './assets/theme';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './config/firebase';

import LoginScreen from './src/loginScreen';
import RegisterScreen from './src/registerScreen';
import RecoveryScreen from './src/recoveryScreen';

import HomeScreen from './src/homeScreen';

const Stack = createNativeStackNavigator();

function AuthStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Flux | Login', headerShown: false }} />
      <Stack.Screen name="Register" component={RegisterScreen} options={{ title: 'Flux | Cadastro', headerShown: false }} />
      <Stack.Screen name="Recovery" component={RecoveryScreen} options={{ title: 'Flux | Recuperar senha', headerShown: false }} />
    </Stack.Navigator>
  );
}

function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Flux | Início', headerShown: false }} />
    </Stack.Navigator>
  );
}

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      if (user) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    });

    return () => unsubscribe(); 
  }, []);

  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        {isAuthenticated ? <HomeStack /> : <AuthStack />}
      </NavigationContainer>
    </PaperProvider>
  );
}