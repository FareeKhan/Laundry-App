import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'

const CustomInput = ({value,onChangeText,placeholder,...props}) => {
    return (
        <TextInput
            value={value}
            onChangeText={onChangeText}
            placeholder={placeholder}
            {...props}
            
        />
    )
}

export default CustomInput

const styles = StyleSheet.create({})