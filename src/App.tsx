import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import LandingPage from "./Pages/LandingPage";
import Login from "./Pages/Login";
import Messages from "./Pages/Discussions";
import Register from "./Pages/Register";
import EmailValidation from "./Pages/EmailValidation";
import FillUserInformationRegister from "./Pages/FillUserInformationsRegister";
import ProtectedRoute from "./ProtectedRoute";

const App = (): React.ReactElement => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" Component={LandingPage}></Route>

        <Route path="/user/login" Component={Login}></Route>
        <Route path="/user/register" Component={Register}></Route>
        <Route
          path="/user/register/email/validation"
          Component={EmailValidation}
        ></Route>
        <Route
          path="/user/register/finalisation"
          Component={FillUserInformationRegister}
        ></Route>

        <Route
          path="/discussions"
          Component={() => (
            <ProtectedRoute>
              <Messages />
            </ProtectedRoute>
          )}
        ></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
