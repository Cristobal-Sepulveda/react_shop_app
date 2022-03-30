import React from "react";
import {View,Text, TextInput, StyleSheet} from "react-native";

//como trabajar con los hooks de una screen desde un componente
const customTextImput = ({word, hook, keyboardType, setHook}) =>{
    return(
        <View>
            <Text style={styles.modalTitle}>{"Ingrese "+word}</Text>
            <TextInput style={styles.textInput} value={hook} keyboardType={keyboardType} onChangeText={setHook} />    
        </View>
    )
}

export default customTextImput

const styles = StyleSheet.create({
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
      }
})
