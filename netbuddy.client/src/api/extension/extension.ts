import agent from "../agent.ts";

export async function GetExtensionId() {
  return await agent.get<string>("extension/")
  .then(response => response?.data)
  .catch(() => "");
}