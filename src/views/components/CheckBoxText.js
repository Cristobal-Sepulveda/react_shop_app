import React from "react"
import {Text} from "react-native"
import { CheckBox } from "expo-checkbox"

//como trabajar con los hooks de una screen desde un componente
const CheckBoxText = (producto, productoChecked, setProductoChecked) => {
    return(
        <View style={styles.checkboxTextRow}>
            <CheckBox
                value={completoChecked}
                onValueChange={setCompletoChecked}
                color={completoChecked ? '#4630EB' : undefined}
            />
            <Text>{producto}</Text>
      </View>
    )
}

const styles = StyleSheet.create({
    checkboxTextRow:{
        flexDirection: 'row'
      }
})