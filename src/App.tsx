import React, { useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import axios from "axios";

function App() {
  useEffect(() => {
    axios.get("/me");
  }, []);
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
      <button
        onClick={() => {
          axios
            .post("/login", {
              username: "foobar",
              password: "password",
            })
            .then(() => {
              axios.get("/me");
            });
        }}
      >
        Login
      </button>
    </div>
  );
}

export default App;
