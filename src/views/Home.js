import React, {useState} from "react";
import { View, Text, FlatList, Button, TextInput, StyleSheet, SafeAreaView, StatusBar, Modal, Pressable, Div, h4} from "react-native";
import ModalPlanilla from "./modals/ModalPlanilla";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from "react-native-web";


const Home = () =>{
  const[data, setData] = useState([])
  const loadingData = async () =>{
    console.log("loadingData ejecutado")
    try{
      const aux = await AsyncStorage.getItem('homeItem')
      setData(aux)
      console.log(data)
    }catch(e){
      Alert.alert("error cargando data en flatList")
    }
  }
  
  const Item = ({ title }) => (
    <View style={styles.item}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
  
  const renderItem = ({ item }) => (<Item title={item.title} />);

  return (<SafeAreaView style={styles.container}>
            <Text style={styles.homeTitle}>Item List</Text>
            <FlatList
              data={data}
              renderItem={renderItem} 
              keyExtractor={item => item.id}
              numColumns={1}
              backgroundColor="grey"
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
