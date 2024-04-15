import LoginForm from "./screens/login/LoginForm.tsx";
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import FancyNavBar, {PageAndLink} from "./components/navigation/FancyNavBar.tsx";
import Home from "./screens/Home/Home.tsx";
import logo from "./assets/logo/netbuddylogo.jpeg";

let pageAndLinks: PageAndLink[] = [
  {
    page: "Home",
    link: "/home"
  },
  {
    page: "Login",
    link: "/login"
  },
];

function App() {
  return (
    <div className="max-h-screen flex flex-col">
      <BrowserRouter>
        <FancyNavBar logo={logo} pageAndLinks={pageAndLinks}/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginForm />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;