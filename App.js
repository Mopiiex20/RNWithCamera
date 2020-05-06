import React from 'react';
import { Provider } from 'react-redux';
import { store } from './src/redux/store';
import { Main } from './src/screens/index';
import { NavigationContainer } from '@react-navigation/native';

function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Main />
      </NavigationContainer>
    </Provider>
  );
}

export default App;