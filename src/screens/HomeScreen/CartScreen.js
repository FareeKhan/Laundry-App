import { ActivityIndicator, Modal, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { Ionicons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { FontSize } from '../../constants/fontSize';
import { Colors } from '../../constants/color';
import { cleanCart, decrementQuantity, incrementQuantity } from '../../redux/reducer/CartSlice';
import { decrementQty, incrementQty, removeQuantity } from '../../redux/reducer/ProductSlice';
import {  deleteField, doc, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../../Firebase';
const CartScreen = ({ navigation, route }) => {
    const dispatch = useDispatch()
    const { selectedDate, selectedTime, deliveryTime } = route.params
    const cart = useSelector((state) => state.cart.cart)
    const userId = useSelector((state) => state.auth.userId)
    const totalPrice = cart?.map((item) => item.quantity * item.price).reduce((curr, prev) => curr + prev, 0)
    const [isLoader, setIsLoader] = useState(false)

    const minus = (value) => {
        dispatch(decrementQuantity(value))
        dispatch(decrementQty(value))
    }

    const plus = (value) => {
        dispatch(incrementQuantity(value))
        dispatch(incrementQty(value))
    }

    const placeOrder = async () => {
        setIsLoader(true)
        try {

            await updateDoc(doc(db, 'users', `${userId}`), {
                orders: deleteField(),
            });
         

            await setDoc(doc(db, 'users', `${userId}`), {
                orders: { ...cart },
                pickUpDetails: route.params
            },
                {
                    merge: true
                }
            )
            setIsLoader(false)
            navigation.navigate('PlaceOrder')
            dispatch(cleanCart())
            dispatch(removeQuantity())

        } catch (error) {
            setIsLoader(false)
            console.log('--', error)
        }
    }

    return (
        <View style={styles.mainContainer}>
            {
                totalPrice == 0 ?
                    <View style={{ alignItems: "center", justifyContent: "center", flex: 1 }}>
                        <Text >Your Cart is Empty</Text>
                    </View>
                    :
                    <View style={{ paddingHorizontal: 15, flex: 1 }}>
                        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerBox}>
                            <Ionicons name="arrow-back" size={24} color="black" />
                            <Text>Your Bucket</Text>
                        </TouchableOpacity>

                        <View style={[styles.cartDataContainer, { marginTop: 20, }]}>
                            {
                                cart.map((item, index) => {
                                    return (
                                        <View key={item?.id} style={styles.cartDataBox}>
                                            <Text>{item?.title}</Text>
                                            <View style={styles.plusMinusBtnBox}>
                                                <TouchableOpacity onPress={() => minus(item)}>
                                                    <Text style={styles.minusStyle}> − </Text>
                                                </TouchableOpacity>

                                                <Text style={styles.btnValue}>{item.quantity}</Text>

                                                <TouchableOpacity onPress={() => plus(item)}>
                                                    <Text style={styles.plusStyle}> + </Text>
                                                </TouchableOpacity>
                                            </View>

                                            <Text>${item.quantity * item.price}</Text>
                                        </View>
                                    )
                                })
                            }
                        </View>

                        <Text style={styles.labelTxt}>Billing Details</Text>

                        <View style={[styles.cartDataContainer, { padding: 15 }]}>
                            <View style={styles.billingBox}>
                                <Text style={styles.leftLabel}>Item Total</Text>
                                <Text style={{ fontSize: FontSize.normal1 }}>${totalPrice}</Text>
                            </View>

                            <View style={styles.billingBox}>
                                <Text style={styles.leftLabel}>Delivery Fee | 1.2KM </Text>
                                <Text style={styles.rightTxt}>FREE</Text>
                            </View>
                            <Text style={styles.leftLabel}>Free Delivery on your order</Text>
                            <View style={styles.divider} />
                            <Text style={[styles.leftLabel, { marginBottom: 5 }]}>Selected Date</Text>

                            <View style={styles.billingBox}>
                                <Text style={styles.leftLabel}>No Of Days</Text>
                                <Text style={styles.rightTxt}>{deliveryTime}</Text>
                            </View>

                            <View style={styles.billingBox}>
                                <Text style={styles.leftLabel}>Selected Pickup Time </Text>
                                <Text style={styles.rightTxt}>{selectedTime}</Text>
                            </View>

                            <View style={styles.divider} />

                            <View style={styles.billingBox}>
                                <Text style={[styles.leftLabel, { color: "#000" }]}>TO PAY </Text>
                                <Text style={{ fontSize: FontSize.normal1, color: "#000", fontWeight: "600" }}>${totalPrice + 20}</Text>
                            </View>

                        </View>


                        <View style={styles.addToCartBox}>
                            <View style={styles.innerCartBox}>
                                <Text style={styles.cartBoxTxtItem}>{cart.length} Items</Text>
                                <TouchableOpacity onPress={placeOrder}>
                                    <Text style={styles.cartBoxTxtProceed}>Place Order</Text>
                                </TouchableOpacity>
                            </View>
                            <Text style={styles.cartBoxTxtExtra}>Extra Charges Might Apply</Text>
                        </View>

                    </View>



            }



            {
                isLoader &&
                <View style={{ flex: 1, position: "absolute", backgroundColor: "#00000060", width: "100%", height: 900, alignItems: "center", justifyContent: "center" }}>
                    <ActivityIndicator size={'large'} color={'red'} />
                </View>
            }


        </View>
    )
}

export default CartScreen

const styles = StyleSheet.create({
    mainContainer: {
        // flex: 1,
        // backgroundColor: "#fff",
        // paddingTop: 40

        flex: 1,
        paddingTop: 40,
        // justifyContent: "center"
    },
    headerBox: {
        flexDirection: "row",
        alignItems: "center"
    },
    cartDataBox: {
        flexDirection: "row",
        justifyContent: "space-between",

        height: 60, alignItems: "center",
        paddingHorizontal: 15,

    },
    cartDataContainer: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
        backgroundColor: "#fff",
        borderRadius: 10,

    },
    plusMinusBtnBox: {
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 0.5,
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 5
    },
    btnValue: {
        marginHorizontal: 10,
        fontWeight: "600",
        fontSize: FontSize.normal1
    },
    minusStyle: {
        fontSize: FontSize.normal1,
        fontWeight: "700",
        color: 'red'
    },
    plusStyle: {
        fontSize: FontSize.normal1,
        fontWeight: "700",
        color: Colors.green
    },
    labelTxt: {
        fontWeight: "500",
        paddingVertical: 10
    },
    billingBox: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 7

    },
    leftLabel: {
        fontWeight: "600",
        fontSize: FontSize.normal1,
        color: Colors.gray
    },
    divider: {
        width: '100%',
        height: 2,
        backgroundColor: Colors.lightGray,
        marginVertical: 5
    },
    rightTxt: {
        fontSize: FontSize.normal1,
        color: Colors.green,
        fontWeight: "600"
    },
    addToCartBox: {
        backgroundColor: Colors.green,
        margin: 15,
        padding: 15,
        borderRadius: 10,
        marginTop: "auto"
    },
    innerCartBox: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    cartBoxTxtItem: {
        color: "#fff",
        fontWeight: '600',
        fontSize: FontSize.normal1 - 1

    },
    cartBoxTxtProceed: {
        color: "#fff",
        fontWeight: '600',
        fontSize: FontSize.normal1 + 1
    },
    cartBoxTxtExtra: {
        color: "#fff",
        fontWeight: '300',
        fontSize: 12,
        marginTop: 5
    },

    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
        backgroundColor: "#00000010"
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    buttonOpen: {
        backgroundColor: '#F194FF',
    },
    buttonClose: {
        backgroundColor: '#2196F3',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
    loader: {
        backgroundColor: "#00000060",
        // top:'50%',
        // left:"1%",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 100

    }


})