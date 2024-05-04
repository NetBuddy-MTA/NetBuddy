import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import FancyNavBar, { PageAndLink } from "./components/navigation/FancyNavBar.tsx";
import logo from "./assets/logo/netbuddylogo.jpeg";
import { ThemeProvider } from "@emotion/react";
import { darkTheme } from "./layouts/style/Themes.tsx";
import SignInForm from "./components/forms/SignInForm.tsx";
import CssBaseline from '@mui/material/CssBaseline';
import SignUpForm from "./components/forms/SignUpForm.tsx";
import { useState } from 'react';
import UserInfoContext, { UserInfo } from "./contexts/UserInfoContext.tsx";
import Home from "./screens/Home.tsx";
import History from "./components/other/History.tsx";
import EmbedForm from "./components/forms/EmbedForm.tsx";
import Sequence_Screen from "./components/other/Sequence_Screen.tsx";
import SideDrawer from "./components/drawer/SideDrawer.tsx";

let pageAndLinks: PageAndLink[] = [
    { page: "History", link: "/history" },
    { page: "Sequences", link: "/sequences" },
];

function App() {
    const [userInfo, setUserInfo] = useState<UserInfo>({});
    

    return (
        < UserInfoContext.Provider value={{ userInfo, setUserInfo }}>
            < ThemeProvider theme={darkTheme}>
                < CssBaseline />
                < BrowserRouter >
                    < FancyNavBar logo={logo}
                        pageAndLinks={pageAndLinks}
                        onMenuClick={handleMenuClick} />

                    < SideDrawer
                        open={isDrawerOpen}
                        onClose={handleDrawerClose}
                    />

                    < Routes >
                        {/*default route*/}
                        {
                            userInfo.username ?

                                < Route path="/" element={< Navigate to="/home" replace={true} />} /> :
                                < Route path="/" element={< Navigate to="/signin" replace={true} />} />
                        }
                     
                        {/*pages*/}
                        < Route path="/home" element={< Home />} />
                        < Route path="/signin" element={< SignInForm />} />
                        < Route path="/signup" element={< SignUpForm />} />
                        < Route path="/history" element={< History />} />
                        < Route path="/embed" element={< EmbedForm />} />
                        < Route path="/sequences" element={< Sequence_Screen />} />
                        {/*handle any other unaccounted for route*/}
                        < Route path="*" element={< Navigate to="/" replace={true} />} />

                    </ Routes >
                </ BrowserRouter >
            </ ThemeProvider >
        </ UserInfoContext.Provider >
    );
}

export default App;