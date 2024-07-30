import { ITodoItemFormValue } from '@models';
import axios from '@utils/axios';

export const fetchTodoItems = async () => {
  return axios.get('/todo');
};

export const createTodoItem = async (data: ITodoItemFormValue) => {
  return axios.post('/todo', data);
};

export const updateTodoItem = async (
  id: string,
  data: Partial<ITodoItemFormValue>,
) => {
  return axios.put(`/todo/${id}`, data);
};

export const deleteTodoItem = async (id: string) => {
  return axios.delete(`/todo/${id}`);
};
