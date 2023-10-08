import React, { useState } from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import CarWashForm from './componentes/FormLavado';
import CarWashInvoice from './componentes/Facturacion';
import CarWashList from './componentes/ListaClientes';

export default function App() {
  const [formData, setFormData] = useState(null);

  const handleFormSubmit = data => {
    setFormData(data);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Lavado Autostore</Text>
      <CarWashForm onSubmit={handleFormSubmit} />
      <CarWashList />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
});