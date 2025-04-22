import React, { useState } from "react";
import { Container, Box, TextField, Button, Typography, Paper, MenuItem, Select, FormControl, InputLabel, Alert } from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase"; // Firebase Auth & Firestore
import { doc, getDoc } from "firebase/firestore";
import { useAuth } from "../components/AuthContext"; // User Context for session management
import backgroundImage from "../aboutusback.png";
import "../style.css";

const Login = () => {
  const [role, setRole] = useState(""); 
  const [hospitalName, setHospitalName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { setUser } = useAuth(); // Global auth context

  const handleLogin = async () => {
    if (!role) {
      setError("Please select a role before logging in.");
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Fetch user details from Firestore
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const userData = docSnap.data();
        setUser({ uid: user.uid, ...userData });

        // Validate role before redirecting
        if (role !== userData.role) {
          setError(`Incorrect role selected. You are registered as a ${userData.role}.`);
          return;
        }

        // Redirect based on role
        if (userData.role === "hospital") {
          navigate("/admin-dashboard");
        } else if (userData.role === "doctor") {
          navigate("/doctor-dashboard");
        } else {
          navigate("/patient-dashboard");
        }
      } else {
        setError("User data not found. Contact support.");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <Box sx={{ 
      minHeight: "100vh", 
      display: "flex", 
      flexDirection: "column", 
      backgroundImage: `url(${backgroundImage})`, 
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
    }}>
      
      {/* Navigation Header */}
      <Box sx={{ background: "linear-gradient(to right, #2c5364, #0f2027)", padding: "10px 0" }}>
        <Container>
          <Box display="flex" justifyContent="center" gap="40px">
            <Button component={Link} to="/" sx={{ color: "white", fontWeight: "bold", fontSize: "18px" }}>Home</Button>
            <Button component={Link} to="/about" sx={{ color: "white", fontSize: "18px" }}>About Us</Button>
            <Button component={Link} to="/services" sx={{ color: "white", fontSize: "18px" }}>Services</Button>
            <Button component={Link} to="/contact" variant="contained" sx={{ backgroundColor: "#0d3b66", color: "white", borderRadius: "25px", padding: "10px 25px", fontSize: "16px", fontWeight: "bold", "&:hover": { backgroundColor: "#09234B" } }}>
              Contact
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Login Form */}
      <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "center", alignItems: "center", padding: "50px 0", boxShadow: "inset 0 0 0 2000px rgba(0, 0, 0, 0.3)" }}>
        <Container maxWidth="sm">
          <Paper elevation={5} sx={{ padding: "30px", borderRadius: "10px" }}>
            <Box textAlign="center" mb={3}>
              <LockIcon sx={{ fontSize: 40, color: "#1976D2" }} />
              <Typography variant="h5" fontWeight="bold">Login to Your Account</Typography>
              <Typography variant="body2" color="textSecondary">Access your healthcare dashboard</Typography>
            </Box>

            {/* Error Message */}
            {error && <Alert severity="error" sx={{ marginBottom: "16px" }}>{error}</Alert>}

            {/* Role Selection */}
            <FormControl fullWidth sx={{ marginBottom: "16px" }}>
              <InputLabel>Select Role</InputLabel>
              <Select value={role} onChange={(e) => setRole(e.target.value)} label="Select Role">
                <MenuItem value="hospital">Hospital Management</MenuItem>
                <MenuItem value="doctor">Doctor</MenuItem>
                <MenuItem value="patient">Patient</MenuItem>
              </Select>
            </FormControl>

            {/* Hospital Name Field (Only for Hospital Management) */}
            {role === "hospital" && (
              <TextField
                fullWidth
                label="Hospital Name"
                variant="outlined"
                margin="normal"
                value={hospitalName}
                onChange={(e) => setHospitalName(e.target.value)}
                sx={{ marginBottom: "16px" }}
              />
            )}

            {/* Login Fields */}
            <TextField
              fullWidth
              label="Email"
              type="email"
              variant="outlined"
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{ marginBottom: "16px" }}
            />
            <TextField
              fullWidth
              label="Password"
              type="password"
              variant="outlined"
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              sx={{ marginBottom: "16px" }}
            />

            {/* Login Button */}
            <Button fullWidth variant="contained" color="primary" sx={{ marginBottom: "16px", borderRadius: "25px", padding: "12px" }} onClick={handleLogin}>
              Login
            </Button>

            <Typography variant="body2" align="center" mt={2}>
              Don't have an account? <Link to="/signup">Register here</Link>
            </Typography>
          </Paper>
        </Container>
      </Box>

      {/* Footer */}
      <Box sx={{ backgroundColor: "#1976D2", color: "white", textAlign: "center", padding: "20px", marginTop: "auto" }}>
        <Typography variant="body2">© 2025 Healthify. All rights reserved.</Typography>
      </Box>
    </Box>
  );
};

export default Login;
