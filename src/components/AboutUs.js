import React from "react";
import { AppBar, Toolbar, Button, Container, Box, Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import backgroundImage from "../aboutusback.png"; // Ensure this image exists

const AboutUs = () => {
  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#f5f5f5" }}>
      
      {/* Header - Matches Home & Services */}
      <AppBar position="static" sx={{ background: "linear-gradient(to right, #2c5364, #0f2027)", padding: "10px 0" }}>
        <Toolbar sx={{ display: "flex", justifyContent: "center", gap: "40px" }}>
          <Button component={Link} to="/" sx={{ color: "white", fontWeight: "bold", fontSize: "18px", letterSpacing: "1px" }}>Home</Button>
          <Button component={Link} to="/about" sx={{ color: "white", fontSize: "18px", letterSpacing: "1px" }}>About Us</Button>
          <Button component={Link} to="/services" sx={{ color: "white", fontSize: "18px", letterSpacing: "1px" }}>Services</Button>
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
          <Typography variant="h2" sx={{ fontWeight: "bold", letterSpacing: "1px", textShadow: "2px 2px 5px rgba(0,0,0,0.2)" }}>About Healthify</Typography>
          <Typography variant="h6" sx={{ maxWidth: "700px", margin: "auto", opacity: "0.9", fontSize: "20px" }}>
            Empowering healthcare with seamless data management and innovative solutions for patients and doctors.
          </Typography>
        </Container>
      </Box>

      {/* About Us Content */}
      <Container sx={{ padding: "60px 0", textAlign: "center" }}>
        <Typography variant="h4" sx={{ fontWeight: "bold", letterSpacing: "1px", marginBottom: "30px" }}>Our Vision</Typography>
        <Typography variant="body1" sx={{ maxWidth: "800px", margin: "auto", fontSize: "18px", lineHeight: "1.6", opacity: "0.8" }}>
          At Healthify, we envision a world where healthcare is simplified through technology. Our platform connects patients and doctors effortlessly, making medical data management seamless, appointments hassle-free, and healthcare accessible for all.
        </Typography>
      </Container>

      {/* Our Values Section */}
      <Box sx={{ backgroundColor: "#ffffff", padding: "60px 0", textAlign: "center" }}>
        <Container>
          <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold", letterSpacing: "1px", marginBottom: "30px" }}>Our Core Values</Typography>
          <Grid container spacing={4} justifyContent="center">
            <Grid item xs={12} sm={6} md={4}>
              <Box sx={{ padding: "30px", textAlign: "center", borderRadius: "15px", backgroundColor: "#f5f5f5" }}>
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>🏥 Patient-Centric Approach</Typography>
                <Typography variant="body2" sx={{ marginTop: "10px", opacity: "0.8" }}>
                  We prioritize patient needs and strive for excellence in healthcare accessibility.
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Box sx={{ padding: "30px", textAlign: "center", borderRadius: "15px", backgroundColor: "#f5f5f5" }}>
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>🔒 Data Security</Typography>
                <Typography variant="body2" sx={{ marginTop: "10px", opacity: "0.8" }}>
                  Ensuring the highest level of security for patient records and medical data.
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Box sx={{ padding: "30px", textAlign: "center", borderRadius: "15px", backgroundColor: "#f5f5f5" }}>
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>🚀 Innovation</Typography>
                <Typography variant="body2" sx={{ marginTop: "10px", opacity: "0.8" }}>
                  Constantly evolving to provide the best digital healthcare solutions.
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* About Us Images */}
      <Container sx={{ padding: "60px 0", textAlign: "center" }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>Our Team in Action</Typography>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} md={6}>
            <Box
              component="img"
              src="https://images.pexels.com/photos/3184325/pexels-photo-3184325.jpeg"
              alt="Medical team"
              sx={{ width: "100%", height: "350px", borderRadius: "15px", objectFit: "cover" }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Box
              component="img"
              src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg"
              alt="Doctor consultation"
              sx={{ width: "100%", height: "350px", borderRadius: "15px", objectFit: "cover" }}
            />
          </Grid>
        </Grid>
      </Container>

      {/* Footer */}
      <Box sx={{ backgroundColor: "#1976D2", color: "white", textAlign: "center", padding: "20px", marginTop: "50px" }}>
        <Typography variant="body2">© 2025 Healthify. All rights reserved.</Typography>
      </Box>

    </Box>
  );
};

export default AboutUs;
