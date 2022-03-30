import React, { useState } from 'react';
import { Alert, Modal, StyleSheet, Text, TextInput, Pressable, View } from 'react-native';
import Checkbox from 'expo-checkbox';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {v1 as uuidv4} from 'uuid';
import TextTextInput from '../components/TextTextInput';
import CheckBoxText from '../components/CheckBoxText';


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

  
  /** esta funcion crea y retorna un String[] con valores según el o los checkbox que el
      usuario haya seleccionado */
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

  // esta funcion guarda, en localStorage, la data ingresada en la planilla-modal...
  const cargandoFlatListConItems = async () => {
    //se inicia el intento de trabajar con el localStorage
    try {
      //Aqui checkeo si tengo items en mi localStorage
      const aux = await AsyncStorage.getItem('homeItem')
      //si tengo items en mi localStorage...
      if(aux){

        //preparo el nuevo item como un string
        const jsonValue = JSON.stringify({nombre, rut, edad, telefono, cargarPedido})
        //lo sumo al item anterior
        const aux2 = aux + jsonValue
        //lo guardo en mi localStorage de items
        await AsyncStorage.setItem("homeItem", aux2)  
      }else{//si no tengo items en mi localStorage...
        //guardo el pedido generado y este será mi primer item en el localStorage
        const jsonValue = JSON.stringify({nombre, rut, edad, telefono, cargarPedido})
        await AsyncStorage.setItem("homeItem", jsonValue)    
      }
    } catch (e) {
      Alert.alert("Hubo un error en guardar su pedido, por favor, vuelva a completar el formulario")
    }
  }

  /* esta funcion limpia los textInputs y checkbox del modal, con el objetivo de
     desplegar un modal "nuevo" cada vez que se navege a este */
  const limpiandoModalTextInputs = () => {
    setNombre("")
    setRut("")
    setEdad("")
    setTelefono("")
    setCompletoChecked
    setHamburguesaChecked
    setJugoChecked
    setBebidaChecked
  }


  const enviarPedido = () => {
    setModalVisible(!modalVisible);
    limpiandoModalTextInputs();
    cargandoFlatListConItems()
    // esta es una funcion que trabaja con el hook en Home.js
    onClose()
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
            <TextTextInput word= "nombre" hook={nombre} keyboardType="default" setHook={setNombre} />
            <TextTextInput word="rut" hook={rut} keyboardType="default" setHook={setRut} />
            <TextTextInput word="edad" hook={edad} keyboardType="numeric" setHook={setEdad} />
            <TextTextInput word="telefono" hook={telefono} keyboardType="numeric" setHook={setTelefono} />

            <Text style={styles.modalTitle}>Seleccione sus pedidos</Text> 

            <CheckBoxText word="completo" productoChecked={completoChecked} setProductoChecked={setCompletoChecked}/>
            <CheckBoxText word="hamburguesa" productoChecked={hamburguesaChecked} setProductoChecked={setHamburguesaChecked}/>
            <CheckBoxText word="jugo" productoChecked={jugoChecked} setProductoChecked={setJugoChecked}/>
            <CheckBoxText word="bebida" productoChecked={bebidaChecked} setProductoChecked={setBebidaChecked}/>


            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => {enviarPedido()} }>
              <Text style={styles.textStyle}>Envia Pedido</Text>
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

