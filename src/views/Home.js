import React, {useState, useEffect} from "react";
import { Alert, View, Text, FlatList, Button, TextInput, StyleSheet, SafeAreaView, StatusBar, Modal, Pressable, Div, h4} from "react-native";
import ModalPlanilla from "../modals/ModalPlanilla";
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from "@react-native-community/netinfo";


const Home = () =>{
  const[data, setData] = useState([])
  const[isRefreshing, setIsRefreshing] = useState(true)
  const[tipoConexion, setTipoConexion]= useState("")
  const[connectionDetails, setConnectionDetails] = useState("")
  //esta funcion es llamada desde el modal y refresca la FlatList
  
  const loadingData = async () =>{
    try{
      const aux = await AsyncStorage.getAllKeys()
      console.log("listado de keys",aux)
      for(let i = 0; i < aux.length-1; i++){
          const item = await AsyncStorage.getItem(aux[i])
          console.log("item en ciclo", item)
          const existePedido = data.includes(item)
          console.log("data.find",existePedido)
          if( existePedido == false){
            console.log("integrando pedido a la lista de items a desplegar")
            data.push(item)    
          }
      }
    }catch(e){
        Alert.alert("error cargando data en flatList")
    }
  }
 
  const Item = ({ title }) =>(
    <View style={styles.item}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
  
  const renderItem = ({ item }) =>{
    console.log("renderItem", item)
    return (<Item title={item} />);
  }


  const obtenerNetworkConnections = () => {
    NetInfo.fetch().then(state =>{
      setIsRefreshing(true)
      console.log("obtenerNetworkConnections.then")
      setTipoConexion(state.type)
      setConnectionDetails(state.details.cellularGeneration)
      //setIsRefreshing(true)
      console.log(tipoConexion)
      console.log(connectionDetails)
      if(tipoConexion == "wifi"){
        console.log("obtenerNetworkConnectionsWIFI")
        Alert.alert("Pedidos sincronizados")
        loadingData()
      }

      if(tipoConexion == "cellular"){
        console.log("obtenerNetworkConnectionsCELULAR")
        if(connectionDetails == "4g"){
          Alert.alert("Pedidos sincronizados")
          loadingData()
        }else{
          Alert.alert("Tu conexion de celular debe ser 4g para poder sincronizar los pedidos")
        }      
      }
      setIsRefreshing(false)
    })
    .finally(state =>{
      console.log("obtenerNetworkConnections.finally")
      loadingData()      
    })
    
  }

  
  useEffect(()=>{
    console.log("useEffect")
    if(data.length === 0){
      console.log("useEffect_LoadingData")
      loadingData()
    }
    setIsRefreshing(false)  
  })

  return (<SafeAreaView style={styles.container}>
            <Text style={styles.homeTitle}>Lista de Pedidos</Text>
            <FlatList
              data={data}
              renderItem={renderItem} 
              keyExtractor={item => item.id}
              numColumns={1}
              backgroundColor="grey"
              refreshing = {isRefreshing}
              onRefresh={obtenerNetworkConnections}
              ListEmptyComponent={( <View>
                                      <Text>
                                        no hay items para desplegar
                                      </Text>
                                    </View>
              )}
            />
            <View style={styles.buttonView}>
              <ModalPlanilla onClose={loadingData}/>
            </View>
  
            <View style={styles.margenInferior}/>       

          </SafeAreaView>
         )
};

export default Home;


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
    },
  });
