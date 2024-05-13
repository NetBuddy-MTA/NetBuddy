import agent from '../agent.ts';

export default async function (email: string, password: string) {
  return await agent
  .post(
    'login',
    JSON.stringify({email, password}), 
    {params: {useCookies: true, useSessionCookies: true}}
  );
}