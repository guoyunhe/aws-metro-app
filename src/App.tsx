import React from "react";
import logo from "./logo.svg";
import "./App.css";
import axios from "axios";

function App() {
  return (
    <div className="App">
      <button
        onClick={() => {
          axios.post("/register", {
            username: "foobar",
            password: "password",
          });
        }}
      >
        Register
      </button>
    </div>
  );
}

export default App;
