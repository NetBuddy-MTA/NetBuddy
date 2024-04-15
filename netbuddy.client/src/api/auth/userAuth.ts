const BASE_URL = 'https://localhost:7298/api/account';

export const register = async (UserName: string, Email: string, Password: string) => {
  return await fetch(`${BASE_URL}/register/`, {
    method: 'POST',
    headers: new Headers({'Content-Type': 'application/json'}),
    body: JSON.stringify({UserName, Email, Password}),
    mode: 'cors'
  })
    .catch((error) => console.log(error));
}

export const login = async (UserName: string, Password: string) => {
  return await fetch(`${BASE_URL}/login/`, {
    method: 'POST',
    headers: new Headers({'Content-Type': 'application/json'}),
    body: JSON.stringify({UserName, Password}),
    mode: 'cors'
  })
    .catch((error) => console.log(error));
}

export const deleteAccount = async (UserName: string, Password: string) => {
  return await fetch(`${BASE_URL}/delete/`, {
    method: 'DELETE',
    headers: new Headers({'Content-Type': 'application/json'}),
    body: JSON.stringify({UserName, Password}),
    mode: 'cors'
  })
    .catch((error) => console.log(error));
}