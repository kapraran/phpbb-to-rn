import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet } from 'react-native';
import { Modal, Menu, Portal } from 'react-native-paper';
import { TopicLinkData, TopicLinkParams } from '../api/scrapers/viewforum';

interface Props {
  visible: boolean;
  forumName: string;
  topicLinkData: TopicLinkData;
  onDismiss: () => void;
}

const styles = StyleSheet.create({
  modal: {
    backgroundColor: '#fff',
    margin: 32,
    borderRadius: 4,
  },
  menuItem: {
    maxWidth: 'auto',
  },
});

const TopicLinkModal = (props: Props) => {
  const { visible, forumName, topicLinkData, onDismiss } = props;
  const navigation = useNavigation();

  const goToTopic = (params: TopicLinkParams) => {
    // hide the modal
    onDismiss();

    // move to the topic
    navigation.navigate('ViewTopic', {
      title: topicLinkData.title,
      forumName,
      params,
    });
  };

  // navigate to the page of the topic that
  // contains the first unread post
  const goToLastUnread = () => {
    goToTopic(topicLinkData.params);
  };

  // navigate to the first page of the topic
  const goToFirstPage = () => {
    const params = {
      ...topicLinkData.params,
      start: 0,
    };

    goToTopic(params);
  };

  // navigate to the last page of the topic
  const goToLastPage = () => {
    const mult = (topicLinkData.replies / 25) | 0;
    const start = mult * 25;
    console.log(mult, start);

    const params = {
      ...topicLinkData.params,
      start,
    };

    goToTopic(params);
  };

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={onDismiss}
        contentContainerStyle={styles.modal}>
        <Menu.Item
          icon="comment-multiple"
          onPress={goToLastUnread}
          title="Last unread"
          style={styles.menuItem}
        />
        <Menu.Item
          icon="page-first"
          onPress={goToFirstPage}
          title="First page"
          style={styles.menuItem}
        />
        <Menu.Item
          icon="page-last"
          onPress={goToLastPage}
          title="Last page"
          style={styles.menuItem}
        />
      </Modal>
    </Portal>
  );
};

export default TopicLinkModal;
