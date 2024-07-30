import React, { PropsWithChildren } from 'react';
import {
  Pressable,
  PressableProps,
  StyleSheet,
  Text,
  ViewStyle,
} from 'react-native';

type ButtonProps = PropsWithChildren &
  PressableProps & {
    style?: ViewStyle;
  };

export const Button = ({ children, ...props }: ButtonProps) => {
  return (
    <Pressable {...props} style={[styles.button, props.style]}>
      {typeof children === 'string' ? (
        <Text style={styles.buttonText}>{children}</Text>
      ) : (
        children
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#003689',
    padding: 12,
    borderRadius: 4,
  },
  buttonText: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontSize: 16,
  },
});
