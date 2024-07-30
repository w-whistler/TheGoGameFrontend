import React from 'react';
import { ITodoItem } from '@models';
import { PropsWithChildren } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import Icons from '@expo/vector-icons/FontAwesome';
import { useAppDispatch } from '@store/store';
import { deleteTodo, updateTodo } from '@store/slices/todoItems';
import { TodoStatus } from '@enums/Todo';
import Toast from 'react-native-toast-message';

type TodoItemProps = PropsWithChildren & {
  item: ITodoItem;
};

export const TodoItem = ({ item }: TodoItemProps) => {
  const dispatch = useAppDispatch();

  const onDelete = () => {
    dispatch(deleteTodo(item._id)).then(() => {
      Toast.show({
        type: 'success',
        text1: `Successfully deleted ${item.title}`,
      });
    });
  };

  const onToggleStatus = () => {
    const newStatus =
      item.status === TodoStatus.TODO ? TodoStatus.COMPLETED : TodoStatus.TODO;

    dispatch(updateTodo(item._id, { status: newStatus })).then(() => {
      Toast.show({
        type: 'success',
        text1: `Successfully updated status of ${item.title}`,
      });
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.info}>
        <Text style={styles.titleText}>{item.title}</Text>
        <Text style={styles.descriptionText} numberOfLines={3}>
          {item.description}
        </Text>
      </View>
      <View style={styles.actionContainer}>
        <BouncyCheckbox
          isChecked={item.status === TodoStatus.COMPLETED}
          fillColor="#003689"
          onPress={onToggleStatus}
          style={styles.checkbox}
        />
        <Pressable onPress={onDelete}>
          <Icons size={16} name="close" color="#EE0000" />
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
  },
  info: {
    flex: 1,
    height: '100%',
    overflow: 'hidden',
  },
  titleText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 4,
  },
  descriptionText: {
    fontSize: 14,
    color: '#333333',
  },
  actionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 24,
    height: 24,
    marginEnd: 12,
  },
});
