import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { spreaderCalibration } from '../data/calibrationData'; // if still used
import { fertilizerLabels } from '../data/labelMaps';
import { Spreader } from '../data/spreaderDatabase';
import { fertilizers } from '../data/fertilizerDatabase';

type RouteParams = {
  ApplicationDetails: {
    spreader: string;
    fertilizer: string;
    sgn: number;
  };
};

export default function ApplicationDetailsScreen() {
  const route = useRoute<RouteProp<RouteParams, 'ApplicationDetails'>>();
  const { spreader, fertilizer, sgn } = route.params;

  const [rate, setRate] = useState('');
  const [squareFeet, setSquareFeet] = useState('');

  const rateNum = parseFloat(rate);
  const areaNum = parseFloat(squareFeet);
  const totalProduct =
    isNaN(rateNum) || isNaN(areaNum) ? 0 : (rateNum / 1000) * areaNum;

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Application Details</Text>

        <Text style={styles.label}>Spreader: {spreader}</Text>
        <Text style={styles.label}>Fertilizer: {fertilizerLabels[fertilizer] || fertilizer}</Text>
        <Text style={styles.label}>Selected SGN: {sgn}</Text>

        <Text style={styles.label}>Desired Rate (lbs/1,000 sq ft):</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={rate}
          onChangeText={setRate}
          placeholder="e.g. 3.0"
        />

        <Text style={styles.label}>Total Square Footage:</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={squareFeet}
          onChangeText={setSquareFeet}
          placeholder="e.g. 2000"
        />

        <Text style={styles.result}>
          Total Product Needed: {totalProduct.toFixed(2)} lbs
        </Text>
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
  result: {
    marginTop: 30,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
});