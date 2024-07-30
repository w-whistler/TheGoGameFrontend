import { Status } from '@enums/Status';
import { ITodoItem, ITodoItemFormValue } from '@models';
import { createSelector, createSlice } from '@reduxjs/toolkit';
import { AppDispatch, RootState } from '@store';
import { upsertToArray } from 'src/utils/array';
import * as TodoItemsService from '@services/todoItems';

interface TodoItemsState {
  status: Status;
  todoItems: ITodoItem[];
  error: string | null;
}

const initialState: TodoItemsState = {
  status: Status.INIT,
  todoItems: [],
  error: null,
};

export const todoItemsSlice = createSlice({
  name: 'todoItems',
  initialState,
  reducers: {
    itemsLoading: state => {
      state.status = Status.LOADING;
    },
    itemsLoaded: (state, action) => {
      state.status = Status.LOADED;
      state.todoItems = action.payload.data;
    },
    itemsError: (state, action) => {
      state.status = Status.ERROR;
      state.todoItems = [];
      state.error = action.payload;
    },
    itemAdd: (state, action) => {
      state.status = Status.LOADED;
      state.todoItems = [...state.todoItems, action.payload.data];
    },
    itemUpdate: (state, action) => {
      state.status = Status.LOADED;
      state.todoItems = upsertToArray(
        state.todoItems,
        action.payload.data,
        '_id',
      );
    },
    itemDelete: (state, action) => {
      state.status = Status.LOADED;
      state.todoItems = state.todoItems.filter(
        todoItem => todoItem._id !== action.payload.data._id,
      );
    },
  },
});

export const {
  itemsLoading,
  itemsLoaded,
  itemsError,
  itemAdd,
  itemUpdate,
  itemDelete,
} = todoItemsSlice.actions;

export const fetchTodoItems = () => async (dispatch: AppDispatch) => {
  dispatch(itemsLoading());

  try {
    const response = await TodoItemsService.fetchTodoItems();
    dispatch(itemsLoaded(response.data));
  } catch (error) {
    dispatch(itemsError('Something went wrong'));
  }
};

export const createTodoItem =
  (data: ITodoItemFormValue) => async (dispatch: AppDispatch) => {
    try {
      const response = await TodoItemsService.createTodoItem(data);
      dispatch(itemAdd(response.data));
    } catch (error) {
      dispatch(itemsError('Something went wrong'));
    }
  };

export const updateTodo =
  (id: string, data: Partial<ITodoItemFormValue>) =>
  async (dispatch: AppDispatch) => {
    try {
      const response = await TodoItemsService.updateTodoItem(id, data);
      dispatch(itemUpdate(response.data));
    } catch (error) {
      dispatch(itemsError('Something went wrong'));
    }
  };

export const deleteTodo = (id: string) => async (dispatch: AppDispatch) => {
  try {
    const response = await TodoItemsService.deleteTodoItem(id);
    dispatch(itemDelete(response.data));
  } catch (error) {
    dispatch(itemsError('Something went wrong'));
  }
};

export const todoItemsStatus = createSelector(
  (state: RootState) => state.todoItems,
  todoItems => todoItems.status,
);

export const todoItemList = createSelector(
  (state: RootState) => state.todoItems,
  todoItems => todoItems.todoItems,
);

export const todoItemsError = createSelector(
  (state: RootState) => state.todoItems,
  todoItems => todoItems.error,
);

export default todoItemsSlice.reducer;
