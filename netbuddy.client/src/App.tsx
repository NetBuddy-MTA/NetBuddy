import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom';
import FancyNavBar, {PageAndLink} from "./components/navigation/FancyNavBar";
import logo from "./assets/logo/netbuddylogo.jpeg";
import {ThemeProvider} from "@emotion/react";
import {darkTheme} from "./layouts/style/Themes";
import SignInForm from "./components/forms/SignInForm";
import CssBaseline from '@mui/material/CssBaseline';
import SignUpForm from "./components/forms/SignUpForm.tsx";
import {useState} from 'react';
import UserInfoContext, {UserInfo} from "./contexts/UserInfoContext.tsx";
import Home from "./screens/Home.tsx";
import History from "./components/other/History.tsx";
import EmbedForm from "./components/forms/EmbedForm.tsx";
import SequenceScreen from "./components/other/SequenceScreen.tsx";

let pageAndLinks: PageAndLink[] = [
  {page: "History", link: "/history"},
  {page: "Sequences", link: "/sequences"},
];

function App() {
  const [userInfo, setUserInfo] = useState<UserInfo>({});

  return (
    <UserInfoContext.Provider value={{userInfo, setUserInfo}}>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline/>
        <BrowserRouter>
          <FancyNavBar logo={logo} pageAndLinks={pageAndLinks}/>
          <Routes>
            {/*default route*/}
            {
              userInfo.username ?
                <Route path="/" element={<Navigate to="/sequences" replace={true}/>}/> :
                <Route path="/" element={<Navigate to="/signin" replace={true}/>}/>
            }

            {/*pages*/}
            <Route path="/home" element={<Home/>}/>
            <Route path="/signin" element={<SignInForm/>}/>
            <Route path="/signup" element={<SignUpForm/>}/>
            <Route path="/history" element={<History/>}/>
            <Route path="/sequences" element={<SequenceScreen/>}/>
            <Route path="/embed" element={<EmbedForm/>}/>

            {/*handle any other unaccounted for route*/}
            <Route path="*" element={<Navigate to="/" replace={true}/>}/>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </UserInfoContext.Provider>
  );
}

export default App;
