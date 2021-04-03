import './App.css';
import React from "react";
import ImageLoader from "./scripts/ImageLoader.js";
import logo from "./logo.png";

function App() {


  return (
    <div className="app">
      <div className="logo">
        <img src={logo} alt="" />
      </div>

      <div className="input__side">
        <div className="tekst__felt">
          <ImageLoader />
        </div> 
      </div>
    </div>
  );
}

export default App;