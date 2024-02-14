import { ActivityIndicator, Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { auth } from '../../../Firebase'
import { signOut } from 'firebase/auth'
import { useDispatch } from 'react-redux'
import { logoutUser } from '../../redux/reducer/authSlice'
import { LinearGradient } from 'expo-linear-gradient'
import CustomButton from '../../components/CustomButton'

const ProfileScreen = ({ navigation }) => {
    const dispatch = useDispatch()
    const userEmail = auth.currentUser?.email

    const [isLoader, setIsLoader] = useState(false)

    const alertForLogout = () => {
        Alert.alert('Alert', 'Are you Sure to Logout?', [
            {
                text: "No",
                onPress: () => console.log('ok')
            },
            {
                text: "Yes",
                onPress: () => logout()
            }
        ])
    }

    const logout = async () => {
        setIsLoader(true)
        try {
            await signOut(auth);
            setIsLoader(false)
            dispatch(logoutUser())
        } catch (error) {
            console.error(error);
            setIsLoader(false)
        }
    };

    return (
        <LinearGradient colors={['#2AAA8A', '#008000']} style={styles.mainContainer}>
            <TouchableOpacity>
                <Text>Welcome {userEmail}</Text>
            </TouchableOpacity>

            <CustomButton
                disabled={isLoader}
                onPress={alertForLogout}
                title='SignOut' />

            <CustomButton
                disabled={isLoader}
                onPress={()=>navigation.goBack()}
                title='Back' />

            {
                isLoader &&
                <View style={{ position: "absolute", flex: 1, backgroundColor: "#00000060", width: "100%", height: 900, alignItems: "center", justifyContent: "center" }}>
                    <ActivityIndicator size={'large'} />
                </View>
            }

        </LinearGradient>


    )
}

export default ProfileScreen

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        paddingTop: 40,
        alignItems: "center",
        justifyContent: "center"
    }
})