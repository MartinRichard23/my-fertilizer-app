import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Button,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { spreaderDatabase as spreaders } from '../data/spreaderDatabase';
import { fertilizers } from '../data/fertilizerDatabase';

export default function CalculationsScreen() {
  const [selectedFertilizer, setSelectedFertilizer] = useState('');
  const [nGoal, setNGoal] = useState('');
  const [pGoal, setPGoal] = useState('');
  const [kGoal, setKGoal] = useState('');
  const [result, setResult] = useState<string | null>(null);
  const [selectedSGN, setSelectedSGN] = useState<number | null>(null);
  const [selectedSpreaderId, setSelectedSpreaderId] = useState('');

  const handleCalculate = () => {
    const fertilizer = fertilizers.find((f) => f.id === selectedFertilizer);
  
    if (!fertilizer) {
      setResult('Please select a fertilizer.');
      return;
    }
  
    const { n, p, k } = fertilizer.npk;
  
    const parsedN = nGoal ? parseFloat(nGoal) : null;
    const parsedP = pGoal ? parseFloat(pGoal) : null;
    const parsedK = kGoal ? parseFloat(kGoal) : null;
  
    const rates: number[] = [];
  
    if (parsedN && n > 0) rates.push(parsedN / (n / 100));
    if (parsedP && p > 0) rates.push(parsedP / (p / 100));
    if (parsedK && k > 0) rates.push(parsedK / (k / 100));
  
    if (rates.length === 0) {
      setResult('Please enter at least one nutrient goal.');
      return;
    }
  
    const productPerThousand = Math.max(...rates);
  
    // Now calculate the actual nutrients applied with that amount
    const appliedN = productPerThousand * (n / 100);
    const appliedP = productPerThousand * (p / 100);
    const appliedK = productPerThousand * (k / 100);
  
    let summary = [
      `💡 Product Needed: ${productPerThousand.toFixed(2)} lbs/1,000 sq ft`,
      `🧪 Nutrients Delivered:`,
      `• Nitrogen (N): ${appliedN.toFixed(2)} lbs`,
      `• Phosphorus (P): ${appliedP.toFixed(2)} lbs`,
      `• Potassium (K): ${appliedK.toFixed(2)} lbs`,
    ].join('\n');
  
    const selectedSpreader = spreaders.find(s => (s as any).id === selectedSpreaderId || s.model === selectedSpreaderId);
    const calibration = selectedSpreader?.getSetting && selectedSGN
      ? {
          setting: selectedSpreader.getSetting(productPerThousand, selectedSGN),
          speed: '3.0 mph',
          width: 'Varies by model',
        }
      : null;

    if (calibration) {
      summary += `\n\n📏 Calibration Suggestion:\n• Setting: ${calibration.setting.toFixed(2)}\n• Speed: ${calibration.speed}\n• Width: ${calibration.width}`;
    }
  
    setResult(summary);
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Nutrient Calculator</Text>

        <Text style={styles.label}>Desired Nitrogen (lbs/1,000 sq ft):</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={nGoal}
          onChangeText={setNGoal}
          placeholder="e.g. 1.0"
        />

        <Text style={styles.label}>Desired Phosphorus (lbs/1,000 sq ft):</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={pGoal}
          onChangeText={setPGoal}
          placeholder="e.g. 0.5"
        />

        <Text style={styles.label}>Desired Potassium (lbs/1,000 sq ft):</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={kGoal}
          onChangeText={setKGoal}
          placeholder="e.g. 0.5"
        />

        <Text style={styles.label}>Select Fertilizer:</Text>
        <Picker
          selectedValue={selectedFertilizer}
          onValueChange={(value) => {
            setSelectedFertilizer(value);
            const fert = fertilizers.find(f => f.id === value);
            if (fert?.sgn_values.length === 1) {
              setSelectedSGN(fert.sgn_values[0]);
            } else {
              setSelectedSGN(null);
            }
          }}
          style={styles.picker}
        >
          <Picker.Item label="Choose a fertilizer..." value="" />
          {fertilizers.map((f) => (
            <Picker.Item
              key={f.id}
              label={`${f.name} (${f.npk.n}-${f.npk.p}-${f.npk.k})`}
              value={f.id}
            />
          ))}
        </Picker>

        {(() => {
          const selectedFert = fertilizers.find(f => f.id === selectedFertilizer);
          return Array.isArray(selectedFert?.sgn_values) && selectedFert.sgn_values.length > 0;
        })() && (
          <>
            <Text style={styles.label}>Select SGN:</Text>
            <Picker
              selectedValue={selectedSGN}
              onValueChange={(value) => setSelectedSGN(value)}
              style={styles.picker}
            >
              <Picker.Item label="Choose SGN..." value={null} />
              {fertilizers.find(f => f.id === selectedFertilizer)?.sgn_values.map((sgn) => (
                <Picker.Item key={sgn} label={`${sgn}`} value={sgn} />
              ))}
            </Picker>
          </>
        )}

        <Text style={styles.label}>Select Spreader:</Text>
        <Picker
          selectedValue={selectedSpreaderId}
          onValueChange={(value) => setSelectedSpreaderId(value)}
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

        <View style={{ marginTop: 30 }}>
          <Button title="Add" onPress={handleCalculate} />
        </View>

        {result && <Text style={styles.result}>{result}</Text>}
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
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    marginTop: 20,
    fontSize: 16,
    fontWeight: '500',
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
  result: {
    marginTop: 30,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
});