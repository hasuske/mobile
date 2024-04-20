import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import StudentFormScreen from './StudentFormScreen';
import StudentListScreen from './StudentListScreen';

const Stack = createStackNavigator();
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Formulário" component={StudentFormScreen} />
        <Stack.Screen name="Lista de Alunos" component={StudentListScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};


export default App;
