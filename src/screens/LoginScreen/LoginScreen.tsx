import { Container, Input, Button } from '@components';
import { Formik } from 'formik';
import * as Yup from 'yup';
import React from 'react';
import { ActivityIndicator, StyleSheet, Text } from 'react-native';
import { ILoginInput } from '@models';
import { useAppNavigation } from '@navigations/AppNavigations';
import { Routes } from '@navigations';
import { useAppDispatch, useAppSelector } from '@store/store';
import { authStatus, login } from '@store/slices/auth';
import { Status } from '@enums/Status';

const initialValues: ILoginInput = {
  email: '',
  password: '',
};

export const LoginScreen = () => {
  const navigation = useAppNavigation();
  const dispatch = useAppDispatch();
  const status = useAppSelector(authStatus);

  const onSubmit = (data: ILoginInput) => {
    dispatch(login(data))
      .then(() => {
        navigation.navigate(Routes.TodoList);
      })
      .catch(e => {
        console.log('Login error: ', e);
      });
  };

  return (
    <Container style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <Formik
        initialValues={initialValues}
        validationSchema={Yup.object({
          email: Yup.string().required('Required'),
          password: Yup.string().required('Required'),
        })}
        onSubmit={onSubmit}>
        {({ values, errors, handleChange, handleBlur, handleSubmit }) => (
          <>
            <Input
              placeholder="Enter Email"
              value={values.email}
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              error={errors.email}
            />
            <Input
              placeholder="Enter Password"
              value={values.password}
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              error={errors.password}
              secureTextEntry
            />
            <Button style={styles.loginButton} onPress={() => handleSubmit()}>
              {status === Status.LOADING && (
                <ActivityIndicator
                  color="#FFFFFF"
                  size="small"
                  style={styles.loginButtonLoader}
                />
              )}
              <Text style={styles.loginButtonText}>Login</Text>
            </Button>
          </>
        )}
      </Formik>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 12,
    gap: 16,
    display: 'flex',
    justifyContent: 'center',
  },
  title: {
    fontSize: 36,
    fontWeight: 500,
    textAlign: 'center',
    marginBottom: 48,
  },
  loginButton: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  loginButtonLoader: {
    marginEnd: 8,
  },
  loginButtonText: {
    color: '#FFFFFF',
    textAlign: 'center',
  },
});
