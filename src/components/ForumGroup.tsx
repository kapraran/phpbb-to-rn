import React from 'react';
import { List, Colors } from 'react-native-paper';
import { firstLetterUpper } from '../utils/utils';
import { GroupItem } from '../api/scrapers/home';
import { useNavigation } from '@react-navigation/native';

interface Props {
  item: GroupItem;
}

const ForumGroup = ({ item }: Props) => {
  const { name, forums } = item;
  const navigation = useNavigation();

  return (
    <List.Section>
      <List.Subheader>{firstLetterUpper(name)}</List.Subheader>
      {forums.map((forum, i) => (
        <List.Item
          key={forum.title + i}
          title={forum.title}
          description={forum.description}
          descriptionNumberOfLines={3}
          left={(props) => (
            <List.Icon
              {...props}
              icon="folder"
              color={forum.hasUnread ? Colors.green700 : Colors.grey400}
            />
          )}
          onPress={() =>
            navigation.navigate('ViewForum', {
              title: forum.title,
              groupName: firstLetterUpper(name),
              params: forum.linkParams,
            })
          }
        />
      ))}
    </List.Section>
  );
};

export default ForumGroup;
