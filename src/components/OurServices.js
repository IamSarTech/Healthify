import React from "react";
import { AppBar, Toolbar, Button, Container, Box, Grid, Paper, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import backgroundImage from "../aboutusback.png"; // Make sure the file exists

const OurServices = () => {
  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#f5f5f5" }}>
      
      {/* Header */}
      <AppBar position="static" sx={{background: "linear-gradient(to right, #2c5364, #0f2027)", padding: "10px 0" }}>
        <Toolbar sx={{ display: "flex", justifyContent: "center", gap: "40px" }}>
          <Button component={Link} to="/" sx={{ color: "white", fontWeight: "bold", fontSize: "18px", letterSpacing: "1px" }}>
            Home
          </Button>
          <Button component={Link} to="/about" sx={{ color: "white", fontSize: "18px", letterSpacing: "1px" }}>
            About Us
          </Button>
          <Button component={Link} to="/services" sx={{ color: "white", fontSize: "18px", letterSpacing: "1px" }}>
            Services
          </Button>
          <Button component={Link} to="/contact" sx={{ color: "white", fontSize: "18px", letterSpacing: "1px" }}>
            Contact
          </Button>
        </Toolbar>
      </AppBar>

      {/* Hero Section */}
      <Box
        sx={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          color: "white",
          padding: "100px 0",
          textAlign: "center",
          boxShadow: "inset 0 0 0 2000px rgba(0, 0, 0, 0.3)"
        }}
      >
        <Container>
          <Typography variant="h2" sx={{ fontWeight: "bold", letterSpacing: "1px", textShadow: "2px 2px 5px rgba(0,0,0,0.2)" }}>
            Our Services
          </Typography>
          <Typography variant="h6" sx={{ maxWidth: "700px", margin: "auto", opacity: "0.9", fontSize: "20px" }}>
            Discover how Healthify helps you manage patient records, consult with doctors, and schedule appointments seamlessly.
          </Typography>
        </Container>
      </Box>

      {/* Services Section */}
      <Box sx={{ backgroundColor: "#ffffff", padding: "60px 0", textAlign: "center" }}>
        <Container>
          <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold", letterSpacing: "1px", marginBottom: "30px" }}>
            What We Offer
          </Typography>
          <Grid container spacing={4} justifyContent="center">
            
            {/* Patient Records Management */}
            <Grid item xs={12} sm={6} md={4}>
              <Paper sx={{ padding: "30px", minHeight: "180px", textAlign: "center", borderRadius: "15px", transition: "0.3s", "&:hover": { boxShadow: "0px 4px 30px rgba(0,0,0,0.15)", transform: "translateY(-5px)" } }}>
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>Patient Records Management</Typography>
                <Typography variant="body2" sx={{ marginTop: "10px", opacity: "0.8" }}>
                  Securely store and manage patient medical records with ease.
                </Typography>
                <Button component={Link} to="/records" variant="contained" sx={{ marginTop: "15px", backgroundColor: "#0d3b66", color: "white", borderRadius: "25px", padding: "10px 25px", fontSize: "16px", "&:hover": { backgroundColor: "#09234B" } }}>
                  View Records
                </Button>
              </Paper>
            </Grid>

            {/* Available Hospitals */}
            <Grid item xs={12} sm={6} md={4}>
              <Paper sx={{ padding: "30px", minHeight: "180px", textAlign: "center", borderRadius: "15px", transition: "0.3s", "&:hover": { boxShadow: "0px 4px 30px rgba(0,0,0,0.15)", transform: "translateY(-5px)" } }}>
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>Available Hospitals</Typography>
                <Typography variant="body2" sx={{ marginTop: "10px", opacity: "0.8" }}>
                  Find hospitals near you for emergency or scheduled visits.
                </Typography>
                <Button component={Link} to="/hospitals" variant="contained" sx={{ marginTop: "15px", backgroundColor: "#0d3b66", color: "white", borderRadius: "25px", padding: "10px 25px", fontSize: "16px", "&:hover": { backgroundColor: "#09234B" } }}>
                  View Hospitals
                </Button>
              </Paper>
            </Grid>

          </Grid>
        </Container>
      </Box>

      {/* Doctor Consultation Features */}
      <Container sx={{ padding: "60px 0", textAlign: "center" }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>Doctor Consultation Features</Typography>
        <Grid container spacing={3} justifyContent="center">
          {/* In-Clinic Appointments */}
          <Grid item xs={12} md={4}>
            <Paper sx={{ padding: "30px", borderRadius: "15px" }}>
              <Typography variant="h6" fontWeight="bold">🏥 In-Clinic Appointments</Typography>
              <Typography variant="body2" sx={{ marginTop: "10px", opacity: "0.8" }}>Schedule visits with top specialists.</Typography>
              <Button component={Link} to="/in-clinic-appointment" fullWidth variant="contained" sx={{ marginTop: "20px", backgroundColor: "#0d3b66", color: "white", borderRadius: "25px", padding: "10px 25px", fontSize: "16px", "&:hover": { backgroundColor: "#09234B" } }}>
                Show In-Clinic Appointments
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </Container>

      {/* Appointment Section */}
      <Box sx={{ backgroundColor: "white", padding: "60px 0", textAlign: "center" }}>
        <Container>
          <Typography variant="h4" fontWeight="bold" gutterBottom>Book an Appointment</Typography>
          <Typography variant="body1" color="textSecondary">Easily schedule your appointment with our doctors.</Typography>
          <Grid container spacing={3} justifyContent="center" sx={{ marginTop: "30px" }}>
            <Grid item xs={12} md={4}>
              <Paper sx={{ padding: "30px", borderRadius: "15px" }}>
                <Typography variant="h6" fontWeight="bold">📅 Book an Appointment</Typography>
                <Typography variant="body2" sx={{ marginTop: "10px", opacity: "0.8" }}>Schedule a consultation with our specialists.</Typography>
                <Button component={Link} to="/book-appointment" fullWidth variant="contained" sx={{ marginTop: "20px", backgroundColor: "#0d3b66", color: "white", borderRadius: "25px", padding: "10px 25px", fontSize: "16px", "&:hover": { backgroundColor: "#09234B" } }}>
                  Book Now
                </Button>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Footer */}
      <Box sx={{ backgroundColor: "#1976D2", color: "white", textAlign: "center", padding: "20px", marginTop: "50px" }}>
        <Typography variant="body2">© 2025 Healthify. All rights reserved.</Typography>
      </Box>

    </Box>
  );
};

export default OurServices;
