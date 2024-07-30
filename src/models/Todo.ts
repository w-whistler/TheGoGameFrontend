import { TodoStatus } from '@enums';

export type ITodoItem = {
  _id: string;
  title: string;
  description: string;
  status: TodoStatus;
};

export type ITodoItemFormValue = Pick<ITodoItem, 'title'> &
  Partial<Pick<ITodoItem, 'description' | 'status'>>;
