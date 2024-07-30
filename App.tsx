import React from 'react';
import { AppNavigation } from '@navigations';
import { NavigationContainer } from '@react-navigation/native';
import { store } from '@store/store';
import { Provider } from 'react-redux';
import Toast from 'react-native-toast-message';

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <AppNavigation />
      </NavigationContainer>
      <Toast onPress={() => {}} />
    </Provider>
  );
}
