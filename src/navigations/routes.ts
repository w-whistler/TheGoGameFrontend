export enum Routes {
  Login = 'Login',
  Authenticated = 'Authenticated',
  TodoList = 'TodoList',
}

export type AppNavigationParamList = {
  [Routes.Login]: undefined;
  [Routes.Authenticated]: undefined;
  [Routes.TodoList]: undefined;
};
