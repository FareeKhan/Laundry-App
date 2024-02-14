import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import LottieView from 'lottie-react-native';
import CustomButton from '../../components/CustomButton';
import { LinearGradient } from 'expo-linear-gradient';
import { FontSize } from '../../constants/fontSize';

const PlaceOrder = ({navigation}) => {

  return (
    <LinearGradient colors={['#2AAA8A', '#008000']} style={styles.mainContainer}>

      <Text style={styles.orderPlaced}>Congratulations! Your order has been successfully placed.</Text>
      <LottieView
        autoPlay
        style={{
          width: 100,
          height: 100,
        }}
        source={require('../../../assets/sparkle.json')}
      />

      <CustomButton
          onPress={()=>navigation.navigate('Home')}
          title='go to home'
        />
   </LinearGradient>
  )
}

export default PlaceOrder

const styles = StyleSheet.create({
    mainContainer:{
        flex:1,
        alignItems:"center",
        justifyContent:"center"
    },
    orderPlaced:{
      width:"70%",
      fontSize:FontSize.normal3
    }
})