import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import Icons from '@expo/vector-icons/FontAwesome';
import { useAppDispatch } from '@store/index';
import { logout } from '@store/slices/auth';
import { useAppNavigation } from '@navigations/AppNavigations';
import { Routes } from '@navigations/routes';

export const BottomBar = () => {
  const navigation = useAppNavigation();
  const dispatch = useAppDispatch();

  const onLogout = () => {
    dispatch(logout()).then(() => {
      navigation.navigate(Routes.Login);
    });
  };

  return (
    <View style={styles.container}>
      <Icons name="user-circle" size={32} color="#003689" />
      <Pressable onPress={onLogout}>
        <Icons name="sign-out" size={32} color="#EE0000" />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 50,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
});
