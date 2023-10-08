import React, { useState } from 'react';
import { View, Text, Button, TextInput, Alert, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';
import Factura from './Facturacion';

const CarWashForm = ({ onSubmit }) => {
  const [customerName, setCustomerName] = useState('');
  const [vehicleType, setVehicleType] = useState('Motocicleta');
  const [serviceType, setServiceType] = useState('Lavado Basico');
  const [vehicleBrand, setVehicleBrand] = useState('');
  const [vehicleColor, setVehicleColor] = useState('Color');
  const [vehicleYear, setVehicleYear] = useState('1990');
  const [vehiclePlate, setVehiclePlate] = useState('');
  const years = Array.from({ length: 2023 - 1989 }, (_, index) => (2023 - index).toString());

  const isNameValid = /^[a-zA-Z\s]*$/.test(customerName);
  const isPlateValid = /^[a-zA-Z]{1,2}\d{6}$/.test(vehiclePlate);
  const calculatePrice = () => {

    const prices = {
      'Lavado Basico': {
        Motocicleta: 2.0,
        'Carro sedán': 3.0,
        Camioneta: 4.0,
        Microbús: 5.0,
        Bus: 6.0,
      },
      'Lavado Premium': {
        Motocicleta: 2.5,
        'Carro sedán': 3.5,
        Camioneta: 4.5,
        Microbús: 5.5,
        Bus: 6.5,
      },
      'Lavado VIP': {
        Motocicleta: 3.0,
        'Carro sedán': 4.0,
        Camioneta: 5.0,
        Microbús: 6.0,
        Bus: 7.0,
      },
      Polarizado: {
        Motocicleta: 0, // Not Applicable
        'Carro sedán': 25.0,
        Camioneta: 35.0,
        Microbús: 45.0,
        Bus: 60.0,
      },
    };

    const price = prices[serviceType][vehicleType];
    return price;
  };

  const handleSubmit = async (set) => {
    if (!isNameValid) {
      Alert.alert('Nombre Inválido', 'El nombre debe contener solo letras y espacios.');
      return;
    }
  
    if (!isPlateValid) {
      Alert.alert('Placa Inválida', 'La placa debe comenzar con una o dos letras seguidas de 6 números.');
      return;
    }
  
    const price = calculatePrice();
    const tip = price * 0.05;
    const tax = price * 0.13;
    const totalPayment = price + tip + tax;
  
    const formData = {
      customerName,
      vehicleType,
      serviceType,
      vehicleBrand,
      vehicleColor,
      vehicleYear,
      vehiclePlate,
      price,
      tip,
      tax,
      totalPayment,
    };
  
    try {
  
      const existingData = await AsyncStorage.getItem('carWashData');
      const parsedData = existingData ? JSON.parse(existingData) : [];
  

      const updatedData = [...parsedData, formData];
  
   
      await AsyncStorage.setItem('carWashData', JSON.stringify(updatedData));
  

      setCustomerName('');
      setVehicleType('Motocicleta');
      setServiceType('Lavado Basico');
      setVehicleBrand('Marca');
      setVehicleColor('Color');
      setVehicleYear('1990');
      setVehiclePlate('');
  
    } catch (error) {
      console.error('Error al guardar los datos: ', error);
    }
  };
  

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nombre del Cliente:</Text>
      <TextInput
        style={styles.input}
        onChangeText={text => setCustomerName(text)}
        value={customerName}
        placeholder="Ingrese el nombre del cliente"
      />
      <Text style={styles.label}>Tipo de Vehículo:</Text>
      <Picker
        style={styles.input}
        selectedValue={vehicleType}
        onValueChange={value => setVehicleType(value)}
      >
        <Picker.Item label="Motocicleta" value="Motocicleta" />
        <Picker.Item label="Carro sedán" value="Carro sedán" />
        <Picker.Item label="Camioneta" value="Camioneta" />
        <Picker.Item label="Microbús" value="Microbús" />
        <Picker.Item label="Bus" value="Bus" />
      </Picker>
      <Text style={styles.label}>Tipo de Servicio:</Text>
      <Picker
        style={styles.input}
        selectedValue={serviceType}
        onValueChange={value => setServiceType(value)}
      >
        <Picker.Item label="Lavado Basico" value="Lavado Basico" />
        <Picker.Item label="Lavado Premium" value="Lavado Premium" />
        <Picker.Item label="Lavado VIP" value="Lavado VIP" />
        <Picker.Item label="Polarizado" value="Polarizado" />
      </Picker>
      <Text style={styles.label}>Placa del Vehículo:</Text>
      <TextInput
        style={styles.input}
        value={vehiclePlate}
        onChangeText={text => {
         
          if (text.length <= 8) {
            setVehiclePlate(text);
          }
        }}
        maxLength={8}
        placeholder='Ejemplo: AB123456'
      />
      <Text style={styles.label}>Color del Vehículo:</Text>
      <Picker
        style={styles.input}
        selectedValue={vehicleColor}
        onValueChange={itemValue => setVehicleColor(itemValue)}
      >
        <Picker.Item label="Azul" value="Azul" />
        <Picker.Item label="Naranja" value="Narajaa" />
        <Picker.Item label="Rojo" value="Rojo" />
        <Picker.Item label="Blanco" value="Blanco" />
        <Picker.Item label="Negro" value="Negro" />
      </Picker>
      <Text style={styles.label}>Año del Vehículo:</Text>
      <Picker
        style={styles.input}
        selectedValue={vehicleYear}
        onValueChange={(value) => setVehicleYear(value)}
      >
        {years.map((year) => (
          <Picker.Item key={year} label={year} value={year} />
        ))}
      </Picker>
      <Text style={styles.label}>Marca:</Text>
      <TextInput
        style={styles.input}
        onChangeText={text => setVehicleBrand(text)}
        value={vehicleBrand}
        placeholder="Marca del vehículo"
        
      />
       <Button title="Guardar" onPress={handleSubmit} />
       {customerName && (
        <Factura
          customerName={customerName}
          vehicleType={vehicleType}
          serviceType={serviceType}
          vehiclePlate={vehiclePlate}
          vehicleColor={vehicleColor}
          vehicleYear={vehicleYear}
          vehicleBrand={vehicleBrand}
        />     
      )}
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  // Estilos para otros elementos de entrada
});

export default CarWashForm;
