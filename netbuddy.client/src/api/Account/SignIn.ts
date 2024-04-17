import {agentNoCredentials as agent} from '../agent.ts';

export type LoginResponse = {
  email: string
  username: string
  token: string
}

export default async function(UserName: string, Password: string) {
  return await agent.post(
    '/account/login',
    JSON.stringify({UserName, Password}))
    .catch(error => console.log(error.error))
    .then(response => response?.data as void | LoginResponse);
}