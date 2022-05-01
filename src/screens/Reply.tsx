import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { RootStackParamList } from '../navigator';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Colors,
  TextInput,
  Button,
  withTheme,
  IconButton,
} from 'react-native-paper';
import { getReplyFields, postReply } from '../api/api';
import { ReplyInputField } from '../api/scrapers/reply';
import AppHeader from '../components/AppHeader';
import { NativeSyntheticEvent } from 'react-native';
import { TextInputSelectionChangeEventData } from 'react-native';

type ReplyNavigationProp = StackNavigationProp<RootStackParamList, 'Reply'>;
type ReplyRouteProp = RouteProp<RootStackParamList, 'Reply'>;

type SelectionRange = {
  start: number;
  end: number;
};

type Props = {
  theme: ReactNativePaper.Theme;
  navigation: ReplyNavigationProp;
  route: ReplyRouteProp;
};

const applyTag = (
  tag: string,
  text: string,
  selection: SelectionRange | null,
) => {
  if (selection === null || selection.start >= selection.end) return text;

  const selectedText = text.substring(selection.start, selection.end);
  const editedText = `[${tag}]${selectedText}[/${tag}]`;
  return (
    text.substring(0, selection.start) +
    editedText +
    text.substring(selection.end, text.length)
  );
};

const applyBold = (text: string, selection: SelectionRange | null) =>
  applyTag('b', text, selection);
const applyItalic = (text: string, selection: SelectionRange | null) =>
  applyTag('i', text, selection);
const applyUnderline = (text: string, selection: SelectionRange | null) =>
  applyTag('u', text, selection);
const applyImage = (text: string, selection: SelectionRange | null) =>
  applyTag('img', text, selection);
const applyLink = (text: string, selection: SelectionRange | null) =>
  applyTag('url', text, selection);

const Reply: React.FC<Props> = ({ navigation, route, theme }) => {
  const [message, setMessage] = useState('');
  const [selected, setSelected] = useState<SelectionRange | null>(null);
  const [disabled, setDisabled] = useState(true);
  const [fields, setFields] = useState<ReplyInputField[]>([]);
  const { title } = route.params;

  const onSelectionChange = (
    event: NativeSyntheticEvent<TextInputSelectionChangeEventData>,
  ) => {
    const selection = event.nativeEvent.selection;
    setSelected({
      start: selection.start,
      end: selection.end,
    });
  };

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

    // add subject
    submitFields.push({
      name: 'subject',
      value: `Re: ${route.params.title}`,
      type: 'visible',
    });

    // add message
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
    <SafeAreaView style={styles(theme).container}>
      <AppHeader title="Απάντηση" subtitle={title} showBack={true} />

      <View style={styles(theme).formatActions}>
        <IconButton
          onPress={() => setMessage(applyBold(message, selected))}
          color={Colors.white}
          style={styles(theme).actionButton}
          icon="format-bold"
        />
        <IconButton
          onPress={() => setMessage(applyItalic(message, selected))}
          color={Colors.white}
          style={styles(theme).actionButton}
          icon="format-italic"
        />
        <IconButton
          onPress={() => setMessage(applyUnderline(message, selected))}
          color={Colors.white}
          style={styles(theme).actionButton}
          icon="format-underline"
        />
        <IconButton
          onPress={() => setMessage(applyImage(message, selected))}
          color={Colors.white}
          style={styles(theme).actionButton}
          icon="image-size-select-actual"
        />
        <IconButton
          onPress={() => setMessage(applyLink(message, selected))}
          color={Colors.white}
          style={styles(theme).actionButton}
          icon="link"
        />
      </View>

      <TextInput
        label="Μήνυμα"
        mode="outlined"
        multiline={true}
        placeholder="Πληκτρολογήστε κάτι..."
        value={message}
        onChangeText={(msg) => setMessage(msg)}
        onSelectionChange={onSelectionChange}
        numberOfLines={40}
        style={styles(theme).textInput}></TextInput>

      <Button
        disabled={disabled}
        mode="contained"
        style={{
          margin: 8,
        }}
        onPress={onSubmit}>
        ΔΗΜΟΣΙΕΥΣΗ
      </Button>
    </SafeAreaView>
  );
};

const styles = (theme: ReactNativePaper.Theme) =>
  StyleSheet.create({
    container: {
      flexDirection: 'column',
      backgroundColor: theme.dark ? Colors.black : Colors.white,
      // height: Dimensions.get('window').height,
      flex: 1,
    },
    formatActions: {
      flexDirection: 'row',
      justifyContent: 'center',
      margin: 8,
    },
    textInput: {
      marginHorizontal: 8,
      flex: 1,
    },
    actionButton: {
      backgroundColor: theme.colors.primary,
      elevation: 2,
    },
  });

export default withTheme(Reply);
