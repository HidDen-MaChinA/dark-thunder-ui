import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import LandingPage from "./Pages/LandingPage";

const App = () : React.ReactElement => {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" Component={LandingPage} ></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App
