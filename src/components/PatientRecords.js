import React, { useEffect, useState } from "react";
import { AppBar, Toolbar, Button, Container, Box, Typography, Paper, Grid, CircularProgress } from "@mui/material";
import { Link } from "react-router-dom";
import { db } from "../firebase"; // Firestore database
import { collection, getDocs } from "firebase/firestore";
import backgroundImage from "../aboutusback.png"; // Background image

const PatientRecords = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "users"));
        const patientList = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          if (data.role === "patient") {
            patientList.push({ id: doc.id, ...data });
          }
        });
        setPatients(patientList);
      } catch (error) {
        console.error("Error fetching patients:", error);
      }
      setLoading(false);
    };

    fetchPatients();
  }, []);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        boxShadow: "inset 0 0 0 2000px rgba(0, 0, 0, 0.3)", // Dark overlay for readability
        paddingBottom: "50px",
      }}
    >
      {/* Header */}
      <AppBar position="static" sx={{ background: "linear-gradient(to right, #2c5364, #0f2027)", padding: "10px 0" }}>
        <Toolbar sx={{ display: "flex", justifyContent: "center", gap: "40px" }}>
          <Button component={Link} to="/" sx={{ color: "white", fontWeight: "bold", fontSize: "18px" }}>Home</Button>
          <Button component={Link} to="/services" sx={{ color: "white", fontSize: "18px" }}>Services</Button>
          <Button component={Link} to="/contact" sx={{ color: "white", fontSize: "18px" }}>Contact</Button>
        </Toolbar>
      </AppBar>

      {/* Page Content */}
      <Container sx={{ padding: "60px 0", textAlign: "center" }}>
        <Typography variant="h4" sx={{ fontWeight: "bold", color: "white", marginBottom: "30px" }}>
          Patient Records Management
        </Typography>

        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", marginTop: "30px" }}>
            <CircularProgress />
          </Box>
        ) : patients.length === 0 ? (
          <Typography variant="body1" sx={{ color: "white", marginTop: "20px" }}>No patient records available.</Typography>
        ) : (
          <Grid container spacing={3} justifyContent="center">
            {patients.map((patient) => (
              <Grid item xs={12} key={patient.id}>
                <Paper
                  elevation={4}
                  sx={{
                    padding: "20px",
                    borderRadius: "12px",
                    textAlign: "left",
                    backgroundColor: "rgba(255, 255, 255, 0.9)",
                    transition: "0.3s",
                    maxWidth: "900px", // ✅ Restricts the width for better readability
                    margin: "0 auto", // ✅ Centers it on the page
                    "&:hover": {
                      boxShadow: "0px 4px 30px rgba(0,0,0,0.3)",
                      transform: "translateY(-5px)",
                    },
                  }}
                >
                  <Typography variant="h6" fontWeight="bold" color="#0f2027">
                    {patient.username}
                  </Typography>
                  <Typography variant="body2" color="gray">
                    Email: {patient.email}
                  </Typography>
                  <Typography variant="body2" color="gray">
                    Age: {patient.age}
                  </Typography>
                  <Typography variant="body2" color="gray">
                    Gender: {patient.gender}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </Box>
  );
};

export default PatientRecords;
