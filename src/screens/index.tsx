import React from 'react'
import HomeScreen from './home/home';
import { createStackNavigator } from '@react-navigation/stack';
import RNCameraComponent from '../components/camera/camera.component';
import Contacts from '../screens/contacts/contacts';


const Stack = createStackNavigator();

export function Main() {

    return (
        <Stack.Navigator >
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Camera" component={RNCameraComponent} />
            <Stack.Screen name="Contacts" component={Contacts} />
        </Stack.Navigator>
    )
};