import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import axios from "axios";
import Login from "./Login";
import Navbar from "./Navbar";
import Register from "./Register";
import Gallery from "./Gallery";
import Editor from "./Editor";
import { RequireAuth } from "./RequireAuth";
import { AuthProvider } from "./AuthContext";
import Settings from "./Settings";
import Upload from "./Upload";

function App() {
  useEffect(() => {
    axios.get("/me");
  }, []);
  return (
    <AuthProvider>
      <BrowserRouter>
        <div>
          <Navbar />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/"
              element={
                <RequireAuth>
                  <Gallery />
                </RequireAuth>
              }
            />
            <Route
              path="/upload"
              element={
                <RequireAuth>
                  <Upload />
                </RequireAuth>
              }
            />
            <Route
              path="/editor/:id"
              element={
                <RequireAuth>
                  <Editor />
                </RequireAuth>
              }
            />
            <Route
              path="/settings"
              element={
                <RequireAuth>
                  <Settings />
                </RequireAuth>
              }
            />
          </Routes>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
