import React from 'react';
import { View, StyleSheet, Linking } from 'react-native';
import { Title, TextInput, Button, Paragraph } from 'react-native-paper';
import { login } from '../api/api';
import { useNavigation } from '@react-navigation/native';

const Login = () => {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const navigation = useNavigation();

  const onSubmit = () => {
    console.log(`u:${username} p:${password}`);
    login(username, password).then((logged) => {
      if (logged) {
        navigation.navigate('Home');
      }
    });
  };

  return (
    <View style={styles.container}>
      <Title style={styles.pageTitle}>Login</Title>

      <TextInput
        mode="outlined"
        label="Username"
        value={username}
        onChangeText={(username) => setUsername(username)}
        style={styles.username}
      />

      <TextInput
        mode="outlined"
        label="Password"
        value={password}
        onChangeText={(password) => setPassword(password)}
        secureTextEntry={true}
        style={styles.password}
      />

      <Button mode="contained" onPress={onSubmit}>
        Submit
      </Button>

      <Paragraph
        style={styles.createAccount}
        onPress={() => Linking.openURL('https://google.com')}>
        If you don't have an account, click here
      </Paragraph>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 32,
    paddingHorizontal: 16,
  },
  pageTitle: {
    marginBottom: 24,
  },
  username: {
    paddingBottom: 4,
  },
  password: {
    marginBottom: 24,
  },
  createAccount: {
    paddingHorizontal: 16,
    marginTop: 48,
    textDecorationLine: 'underline',
    textAlign: 'center',
  },
});

export default Login;
