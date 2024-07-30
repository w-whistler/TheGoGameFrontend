import { ILoginInput } from '@models/Login';
import axios from '@utils/axios';

export const login = async (data: ILoginInput): Promise<any> => {
  return axios.post('/auth/login', data);
};
