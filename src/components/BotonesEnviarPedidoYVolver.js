import React from "react";
import {View, Pressable, Text, StyleSheet} from "react-native"

/** Este componente es utilizado desde el componente Planilla, ubicado en ModalPlanilla.js */
const BotonesEnviarPedidoYVolver = ({enviarPedido, modalVisible, setModalVisible}) => {
    return(
      <View style={{flexDirection: 'row'}}>
        <Pressable
          style={[styles.button, styles.buttonClose]}
          onPress={() => {enviarPedido()} }>
          <Text style={styles.textStyle}>Enviar Pedido</Text>
        </Pressable>
        <Pressable
          style={[styles.button, styles.buttonClose]}
          onPress={() => {setModalVisible(!modalVisible)} }>
          <Text style={styles.textStyle}>Volver</Text>
        </Pressable>       
      </View>  )
}

export default BotonesEnviarPedidoYVolver

const styles = StyleSheet.create({
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
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
})