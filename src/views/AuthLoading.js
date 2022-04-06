import React, {useEffect } from "react";
import { View, } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Types from "../redux/types";
import { connect, useSelector } from "react-redux"

/** Este componente es el primero que se ejecuta al iniciar la app y lo que hace
 *  es checkear si hay algun usuario con sesión iniciada (cada vez que se inicia sesión,
 *  se guarda el usuario en localStorage con key 'user'.). Si el usuario existe,
 *  se navega a Home.js, si no existe, se navega a Login.js
**/
const AuthLoading = ({addPedido, navigation}) =>{
  

  const getUser = async () => {
    try {
      const user = await AsyncStorage.getItem('user')
      if(user) {
        navigation.replace('Home')
      }else{
        navigation.replace('Login')
      }
    } catch(e) {
    }
  }

  const getPedidos = async () => {
    try{
      const asyncStorageAllKeys = await AsyncStorage.getAllKeys()
      const user = await AsyncStorage.getItem("user")
      for(let i = 0; i < asyncStorageAllKeys.length; i++){
          const pedido = await AsyncStorage.getItem(asyncStorageAllKeys[i])
          const pedidoJSON = JSON.parse(pedido)
          if(pedido != user){
            addPedido(pedidoJSON.key, pedidoJSON.nombre, 
                      pedidoJSON.rut, pedidoJSON.edad, 
                      pedidoJSON.telefono, pedidoJSON.productos, 
                      pedidoJSON.date, pedidoJSON.selectedEntrega)
          }
      }
    }catch(e){

    }
    
  }

  useEffect(() => {
    getPedidos()
    getUser()
  })

  return(
    <View style = {{backgroundColor: "#000000"}}/>
   )
}

const mapStateToProps = (state) =>{
  return state
} 

const mapDispatchToProps = dispatch =>({
  addPedido: (key, nombre, rut, edad, telefono, productos, date, selectedEntrega) =>
    dispatch({
      type: Types.ADD_PEDIDO,
      payload: {key,nombre,rut,edad,telefono,productos,date,selectedEntrega}
    }),
  obtenerPedidos: () => 
    dispatch({
      type: Types.OBTENER_PEDIDOS,
      payload: {}
    }),
})

const connectComponent = connect(mapStateToProps, mapDispatchToProps)

export default connectComponent(AuthLoading);


 

