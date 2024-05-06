import {AxiosError} from 'axios';
import {agentNoCredentials as agent} from '../agent.ts';

export default async function (UserName: string, Email: string, Password: string) {
  return await agent.post(
    '/account/register',
    JSON.stringify({UserName, Email, Password}))
  .catch((reason: AxiosError) => {
    if (reason.response!.status === 400) {
      alert("One of the fields doesn't match the requirements!");
    } else if (reason.response!.status === 500) {
      alert("User couldn't be created!");
    }
  });
}