import agent from '../agent.ts';

export default async function (email: string, password: string) {
  return await agent
  .post(
    'register',
    JSON.stringify({email, password})
  );
}