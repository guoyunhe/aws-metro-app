import axios from "axios";
import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "./AuthContext";

export default function Navbar() {
  const { user, setUser } = useAuth();
  return (
    <div
      style={{ display: "flex", padding: 15, borderBottom: "1px solid black" }}
    >
      <div style={{ marginRight: 15 }}>Metro Photo Management System</div>
      <NavLink to="/" style={{ marginRight: 15 }}>
        Gallery
      </NavLink>
      <NavLink to="/upload" style={{ marginRight: 15 }}>
        Upload
      </NavLink>
      <div style={{ flex: "1 1 auto" }} />
      {user ? (
        <div>
          <NavLink to="/settings" style={{ marginRight: 15 }}>
            {user.username}
          </NavLink>
          <button
            onClick={() => {
              axios.post("/logout").then(() => {
                setUser(null);
              });
            }}
          >
            Logout
          </button>
        </div>
      ) : (
        <div>
          <NavLink to="/login" style={{ marginRight: 15 }}>
            Login
          </NavLink>
          <NavLink to="/register">Register</NavLink>
        </div>
      )}
    </div>
  );
}
