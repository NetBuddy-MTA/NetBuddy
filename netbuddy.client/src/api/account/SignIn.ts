import {AxiosError} from 'axios';
import {agentNoCredentials as agent} from '../agent.ts';

export type LoginResponse = {
  email: string
  userName: string
}

export default async function (UserName: string, Password: string) {
  return await agent.post(
    '/account/login',
    JSON.stringify({UserName, Password}))
  .then(response => response?.data as void | LoginResponse)
  .catch((reason: AxiosError) => {
    if (reason.response!.status === 400) {
      alert("One of the fields doesn't match the requirements!");
    } else if (reason.response!.status === 401) {
      alert("At least one of the fields is incorrect!");
    }
  });
}