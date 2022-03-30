import React, { useState } from 'react';
import { Alert, Modal, StyleSheet, Text, TextInput, Pressable, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';
import CustomTextImput from '../components/CustomTextImput';
import CustomCheckBox from '../components/CustomCheckBox';


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
      //se obtiene una uuid
      const key = uuid.v4()
      //si tengo items en mi localStorage...
      if(aux){
        console.log("cargandoFlatListConItems: la lista ya tenia items")
        //preparo el nuevo item como un string
        const jsonValue = JSON.stringify({key, nombre, rut, edad, telefono, cargarPedido})
        //lo sumo al item anterior
        const aux2 = aux + jsonValue
        console.log(aux2)
        //lo guardo en mi localStorage de items
        await AsyncStorage.setItem("homeItem", aux2)  
      }else{//si no tengo items en mi localStorage...
        //guardo el pedido generado y este será mi primer item en el localStorage
        console.log("cargandoFlatListConItems: la lista esta vacia")
        const jsonValue = JSON.stringify({key, nombre, rut, edad, telefono, cargarPedido})
        console.log(jsonValue)
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
    setCompletoChecked(false)
    setHamburguesaChecked(false)
    setJugoChecked(false)
    setBebidaChecked(false)
  }


  const enviarPedido = () => {
    if(nombre == '' || rut == '' || edad == '' || telefono == '' ){
      Alert.alert("Debe ingresar todos sus datos antes de solicitar su pedido.")
    }else{
      if(completoChecked == false && hamburguesaChecked == false && jugoChecked == false && bebidaChecked == false){
        Alert.alert("Debe elegir a lo menos un producto antes de solicitar su pedido.")  
      }else{
        cargandoFlatListConItems()
        limpiandoModalTextInputs();
        setModalVisible(!modalVisible);
        // esta es una funcion que la obtenemos desde la props recibida.
        onClose()  
      }
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
            <CustomTextImput word= "nombre"   hook={nombre}   keyboardType="default" setHook={setNombre} />
            <CustomTextImput word= "rut"      hook={rut}      keyboardType="default" setHook={setRut} />
            <CustomTextImput word= "edad"     hook={edad}     keyboardType="numeric" setHook={setEdad} />
            <CustomTextImput word= "telefono" hook={telefono} keyboardType="numeric" setHook={setTelefono} />

            <Text style={styles.modalTitle}>Seleccione sus pedidos</Text> 

            <CustomCheckBox label="completo"    productoChecked={completoChecked}    setProductoChecked={setCompletoChecked}/>
            <CustomCheckBox label="hamburguesa" productoChecked={hamburguesaChecked} setProductoChecked={setHamburguesaChecked}/>
            <CustomCheckBox label="jugo"        productoChecked={jugoChecked}        setProductoChecked={setJugoChecked}/>
            <CustomCheckBox label="bebida"      productoChecked={bebidaChecked}      setProductoChecked={setBebidaChecked}/>


            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => {enviarPedido()} }>
              <Text style={styles.textStyle}>Envia Pedido</Text>
            </Pressable>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => {setModalVisible(!modalVisible)} }>
              <Text style={styles.textStyle}>Volver</Text>
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
    marginTop: 8,
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

