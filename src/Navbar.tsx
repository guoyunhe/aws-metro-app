import { Box, Button, Heading } from "@chakra-ui/react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { useAuth } from "./AuthContext";

export default function Navbar() {
  const { user, setUser } = useAuth();
  return (
    <Box borderBottomWidth={1} p={4} display="flex">
      <Heading size="lg" mr={4}>
        Metro Photo Management System
      </Heading>
      <Button variant="ghost" as={NavLink} to="/" mr={4}>
        Home
      </Button>
      <Button variant="ghost" as={NavLink} to="/blog" mr={4}>
        Blog
      </Button>
      <Button variant="ghost" as={NavLink} to="/about" mr={4}>
        About
      </Button>
      <Box flex="1 1 auto" />
      {user ? (
        <div>
          <Button as={NavLink} to="/settings" mr={4}>
            {user.username}
          </Button>
          <Button
            onClick={() => {
              axios.post("/logout").then(() => {
                setUser(null);
              });
            }}
          >
            Logout
          </Button>
        </div>
      ) : (
        <div>
          <Button as={NavLink} to="/login" mr={4}>
            Login
          </Button>
          <Button as={NavLink} to="/register">
            Register
          </Button>
        </div>
      )}
    </Box>
  );
}
