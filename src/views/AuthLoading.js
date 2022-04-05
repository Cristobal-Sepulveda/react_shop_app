import React, { useState, useEffect } from "react";
import { View, Button } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Types from "../redux/types";
import { connect } from "react-redux"

/** Este componente es el primero que se ejecuta al iniciar la app y lo que hace
 *  es checkear si hay algun usuario con sesión iniciada (cada vez que se inicia sesión,
 *  se guarda el usuario en localStorage con key 'user'.). Si el usuario existe,
 *  se navega a Home.js, si no existe, se navega a Login.js
**/
const AuthLoading = ({addPedido, obtenerPedidos, navigation}) =>{
  const [data, setData]= useState([""])
  
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
      console.log("getPedidos")
      const asyncStorageAllKeys = await AsyncStorage.getAllKeys()
      const user = await AsyncStorage.getItem("user")
      for(let i = 0; i < asyncStorageAllKeys.length; i++){
          const pedido = await AsyncStorage.getItem(asyncStorageAllKeys[i])
          console.log(pedido)
          if(pedido != user){
            //const existePedido = data.includes(item)
            if( existePedido == false){
            }
          }
      }
      console.log("data en store: ")
      console.log("-> ",state.obtenerPedidos)
    }catch(e){

    }
    
  }

  useEffect(() => {
    //getPedidos()
    // getUser()
  })

  return(
    <View style = {{backgroundColor: "#000000"}}>
      <Button title="asd" onPress={()=> {addPedido(3)}}/>
    </View>
   )
}

const mapStateToProps = (state) =>{
  console.log(state.pedidos.allPedidos)
  return state
} 

const mapDispatchToProps = dispatch =>({
  addPedido: number =>
    dispatch({
      type: Types.ADD_PEDIDO,
      payload: {number}
    }),
  obtenerPedidos: () => 
    dispatch({
      type: Types.OBTENER_PEDIDOS,
      payload: {}
    }),
})

const connectComponent = connect(mapStateToProps, mapDispatchToProps)

export default connectComponent(AuthLoading);


 

