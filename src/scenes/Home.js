import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Title } from 'react-native-paper';

const Home = ({ navigation }) => {
  return (<View style={styles.container}>
    <Title>Hello World!</Title>
    <Button onPress={() => navigation.navigate('Login')}>Go to Login</Button>
  </View>)
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
})

export default Home
