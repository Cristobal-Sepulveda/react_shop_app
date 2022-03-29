import React, { useState } from "react";
import { Alert, View, Text, Button, TextInput, StyleSheet } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';




const Login = ({navigation}) =>{
    const [user, setUser] = useState("");
    const [passwd, setPasswd] = useState("");
    
    const navigateToNextView = async() => {
        if(user == "" || passwd == ""){
            Alert.alert("Alerta", "Debe Completar ambos campos antes de intentar iniciar sesión",)
        }else{
            try {
                await AsyncStorage.setItem('user', user);
                navigation.replace('Home')
            } catch (error) {
                    
            }
        }
    }

    const cleanData = () => {
        setUser("")
        setPasswd("")
    };

    return (
        <View style = {styles.container}>
            <View style = {styles.loginCard}>
                <Text>Bienvenido</Text>
                <TextInput style = {styles.textInput} placeholder="Ingrese Usuario" value={user} onChangeText={setUser} />
                <TextInput style = {styles.textInput} secureTextEntry = {true} placeholder="Ingrese Clave" value={passwd} onChangeText={setPasswd}/>
                <View style = {styles.viewButtons} >
                    <Button title = "Iniciar sesión" onPress={() => navigateToNextView(navigation, user,passwd)}/>
                    <Button title = "Limpiar Campos" onPress={()=> cleanData()}/>                                          
                </View>
            </View>
        </View>
    )
};


export default Login;

const styles = StyleSheet.create({
    container:{
        backgroundColor: "#dddddd",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    textInput:{
        color: "#000",
        width: 250,
        height: 40,
        marginTop: 16,
        borderWidth: 1,
        borderRadius: 10,
        padding: 8
    },
    viewButtons:{
        flexDirection: "row",
        marginTop: 16
    }
})
