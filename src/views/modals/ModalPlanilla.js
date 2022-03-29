import React, { useState } from 'react';
import { Alert, Modal, StyleSheet, Text, TextInput, Pressable, View } from 'react-native';
import RadioButtonGroup, { RadioButtonItem } from 'expo-radio-button';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ModalPlanilla = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [nombre, setNombre] = useState("");
  const [rut, setRut] = useState("");
  const [edad, setEdad] = useState("");
  const [telefono, setTelefono] = useState("");
  const [labor, setLabor] = useState("");

  const storeHomeItem = async () => {
    try {
      const aux = await AsyncStorage.getItem('homeItem')
      if(aux != null){
        const jsonValue = JSON.stringify({nombre, rut, edad, telefono, labor})
        let aux2 = aux + jsonValue
        console.log(aux)
        console.log(aux2)
        await AsyncStorage.setItem("homeItem", aux2)
      }else{
        return null
      }
    } catch (e) {
      Alert.alert("Hubo un error en guardar su data, por favor, vuelva a completar el formulario")
    }
  }

  return (
    <View style={styles.centeredView}>
      <Modal animationType="fade" 
             transparent={true} 
             visible={modalVisible} 
             onRequestClose={() => {Alert.alert('Modal has been closed.');
                                    setModalVisible(!modalVisible);
                            }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>Ingrese nombre</Text>
            <TextInput style={styles.textInput} placeHolder= "Ingrese nombre" value={nombre} onChangeText={setNombre} />
            <Text style={styles.modalTitle}>Ingrese rut</Text>
            <TextInput style={styles.textInput} placeHolder= "Ingrese rut" keyboardType="numeric" value={rut} onChangeText={setRut} />
            <Text style={styles.modalTitle}>Ingrese edad</Text>
            <TextInput style={styles.textInput} placeHolder= "Ingrese edad" keyboardType="numeric" value={edad} onChangeText={setEdad} />
            <Text style={styles.modalTitle}>Ingrese telefono</Text>
            <TextInput style={styles.textInput} placeHolder= "Ingrese telefono" keyboardType="numeric" value={telefono} onChangeText={setTelefono} />
            <Text style={styles.modalTitle}>Seleccione su ocupación</Text>
            <RadioButtonGroup containerStyle={{ marginBottom: 10 }} 
                              selected={labor} 
                              onSelected={(value) => setLabor(value)} 
                              radioBackground="blue">
              <RadioButtonItem label="Estudiante" value="Estudiante" />
              <RadioButtonItem label="Estudiante y Trabajador" value="Estudiante y Trabajador"/>
              <RadioButtonItem label="Trabajador" value="Trabajador"/>
              <RadioButtonItem label="Cesante" value="Cesante"/>
              <RadioButtonItem label="Jubilado" value="Jubilado"/>              
            </RadioButtonGroup>
            
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => {setModalVisible(!modalVisible);
                              storeHomeItem()}}>
              <Text style={styles.textStyle}>Hide Modal</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <Pressable style={[styles.button, styles.buttonOpen]} onPress={() => setModalVisible(true)}>
        <Text >Show Modal</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    //alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: 'green',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalTitle: {
    marginTop:8,
    marginBottom: 4,
  },
  textInput:{
    color: "#000",
    width: 250,
    height: 40,
    borderWidth: 1,
    borderRadius: 10,
    padding: 8
},
});

export default ModalPlanilla;

