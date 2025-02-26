import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import LandingPage from "./Pages/LandingPage";
import Login from "./Pages/Login";

const App = () : React.ReactElement => {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" Component={LandingPage} ></Route>
        <Route path="/login" Component={Login} ></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App
