import React from 'react'
import HomeScreen from './home/home';
import Auth from './login/auth-component'
import Icons from 'react-native-vector-icons/FontAwesome'
import { createStackNavigator } from '@react-navigation/stack';
import RNCameraComponent from '../components/camera/camera.component';

const Stack = createStackNavigator();

export function Main() {

    return (
        <Stack.Navigator >
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Camera" component={RNCameraComponent} />
        </Stack.Navigator>
    )
};