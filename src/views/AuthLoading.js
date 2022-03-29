import React, { useState, useEffect } from "react";
import { Alert, View, Text, Button, TextInput, StyleSheet } from "react-native";
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

  return <View style = {styles.container} />
}

export default AuthLoading;

const styles = StyleSheet.create({
  container:{
    backgroundColor: '#000000'
  }
})

 

