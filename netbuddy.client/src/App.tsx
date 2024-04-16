import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom';
import FancyNavBar, {PageAndLink} from "./components/navigation/FancyNavBar.tsx";
import Home from "./screens/Home/Home.tsx";
import logo from "./assets/logo/netbuddylogo.jpeg";
import {ThemeProvider} from "@emotion/react";
import {darkTheme} from "./layouts/style/Themes.tsx";
import LoginForm from "./components/forms/LoginForm.tsx";
import CssBaseline from '@mui/material/CssBaseline';

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
    <ThemeProvider theme={darkTheme}>
      <CssBaseline/>
      <div>
        <BrowserRouter>
          <FancyNavBar logo={logo} pageAndLinks={pageAndLinks}/>
          <Routes>
            {/*default route*/}
            <Route path="/" element={<Navigate to="/home" replace={true} />} />
            
            {/*pages*/}
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<LoginForm />} />
            
            {/*unknown route*/}
            <Route path="*" element={<Navigate to="/" replace={true} />} />
          </Routes>
        </BrowserRouter>
      </div>
    </ThemeProvider>
  );
}

export default App;