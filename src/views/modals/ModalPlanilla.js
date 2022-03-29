import React, { useState } from 'react';
import { Alert, Modal, StyleSheet, Text, TextInput, Pressable, View } from 'react-native';
import Checkbox from 'expo-checkbox';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ModalPlanilla = ({onClose}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [nombre, setNombre] = useState("");
  const [rut, setRut] = useState("");
  const [edad, setEdad] = useState("");
  const [telefono, setTelefono] = useState("");
  const [completoChecked, setCompletoChecked] = useState(false);
  const [hamburguesaChecked, setHamburguesaChecked] = useState(false);
  const [jugoChecked, setJugoChecked] = useState(false);
  const [bebidaChecked, setBebidaChecked] = useState(false);

  

  const cargarPedido = () =>{
    const pedido = []
    if(completoChecked){
      pedido.push("completo")
    }
    if(hamburguesaChecked){
      pedido.push("hamburguesa")
    }
    if(jugoChecked){
      pedido.push("jugo")
    }
    if(bebidaChecked){
      pedido.push("bebida")
    }
    return pedido 
  }

  const chargingFlatListWithitems = async () => {
    try {
      //Aqui checkeo si tengo items en mi localStorage
      const aux = await AsyncStorage.getItem('homeItem')
      //si tengo
      if(aux){
        //creo una id para el item
        const uuidv4 = require("uud/v4")
        //preparo el item como un string
        const jsonValue = JSON.stringify({uuidv4, nombre, rut, edad, telefono, cargarPedido})
        //lo sumo al item anterior
        const aux2 = aux + jsonValue
        //lo guardo en mi localStorage de items
        await AsyncStorage.setItem("homeItem", aux2)
      }else{
        const jsonValue = JSON.stringify({nombre, rut, edad, telefono, cargarPedido})
        await AsyncStorage.setItem("homeItem", jsonValue)    
      }
    } catch (e) {
      Alert.alert("Hubo un error en guardar su data, por favor, vuelva a completar el formulario")
    }
  }

  const clearModalTextInputs = () => {
    setNombre("")
    setRut("")
    setEdad("")
    setTelefono("")
    setCompletoChecked
    setHamburguesaChecked
    setJugoChecked
    setBebidaChecked
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
            <Text style={styles.modalTitle}>Seleccione sus pedidos</Text> 
            <View style={styles.checkboxText}>
              <Checkbox
                value={completoChecked}
                onValueChange={setCompletoChecked}
                color={completoChecked ? '#4630EB' : undefined}/>
              <Text>Completo</Text>
            </View>
            <View style={styles.checkboxText}>
              <Checkbox
                title="Hamburguesa"
                value={hamburguesaChecked}
                onValueChange={setHamburguesaChecked}
                color={hamburguesaChecked ? '#4630EB' : undefined}/>
              <Text>Hamburguesa</Text>  
            </View>    
            <View style={styles.checkboxText}>
              <Checkbox
                title="Jugo"
                value={jugoChecked}
                onValueChange={setJugoChecked}
                color={jugoChecked ? '#4630EB' : undefined}/>    
              <Text>Jugo</Text>  
            </View>  
            <View style={styles.checkboxText}>
              <Checkbox
                title="Bebida"
                value={bebidaChecked}
                onValueChange={setBebidaChecked}
                color={bebidaChecked ? '#4630EB' : undefined}/>
              <Text>Bebida</Text>
            </View>                 
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => {setModalVisible(!modalVisible);
                              clearModalTextInputs();
                              chargingFlatListWithitems()
                              onClose()}

                      }>
              <Text style={styles.textStyle}>Guardar Usuario</Text>
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
  checkboxText:{
    flexDirection: 'row'
  }
});

export default ModalPlanilla;

