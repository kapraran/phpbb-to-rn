import React, { useState } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { Title, TextInput, Button, Snackbar } from 'react-native-paper';
import { login } from '../api/api';
import { useNavigation } from '@react-navigation/native';

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

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [visible, setVisible] = useState(false);

  const navigation = useNavigation();

  const onSubmit = () => {
    login(username, password).then((logged) => {
      if (logged) return navigation.navigate('Home');

      setVisible(true);
    });
  };

  const onDismiss = () => setVisible(false);

  return (
    <SafeAreaView style={styles.container}>
      <Title style={styles.pageTitle}>Login</Title>

      {/* username */}
      <TextInput
        mode="outlined"
        label="Username"
        value={username}
        onChangeText={(username) => setUsername(username)}
        style={styles.username}
      />

      {/* password */}
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

      {/* Error message */}
      <Snackbar visible={visible} onDismiss={onDismiss}>
        Λανθασμένα στοιχεία σύνδεσης. Δοκιμάστε ξανά.
      </Snackbar>
    </SafeAreaView>
  );
};

export default Login;
