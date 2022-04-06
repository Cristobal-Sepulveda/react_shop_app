import React, {useState, useEffect} from "react";
import { Alert, View, Text, FlatList, Button, StyleSheet, SafeAreaView, ToastAndroid} from "react-native";
import ModalPlanilla from "../modals/ModalPlanilla";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { obtenerTipoConexion } from "../utils/funciones";
import { connect, useSelector } from "react-redux"


const Home = ({addPedido}) =>{
  const[isRefreshing, setIsRefreshing] = useState(true)


  const pedidosList = useSelector(state => {
    const auxArray = []
    for (let i = 0; i< state.pedidos.allPedidos.length; i++){
        auxArray.push(JSON.stringify(state.pedidos.allPedidos[i]))
    }
    return auxArray
  })
    
  //metodo que consulta el asyncstorage y agrega a la lista aquellos pedidos
  // que por abc motivo no se cargaron en el store
  const loadingData= async () =>{
    try{
      const asyncStorageAllKeys = await AsyncStorage.getAllKeys()
      const user = await AsyncStorage.getItem("user")
      for(let i = 0; i < asyncStorageAllKeys.length; i++){
          const pedido = await AsyncStorage.getItem(asyncStorageAllKeys[i])
          const pedidoJSON = JSON.parse(pedido)
          if(pedido != user){
            if(!state.pedidos.allPedidos.includes(pedido)){
              addPedido(pedidoJSON.key, pedidoJSON.nombre, 
                        pedidoJSON.rut, pedidoJSON.edad, 
                        pedidoJSON.telefono, pedidoJSON.productos, 
                        pedidoJSON.date, pedidoJSON.selectedEntrega)
            }
          }
      }
    }catch(e){
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
    setIsRefreshing(false)  
  })


  return (<SafeAreaView style={styles.container}>
            <Button title="asd" onPress={()=> console.log(props.friends)}/>
            {
              props.friends.possible.map((friend, index) => (
              <Button
                key={ friend }
                title={ `Add ${ friend }` }
                onPress={()=>
                  props.addFriend(index)
                }/>
              ))
            }
            {
              props.friends.current.map((friend, index) => (
              <Button
                key={ friend }
                title={ `remove ${ friend }` }
                onPress={()=>
                  props.removeFriend(index)
                }/>
              ))
            }
            <FlatList
              data={pedidosList}
              renderItem={renderItem} 
              keyExtractor={item => item.key}
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

