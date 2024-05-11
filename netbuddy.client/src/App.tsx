import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom';
import FancyNavBar, {PageAndLink} from "./components/navigation/FancyNavBar";
import logo from "./assets/logo/netbuddylogo.jpeg";
import {ThemeProvider} from "@emotion/react";
import {darkTheme} from "./layouts/style/Themes";
import LoginForm from "./components/forms/LoginForm.tsx";
import CssBaseline from '@mui/material/CssBaseline';
import RegisterForm from "./components/forms/RegisterForm.tsx";
import {useState} from 'react';
import UserInfoContext, {UserInfo} from "./contexts/UserInfoContext.tsx";
import Home from "./screens/Home.tsx";
import History from "./components/other/History.tsx";
import SequenceScreen from "./components/other/SequenceScreen.tsx";
import GetActions from "./api/actions/Actions.ts";

let pageAndLinks: PageAndLink[] = [
  {page: "History", link: "/history"},
  {page: "Sequences", link: "/sequences"},
];

function App() {
  const [userInfo, setUserInfo] = useState<UserInfo>({});

  const TestElement = () => {
    return (
      <button onClick={e => {
        e.preventDefault();
        GetActions()
        .then(actions => console.log(actions));
      }}>
        Get Actions
      </button>
    );
  }
  
  return (
    <UserInfoContext.Provider value={{userInfo, setUserInfo}}>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline/>
        <BrowserRouter>
          <TestElement/>
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
            <Route path="/signin" element={<LoginForm/>}/>
            <Route path="/signup" element={<RegisterForm/>}/>
            <Route path="/history" element={<History/>}/>
            <Route path="/sequences" element={<SequenceScreen/>}/>
            
            {/*handle any other unaccounted for route*/}
            <Route path="*" element={<Navigate to="/" replace={true}/>}/>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </UserInfoContext.Provider>
  );
}

export default App;
