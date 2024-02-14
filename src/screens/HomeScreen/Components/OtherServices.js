import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { otherService } from '../../../constants/Data'
import { Colors } from '../../../constants/color'
import { FontSize } from '../../../constants/fontSize'
import { useDispatch, useSelector } from 'react-redux'
import { increment } from '../../../redux/reducer/increment'
import { decrementQty, getProducts, incrementQty } from '../../../redux/reducer/ProductSlice'
import { addToCart, decrementQuantity, incrementQuantity } from '../../../redux/reducer/CartSlice'

const OtherServices = () => {
    const dispatch = useDispatch()
    const products = useSelector((state) => state.product.product)
    const cart = useSelector((state) => state.cart.cart)

    useEffect(() => {
        if (products?.length > 0) return;
        const fetchProduct = () => {
            otherService?.map((item) => dispatch(getProducts(item)))
        }
        fetchProduct()
    }, [])

    return (
        <ScrollView style={styles.mainContainer} showsVerticalScrollIndicator={false} >
            {
                products?.map((item, index) => {
                  
                    const addItemToCart = () => {
                        dispatch(addToCart(item))
                        dispatch(incrementQty(item))
                    }
                    return (
                        <View key={index} style={styles.dataBox}>
                            <View style={styles.imgContainer}>
                                <Image borderRadius={10} source={{ uri: item?.image }} style={styles.imgStyle} />
                            </View>
                            <View style={{ marginLeft: 15 }}>
                                <Text style={{ marginTop: 10, fontWeight: "700" }}>{item?.title}</Text>
                                <Text style={{ marginTop: 5, fontWeight: "700", color: Colors.green }}>${item?.price}</Text>
                            </View>

                            {
                                cart?.some((c) => c.id == item.id) ? (
                                    <View style={{ flexDirection: "row", marginLeft: 'auto' }}>
                                        <Pressable style={styles.smallBtn} onPress={() => {
                                            dispatch(decrementQuantity(item))
                                            dispatch(decrementQty(item))
                                        }}>
                                            <Text style={{ color: "#fff" }}>-</Text>
                                        </Pressable>

                                        <Text style={{ marginHorizontal: 10 }}> {item?.quantity}</Text>

                                        <Pressable style={styles.smallBtn} onPress={() => {
                                            dispatch(incrementQuantity(item))
                                            dispatch(incrementQty(item))
                                        }}  >
                                            <Text style={{ color: "#fff" }}>+</Text>
                                        </Pressable>

                                    </View>
                                )
                                    :

                                    <View style={styles.disableBtnContainer}>
                                        <Pressable style={styles.smallMinusBtn} disabled>
                                            <Text style={{ color: "#fff" }}>-</Text>
                                        </Pressable>

                                        <Text style={{ marginHorizontal: 10 }}> {item?.quantity}</Text>

                                        <Pressable style={styles.smallBtn} onPress={addItemToCart} >
                                            <Text style={{ color: "#fff" }}>+</Text>
                                        </Pressable>

                                    </View>
                            }
                        </View>
                    )
                })
            }
        </ScrollView>
    )
}

export default OtherServices

const styles = StyleSheet.create({
    mainContainer: {
        marginTop: 25,
        flex: 1
    },
    dataBox: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 20,
        padding: 10,
        borderRadius: 10
    },
    imgContainer: {
        width: 65,
        height: 65,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: 'center',
        borderRadius: 10,

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.39,
        shadowRadius: 8.30,

        elevation: 13,
    },
    imgStyle: {
        width: 60,
        height: 60,
    },
    btnStyle: {
        borderWidth: 1,
        paddingHorizontal: 18,
        paddingVertical: 2,
        borderRadius: 5,
        borderColor: Colors.green,
        marginLeft: 'auto'
    },
    smallBtn: {
        width: 20,
        height: 20,
        backgroundColor: Colors.green,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 10
    },
    smallMinusBtn: {
        width: 20,
        height: 20,
        backgroundColor: Colors.lightGray,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 10
    },
    disableBtnContainer: {
        flexDirection: "row",
        marginLeft: 'auto'
    }
})