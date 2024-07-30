import { AuthLayout, Button, Divider, TodoItem } from '@components';
import { CreateTodoModal } from '@components/CreateTodoModal';
import { Status } from '@enums/Status';
import {
  fetchTodoItems,
  todoItemList,
  todoItemsStatus,
} from '@store/slices/todoItems';
import { useAppDispatch, useAppSelector } from '@store/store';
import React, { useEffect, useState } from 'react';
import { FlatList, RefreshControl, StyleSheet, Text, View } from 'react-native';

export const TodoListScreen = () => {
  const dispatch = useAppDispatch();
  const status = useAppSelector(todoItemsStatus);
  const todoItems = useAppSelector(todoItemList);
  const [createModalVisible, setCreateModalVisible] = useState(false);

  useEffect(() => {
    dispatch(fetchTodoItems());
  }, [dispatch]);

  const onRefresh = () => {
    dispatch(fetchTodoItems());
  };

  return (
    <AuthLayout>
      <View style={styles.container}>
        <Button
          style={styles.createButton}
          onPress={() => setCreateModalVisible(true)}>
          Create
        </Button>
        <FlatList
          data={todoItems}
          keyExtractor={item => item._id}
          renderItem={({ item }) => <TodoItem item={item} />}
          ListEmptyComponent={<Text>No Todo Items</Text>}
          contentContainerStyle={styles.listInner}
          style={styles.list}
          ItemSeparatorComponent={Divider}
          refreshControl={
            <RefreshControl
              onRefresh={onRefresh}
              refreshing={status === Status.LOADING}
            />
          }
        />
      </View>
      <CreateTodoModal
        visible={createModalVisible}
        onClose={() => setCreateModalVisible(false)}
      />
    </AuthLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    flexGrow: 1,
  },
  listInner: {
    padding: 8,
  },
  createButton: {
    marginBottom: 12,
  },
});
