import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Colors } from '../constants/color'
import { LinearGradient } from 'expo-linear-gradient';

const CustomButton = ({onPress,disabled,title}) => {
    if(disabled){
        var a = ['#00000050','#00000060', '#00000070']
    }else{
        var a =['#2AAA8A', '#008000']
    }
    return (
        <LinearGradient  colors={a} style={styles.btnContainer}>
            <TouchableOpacity disabled={disabled} onPress={onPress} >
                <Text style={styles.btnTxt}>{title}</Text>
            </TouchableOpacity>
        </LinearGradient>
    )
}

export default CustomButton

const styles = StyleSheet.create({
    btnContainer: {
        backgroundColor: Colors.green,
        width: '50%',
        justifyContent: "center",
        borderRadius: 50,
        marginTop: 40,
        backgroundColor: '#fff'
    },
    btnTxt: {
        textAlign: "center",
        padding: 10,
        color: '#fff',
        fontSize: 16,
        fontWeight: "700"
    }
})