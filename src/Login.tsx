import axios from "axios";
import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

export default function Login() {
  const { user, setUser } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  if (user) {
    return <Navigate to="/" />;
  }

  return (
    <div style={{ padding: 15 }}>
      <h1>Login</h1>
      <p>
        <label>
          <div>Username:</div>
          <input
            type="text"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
        </label>
      </p>
      <p>
        <label>
          <div>Password:</div>
          <input
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </label>
      </p>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <button
        onClick={() => {
          axios
            .post("/login", {
              username,
              password,
            })
            .then((res) => {
              setUser(res.data);
            })
            .catch((err) => {
              setError(err.response.data.message);
            });
        }}
      >
        Login
      </button>
    </div>
  );
}
