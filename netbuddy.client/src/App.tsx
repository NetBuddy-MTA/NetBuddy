import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom';
import FancyNavBar, {PageAndLink} from "./components/navigation/FancyNavBar.tsx";
import logo from "./assets/logo/netbuddylogo.jpeg";
import {ThemeProvider} from "@emotion/react";
import {darkTheme} from "./layouts/style/Themes.tsx";
import SignInForm from "./components/forms/SignInForm.tsx";
import CssBaseline from '@mui/material/CssBaseline';

let pageAndLinks: PageAndLink[] = [
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
            <Route path="/" element={<Navigate to="/signin" replace={true} />} />
            
            {/*pages*/}
            <Route path="/signin" element={<SignInForm />} />
            
            {/*handle any other unaccounted for route*/}
            <Route path="*" element={<Navigate to="/" replace={true} />} />
          </Routes>
        </BrowserRouter>
      </div>
    </ThemeProvider>
  );
}

export default App;