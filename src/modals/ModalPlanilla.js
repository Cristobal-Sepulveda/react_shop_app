import React, { useState } from 'react';
import { Alert, Modal, StyleSheet, Text, ToastAndroid, Pressable, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';
import CustomTextImput from '../components/CustomTextImput';
import CustomCheckBox from '../components/CustomCheckBox';
import { obtenerTipoConexion } from '../utils/funciones';
import BotonesEnviarPedidoYVolver from '../components/BotonesEnviarPedidoYVolver';
import CustomPicker from '../components/CustonPicker';
import CustomDatePicker from '../components/CustomDatePicker';
import * as Types from "../redux/types";
import { connect } from "react-redux"


//Este modal se usa en la view Home.js. El modal despliega una planilla que el usuario debe de completar al momento de querer hacer un pedido.
const ModalPlanilla = ({addPedido}) => {
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
  const [selectedEntrega, setSelectedEntrega] = useState("");

  //mensaje temporal desplegado al momento en el que el pedido es enviado(siempre que se cumplan las condiciones)
  const showToast = () => {
    ToastAndroid.show("Pedido enviado", ToastAndroid.SHORT);

  }
    /** Esta función añade productos al hook productos[], siempre y cuando el checkbox vinculado al producto este clickeado...
   *  Cada vez que el usuario clickee o desclickee un checkbox, el hook vinculado a este toma el valor true o false, respectivamente.
  */
  const cargarProductosElegidos = () =>{
    if(completoChecked){
      setProductos(productos.push("completo"))
    }
    if(hamburguesaChecked){
      setProductos(productos.push("hamburguesa"))
    }
    if(jugoChecked){
      setProductos(productos.push("jugo"))
    }
    if(bebidaChecked){
      setProductos(productos.push("bebida"))
    }
  }



  // esta funcion guarda, en localStorage, el nuevo pedido generado
  const cargandoAsyncStorageYStorage = async () => {
    try {
      const key = uuid.v4()
      cargarProductosElegidos()
      const jsonValue = JSON.stringify({key, nombre, rut, edad, telefono, productos, date, selectedEntrega})
      await AsyncStorage.setItem(key, jsonValue)
      addPedido(key, nombre, rut, edad, telefono, productos, date, selectedEntrega)
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



  // Esta funcion inicia funciones que guardan el pedido en localStorage, limpia el modal, vuelve el modal invisible, carga la lista de flatlist y manda un toast...
  const prepararYEnviarPedido = () =>{
    cargandoAsyncStorageYStorage()
    limpiandoModalTextInputs();
    setModalVisible(!modalVisible);
    showToast()
  }

  /**  Esta funcion primero checkea si el usuario puso sus datos personales, selecciono al menos un producto y si tiene o no wifi o 4g. Si este es el caso, el pedido se crea, sino,
       se entrega una alerta según el caso.
  */
  const enviarPedido = async () => {
    if(nombre == '' || rut == '' || edad == '' || telefono == '' ){
      Alert.alert("Debe ingresar todos sus datos antes de solicitar su pedido.")
    }else{
      if(completoChecked == false && hamburguesaChecked == false && jugoChecked == false && bebidaChecked == false){
        Alert.alert("Debe elegir a lo menos un producto antes de solicitar su pedido.")  
      }else{
        const userConexionType = await obtenerTipoConexion()
        if(userConexionType.tipoConexion == "wifi"){
          prepararYEnviarPedido()
          return
        }
        if(userConexionType.tipoConexion == "cellular"){
          if(userConexionType.connectionDetails == "4g"){
            prepararYEnviarPedido()
            return
          }else{
            return Alert.alert("Tu conexion de celular debe ser wifi o 4g para poder enviar un pedido")
          }      
        }
        return Alert.alert("Debes tener conexion a internet para poder enviar un pedido")
      }
    }
  }
 
  //
  return (
    <View style={styles.centeredView}>

      <Modal animationType="fade" 
             transparent={true} 
             visible={modalVisible} 
             onRequestClose={() => {Alert.alert('Modal has been closed.');
                                    setModalVisible(!modalVisible);
                            }}>
              {/* Esta parte no la converti a componente xq al hacerlo ocurrian problemas con el teclado(escribia un caracter y el teclado se cerraba)*/}
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
              {/* Esta parte no la converti a componente xq al hacerlo ocurrian problemas con el teclado(escribia un caracter y el teclado se cerraba)*/}
      </Modal>
      <Pressable style={[styles.button, styles.buttonOpen]} onPress={() => setModalVisible(true)}>
        <Text style={styles.textStyle} >Ingresar Pedido</Text>
      </Pressable>
    </View>
  );
};



const mapStateToProps = (state) =>{
  return state
} 
const mapDispatchToProps = dispatch =>({
  addPedido: (key, nombre, rut, edad, telefono, productos, date, selectedEntrega) =>
    dispatch({
      type: Types.ADD_PEDIDO,
      payload: {key,nombre,rut,edad,telefono,productos,date,selectedEntrega}
    }),
})


const connectComponent = connect(mapStateToProps, mapDispatchToProps)
export default connectComponent(ModalPlanilla);



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
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2,},
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



