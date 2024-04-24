import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom';
import FancyNavBar, {PageAndLink} from "./components/navigation/FancyNavBar.tsx";
import logo from "./assets/logo/netbuddylogo.jpeg";
import {ThemeProvider} from "@emotion/react";
import {darkTheme} from "./layouts/style/Themes.tsx";
import SignInForm from "./components/forms/SignInForm.tsx";
import CssBaseline from '@mui/material/CssBaseline';
import SignUpForm from "./components/forms/SignUpForm.tsx";
import {useState} from 'react';
import UserInfoContext, {UserInfo} from "./contexts/UserInfoContext.tsx";
import Home from "./screens/Home.tsx";

let pageAndLinks: PageAndLink[] = [
];

function App() {
  const [userInfo, setUserInfo] = useState<UserInfo>({});
  
  return (
    <UserInfoContext.Provider value={{userInfo, setUserInfo}}>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline/>
        <div>
          <BrowserRouter>
            <FancyNavBar logo={logo} pageAndLinks={pageAndLinks}/>
            <Routes>
              {/*default route*/}
              {
                userInfo.username ? 
                  <Route path="/" element={<Navigate to="/home" replace={true} />} /> : 
                  <Route path="/" element={<Navigate to="/signin" replace={true} />} />
              }
              
              {/*pages*/}
              <Route path="/home" element={<Home />} />
              <Route path="/signin" element={<SignInForm />} />
              <Route path="/signup" element={<SignUpForm />} />
              
              {/*handle any other unaccounted for route*/}
              <Route path="*" element={<Navigate to="/" replace={true} />} />
            </Routes>
          </BrowserRouter>
        </div>
      </ThemeProvider>
    </UserInfoContext.Provider>
  );
}

export default App;