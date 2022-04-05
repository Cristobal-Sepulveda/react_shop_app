import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import types from "../redux/types";
/** Este componente es el primero que se ejecuta al iniciar la app y lo que hace
 *  es checkear si hay algun usuario con sesión iniciada (cada vez que se inicia sesión,
 *  se guarda el usuario en localStorage con key 'user'.). Si el usuario existe,
 *  se navega a Home.js, si no existe, se navega a Login.js
**/
const AuthLoading = ({navigation}) =>{
  
  
  // Initial state of the store
  const initialState = {
	  pedidos: [""],
  }

  const mapStateToProps = state => state;
  const mapDispatchToProps = dispatch => ({
    crear: pedido =>
      dispatch({
        type: types.CREAR,
        payload
      })
  })

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('user')
      if(value) {
        navigation.replace('Home')
      }else{
        navigation.replace('Login')
      }
    } catch(e) {
    }
  }

  useEffect(() => {
     getData()
  })

  return <View style = {{backgroundColor: "#000000"}} />
}

export default AuthLoading;


 

