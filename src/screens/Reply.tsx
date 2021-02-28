import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { RootStackParamList } from '../navigator';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import AppHeader from '../components/AppHeader';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TextInput, Button, withTheme } from 'react-native-paper';
import { getReplyFields, postReply } from '../api/api';
import { ReplyInputField } from '../api/scrapers/reply';
import { Colors } from 'react-native/Libraries/NewAppScreen';

type ReplyNavigationProp = StackNavigationProp<RootStackParamList, 'Reply'>;
type ReplyRouteProp = RouteProp<RootStackParamList, 'Reply'>;

type Props = {
  theme: ReactNativePaper.Theme;
  navigation: ReplyNavigationProp;
  route: ReplyRouteProp;
};

const Reply = ({ navigation, route, theme }: Props) => {
  const [message, setMessage] = useState('');
  const [disabled, setDisabled] = useState(true);
  const [fields, setFields] = useState<ReplyInputField[]>([]);
  const { title } = route.params;

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getReplyFields(route.params.params).then((data) => {
        setFields(data.reply.filteredFields);
        setDisabled(false);
      });
    });

    return unsubscribe;
  }, []);

  const onSubmit = () => {
    const submitFields = [...fields];

    submitFields.push({
      name: 'subject',
      value: `Re: ${route.params.title}`,
      type: 'visible',
    });

    submitFields.push({
      name: 'message',
      value: message,
      type: 'visible',
    });

    postReply(route.params.params, submitFields).then(() => {
      navigation.goBack();
    });
  };

  return (
    <SafeAreaView style={{
      backgroundColor: theme.dark ? Colors.black: Colors.white
    }}>
      <AppHeader title="Απάντηση" subtitle={title} showBack={true} />

      <TextInput
        label="Μήνυμα"
        mode="outlined"
        multiline={true}
        placeholder="Πληκτρολογήστε κάτι..."
        value={message}
        onChangeText={(msg) => setMessage(msg)}
        style={{
          marginHorizontal: 8,
          marginVertical: 16,
        }}></TextInput>

      <Button
        disabled={disabled}
        mode="contained"
        style={{
          marginHorizontal: 8,
        }}
        onPress={onSubmit}>
        ΔΗΜΟΣΙΕΥΣΗ
      </Button>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default withTheme(Reply);
