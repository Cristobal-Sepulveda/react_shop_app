import React from 'react';
import {View, Button, Text, StyleSheet} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';



const CustomDatePicker = ({date, mode, show, setShow, setMode}) => {
    
    const onChange = (event, selectedDate) => {
        console.log("datetimerpicker")
        setShow(false)
        const currentDate = selectedDate
        setDate(currentDate)
    }
    
    const showMode = (currentMode) => {
        setShow(true)
        setMode(currentMode)
    }
    
    const showDatepicker = () => {
        showMode('date')
    }

    return(
        <View>
            <View style={{marginTop: 8}}>
                <Button onPress={showDatepicker} title="Fecha de entrega" />
            </View>
            {show && (
                <DateTimePicker
                testID="dateTimePicker"
                value={date}
                mode={mode}
                is24Hour={true}
                onChange={onChange}/>
            )}
        </View>
    )
}

export default CustomDatePicker

