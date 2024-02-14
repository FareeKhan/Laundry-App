import { ActivityIndicator, Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import IconInput from '../../components/IconInput'
import { Fontisto } from '@expo/vector-icons';
import { FontSize } from '../../constants/fontSize';
import { Colors } from '../../constants/color';
const { height } = Dimensions.get('screen')
import { Ionicons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../../../Firebase';
import { doc, setDoc } from 'firebase/firestore';
import { LinearGradient } from 'expo-linear-gradient';
import CustomLoader from '../../components/CustomLoader';
import CustomButton from '../../components/CustomButton';

const RegisterScreen = ({ navigation }) => {
  const [email, setEmail] = useState()
  const [password, setPassword] = useState('')
  const [phone, setPhone] = useState('')
  const [isLoader, setIsLoader] = useState(false)


  const register = async () => {
    setIsLoader(true)
    try {
      const signUp = await createUserWithEmailAndPassword(auth, email, password)
      if (signUp?.user) {
        const userId = signUp?.user?.uid
        await setDoc(doc(db, "users", `${userId}`), {
          email: email,
          phone: phone
        })
        alert('User Registered Proceed to Login Screen.')
        setIsLoader(false)
        setEmail('')
        setPassword('')
        setPhone('')
      }
    } catch (error) {
      setIsLoader(false)
      console.log(error)
    }

  }

  return (
    <LinearGradient colors={['#2AAA8A', '#008000']} style={styles.mainContainer}>
      <Text style={{ fontSize: FontSize.normal1, color: Colors.green, fontWeight: "700", marginBottom: 5 }}>Sign Up</Text>
      <Text style={{ fontSize: FontSize.normal1, fontWeight: "700", marginBottom: 30 }}>Register your Account </Text>

      <IconInput
        Icon={<Fontisto name="email" size={24} color={Colors.green} />}
        placeholder='Please Enter Email'
        value={email}
        onChangeText={setEmail}
        style={{ marginBottom: 20 }}


      />

      <IconInput
        Icon={<Ionicons name="key-outline" size={24} color={Colors.green} />}
        placeholder='Enter Password'
        value={password}
        onChangeText={setPassword}
        style={{ marginBottom: 20 }}
      />

      <IconInput
        Icon={<Feather name="phone" size={24} color={Colors.green} />}
        placeholder='Enter Phone'
        value={phone}
        onChangeText={setPhone}
      />

      {isLoader ?
        <CustomLoader />
        :
        <CustomButton
          disabled={!email || !password}
          onPress={register}
          title='Register'
        />}


      <Text style={styles.noAccount}>Have an Account? <Text style={styles.register} onPress={() => navigation.navigate('LoginScreen')}> Login </Text></Text>

    </LinearGradient>

  )
}

export default RegisterScreen

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: "center",
    paddingTop: height / 4,
  },
  noAccount: {
    marginTop: 20,
  },
  register: {
    color: '#fff',
    fontWeight: "600"
  }
})




