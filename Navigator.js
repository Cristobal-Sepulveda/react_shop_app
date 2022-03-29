import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthLoading from "./src/views/AuthLoading";
import Login from "./src/views/Login";
import Home from "./src/views/Home";


const Stack = createNativeStackNavigator();

const AppContainer = () => (
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen
        name="AuthLoading"
        component={AuthLoading}
        options={{ headerShown: true },{title: "AuthLoading"}}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: true },{title: "Login"}}
      />
      <Stack.Screen
        name="Home"
        component={Home}
        options={{headerShown: true},{title: "Home"}}
      />
    </Stack.Navigator>
  </NavigationContainer>
);

export default AppContainer;
