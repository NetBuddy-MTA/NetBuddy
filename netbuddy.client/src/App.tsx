import './App.css';
import LoginForm from "./screens/login/LoginForm.tsx";
import {useState} from "react";

function App({init}: { init: string }) {
  const [screen, setScreen] = useState(init);
  
  return (
    <div className="App">
      {screen === 'login' && <LoginForm />}
    </div>
  );
}

export default App;