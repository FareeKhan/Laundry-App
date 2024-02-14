import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Colors } from '../constants/color'
import { LinearGradient } from 'expo-linear-gradient';

const CustomLoader = ({ onPress }) => {
    return (
        <LinearGradient colors={['#2AAA8A', '#008000']} style={styles.btnContainer}>
            <ActivityIndicator color={'#fff'}/>
        </LinearGradient>
    )
}

export default CustomLoader

const styles = StyleSheet.create({
    btnContainer: {
        backgroundColor: Colors.green,
        width: '50%',
        justifyContent: "center",
        borderRadius: 50,
        marginTop: 40,
        backgroundColor: '#fff',
        padding: 10
    },
    btnTxt: {
        textAlign: "center",
        padding: 10,
        color: '#fff',
        fontWeight: "700"
    }
})