import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthLoading = ({navigation}) =>{
  
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

  useEffect(() => { getData() },[])

  return <View style = {{backgroundColor: "#000000"}} />
}

export default AuthLoading;


 

