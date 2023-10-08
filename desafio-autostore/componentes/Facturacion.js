import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Factura = ({ customerName, vehicleType, serviceType, vehiclePlate, vehicleColor, vehicleYear, vehicleBrand }) => {
  return (
    <View style={styles.invoiceContainer}>
      <Text style={styles.invoiceLabel}>Factura:</Text>
      <Text>Nombre del Cliente: {customerName}</Text>
      <Text>Tipo de Vehículo: {vehicleType}</Text>
      <Text>Tipo de Servicio: {serviceType}</Text>
      <Text>Placa del Vehículo: {vehiclePlate}</Text>
      <Text>Color del Vehículo: {vehicleColor}</Text>
      <Text>Año del Vehículo: {vehicleYear}</Text>
      <Text>Marca: {vehicleBrand}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  invoiceContainer: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 20,
    marginTop: 20,
  },
  invoiceLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default Factura;
