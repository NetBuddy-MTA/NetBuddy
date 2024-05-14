import agent from "../agent.ts";

export default async function info() {
  return await agent.get('info');
}

export async function getUserInfo() {
  const infoResponse = await info();

  if (infoResponse.data && infoResponse.data.userName && infoResponse.data.email) {
    return {
      username: infoResponse.data.userName,
      email: infoResponse.data.email
    };
  }
  return {};
}