import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthLoading from "./src/views/AuthLoading";
import Login from "./src/views/Login";
import Home from "./src/views/Home";
import {TouchableOpacity, Image, Alert, View} from "react-native";
import logout from "./assets/logout.png"
import goback from "./assets/goback.png"
import AsyncStorage from '@react-native-async-storage/async-storage';


const Stack = createNativeStackNavigator();

//Wipea toda la data en local que se genero al usar la app y luego navega al login
const cleanUserLogged = async (navigation) => {
    await AsyncStorage.setItem('user', "")
    navigation.replace("Login");
};

//metodo descencadenado al apretar el botton signout. Despliega una alerta con opción si o no. 
//Si se hace click en Si, se ejecuta la función clean
//Si se hace click en No, se baja la alerta y se continua en la app.
const signout = async (navigation) =>
  Alert.alert(
    "Alerta",
    "Al cerrar sesión se perderá todo el trabajo no sincronizado,\n¿Desea continuar?",
    [
      { text: "Si", onPress: () => cleanUserLogged(navigation) },
      { text: "No", style: "cancel" },
    ]
  );


//componente con botton logout
const LogOut = ({ navigation }) => (
  <TouchableOpacity
    style={{ alignItems: "center", marginRight: 20 }}
    onPress={() => signout(navigation)}
  >
    <Image source={logout} style={{ width: 40, height: 40 }} />
  </TouchableOpacity>
);

//metodo descencadenado, en situaciones particulares, al apretar el back button de la action back.
// Despliega una alerta con opción si o no. 
//Si se hace click en Si, se ejecuta la función cleanPost y esta descencadena el wipeo de data correspondiente y luego la navegación
//Si se hace click en No, se baja la alerta y se continua en la app.
const _goBack = async (navigation) => {
  Alert.alert(
    "Alerta",
    "Perderá todo la información de este registro.\n ¿Desea continuar?",
    [
      { text: "Si", onPress: () => cleanPost(navigation) },
      { text: "No", style: "cancel" },
    ]
  );
};

const Back = ({ navigation, variant = false, warning = false }) => (
  <TouchableOpacity
    style={{ alignItems: "center", marginLeft: 20 }}
    onPress={async () =>
      variant
        ? CONTRACT.contractSelected.co_tipo === "W"
          ? navigation.goBack()
          : navigation.navigate("Menu")
        : warning
        ? await _goBack(navigation)
        : navigation.goBack()
    }
  >
    <Image source={goback} style={{ width: 25, height: 25 }} />
  </TouchableOpacity>
);



const AppContainer = () => (
  <NavigationContainer>
    <Stack.Navigator
      screenOptions={({ navigation }) => ({
        gestureEnabled: false,
        headerTintColor: "#fff",
        headerStyle: {backgroundColor: "red",
                      height: 90,}
      })}>
      <Stack.Screen
        name="AuthLoading"
        component={AuthLoading}
        options={ {headerShown: true, title: "AuthLoading"}}/>
      <Stack.Screen
        name="Login"
        component={Login}
        options={{headerShown: false , title: "Login"}}
      />
      <Stack.Screen
        name="Home"
        component={Home}
        options={({navigation})=>({
                  headerTitle: "HomeScreen",
                  title: "HomeScreen",
                  headerRight: () => <LogOut navigation={navigation} />})}
      />
    </Stack.Navigator>
  </NavigationContainer>
);

export default AppContainer;
