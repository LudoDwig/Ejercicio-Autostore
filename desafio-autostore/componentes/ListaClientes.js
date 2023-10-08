import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CarWashList = () => {
    const [customerData, setCustomerData] = useState([]);
  
    const fetchData = async () => {
      try {
        const data = await AsyncStorage.getItem('carWashData');
        if (data) {
          const parsedData = JSON.parse(data);
          setCustomerData(parsedData);
        }
      } catch (error) {
        console.error('Error al obtener los datos: ', error);
      }
    };
  
    useEffect(() => {
      fetchData();
  

      const timer = setInterval(() => {
        fetchData();
      }, 2000);
  
      return () => {
        clearInterval(timer);
      };
    }, []); 
  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Clientes:</Text>
      <FlatList
        data={customerData}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.customerItem}>
            <Text style={styles.customerName}>Nombre del Cliente: {item.customerName}</Text>
            <Text>Tipo de Vehículo: {item.vehicleType}</Text>
            <Text>Tipo de Servicio: {item.serviceType}</Text>
            <Text>Total Pagado: ${item.totalPayment.toFixed(2)}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  customerItem: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  customerName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CarWashList;