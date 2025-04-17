import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { triWaveRates, getTriWaveSetting } from '../data/TriWaveSeederRates';
import { NavigationProp } from '@react-navigation/native';

export default function TriWaveSeederScreen() {
  const [selectedVariety, setSelectedVariety] = useState<string>('');
  const [targetRate, setTargetRate] = useState<string>('');
  const [calculatedSetting, setCalculatedSetting] = useState<number | null>(null);

  const handleCalculate = () => {
    const data = triWaveRates[selectedVariety];
    const rate = parseFloat(targetRate);
    if (!data || isNaN(rate)) {
      setCalculatedSetting(null);
      return;
    }
    const result = getTriWaveSetting(rate, data);
    setCalculatedSetting(result);
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>TriWave Seeder Calculator</Text>

        <Text style={styles.label}>Select Seed Variety:</Text>
        <Picker
          selectedValue={selectedVariety}
          onValueChange={setSelectedVariety}
          style={styles.picker}
        >
          <Picker.Item label="Choose seed variety..." value="" />
          {Object.keys(triWaveRates).map((key) => (
            <Picker.Item key={key} label={key} value={key} />
          ))}
        </Picker>

        <Text style={styles.label}>Enter Target Rate (lbs/1,000 sq ft):</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          placeholder="e.g. 2.5"
          value={targetRate}
          onChangeText={setTargetRate}
        />

        <View style={styles.resultBox}>
          {calculatedSetting !== null ? (
            <Text style={styles.resultText}>
              Recommended Dial Setting: {calculatedSetting.toFixed(2)}
            </Text>
          ) : (
            <Text style={styles.resultText}>Enter valid values to calculate</Text>
          )}
        </View>

        <View style={styles.button}>
          <Text style={styles.buttonText} onPress={handleCalculate}>
            Calculate
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 40,
    backgroundColor: '#f5f5f5',
    flexGrow: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    marginTop: 20,
  },
  input: {
    backgroundColor: '#fff',
    padding: 10,
    fontSize: 16,
    borderRadius: 6,
    marginTop: 5,
  },
  picker: {
    backgroundColor: '#fff',
    marginTop: 5,
  },
  resultBox: {
    marginTop: 30,
    padding: 20,
    backgroundColor: '#e0f7fa',
    borderRadius: 8,
    alignItems: 'center',
  },
  resultText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  button: {
    marginTop: 30,
    backgroundColor: '#0288d1',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});