import {agentWithCredentials as agent} from "../agent.ts";

export default async function () {
  return await agent.get('info');
}