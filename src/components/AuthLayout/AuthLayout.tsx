import React, { PropsWithChildren } from 'react';
import { BottomBar } from '@components/BottomBar/BottomBar';
import { useAppNavigation } from '@navigations/AppNavigations';
import { Routes } from '@navigations/routes';
import { useAppSelector } from '@store/index';
import { authUser } from '@store/slices/auth';
import { StyleSheet, View } from 'react-native';
import { Container } from '@components';

type AuthLayoutProps = PropsWithChildren;

export const AuthLayout = ({ children }: AuthLayoutProps) => {
  const navigation = useAppNavigation();
  const user = useAppSelector(authUser);

  if (!user) {
    navigation.navigate(Routes.Login);

    return null;
  }

  return (
    <Container safe>
      <View style={styles.container}>{children}</View>
      <BottomBar />
    </Container>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 12, paddingTop: 12 },
});
