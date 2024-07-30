import React from 'react';
import { Dimensions, StyleSheet, View, ViewProps } from 'react-native';
import { Edges, SafeAreaView } from 'react-native-safe-area-context';

const { height: screenHeight } = Dimensions.get('window');

type ContainerProps = React.PropsWithChildren &
  ViewProps & {
    safe?: boolean;
    edges?: Edges;
  };

export const Container = ({
  safe = false,
  edges,
  children,
  ...props
}: ContainerProps) => {
  if (safe) {
    return (
      <SafeAreaView
        {...props}
        style={[props.style, styles.container]}
        edges={edges}>
        {children}
      </SafeAreaView>
    );
  } else {
    return (
      <View {...props} style={[props.style, styles.container]}>
        {children}
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FAFAFA',
    height: screenHeight,
  },
});
