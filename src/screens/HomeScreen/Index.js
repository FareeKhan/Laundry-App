import { StyleSheet, Text, View, Alert, SafeAreaView, Image, Pressable, ScrollView, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import * as location from 'expo-location'

import { Colors } from '../../constants/color';
import { FontSize } from '../../constants/fontSize';
import CustomInput from '../../components/CustomInput';

import { Feather } from '@expo/vector-icons';
import Services from './Components/Services';
import OtherServices from './Components/OtherServices';

import {useSelector } from 'react-redux';
import { LinearGradient } from 'expo-linear-gradient';

const Index = ({ navigation }) => {
  const cart = useSelector((state) => state.cart.cart)
  const totalPrice = cart?.map((item) => item.quantity * item.price).reduce((curr, prev) => curr + prev, 0)
  
  const [displayCurrentAddress, setDisplayCurrentAddress] = useState('Village Ganderi Miana 23200')
  const [locationServicesEnabled, setLocationServicesEnabled] = useState(false)
  const [itemSearch, setItemSearch] = useState('')

  const profileImage = "https://lh3.googleusercontent.com/a/ACg8ocJukD9alv9p1YcbvifWVAhs50Pkl1ar4fBmY60w1w0o4Q=s192-c-rg-br100"

  useEffect(() => {
    checkIfLocationEnabled()
    getCurrentLocation()
  }, [displayCurrentAddress])

  const checkIfLocationEnabled = async () => {
    try {
      const enabled = await location.hasServicesEnabledAsync()
      if (!enabled) {
        Alert.alert('Location Service is not Enabled', 'Please Enabled the service Location', [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          { text: 'OK', onPress: () => console.log('OK Pressed') },
        ]);

      } else {
        setLocationServicesEnabled(enabled)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const getCurrentLocation = async () => {
    try {
      let { status } = await location?.requestForegroundPermissionsAsync()
      if (status != 'granted') {
        Alert.alert('Permission Denied', 'allow the app to use the location', [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          { text: 'OK', onPress: () => console.log('OK Pressed') },
        ]);
      }

      const { coords } = await location.getCurrentPositionAsync()

      if (coords) {
        const { latitude, longitude } = coords
        const response = await location.reverseGeocodeAsync({
          latitude,
          longitude
        })

        for (let item of response) {
          let address = `${item?.country} ${item?.region} ${item?.street}`
          setDisplayCurrentAddress(address)
        }

      }


      // console.log('-',status)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <View style={styles.mainContainer}>
        {/* Location and Profile */}
        <LinearGradient colors={['#2AAA8A', '#008000']} style={styles.headerLinearBox}>
 

          <View style={styles.headerBox}>
            {/* <Entypo name="location-pin" size={28} color={Colors.green} /> */}
            <View>
              <Text style={styles.addressTxt}>Welcome Back</Text>
              <Text style={styles.headerTitle}>{displayCurrentAddress}</Text>
            </View>
            <Pressable onPress={() => navigation.navigate('Profile')} style={styles.imgBox}>
              <Image style={styles.imgStyle} source={{ uri: profileImage }} />
            </Pressable>
          </View>

          {/* Search Bar */}
          <View style={styles.inputBox}>
            <CustomInput
              style={styles.inputStyle}
              placeholder='Search for Items or Stores'
              value={itemSearch}
              onChangeText={setItemSearch}
              placeholderTextColor={Colors.lightWhite}
            />
            <Feather name="search" size={20} color={Colors.lightWhite} />
          </View>
        </LinearGradient>
        {/* Carousel Slider */}
        {/* <Carousel /> */}

        <View style={{ marginHorizontal: 15, flex: 1 }}>
          {/* Services */}
          <Services />

          {/* All Products */}

          <OtherServices />
        </View>

      </View>


      {
        totalPrice > 0 &&
        <View style={styles.addToCartBox}>
          <View style={styles.innerCartBox}>
            <Text style={styles.cartBoxTxtItem}>{cart.length} Items | ${totalPrice}</Text>
            <TouchableOpacity onPress={() => navigation.navigate('PickUp')} >
              <Text style={styles.cartBoxTxtProceed}>Proceed to PickUp</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.cartBoxTxtExtra}>Extra Charges Might Apply</Text>
        </View>
      }



    </>

  )
}

export default Index

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#f0f0f0",
  },
  headerLinearBox: {
    height: 280,
    paddingTop: 35,
    borderBottomRightRadius: 7,
    borderBottomLeftRadius: 7,
   paddingHorizontal: 15,

  },
  headerBox: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 10

  },
  headerTitle: {
    fontSize: FontSize.normal1,
    fontWeight: "600",
    width:"86%"
  },
  addressTxt: {
  },
  imgBox: {
    marginLeft: 'auto'

  },
  imgStyle: {
    width: 40,
    height: 40,
    borderRadius: 25,
  },
  inputBox: {
    borderWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 8,
    alignItems: "center",
    borderRadius: 7,
    borderColor: Colors.lightGray,
    marginVertical: 10,

  },
  inputStyle: {
    width: '90%'
  },
  addToCartBox: {
    backgroundColor: Colors.green,
    margin: 15,
    padding: 15,
    borderRadius: 10
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

