import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NavigationProp } from '@react-navigation/native';

type OptionsStackParamList = {
  TriWaveSeeder: undefined;
};

export default function OptionsScreen() {
  const navigation = useNavigation<NavigationProp<OptionsStackParamList>>();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Options</Text>
      <Button
        title="TriWave Seeder"
        onPress={() => navigation.navigate('TriWaveSeeder')}
      />
      {/* Add more buttons here for other options screens */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
});