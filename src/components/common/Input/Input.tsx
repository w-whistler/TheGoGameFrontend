import React from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
  ViewStyle,
} from 'react-native';

type InputProps = TextInputProps & {
  error?: string;
  wrapperStyle?: StyleProp<ViewStyle>;
};

export const Input = ({ error, wrapperStyle, ...props }: InputProps) => {
  return (
    <View style={[styles.wrapper, wrapperStyle]}>
      <TextInput {...props} style={[props.style, styles.input]} />
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    gap: 4,
  },
  input: {
    backgroundColor: '#FFFFFF',
    fontSize: 14,
    borderWidth: 1,
    borderColor: '#BBBBBB',
    padding: 12,
    borderRadius: 4,
  },
  errorText: {
    fontSize: 12,
    color: '#FF0000',
  },
});
