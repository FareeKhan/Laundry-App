import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import HomeIndex from '../screens/HomeScreen/Index'
import { NavigationContainer } from '@react-navigation/native';
import PickUp from '../screens/HomeScreen/PickUp';
import CartScreen from '../screens/HomeScreen/CartScreen';
import { LogBox } from 'react-native';
import LoginScreen from '../screens/AuthScreens/LoginScreen';
import RegisterScreen from '../screens/AuthScreens/RegisterScreen';
import ProfileScreen from '../screens/HomeScreen/ProfileScreen';
import PlaceOrder from '../screens/HomeScreen/PlaceOrder';

var Stack = createStackNavigator();
LogBox.ignoreAllLogs();
export const UserProfile = () => {
    return (
            <Stack.Navigator>
                <Stack.Screen name="Home" component={HomeIndex} options={{headerShown:false}} />
                <Stack.Screen name="PickUp" component={PickUp} options={{headerShown:false}}  />
                <Stack.Screen name="cartScreen" component={CartScreen} options={{headerShown:false}} />
                <Stack.Screen name="Profile" component={ProfileScreen} options={{headerShown:false}} />
                {/* <Stack.Screen name="LoginScreen" component={LoginScreen} options={{headerShown:false}}/> */}
                <Stack.Screen name="PlaceOrder" component={PlaceOrder} options={{headerShown:false}} />
            </Stack.Navigator>

    )
}

export const AuthNavigation = ()=>{
    return(
        <Stack.Navigator>
                <Stack.Screen name="LoginScreen" component={LoginScreen} options={{headerShown:false}}/>
                <Stack.Screen name="RegisterScreen" component={RegisterScreen} options={{headerShown:false}} />
        </Stack.Navigator>

    )
}

