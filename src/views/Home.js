import React, {useState, useEffect} from "react";
import { Alert, View, Text, FlatList, Button, StyleSheet, SafeAreaView, ToastAndroid} from "react-native";
import ModalPlanilla from "../modals/ModalPlanilla";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { obtenerTipoConexion } from "../utils/funciones";
import { connect, useSelector } from "react-redux"
import store from "../redux/store"


const Home = ({}) =>{
  const[isRefreshing, setIsRefreshing] = useState(true)
  const[data, setData] = useState([])


  const pedidosList = useSelector(state => {
    const auxArray = []
    for (let i = 0; i< state.pedidos.allPedidos.length; i++){
        auxArray.push(JSON.stringify(state.pedidos.allPedidos[i]))
    }
    console.log("useSelector: ", auxArray)
    return auxArray
  })

    
  //funcion iniciada al hacer sync en la flatList...
  const syncFlatList = async () => {
    console.log("syncFlatList")
    setIsRefreshing(false)
    const userConexionType = await obtenerTipoConexion()
    if(userConexionType.tipoConexion == "wifi"){
      return Alert.alert("lista sincronizada")
    }
    if(userConexionType.tipoConexion == "cellular"){
      if(userConexionType.connectionDetails == "4g"){
        return Alert.alert("lista sincronizada")
      }else{
        return Alert.alert("Tu conexion de celular debe ser 4g para poder sincronizar el listado")
      }      
    }
    return Alert.alert("Debes tener conexion a internet para poder sincronizar el listado")
  }
  
  const renderItem = ({ item }) =>{
      return (<View style={styles.item}>
                <Text style={styles.title}>{item}</Text>
              </View>)
  }

  useEffect(()=>{
    setIsRefreshing(false)
  },[])


  useEffect(()=>{
    if(pedidosList.length&& !data.includes(pedidosList[(pedidosList.length-1)])){
      if(data.length === 0 && pedidosList.length>0 && !data.includes(pedidosList[(pedidosList.length-1)])){
        for(let i = 0; i<pedidosList.length;i++){
          setData(prevData =>[...prevData, pedidosList[i]])      
        }
      }else{
        setData(prevData =>[...prevData, pedidosList[(pedidosList.length-1)]])    
      }
    }
  },[pedidosList])
  
  
  const print = () => {
    console.log(data)
  }

  return (<SafeAreaView style={styles.container}>
            <Button title="loadingData" onPress={() => print()}/>
            <FlatList
              data={data}
              renderItem={renderItem}
              keyExtractor={(item) => JSON.parse(item).key}
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
              <ModalPlanilla/>
            </View>
  
            <View style={styles.margenInferior}/>       

          </SafeAreaView>
         )
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

