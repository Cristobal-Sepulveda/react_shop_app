import React from "react"
import {View, Text, StyleSheet} from "react-native"
import { CheckBox } from "expo-checkbox"

//como trabajar con los hooks de una screen desde un componente
const CheckBoxText = ({word, productoChecked, setProductoChecked}) => {
    return(
        <View style={styles.checkboxTextRow}>
            <CheckBox
                value={productoChecked}
                onValueChange={setProductoChecked}
                color={productoChecked? '#4630EB' : undefined}
            />
            <Text>{word}</Text>
        </View>
    )
}

export default CheckBoxText;

const styles = StyleSheet.create({
    checkboxTextRow:{
        flexDirection: 'row'
      }
})