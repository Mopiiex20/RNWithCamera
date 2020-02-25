/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import { Provider } from 'react-redux';
// Imports: Redux Store
import { store } from './src/redux/store';
import { Main } from './src/screens/index';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text } from 'react-native';
const Stack = createStackNavigator();



// React Native App
function App() {
  return (
    // Redux: Global Store
    <Provider store={store}>
      <NavigationContainer>
        <Main />
      </NavigationContainer>
    </Provider>
  );
}

export default App;