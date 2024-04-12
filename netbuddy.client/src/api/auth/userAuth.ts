const BASE_URL = 'https://localhost:7298/api/account';

export const register = async (username: string, email: string, password: string) => {
  return await fetch(`${BASE_URL}/register/`, {
    method: 'POST',
    headers: new Headers({'Content-Type': 'application/json'}),
    body: JSON.stringify({username, email, password}),
    mode: 'cors'
  })
    .catch((error) => console.log(error));
}

export const login = async (UserName: string, Password: string) => {
  return await fetch(`${BASE_URL}/login/`, {
    method: 'POST',
    headers: new Headers({'Content-Type': 'application/json'}),
    body: JSON.stringify({username: UserName, password: Password}),
    mode: 'cors'
  })
    .catch((error) => console.log(error));
}

export const deleteAccount = async (username: string, password: string) => {
  return await fetch(`${BASE_URL}/delete/`, {
    method: 'DELETE',
    headers: new Headers({'Content-Type': 'application/json'}),
    body: JSON.stringify({username, password}),
    mode: 'cors'
  })
    .catch((error) => console.log(error));
}