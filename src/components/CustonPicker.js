import React from "react";
import {View, Text, StyleSheet} from "react-native"
import {Picker} from '@react-native-picker/picker';

const CustomPicker = ({selectedEntrega, setSelectedEntrega}) =>{
    return(
        <View>
            <Text style={{marginTop:16}}>Elija modo de entrega</Text>
            <View style={styles.Picker}>
                <Picker selectedValue={selectedEntrega}
                        onValueChange={(itemValue, itemIndex) =>
                        setSelectedEntrega(itemValue)}>
                    <Picker.Item label="Despacho" value="Despacho" />
                    <Picker.Item label="Retiro" value="Retiro" />
                </Picker>
            </View>
        </View>
    )
}

export default CustomPicker

const styles = StyleSheet.create({
    Picker:{
        borderWidth: 1,
        borderRadius: 10,
    
      }
})