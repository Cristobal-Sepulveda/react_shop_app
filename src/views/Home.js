import React, {useState, useEffect} from "react";
import { Alert, View, Text, FlatList, Button, StyleSheet, SafeAreaView, ToastAndroid} from "react-native";
import ModalPlanilla from "../modals/ModalPlanilla";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { obtenerTipoConexion } from "../utils/funciones";
import * as Types from "../redux/types";
import { connect } from "react-redux"

const Home = ({addPedido}) =>{
  const[data, setData] = useState([])
  const[isRefreshing, setIsRefreshing] = useState(true)


  //esta funcion es llamada desde el modal y refresca la FlatList
  const loadingData = async () =>{
    try{
      setIsRefreshing(true)
      const aux = await AsyncStorage.getAllKeys()
      const user = await AsyncStorage.getItem("user")
      for(let i = 0; i < aux.length; i++){
          const item = await AsyncStorage.getItem(aux[i])
          console.log("loadingData: Key en ciclo: ", JSON.parse(item))
          if(item != user){
            const existePedido = data.includes(item)
            if( existePedido == false){
              setData(data.concat(item))
            }
          }
      }
      setIsRefreshing(false)
    }catch(e){
        Alert.alert("error cargando data en flatList")
    }
  }

  //funcion iniciada al hacer sync en la flatList...
  const syncFlatList = async () => {
    const userConexionType = await obtenerTipoConexion()
    if(userConexionType.tipoConexion == "wifi"){
      loadingData()
      return Alert.alert("lista sincronizada")
    }
    if(userConexionType.tipoConexion == "cellular"){
      if(userConexionType.connectionDetails == "4g"){
        loadingData()
        return Alert.alert("lista sincronizada")
      }else{
        return Alert.alert("Tu conexion de celular debe ser 4g para poder sincronizar el listado")
      }      
    }
    return Alert.alert("Debes tener conexion a internet para poder sincronizar el listado")
  }
  
  //metodos utilizados por FlatList
  const Item = ({ title }) =>(
    <View style={styles.item}>
      <Text style={styles.title}>{(title)}</Text>
    </View>
  );

  const renderItem = ({ item }) =>{
    if(item != ""){
      return (<Item title={item} />);
    }
    return
  }

  useEffect(()=>{
    loadingData()
    setIsRefreshing(false)  
  })

  return (<SafeAreaView style={styles.container}>
            <FlatList
              data={data}
              renderItem={renderItem} 
              keyExtractor={item => item.id}
              numColumns={1}
              backgroundColor="grey"
              ListHeaderComponent={(
                <View>
                  <Text style={styles.homeTitle}>Lista de Pedidos</Text>
                </View>)}
              ListEmptyComponent={( 
                <View>
                  <Text>
                    no hay items para desplegar
                  </Text>
                </View>)}
              refreshing = {isRefreshing}
              onRefresh={syncFlatList}
            />
            <View style={styles.buttonView}>
              <ModalPlanilla onClose={loadingData}/>
            </View>
  
            <View style={styles.margenInferior}/>       

          </SafeAreaView>
         )
};


const mapStateToProps = (state) =>{
  console.log("\n\nmapStateToProps\n\n",state.pedidos.allPedidos,"\n\nmapStateToProps\n\n")
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

export default connectComponent(Home);

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    item: {
        backgroundColor: 'blue',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    homeTitle:{
      fontSize: 48,
      textAlign: 'center',
      color: 'white',
      backgroundColor:'black'
    },
    title: {
        fontSize: 32,
        color: 'white'
    },
    buttonView:{
      
    },
    margenInferior:{
      marginBottom: 36
    }
});

