import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { service } from '../../../constants/Data'
import { FontSize } from '../../../constants/fontSize'

const Services = () => {

    return (
        <View style={styles.mainContainer}>
            <Text style={styles.ServiceTxt}>Services are Available</Text>
            <View style={[styles.servicesBox, { marginBottom: 10 }]}>
                {
                    service?.slice(0, 2)?.map((item, index) => {
                        return (
                            <View key={index} style={styles.Container}>
                                <Image source={{ uri: item?.image }} style={styles.imgStyle} />
                                <Text style={styles.imgTitle}>{item?.title}</Text>
                            </View>
                        )
                    })
                }
            </View>

            <View style={styles.servicesBox}>
                {
                    service?.slice(2)?.map((item, index) => {
                        return (
                            <View key={index} style={styles.Container}>
                                <Image source={{ uri: item?.image }} style={styles.imgStyle} />
                                <Text style={styles.imgTitle}>{item?.title}</Text>
                            </View>
                        )
                    })
                }
            </View>

        </View>

    )
}

export default Services

const styles = StyleSheet.create({
    mainContainer: {
        marginTop: -120
    },
    ServiceTxt: {
        fontWeight: "600",
        fontSize: FontSize.normal1,
        marginBottom: 10,
    },
    Container: {
        backgroundColor: '#fff',
        marginRight: 15,
        borderRadius: 10,
        width: '48%',
        height: 120,
        justifyContent: "center"
    },
    servicesBox: {
        flexDirection: "row"
    },
    imgTitle: {
        textAlign: "center",
        marginTop: 5
    },
    imgStyle: {
        width: 90,
        height: 70,
        alignSelf: "center"
    }
})