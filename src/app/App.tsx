import React, { useEffect } from "react";
import "./App.css";
import { Header } from "../components/Header/Header";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "./hooks";
import { Singup } from "../components/Auth/SingUp/Singup";
import { Login } from "../components/Auth/Login/Login";
import { Profile } from "../components/Profile/Profile";
import { appThunks } from "./app.slice";
import { CircularProgress, Paper } from "@mui/material";
import { ForgotPassword } from "../components/Auth/Set_password/ForgotPassword";
import { CheckMail } from "../components/Auth/Set_password/CheckMail/CheckMail";
import { CreatePassword } from "../components/Auth/Set_password/CreateNewPassword/CreateNewPassword";

function App() {
  const auth = useAppSelector((state) => state.app.auth);
  const initialized = useAppSelector((state) => state.app.initialized);
  const dispatch = useAppDispatch();
  
  useEffect(() => {
    dispatch(appThunks.authorization());
  }, [dispatch]);
  if (!initialized) {
    return (
      <div className="loader">
        <CircularProgress color="secondary" />
      </div>
    );
  }
  return (
    <BrowserRouter>
      {auth ? <Navigate to="/rtk-cards/profile" /> : null}
      <div className="App">
        <Header />
        <div className="container">
          <div className="app-wrapper-content">
            <Paper elevation={3} className='paper'>
              <Routes>
                <Route path="/rtk-cards" element={<Profile />} />
                <Route path="/rtk-cards/login" element={<Login />} />
                <Route path="/rtk-cards/register" element={<Singup />} />
                <Route path="/rtk-cards/profile" element={<Profile />} />
                <Route path="/rtk-cards/forgotPassword" element={<ForgotPassword />} />
                <Route path="/rtk-cards/checking" element={<CheckMail/>} />
                <Route path="/rtk-cards/setNewPassword/:token" element={<CreatePassword />} />
                {/* <Route path="/cards" element={<Cards />} />
                <Route path="/learn" element={<Learn />} /> */}
              </Routes>
            </Paper>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
