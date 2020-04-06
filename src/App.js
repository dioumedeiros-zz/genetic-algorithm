import React from "react";
import { ToastContainer } from "react-toastify";
import Home from "./pages/Home";

import "react-toastify/dist/ReactToastify.css";
import "./styles/global.css";
import "./App.css";

function App() {
  return (
    <>
      <Home />
      <ToastContainer autoClose={6000} />
    </>
  );
}

export default App;
