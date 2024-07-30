import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { AppNavigationParamList, Routes } from './routes';
import { LoginScreen, TodoListScreen } from '@screens';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

const AppNavigator = createStackNavigator<AppNavigationParamList>();

export const AppNavigation = () => {
  return (
    <AppNavigator.Navigator initialRouteName={Routes.Login}>
      <AppNavigator.Screen
        name={Routes.Login}
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <AppNavigator.Screen
        name={Routes.TodoList}
        component={TodoListScreen}
        options={{ headerShown: false }}
      />
    </AppNavigator.Navigator>
  );
};

export const useAppNavigation = () =>
  useNavigation<NativeStackNavigationProp<AppNavigationParamList>>();
export const useAppRoute = <T extends Routes>() =>
  useRoute<RouteProp<AppNavigationParamList, T>>();
