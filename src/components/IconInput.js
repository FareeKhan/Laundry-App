import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import { Colors } from '../constants/color'

const IconInput = ({ Icon, placeholder, value, onChangeText, style, placeholderTextColor }) => {
    return (
        <View style={[styles.mainContainer, style]}>
            <View style={{ width: 40, height: 40, backgroundColor: "#fff", borderRadius: 50, alignItems: "center", justifyContent: "center" }}>
                {Icon}
            </View>
            <View style={styles.inputContainer}>
                <TextInput
                    placeholder={placeholder}
                    value={value}
                    onChangeText={onChangeText}
                    style={styles.inputStyle}
                    placeholderTextColor={Colors.lightWhite}
                />
            </View>
        </View>
    )
}

export default IconInput

const styles = StyleSheet.create({
    mainContainer: {
        flexDirection: "row",
        width: "80%",
        borderRadius: 50,
        height: 40,
        alignItems: "center",
        borderColor: "#cecece",
        borderWidth: 0.7,
    },
    inputContainer: {
        alignItems: "center",
        width: "80%"
    },
    inputStyle: {
        marginLeft: 15,
        fontSize: 15,
        color: Colors.lightWhite,
    },
})