import React from "react";
import { Box, Container, Typography, Grid, Paper, Button } from "@mui/material";
import { Link } from "react-router-dom";
import backgroundImage from "../aboutusback.png"; // Import the background image

const roles = [
  { title: "Doctor Dashboard", link: "/doctor-dashboard" },
  { title: "Patient Dashboard", link: "/patient-dashboard" },
  { title: "Hospital Admin Dashboard", link: "/admin-dashboard" },
];

const DashboardSelection = () => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        boxShadow: "inset 0 0 0 2000px rgba(0, 0, 0, 0.3)", // Dark overlay for readability
      }}
    >
      {/* Header */}
      <Box sx={{ background: "linear-gradient(to right, #2c5364, #0f2027)", padding: "20px 0" }}>
        <Container>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="h5" sx={{ color: "white", fontWeight: "bold" }}>
              Select Your Dashboard
            </Typography>
            <Button component={Link} to="/" sx={{ color: "white", fontSize: "18px" }}>Home</Button>
          </Box>
        </Container>
      </Box>

      {/* Selection Section */}
      <Box sx={{ flexGrow: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "50px 0" }}>
        <Container>
          <Typography variant="h4" fontWeight="bold" textAlign="center" mb={4} color="white">
            Choose Your Dashboard
          </Typography>
          <Grid container spacing={4} justifyContent="center">
            {roles.map((role, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Paper
                  sx={{
                    height: "200px", 
                    width: "100%",  
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                    borderRadius: "10px",
                    transition: "0.3s",
                    backgroundColor: "rgba(255, 255, 255, 0.9)", // Slight transparency
                    "&:hover": {
                      boxShadow: "0px 4px 30px rgba(0,0,0,0.2)",
                      transform: "translateY(-5px)",
                    },
                  }}
                >
                  <Typography variant="h6" fontWeight="bold" color="#2c5364" sx={{ mb: 2 }}>
                    {role.title}
                  </Typography>
                  <Button 
                    component={Link} 
                    to={role.link} 
                    variant="contained" 
                    color="primary" 
                    sx={{ borderRadius: "25px", fontWeight: "bold", fontSize: "16px" }}
                  >
                    Go to Dashboard
                  </Button>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Footer */}
      <Box sx={{ backgroundColor: "#0f2027", color: "white", textAlign: "center", padding: "20px", marginTop: "auto" }}>
        <Typography variant="body2">© 2025 Healthify. All rights reserved.</Typography>
      </Box>
    </Box>
  );
};

export default DashboardSelection;
