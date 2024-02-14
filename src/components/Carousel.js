import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SliderBox } from "react-native-image-slider-box";

const Carousel = () => {
    const images =[
        'https://img.freepik.com/free-vector/laundry-room-equipment-wash-dry-clothes-cartoon-set-washing-machine-basket-detergent-bottles-powder-rope-with-hanging-underwear-shirts-isolated-white-wall_107791-5924.jpg',
        'https://media.istockphoto.com/id/82567372/photo/one-coloured-one-white-pile-of-washing.jpg?s=612x612&w=0&k=20&c=5AyI92AJq3T2UtXc2uB3QbsdPmPn6VcuL3jKvtdGido='
    ]
  return (
    <SliderBox
    
    images={images}
    dotColor="#FFEE58"
    inactiveDotColor="#90A4AE"
    autoplay
    ImageComponentStyle={{borderRadius: 15, width: '92%', marginTop: 5}}
    // circleLoop
    
  />
  )
}

export default Carousel

const styles = StyleSheet.create({})