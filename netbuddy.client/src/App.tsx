import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom';
import FancyNavBar, {PageAndLink} from "./components/navigation/FancyNavBar";
import logo from "./assets/logo/netbuddylogo.jpeg";
import LoginForm from "./components/forms/LoginForm.tsx";
import CssBaseline from '@mui/material/CssBaseline';
import RegisterForm from "./components/forms/RegisterForm.tsx";
import {useState} from 'react';
import UserInfoContext, {UserInfo} from "./contexts/UserInfoContext.tsx";
import Home from "./screens/Home.tsx";
import History from "./components/history/History.tsx";
import SequenceBuilderScreen from "./screens/sequence/builder/SequenceBuilderScreen.tsx";
import SequenceExecutionScreen from "./screens/sequence/execution/SequenceExecutionScreen.tsx";
import Box from '@mui/material/Box';
import {ThemeProvider} from "./contexts/ThemeContext.tsx";

let pageAndLinks: PageAndLink[] = [
  {page: "History", link: "/history"},
  {page: "Sequences", link: "/sequences"},
  {page: "Execute", link: "/execute"}
];

function App() {
  const [userInfo, setUserInfo] = useState<UserInfo>({});

  return (
    <UserInfoContext.Provider value={{userInfo, setUserInfo}}>
      {/*<ThemeProvider theme={darkTheme}>*/}
      <ThemeProvider >
        <CssBaseline/>
        <BrowserRouter>
          <Box m={2}>
            <Box m={2}>
              <FancyNavBar logo={logo} pageAndLinks={pageAndLinks}/>
            </Box>
            <Box m={2}>
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
                <Route path="/sequences" element={<SequenceBuilderScreen/>}/>
                <Route path="/execute" element={<SequenceExecutionScreen/>}/>
                
                {/*handle any other unaccounted for route*/}
                <Route path="*" element={<Navigate to="/" replace={true}/>}/>
              </Routes>
            </Box>
          </Box>
        </BrowserRouter>
      </ThemeProvider>
      {/*</ThemeProvider>*/}
    </UserInfoContext.Provider>
  );
}

export default App;
