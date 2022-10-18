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
      <div style={{ flex: "1 1 auto" }}>Metro Photo Management System</div>
      {user ? (
        <div>
          <NavLink to="/settings" style={{ paddingRight: 15 }}>
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
          <NavLink to="/login" style={{ paddingRight: 15 }}>
            Login
          </NavLink>
          <NavLink to="/register">Register</NavLink>
        </div>
      )}
    </div>
  );
}
