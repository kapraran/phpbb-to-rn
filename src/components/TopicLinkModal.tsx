import React from 'react';
import { StyleSheet } from 'react-native';
import { Modal, Menu, Portal } from 'react-native-paper';

interface Props {
  visible: boolean;
  onDismiss: () => void;
}

const TopicLinkModal = (props: Props) => {
  const { visible, onDismiss } = props;

  const goToLastUnread = () => {};
  const goToFirstPage = () => {};
  const goToLastPage = () => {};

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

export default TopicLinkModal;
