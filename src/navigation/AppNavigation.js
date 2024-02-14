import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import SplashScreen from './SplashScreen'
import { useSelector } from 'react-redux'
import { AuthNavigation, UserProfile } from './StackNavigation'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack';



const AppNavigation = () => {
    const Stack = createStackNavigator()
    const isAuth = useSelector((state) => state.auth.token)
    const didLogin = useSelector((state) => state.auth.tryAutoLogin)
    return (
        <>
            {!isAuth && !didLogin ?
                <SplashScreen />
                :
                <NavigationContainer>
                    <Stack.Navigator>
                        {
                            !isAuth &&
                            <Stack.Screen name='AuthNavigation' component={AuthNavigation} options={{headerShown:false}} />
                        }
                        {
                            isAuth &&
                            <Stack.Screen name='UserProfile' component={UserProfile}  options={{headerShown:false}} />
                        }
                    </Stack.Navigator>
                </NavigationContainer>


            }

        </>
    )
}

export default AppNavigation

const styles = StyleSheet.create({})