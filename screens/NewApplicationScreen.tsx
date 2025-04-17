import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { NavigationProp } from '@react-navigation/native';

import { fertilizers } from '../data/fertilizerDatabase';
import { spreaderDatabase as spreaders } from '../data/spreaderDatabase';

type Props = {
  navigation: NavigationProp<any>;
};

export default function NewApplicationScreen({ navigation }: Props) {
  const [selectedFertilizerId, setSelectedFertilizerId] = useState('');
  const [selectedSpreaderId, setSelectedSpreaderId] = useState('');
  const [selectedSGN, setSelectedSGN] = useState<number | null>(null);
  const [customRate, setCustomRate] = useState<string>('3.0');

  const selectedFertilizer = fertilizers.find(f => f.id === selectedFertilizerId);
  const selectedSpreader = spreaders.find(s => (s as any).id === selectedSpreaderId || s.model === selectedSpreaderId);

  const rate = parseFloat(customRate);
  const calibration = selectedSpreader?.getSetting && selectedSGN && !isNaN(rate)
    ? {
        setting: selectedSpreader.getSetting(rate, selectedSGN),
        speed: '3.0 mph',
        width: 'Varies by model',
      }
    : null;

  const handleContinue = () => {
    if (!selectedFertilizerId || !selectedSpreaderId || !selectedSGN) return;

    navigation.navigate('ApplicationDetails', {
      spreader: selectedSpreaderId,
      fertilizer: selectedFertilizerId,
      sgn: selectedSGN,
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>New Application</Text>

      <Text style={styles.label}>Select Fertilizer:</Text>
      <Picker
        selectedValue={selectedFertilizerId}
        onValueChange={(value) => {
          setSelectedFertilizerId(value);
          setSelectedSGN(null); // reset SGN when fertilizer changes
        }}
        style={styles.picker}
      >
        <Picker.Item label="Choose fertilizer..." value="" />
        {fertilizers.map((fertilizer) => (
          <Picker.Item
            key={fertilizer.id}
            label={`${fertilizer.name} (${fertilizer.npk.n}-${fertilizer.npk.p}-${fertilizer.npk.k})`}
            value={fertilizer.id}
          />
        ))}
      </Picker>

      {Array.isArray(selectedFertilizer?.sgn_values) && selectedFertilizer.sgn_values.length > 0 && (
        <>
          <Text style={styles.label}>Select SGN:</Text>
          <Picker
            selectedValue={selectedSGN}
            onValueChange={(value) => setSelectedSGN(value)}
            style={styles.picker}
          >
            <Picker.Item label="Choose SGN..." value={null} />
            {selectedFertilizer.sgn_values.map((sgn) => (
              <Picker.Item key={sgn} label={`${sgn}`} value={sgn} />
            ))}
          </Picker>

          <Text style={styles.label}>Enter Custom Rate (lbs/1,000 sq ft):</Text>
          <TextInput
            value={customRate}
            onChangeText={setCustomRate}
            keyboardType="numeric"
            style={styles.textInput}
          />
        </>
      )}

      <Text style={styles.label}>Select Spreader:</Text>
      <Picker
        selectedValue={selectedSpreaderId}
        onValueChange={setSelectedSpreaderId}
        style={styles.picker}
      >
        <Picker.Item label="Choose spreader..." value="" />
        {spreaders.map((spreader) => (
          <Picker.Item
            key={(spreader as any).id ?? spreader.model}
            label={`${spreader.model} (${spreader.brand})`}
            value={(spreader as any).id ?? spreader.model}
          />
        ))}
      </Picker>

      {selectedSpreader && selectedFertilizer && (
        <View style={styles.calibrationBox}>
          <Text style={styles.calibrationTitle}>Calibration Info</Text>
          {calibration ? (
            <>
              <Text style={styles.calibrationText}>Setting: {calibration.setting}</Text>
              <Text style={styles.calibrationText}>Speed: {calibration.speed}</Text>
              <Text style={styles.calibrationText}>Width: {calibration.width}</Text>
            </>
          ) : (
            <Text style={styles.calibrationText}>No calibration data available for this combo.</Text>
          )}
        </View>
      )}

      <TouchableOpacity
        style={[
          styles.button,
          (!selectedFertilizerId || !selectedSpreaderId || !selectedSGN) && styles.buttonDisabled,
        ]}
        disabled={!selectedFertilizerId || !selectedSpreaderId || !selectedSGN}
        onPress={handleContinue}
      >
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f5f5f5',
    flexGrow: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    marginTop: 20,
    marginBottom: 5,
  },
  picker: {
    backgroundColor: '#fff',
    borderRadius: 6,
  },
  textInput: {
    backgroundColor: '#fff',
    borderRadius: 6,
    padding: 10,
    fontSize: 16,
  },
  button: {
    marginTop: 30,
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonDisabled: {
    backgroundColor: '#a5d6a7',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
  calibrationBox: {
    marginTop: 30,
    backgroundColor: '#e8f5e9',
    padding: 15,
    borderRadius: 10,
  },
  calibrationTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  calibrationText: {
    fontSize: 16,
    marginVertical: 2,
  },
});
