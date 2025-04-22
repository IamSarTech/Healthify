import React from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useAuth } from "../components/AuthContext"; // Global Auth Context

const Navbar = () => {
  const { user, setUser } = useAuth(); // Get logged-in user
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null); // Clear user session
      navigate("/");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <AppBar
      position="static"
      sx={{
        background: "linear-gradient(90deg, #2E5D77, #7BA9B3)",
        boxShadow: "none",
        padding: "10px 0",
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        {/* Left: Logo */}
        <Typography
          variant="h6"
          sx={{
            fontWeight: "bold",
            color: "white",
            textTransform: "uppercase",
          }}
        >
          Healthify
        </Typography>

        {/* Center: Navigation Links */}
        <Box sx={{ display: "flex", gap: "30px" }}>
          <Typography component={Link} to="/" sx={{ fontWeight: "bold", color: "white", textDecoration: "none" }}>
            Home
          </Typography>
          <Typography component={Link} to="/about" sx={{ color: "white", textDecoration: "none" }}>
            About Us
          </Typography>
          <Typography component={Link} to="/services" sx={{ color: "white", textDecoration: "none" }}>
            Services
          </Typography>
        </Box>

        {/* Right: Dynamic Buttons */}
        <Box sx={{ display: "flex", gap: "15px" }}>
          {user ? (
            <>
              <Button
                component={Link}
                to={
                  user.role === "doctor"
                    ? "/doctor-dashboard"
                    : user.role === "hospital"
                    ? "/admin-dashboard"
                    : "/patient-dashboard"
                }
                variant="outlined"
                sx={{
                  color: "white",
                  borderColor: "white",
                  borderRadius: "20px",
                  textTransform: "none",
                  fontWeight: "bold",
                  "&:hover": { backgroundColor: "rgba(255,255,255,0.2)" },
                }}
              >
                Dashboard
              </Button>
              <Button
                onClick={handleLogout}
                variant="contained"
                sx={{
                  backgroundColor: "#0D2C4B",
                  borderRadius: "20px",
                  padding: "8px 20px",
                  textTransform: "none",
                  fontWeight: "bold",
                  "&:hover": { backgroundColor: "#0B243B" },
                }}
              >
                Sign Out
              </Button>
            </>
          ) : (
            <Button
              component={Link}
              to="/login"
              variant="contained"
              sx={{
                backgroundColor: "#0D2C4B",
                borderRadius: "20px",
                padding: "8px 20px",
                textTransform: "none",
                fontWeight: "bold",
                "&:hover": { backgroundColor: "#0B243B" },
              }}
            >
              Sign In
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
