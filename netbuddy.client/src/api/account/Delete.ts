import {agentNoCredentials as agent} from '../agent.ts';

export type DeleteResponse = {
  
}

export default async function(UserName: string, Password: string){
  return await agent.delete(
    '/account/delete',
    { data: JSON.stringify({UserName, Password}) })
    .catch(error => console.log(error.error))
    .then(response => response?.data as void | DeleteResponse);
}