import agent from "../agent.ts";

export default async function logout() {
  return await agent
  .put("logout")
  .catch((error) => console.log(error));
} 