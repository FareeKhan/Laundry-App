import { Image, StyleSheet, Text, View, Animated, LogBox } from 'react-native'
import React, { useRef, useEffect } from 'react'
import { Colors } from '../constants/color'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import { didTryAutoLogin, loginUser } from '../redux/reducer/authSlice';

LogBox.ignoreAllLogs();
const SplashScreen = () => {
  const dispatch = useDispatch()
  const slideAnim = useRef(new Animated.Value(-100)).current;

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: false, // Make sure to set this to false for positioning animations
    }).start();
  }, [slideAnim]);

  useEffect(() => {
    setTimeout(() => {
      const tryLogin = async () => {
        const userData = await AsyncStorage.getItem('userLogin')
        console.log(userData)
        if (!userData) {
          dispatch(didTryAutoLogin())
          return;
        }
        const transformData = JSON.parse(userData)
        const { token, userId } = transformData
        if (token) {
          dispatch(loginUser({
            token: token,
            userId: userId
          }))
        }
      }

      tryLogin()
    }, 3000)

  }, [])

  return (
    <View style={styles.mainContainer}>
      <Animated.View style={[{ marginLeft: slideAnim }]}>
        <Text style={styles.text}>Welcome To Our App</Text>
      </Animated.View>
      <Image source={require('../../assets/splashImg.jpeg')} fadeDuration={0.1} borderRadius={100} style={{ marginTop: 30 }} />
    </View>
  )
}

export default SplashScreen

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.green
  },

  text: {
    fontSize: 30,
    fontWeight: 'bold',
    color: "#fff"
  },
})

