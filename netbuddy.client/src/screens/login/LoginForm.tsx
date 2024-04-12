import Input from "../../components/input/Input";
import {FormEvent, useState} from "react";
import {login} from "../../api/auth/userAuth.ts";

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [waiting, setWaiting] = useState(false);
  
  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    // Check if username and password are not empty
    if (!(username.length > 0 && password.length > 0)) {
      alert('Please fill in all fields');
      return;
    }
    // Call login function from userAuth.ts
    setWaiting(true);
    let response = await login(username, password)
    console.log(response);
    setWaiting(false);
  }
  
  return (
    <div className="container mt-5 text-center">
      <div className="grid gap-5 md:grid-cols-2">
        <form onSubmit={onSubmit}>
          <Input
            label="Username:"
            type="text"
            id="name"
            placeholder="type your name..."
            setValue={setUsername}
          />
          <Input
            label="Password:"
            type="password"
            id="password"
            placeholder="type your password..."
            setValue={setPassword}
          />
          <button disabled={waiting} type={"submit"} className="btn btn-primary">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
