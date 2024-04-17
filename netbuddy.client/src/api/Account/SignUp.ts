import {agentNoCredentials as agent} from '../agent.ts';

export type SignupResponse = {
  email: string
  username: string
  token: string
}

export default async function(UserName: string, Email: string, Password: string){
  return await agent.post(
    '/account/register',
    JSON.stringify({UserName, Email, Password}))
    .catch(error => console.log(error.error))
    .then(response => response?.data as void | SignupResponse);
}