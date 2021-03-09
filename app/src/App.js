import './App.css';
import React from "react";
import PublishIcon from '@material-ui/icons/Publish';
import logo from "./logo.png";
import Axios from "axios";

function App() {
   Axios({
    method: "GET",
    url: "http://localhost:5000/res",
    headers: {
      "Content-Type": "application/json"
    }
  }).then(res => {
    console.log(res.data.message);
  });
  return (
    <div className="app">
        <div className="logo">
          <img src={logo} alt="" />
        </div>
        <div className="input__side">
            <div className="tekst__felt">
              <h1>Hey! Click anywhere to upload an image to scan text from! </h1>
            </div>
            <div className="button">
              <PublishIcon />
            </div>
        </div>
      </div>
  );
}

export default App;