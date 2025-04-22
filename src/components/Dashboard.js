import React, { useState } from "react";
import { Container, Box, TextField, Button, Typography, Paper, MenuItem, Select } from "@mui/material";
import { Link } from "react-router-dom"; // Assuming you're using react-router for navigation
import backgroundImage from "../aboutusback.png"; // Replace with actual image path

const Dashboard = () => {
  const [userData, setUserData] = useState({
    name: "",
    age: "",
    role: "patient",
  });

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  return (
    <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      {/* Header - Same as Home Page */}
      <Box sx={{ background: "linear-gradient(to right, #2c5364, #0f2027)", padding: "10px 0" }}>
        <Container>
          <Box display="flex" justifyContent="center" gap="40px">
            <Button component={Link} to="/" sx={{ color: "white", fontWeight: "bold", fontSize: "18px", letterSpacing: "1px" }}>Home</Button>
            <Button component={Link} to="/about" sx={{ color: "white", fontSize: "18px", letterSpacing: "1px" }}>About Us</Button>
            <Button component={Link} to="/services" sx={{ color: "white", fontSize: "18px", letterSpacing: "1px" }}>Services</Button>
            <Button component={Link} to="/contact" variant="contained" sx={{ backgroundColor: "#0d3b66", color: "white", borderRadius: "25px", padding: "10px 25px", fontSize: "16px", fontWeight: "bold", "&:hover": { backgroundColor: "#09234B" }}}>Contact</Button>
          </Box>
        </Container>
      </Box>

      {/* Dashboard Section */}
      <Box
        sx={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          color: "white",
          padding: "100px 0", // Adjust padding to ensure it's filled correctly
          flexGrow: 1, // Ensures the background stretches to fill remaining height
          boxShadow: "inset 0 0 0 2000px rgba(0, 0, 0, 0.3)",
        }}
      >
        <Container maxWidth="sm">
          <Paper elevation={5} sx={{ padding: "30px", borderRadius: "10px" }}>
            <Typography variant="h5" gutterBottom>User Details</Typography>

            {/* Form Fields */}
            <TextField
              label="Name"
              name="name"
              variant="outlined"
              fullWidth
              value={userData.name}
              onChange={handleChange}
              sx={{ marginBottom: "15px" }}
            />
            <TextField
              label="Age"
              name="age"
              type="number"
              variant="outlined"
              fullWidth
              value={userData.age}
              onChange={handleChange}
              sx={{ marginBottom: "15px" }}
            />
            <Select
              name="role"
              value={userData.role}
              onChange={handleChange}
              fullWidth
              variant="outlined"
              sx={{ marginBottom: "15px" }}
            >
              <MenuItem value="patient">Patient</MenuItem>
              <MenuItem value="doctor">Doctor</MenuItem>
            </Select>

            <Button
              variant="contained"
              color="primary"
              fullWidth
              sx={{ marginTop: "20px", borderRadius: "25px", padding: "12px" }}
              onClick={() => alert("Details Saved!")}
            >
              Save Details
            </Button>
          </Paper>
        </Container>
      </Box>

      {/* Footer - Same as Home Page */}
      <Box sx={{ backgroundColor: "#1976D2", color: "white", textAlign: "center", padding: "20px", marginTop: "auto" }}>
        <Typography variant="body2">© 2025 Healthify. All rights reserved.</Typography>
      </Box>
    </Box>
  );
};

export default Dashboard;
