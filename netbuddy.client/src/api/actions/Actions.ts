import {agentWithCredentials as agent} from "../agent.ts";

export type Variable = {
  Name: string,
  Description: string,
  Type: string,
  Optional: boolean
};

export type Action = {
  DisplayName: string,
  ActionString: string,
  Description: string,
  Category: string,
  Inputs: Variable[],
  Outputs: Variable[]
};

export default async function () {
  return await agent.get('api/execution/actions')
    .catch(error => console.log(error.error))
    .then(response => response?.data as Action[]);
}