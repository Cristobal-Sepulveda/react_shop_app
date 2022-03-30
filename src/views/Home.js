import React, {useState, useEffect} from "react";
import { Alert, View, Text, FlatList, Button, TextInput, StyleSheet, SafeAreaView, StatusBar, Modal, Pressable, Div, h4} from "react-native";
import ModalPlanilla from "../modals/ModalPlanilla";
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from "@react-native-community/netinfo";


const Home = () =>{
  const[data, setData] = useState([])
  const[isRefreshing, setIsRefreshing] = useState(false)
  const[tipoConexion, setTipoConexion]= useState("")
  const[connectionDetails, setConnectionDetails] = useState("")
  //esta funcion es llamada desde el modal y refresca la FlatList
  
  const loadingData = async () =>{
    try{
      const aux = await AsyncStorage.getAllKeys()
      console.log(aux)
      for(let i = 0; i < aux.length-1; i++){
          const newItem = await AsyncStorage.getItem(aux[i])
          data.push(newItem)
        }
      setIsRefreshing(!isRefreshing)
      setIsRefreshing(!isRefreshing)
      }catch(e){
        Alert.alert("error cargando data en flatList")
    }
    console.log("dataCargada"+ data)
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
      setTipoConexion(state.type)
      setConnectionDetails(state.details.cellularGeneration)
      if(tipoConexion == "wifi"){
        Alert.alert("Pedidos sincronizados")
        setIsRefreshing(!isRefreshing)
        return true
      }
      if(tipoConexion == "cellular"){
        if(connectionDetails == "4g"){
          Alert.alert("Pedidos sincronizados")
          setIsRefreshing(!isRefreshing)
          return true
        }else{
          Alert.alert("Tu conexion de celular debe ser 4g para poder sincronizar los pedidos")
          setIsRefreshing(!isRefreshing)
          return false
        }      
      }
    })
  }

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
        marginTop: StatusBar.currentHeight || 0,
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
      marginTop:8,
      marginBottom: 8,
      marginHorizontal:24,
    },
    margenInferior:{
      marginBottom: 16
    },
  });
