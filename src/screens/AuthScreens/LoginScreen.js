import { Button, Dimensions, Keyboard, KeyboardAvoidingView, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import IconInput from '../../components/IconInput'
import { Fontisto } from '@expo/vector-icons';
import { FontSize } from '../../constants/fontSize';
import { Colors } from '../../constants/color';
const { height } = Dimensions.get('screen')
import { Ionicons } from '@expo/vector-icons';
import { auth } from '../../../Firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../redux/reducer/authSlice';
import { LinearGradient } from 'expo-linear-gradient';
import CustomButton from '../../components/CustomButton';
import CustomLoader from '../../components/CustomLoader';

const LoginScreen = ({ navigation }) => {
  const dispatch = useDispatch()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoader, setIsLoader] = useState(false)

  const login = async () => {
    Keyboard.dismiss()
    setIsLoader(true)
    try {
      const signIn = await signInWithEmailAndPassword(auth, email, password)
      if (signIn) {
        setIsLoader(false)
        const token = signIn?._tokenResponse?.idToken
        const userId = signIn?.user?.uid
        dispatch(loginUser({
          token: token,
          userId: userId
        }))
      }
    } catch (error) {
      setIsLoader(false)
      alert(error)
    }

  }

  return (
    <TouchableWithoutFeedback onPress={()=>Keyboard.dismiss()}>
      <LinearGradient colors={['#2AAA8A', '#008000']} style={styles.mainContainer}>
        <Text style={{ fontSize: FontSize.normal3, color: '#fff', fontWeight: "700", marginBottom: 5 }}>Login</Text>
        <Text style={{ fontSize: FontSize.normal1, fontWeight: "700", marginBottom: 30 }}>Welcome to Laundry App</Text>

        <IconInput
          Icon={<Fontisto name="email" size={20} color={Colors.green} />}
          placeholder='Please Enter Email'
          value={email}
          onChangeText={setEmail}
          style={{ marginBottom: 20 }}
        />

        <IconInput
          Icon={<Ionicons name="key-outline" size={20} color={Colors.green} />}
          placeholder='Enter Password'
          value={password}
          onChangeText={setPassword}
        />

        {isLoader ?
          <CustomLoader />
          :
          <CustomButton
            disabled={!email || !password}
            onPress={login}
            title='Login'
          />}

        <Text style={styles.noAccount}>Didn't have an Account? <Text style={styles.register} onPress={() => navigation.navigate('RegisterScreen')}>Register Here</Text></Text>
      </LinearGradient>
    </TouchableWithoutFeedback>

  )
}

export default LoginScreen

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: "center",
    paddingTop: height / 4,
    backgroundColor: Colors.green
  },
  noAccount: {
    marginTop: 20,
  },
  register: {
    color: '#fff',
    fontWeight: "600"
  },


})