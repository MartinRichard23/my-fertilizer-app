import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Button, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ArchivedApplicationsScreen() {
  const [applications, setApplications] = useState<any[]>([]);

  useEffect(() => {
    const loadApplications = async () => {
      try {
        const data = await AsyncStorage.getItem('applications');
        const parsed = data ? JSON.parse(data) : [];
        setApplications(parsed);
      } catch (error) {
        console.error('Error loading applications:', error);
      }
    };

    loadApplications();
  }, []);

  const handleDelete = async (id: number) => {
    const updated = applications.filter(app => app.id !== id);
    setApplications(updated);
    await AsyncStorage.setItem('applications', JSON.stringify(updated));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Archived Applications</Text>
      <FlatList
        data={applications}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.text}>
              {new Date(item.date).toLocaleDateString()} – {item.spreader} /{' '}
              {item.fertilizer}
            </Text>
            <Text style={styles.text}>
              Rate: {item.rate} lbs/1k | Area: {item.area} sq ft
            </Text>
            <Text style={styles.text}>
              Product: {item.totalProduct} lbs | Setting: {item.setting}
            </Text>
            <View style={styles.buttonRow}>
              <Button title="Edit" onPress={() => console.log('Edit', item.id)} />
              <Button
                title="Delete"
                color="red"
                onPress={() =>
                  Alert.alert('Delete Application', 'Are you sure you want to delete this application?', [
                    { text: 'Cancel', style: 'cancel' },
                    { text: 'Delete', style: 'destructive', onPress: () => handleDelete(item.id) },
                  ])
                }
              />
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  item: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginVertical: 8,
  },
  text: {
    fontSize: 16,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
});