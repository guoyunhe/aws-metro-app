import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Button,
  Input,
} from "@chakra-ui/react";
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
      <FormControl mb={3}>
        <FormLabel as="legend">Username</FormLabel>
        <Input
          type="text"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
      </FormControl>
      <FormControl mb={3}>
        <FormLabel as="legend">Password</FormLabel>
        <Input
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
      </FormControl>
      {error && <FormErrorMessage mb={3}>{error}</FormErrorMessage>}
      <Button
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
      </Button>
    </div>
  );
}
