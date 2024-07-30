import { Status } from '@enums/Status';
import { IUser, ILoginInput } from '@models';
import { createSelector, createSlice } from '@reduxjs/toolkit';
import { AppDispatch, RootState } from '@store/store';
import * as AuthService from '@services/auth';
import { deleteSecureStoreValue, saveSecureStoreValue } from '@utils/storage';

interface AuthState {
  status: Status;
  user: IUser | null;
  error: string | null;
}

const initialState: AuthState = {
  status: Status.INIT,
  user: null,
  error: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginLoading: state => {
      state.status = Status.LOADING;
    },
    loginLoaded: (state, action) => {
      state.status = Status.LOADED;
      state.user = action.payload.data.user;
    },
    loginError: (state, action) => {
      state.status = Status.ERROR;
      state.user = null;
      state.error = action.payload;
    },
    logout: state => {
      state.status = Status.INIT;
      state.user = null;
      state.error = null;
    },
  },
});

export const {
  loginLoading,
  loginLoaded,
  loginError,
  logout: logoutAction,
} = authSlice.actions;

export const login = (data: ILoginInput) => async (dispatch: AppDispatch) => {
  dispatch(loginLoading());

  try {
    const response = await AuthService.login(data);

    if (!response.data?.data?.token || !response.data?.data?.user) {
      throw new Error('Invalid token');
    }

    await saveSecureStoreValue('accessToken', response.data.data.token);
    dispatch(loginLoaded(response.data));
  } catch (error) {
    dispatch(loginError('Something went wrong'));
  }
};

export const logout = () => async (dispatch: AppDispatch) => {
  await deleteSecureStoreValue('accessToken');

  dispatch(logoutAction());
};

export const authStatus = createSelector(
  (state: RootState) => state.auth,
  auth => auth.status,
);

export const authUser = createSelector(
  (state: RootState) => state.auth,
  auth => auth.user,
);

export default authSlice.reducer;
