import React from "react";
import {Text, TextInput} from "react-native";

//como trabajar con los hooks de una screen desde un componente
const TextTextInput = (ingreseKey, tipo) =>{
    return(
        <View>
            <Text style={styles.modalTitle}>{"Ingrese "+ingreseKey}</Text>
            <TextInput style={styles.textInput} placeHolder= {"Ingrese "+ingreseKey} value={tipo} onChangeText={setXEnModalPlanilla} />    
        </View>
    )
}

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
