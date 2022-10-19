import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Button,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

export default function Register() {
  const { user, setUser } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  console.log(error);

  if (user) {
    return <Navigate to="/" />;
  }

  return (
    <div style={{ padding: 15 }}>
      <h1>Register</h1>
      <FormControl mb={3}>
        <FormLabel>Username</FormLabel>
        <Input
          type="text"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
      </FormControl>
      <FormControl mb={3}>
        <FormLabel>Password</FormLabel>
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
            .post("/register", {
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
        Register
      </Button>
    </div>
  );
}
