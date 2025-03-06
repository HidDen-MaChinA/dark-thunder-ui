import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import LandingPage from "./Pages/LandingPage";
import Login from "./Pages/Login";
import Messages from "./Pages/Messages";
import Register from "./Pages/Register";
import EmailValidation from "./Pages/EmailValidation";

const App = () : React.ReactElement => {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" Component={LandingPage} ></Route>
        <Route path="/login" Component={Login} ></Route>
        <Route path="/register" Component={Register} ></Route>
        <Route path="/register/emailValidation" Component={EmailValidation} ></Route>
        <Route path="/messages" Component={Messages} ></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
