import React from "react";
import { Box, Container, Grid, Paper, Typography, Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useAuth } from "../components/AuthContext";
import backgroundImage from "../aboutusback.png";
import homeimg from "../home.png";

const services = [
  { title: "Patient Records Management", description: "Securely store and manage patient data.", link: "/records" },
  { title: "Doctor Consultations", description: "Easy access to doctors and specialists.", link: "/services" },
  { title: "Appointment Scheduling", description: "Schedule visits with doctors quickly.", link: "/book-appointment" },
  { title: "Available Hospitals", description: "Discover nearby partnered hospitals.", link: "/hospitals" }
];

const Home = () => {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();

  // Logout Function
  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      navigate("/login");
    } catch (error) {
      console.error("Logout Error:", error.message);
    }
  };

  return (
    <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>

      {/* Header */}
      <Box sx={{ background: "linear-gradient(to right, #2c5364, #0f2027)", padding: "20px 0" }}>
        <Container>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            {/* Navigation Links */}
            <Box display="flex" gap="40px">
              <Button component={Link} to="/" sx={{ color: "white", fontWeight: "bold", fontSize: "18px" }}>Home</Button>
              <Button component={Link} to="/about" sx={{ color: "white", fontSize: "18px" }}>About Us</Button>
              <Button component={Link} to="/services" sx={{ color: "white", fontSize: "18px" }}>Services</Button>
              <Button component={Link} to="/contact" sx={{ color: "white", fontSize: "18px" }}>Contact</Button>
            </Box>

            {/* Right Section: Dashboard & Auth Buttons */}
            <Box display="flex" gap="20px">
              <Button component={Link} to="/dashboard-selection" variant="contained" sx={{ backgroundColor: "#0d3b66", color: "white", borderRadius: "25px", padding: "10px 25px", fontSize: "16px" }}>
                Dashboard
              </Button>

              {/* Show Login & Signup if NOT logged in */}
              {!user ? (
                <>
                  <Button component={Link} to="/login" sx={{ color: "white", fontSize: "18px" }}>Login</Button>
                  <Button component={Link} to="/signup" variant="contained" sx={{ backgroundColor: "#0d3b66", color: "white", borderRadius: "25px", padding: "10px 25px", fontSize: "16px" }}>
                    Signup
                  </Button>
                </>
              ) : (
                <Button onClick={handleLogout} variant="contained" sx={{ backgroundColor: "#d32f2f", color: "white", borderRadius: "25px", padding: "10px 25px", fontSize: "16px" }}>
                  Logout
                </Button>
              )}
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Main Content */}
      <Box flex="1">
        {/* Hero Section */}
        <Box sx={{ color: "white", padding: "100px 0", backgroundImage: `url(${backgroundImage})`, position: "relative", marginTop: "-10px" }}>
          <Container>
            <Grid container spacing={4} alignItems="center">
              <Grid item xs={12} md={6}>
                <Box sx={{ 
                  backgroundImage: `url(${homeimg})`, 
                  backgroundSize: "cover", 
                  backgroundPosition: "center bottom", 
                  backgroundRepeat: "no-repeat", 
                  height: "500px", 
                  width: "650px", 
                  transform: "scale(1.4)", 
                  marginLeft: "-110px"
                }} />
              </Grid>
              <Grid item xs={12} md={6}>
                <Box sx={{ marginLeft: "160px" }}>
                  <Typography variant="h2" sx={{ fontWeight: "900", letterSpacing: "2px", textShadow: "2px 2px 5px rgba(0,0,0,0.2)", fontSize: "4.5rem", fontFamily: "'Montserrat', sans-serif", marginBottom: "20px" }}>
                    Welcome to Healthify
                  </Typography>
                  <Typography variant="h6" sx={{ maxWidth: "600px", opacity: "0.9", fontSize: "20px", textAlign: "justify", lineHeight: "1.6" }}>
                    Revolutionizing healthcare through smart technology. Experience seamless patient care, instant appointment, and secure medical records - all in one place.
                  </Typography>
                  <Button variant="contained" color="secondary" sx={{ marginTop: "25px", fontSize: "18px", padding: "12px 30px", borderRadius: "30px", fontWeight: "bold" }} component={Link} to="/dashboard-selection">
                    Get Started
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Container>
        </Box>

        {/* Services Section */}
        <Box sx={{ backgroundColor: "#ffffff", padding: "60px 0", textAlign: "center" }}>
          <Container>
            <Typography variant="h2" align="center" sx={{ mt: 8, mb: 4, color: "#2c4c3b", fontWeight: "bold" }}>Our Services</Typography>
            <Grid container spacing={4} justifyContent="center">
              {services.map((service, index) => (
                <Grid item xs={12} sm={6} md={3} key={index}>
                  <Paper sx={{ padding: "30px", minHeight: "200px", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", textAlign: "center", borderRadius: "15px", transition: "0.3s", "&:hover": { boxShadow: "0px 4px 30px rgba(0,0,0,0.15)", transform: "translateY(-5px)" } }}>
                    <Typography variant="h6" sx={{ fontWeight: "bold" }}>{service.title}</Typography>
                    <Typography variant="body2" sx={{ marginBottom: "15px", opacity: "0.8" }}>{service.description}</Typography>
                    <Button variant="contained" color="primary" component={Link} to={service.link} sx={{ borderRadius: "25px", padding: "8px 20px", fontSize: "16px", fontWeight: "bold" }}>Learn More</Button>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>
      </Box>

      {/* Footer */}
      <Box sx={{ backgroundColor: "#1976D2", color: "white", textAlign: "center", padding: "20px", marginTop: "auto" }}>
        <Typography variant="body2">© 2025 Healthify. All rights reserved. By 422 and 441. </Typography>
      </Box>

    </Box>
  );
};

export default Home;
