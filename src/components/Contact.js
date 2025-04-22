import React from "react";
import { AppBar, Toolbar, Button, Box, Typography, TextField, Container, Grid, Card, CardContent, CardMedia } from "@mui/material";
import { Link } from "react-router-dom";
import sarkphoto from "../sarkphoto.JPG";
import tanishqphoto from "../tanishqphoto.jpg";


const teamMembers = [
  {
    name: "Sarthak Sisodia",
    role: "Front-End with Back-End",
    image: sarkphoto,
  },
  {
    name: "Tanishq Joshi",
    role: "Back-end with cloud dev",
    image: tanishqphoto,
  },
];

const Contact = () => {
  return (
    <Box>
      {/* Updated Header */}
      <AppBar position="static" sx={{ background: "linear-gradient(to right, #2c5364, #0f2027)", padding: "10px 0" }}>
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
          background: "linear-gradient(to right, #0d3b66, #1e5799)",
          color: "white",
          padding: "80px 20px",
          textAlign: "center",
        }}
      >
        <Typography variant="h2" fontWeight="bold">
          Contact Us
        </Typography>
        <Typography variant="h6" sx={{ marginTop: "10px" }}>
          Have a question? Get in touch with our team!
        </Typography>
      </Box>

      {/* Team Members Section */}
      <Container maxWidth="lg" sx={{ marginTop: "50px" }}>
        <Typography variant="h4" textAlign="center" fontWeight="bold" color="#0d3b66" marginBottom="30px">
          Meet Our Team
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          {teamMembers.map((member, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card sx={{ borderRadius: "10px", boxShadow: 3, textAlign: "center" }}>
                <CardMedia 
                  component="img" 
                  height="250" 
                  image={member.image} 
                  alt={member.name}
                  sx={{
                    marginBottom: "10px",
                    objectFit: "cover",
                    transform: "scale(1.1)",
                    transition: "transform 0.3s ease-in-out",
                    marginTop: index === 1 ? "2px" : "0px"
                  }}
                />
                <CardContent>
                  <Typography variant="h6" fontWeight="bold">
                    {member.name}
                  </Typography>
                  <Typography variant="subtitle2" color="gray">
                    {member.role}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Contact Form */}
      <Container maxWidth="md" sx={{ marginTop: "60px", marginBottom: "60px" }}>
        <Box sx={{ backgroundColor: "#f8f9fa", padding: "40px", borderRadius: "10px", boxShadow: 3 }}>
          <Typography variant="h4" textAlign="center" fontWeight="bold" color="#0d3b66" marginBottom="20px">
            Get in Touch
          </Typography>
          <form>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth label="Full Name" variant="outlined" required />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth label="Email Address" type="email" variant="outlined" required />
              </Grid>
              <Grid item xs={12}>
                <TextField fullWidth label="Message" variant="outlined" multiline rows={4} required />
              </Grid>
              <Grid item xs={12}>
                <Button variant="contained" color="primary" fullWidth sx={{ backgroundColor: "#0d3b66", padding: "12px" }}>
                  Send Message
                </Button>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Container>

      {/* Footer */}
      <Box sx={{ backgroundColor: "#1976D2", color: "white", textAlign: "center", padding: "20px", marginTop: "50px" }}>
        <Typography variant="body2">© 2025 Healthify. All rights reserved.</Typography>
      </Box>
    </Box>
  );
};

export default Contact;
