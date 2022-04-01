import React, { useState } from 'react';
import { Alert, Button, Modal, StyleSheet, Text, ToastAndroid, Pressable, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';
import CustomTextImput from '../components/CustomTextImput';
import CustomCheckBox from '../components/CustomCheckBox';
import {Picker} from '@react-native-picker/picker';
import { obtenerTipoConexion } from '../utils/funciones';
import BotonesEnviarPedidoYVolver from '../components/BotonesEnviarPedidoYVolver';
import CustomPicker from '../components/CustonPicker';
import CustomDatePicker from '../components/CustomDatePicker';

const ModalPlanilla = ({onClose}) => {
  //hook para manejar la visibilidad de ModalPlanilla
  const [modalVisible, setModalVisible] = useState(false);
  //hook's para cada una de las categorias en donde el usuario ingrese data...
  const [nombre, setNombre] = useState("");
  const [rut, setRut] = useState("");
  const [edad, setEdad] = useState("");
  const [telefono, setTelefono] = useState("");
  const [completoChecked, setCompletoChecked] = useState(false);
  const [hamburguesaChecked, setHamburguesaChecked] = useState(false);
  const [jugoChecked, setJugoChecked] = useState(false);
  const [bebidaChecked, setBebidaChecked] = useState(false);
  const [productos, setProductos] = useState([])
  //hook's para manejar los picker's
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [selectedEntrega, setSelectedEntrega] = useState();


  const showToast = () => {
    ToastAndroid.show("Pedido enviado", ToastAndroid.SHORT);
  }
  /** esta funcion crea y retorna un String[] con valores según el o los checkbox que el
      usuario haya seleccionado */
  const cargarPedido = () =>{
    if(completoChecked){
      productos.push("completo")
    }
    if(hamburguesaChecked){
      productos.push("hamburguesa")
    }
    if(jugoChecked){
      productos.push("jugo")
    }
    if(bebidaChecked){
      productos.push("bebida")
    }
  }

  // esta funcion guarda, en localStorage, el nuevo pedido generado
  const cargandoAsyncStorage = async () => {
    try {
      const key = uuid.v4()
      cargarPedido()
      const jsonValue = JSON.stringify({key, nombre, rut, edad, telefono, productos, date, selectedEntrega})
      await AsyncStorage.setItem(key, jsonValue)  
      }catch (e) {
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
    setDate(new Date())
    setProductos([])
  }

  const enviarPedido = async () => {
    if(nombre == '' || rut == '' || edad == '' || telefono == '' ){
      Alert.alert("Debe ingresar todos sus datos antes de solicitar su pedido.")
    }else{
      if(completoChecked == false && hamburguesaChecked == false && jugoChecked == false && bebidaChecked == false){
        Alert.alert("Debe elegir a lo menos un producto antes de solicitar su pedido.")  
      }else{
        const userConexionType = await obtenerTipoConexion()
        if(userConexionType.tipoConexion == "wifi"){
          cargandoAsyncStorage()
          limpiandoModalTextInputs();
          setModalVisible(!modalVisible);
          // esta es una funcion que la obtenemos desde la props recibida.
          onClose()
          showToast()
          return
        }
        if(userConexionType.tipoConexion == "cellular"){
          if(userConexionType.connectionDetails == "4g"){
            cargandoAsyncStorage()
            limpiandoModalTextInputs();
            setModalVisible(!modalVisible);
            showToast()
            // esta es una funcion que la obtenemos desde la props recibida.
            onClose()
            return
          }else{
            return Alert.alert("Tu conexion de celular debe ser wifi o 4g para poder enviar un pedido")
          }      
        }
        return Alert.alert("Debes tener conexion a internet para poder enviar un pedido")
      }
    }
  }


  const showMode = (currentMode) => {
    setShow(true)
    setMode(currentMode)
  }

  const showDatepicker = () => {
    showMode('date')
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
            <View style={{flexDirection: 'row'}}>
              <View style={{marginEnd:8}}>
                <CustomCheckBox label="completo"    productoChecked={completoChecked}    setProductoChecked={setCompletoChecked}/>
                <CustomCheckBox label="hamburguesa" productoChecked={hamburguesaChecked} setProductoChecked={setHamburguesaChecked}/>
              </View>
              <View>
                <CustomCheckBox label="jugo"        productoChecked={jugoChecked}        setProductoChecked={setJugoChecked}/>
                <CustomCheckBox label="bebida"      productoChecked={bebidaChecked}      setProductoChecked={setBebidaChecked}/>
              </View>
            </View>
              <CustomDatePicker date={date} mode={mode} show={show} setShow={setShow} setMode={setMode}/>
              <CustomPicker selectedEntrega={selectedEntrega} setSelectedEntrega={setSelectedEntrega}/>
              <BotonesEnviarPedidoYVolver enviarPedido={enviarPedido} modalVisible={modalVisible} setModalVisible={setModalVisible}/>
          </View> 
        </View>

      </Modal>
      <Pressable style={[styles.button, styles.buttonOpen]} onPress={() => setModalVisible(true)}>
        <Text style={styles.textStyle} >Ingresar Pedido</Text>
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
    backgroundColor: 'red',
    width: 150,
    height: 40,
    marginTop: 16
  },
  buttonClose: {
    marginTop: 8,
    backgroundColor: '#2196F3',
    marginStart: 25
  },
  textStyle: {
    color: 'white',
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
  },
  Picker:{
    borderWidth: 1,
    borderRadius: 10,

  }
});

export default ModalPlanilla;

