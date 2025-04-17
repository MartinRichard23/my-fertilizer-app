// By: Martin Richardson 

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './screens/HomeScreen';
import NewApplicationScreen from './screens/NewApplicationScreen';
import ArchivedApplicationsScreen from './screens/ArchivedApplicationsScreen';
import OptionsScreen from './screens/OptionsScreen';
import ApplicationDetailsScreen from './screens/ApplicationDetailsScreen';
import CalculationsScreen from './screens/CalculationsScreen';
import TriWaveSeederScreen from './screens/TriWaveSeederScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="NewApplication" component={NewApplicationScreen} />
        <Stack.Screen name="ArchivedApplications" component={ArchivedApplicationsScreen} />
        <Stack.Screen name="Options" component={OptionsScreen} />
        <Stack.Screen name="ApplicationDetails" component={ApplicationDetailsScreen} />
        <Stack.Screen name="Calculations" component={CalculationsScreen} />
        <Stack.Screen name="TriWaveSeeder" component={TriWaveSeederScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}