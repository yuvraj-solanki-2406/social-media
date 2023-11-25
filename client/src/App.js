import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from './scenes/loginPage'
import HomePage from './scenes/homePage'
import ProfilePage from './scenes/profilePage'
// import Navbar from './scenes/navbar'
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme";


function App() {
  const mode = useSelector((state) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const isAuth = Boolean(useSelector((state) => state.token))

  return (
    <>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline>
            {/* <Navbar /> */}
            <Routes>
              <Route path="/" element={<LoginPage />}></Route>
              <Route path="/home" element={isAuth ? <HomePage /> : <Navigate to='/' />}></Route>
              <Route path="/profile" element={isAuth ? <ProfilePage /> : <Navigate to='/' />}></Route>
            </Routes>
          </CssBaseline>
        </ThemeProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
