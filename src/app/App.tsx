import React, { useEffect } from "react";
import "./App.css";
import { Header } from "../components/Header/Header";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "./hooks";
import { Singup } from "../components/Auth/SingUp/Singup";
import { Login } from "../components/Auth/Login/Login";
import { Profile } from "../components/Profile/Profile";
import { appThunks } from "./app.slice";
import { Grid, LinearProgress, Paper } from "@mui/material";
import { ForgotPassword } from "../components/Auth/Set_password/ForgotPassword";
import { CheckMail } from "../components/Auth/Set_password/CheckMail/CheckMail";
import { CreatePassword } from "../components/Auth/Set_password/CreateNewPassword/CreateNewPassword";

function App() {
  const auth = useAppSelector((state) => state.app.auth);
  const isLoading = useAppSelector((state) => state.app.isLoading);
  const dispatch = useAppDispatch();
  // const error = useAppSelector((state) => state.app.error)
  
  useEffect(() => {
    dispatch(appThunks.authorization());
  }, [dispatch]);
  return (
    <BrowserRouter>
      {auth ? <Navigate to="/rtk-cards/profile" /> : null}
      <div className="App">
        <Header />
        {isLoading && <LinearProgress />}
      
          {/* {error && <div style={{color: 'red', textAlign: 'center'}}>{error}</div>} */}
          <Grid>
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
          </Grid>
      </div>
    </BrowserRouter>
  );
}

export default App;
