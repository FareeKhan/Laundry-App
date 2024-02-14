import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import HorizontalDatepicker from '@awrminkhodaei/react-native-horizontal-datepicker';
import { deliveryDays, timeData } from '../../constants/Data';
import { FontSize } from '../../constants/fontSize';
import { Colors } from '../../constants/color';
import { useSelector } from 'react-redux';

const PickUp = ({ navigation }) => {
    const cart = useSelector((state) => state.cart.cart)

    const [selectedDate, setSelectedDate] = useState(new Date())
    const [selectedTime, setSelectedTime] = useState('')
    const [deliveryTime, setDeliveryTime] = useState()
    const lastDayOfMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 1);
    const totalPrice = cart?.map((item) => item.quantity * item.price).reduce((curr, prev) => curr + prev, 0)

    const proceedToCart = () => {
        if (!selectedDate || !selectedTime || !deliveryTime) {
            alert('Please Select All Fields')
        } else {
            navigation.replace('cartScreen', {
                selectedDate: selectedDate,
                selectedTime: selectedTime,
                deliveryTime: deliveryTime
            })
        }
    }

    return (
        <View style={styles.mainContainer}>
            <Text style={styles.labelTxt}>Enter Address</Text>
            <TextInput
                placeholder='Start Typing...'
                style={styles.addressInput}
                multiline
            />

            <Text style={styles.labelTxt}>Pick Up Date</Text>
            <View>
                <HorizontalDatepicker
                    mode="gregorian"
                    startDate={new Date()}
                    endDate={lastDayOfMonth}
                    initialSelectedDate={selectedDate}
                    onSelectedDateChange={(date) => setSelectedDate(date)}
                    selectedItemWidth={170}
                    unselectedItemWidth={38}
                    itemHeight={38}
                    itemRadius={10}
                    selectedItemTextStyle={styles.selectedItemTextStyle}
                    unselectedItemTextStyle={styles.selectedItemTextStyle}
                    selectedItemBackgroundColor="#222831"
                    unselectedItemBackgroundColor="#ececec"
                    flatListContainerStyle={{ backgroundColor: "#fff" }}
                />
            </View>
            <Text style={styles.labelTxt}>Select Time</Text>
            <View>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {
                        timeData?.map((item, index) => {
                            return (
                                <TouchableOpacity key={index} onPress={() => setSelectedTime(item.time)} style={selectedTime == item.time ? styles.activeTimeBox : styles.timeBox}>
                                    <Text>{item?.time}</Text>
                                </TouchableOpacity>
                            )
                        })
                    }
                </ScrollView>
                <Text style={styles.labelTxt}>Delivery Date</Text>

                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {
                        deliveryDays?.map((item, index) => {
                            return (
                                <TouchableOpacity key={index} onPress={() => setDeliveryTime(item.deliveryTime)} style={deliveryTime == item.deliveryTime ? styles.activeTimeBox : styles.timeBox}>
                                    <Text>{item?.deliveryTime}</Text>
                                </TouchableOpacity>
                            )
                        })
                    }
                </ScrollView>

            </View>
            {
                totalPrice > 0 &&
                <View style={styles.addToCartBox}>
                    <View style={styles.innerCartBox}>
                        <Text style={styles.cartBoxTxtItem}>{cart.length} Items</Text>
                        <TouchableOpacity onPress={proceedToCart} >
                            <Text style={styles.cartBoxTxtProceed}>Proceed to Cart</Text>
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.cartBoxTxtExtra}>Extra Charges Might Apply</Text>
                </View>
            }
        </View>
    )
}

export default PickUp

const styles = StyleSheet.create({
    mainContainer: {
        paddingHorizontal: 15,
        backgroundColor: "#fff",
        flex: 1,
        paddingTop:40
    },
    labelTxt: {
        fontWeight: "500",
        paddingVertical: 10
    },
    addressInput: {
        borderWidth: 0.7,
        height: 120,
        borderRadius: 5,
        paddingLeft: 10
    },
    timeBox: {
        padding: 10,
        borderWidth: 0.7,
        marginRight: 15,
        borderRadius: 5
    },
    activeTimeBox: {
        padding: 10,
        borderWidth: 0.7,
        marginRight: 15,
        borderRadius: 5,
        borderColor: "red"
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
    }
})