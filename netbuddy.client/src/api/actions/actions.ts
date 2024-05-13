import agent from "../agent.ts";

export type Variable = {
  name: string,
  description: string,
  type: string,
  optional: boolean
};

export type Action = {
  displayName: string,
  actionString: string,
  description: string,
  category: string,
  inputs: Variable[],
  outputs: Variable[]
};

export default async function () {
  return await agent.get('/execution/actions')
    .catch(error => console.log(error.error))
    .then(response => response?.data as Action[]);
}