import React from "react";
import "./App.css";
import { Header } from "./components/Header/Header";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { Login } from "./components/Login/Login";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <div className="container">
          <div className="app-wrapper-content">
            <Routes>
              <Route path="/login" element={<Login />} />
              {/* <Route path="/register" element={<Singup />} />
              <Route path="/checking" element={<CheckMail/>} />
              <Route path="/setPassword" element={<SetPassword />} />
              <Route path="/forgotPassword" element={<ForgotPassword />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/cards" element={<Cards />} />
              <Route path="/learn" element={<Learn />} /> */}
            </Routes>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
