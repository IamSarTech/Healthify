import React, { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Button,
  Container,
  Box,
  Paper,
  Typography,
  CircularProgress,
} from "@mui/material";
import { Link } from "react-router-dom";
import { db } from "../firebase"; 
import { collection, getDocs, query, where } from "firebase/firestore";
import backgroundImage from "../aboutusback.png"; 

const Hospitals = () => {
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHospitals = async () => {
      try {
        const hospitalsQuery = query(collection(db, "users"), where("role", "==", "hospital"));
        const querySnapshot = await getDocs(hospitalsQuery);
        const hospitalList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        if (hospitalList.length === 0) {
          console.warn("No hospitals found.");
        }

        setHospitals(hospitalList);
      } catch (error) {
        console.error("Error fetching hospitals:", error);
      }
      setLoading(false);
    };

    fetchHospitals();
  }, []);

  return (
    <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      {/* Header */}
      <AppBar position="static" sx={{ background: "linear-gradient(to right, #2c5364, #0f2027)", padding: "10px 0" }}>
        <Toolbar sx={{ display: "flex", justifyContent: "center", gap: "40px" }}>
          <Button component={Link} to="/" sx={{ color: "white", fontWeight: "bold", fontSize: "18px" }}>Home</Button>
          <Button component={Link} to="/services" sx={{ color: "white", fontSize: "18px" }}>Services</Button>
          <Button component={Link} to="/contact" variant="contained" sx={{ backgroundColor: "#0d3b66", color: "white", borderRadius: "25px", padding: "10px 25px", fontSize: "16px", fontWeight: "bold", "&:hover": { backgroundColor: "#09234B" } }}>Contact</Button>
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
          boxShadow: "inset 0 0 0 2000px rgba(0, 0, 0, 0.3)",
        }}
      >
        <Container>
          <Typography variant="h2" sx={{ fontWeight: "bold", letterSpacing: "1px", textShadow: "2px 2px 5px rgba(0,0,0,0.2)" }}>
            Available Hospitals
          </Typography>
          <Typography variant="h6" sx={{ maxWidth: "700px", margin: "auto", opacity: "0.9", fontSize: "20px" }}>
            Find the best hospitals near you for emergency or scheduled visits.
          </Typography>
        </Container>
      </Box>

      {/* Hospital List Section */}
      <Box sx={{ backgroundColor: "#ffffff", padding: "60px 0", textAlign: "center", flex: 1 }}>
        <Container>
          <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold", letterSpacing: "1px", marginBottom: "30px" }}>
            Our Partner Hospitals
          </Typography>

          {loading ? (
            <Box sx={{ display: "flex", justifyContent: "center", marginTop: "30px" }}>
              <CircularProgress />
            </Box>
          ) : hospitals.length === 0 ? (
            <Typography variant="body1">No hospitals available.</Typography>
          ) : (
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                gap: "20px",
              }}
            >
              {hospitals.map((hospital) => (
                <Paper
                  key={hospital.id}
                  sx={{
                    padding: "30px",
                    width: "300px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: "15px",
                    transition: "0.3s",
                    "&:hover": { boxShadow: "0px 4px 30px rgba(0,0,0,0.15)", transform: "translateY(-5px)" },
                  }}
                >
                  <Typography variant="h6" sx={{ fontWeight: "bold" }}>{hospital.hospitalName}</Typography>
                  <Typography variant="body2" sx={{ marginTop: "10px", opacity: "0.8", textAlign: "center" }}>
                    {hospital.description || "No description available"}
                  </Typography>
                  <Typography variant="body2" sx={{ fontSize: "14px", color: "gray", marginTop: "8px" }}>
                    🏥 {hospital.hospitalSector} Sector
                  </Typography>
                  <Typography variant="body2" sx={{ fontSize: "14px", color: "gray", marginTop: "4px" }}>
                    📍 {hospital.hospitalAddress}
                  </Typography>
                  <Typography variant="body2" sx={{ fontSize: "14px", color: "gray", marginTop: "4px" }}>
                    📞 {hospital.hospitalContact}
                  </Typography>
                  <Button
                    component={Link}
                    to={`/admin-dashboard/`}
                    variant="contained"
                    sx={{
                      marginTop: "20px",
                      backgroundColor: "#0d3b66",
                      color: "white",
                      borderRadius: "25px",
                      padding: "10px 25px",
                      fontSize: "16px",
                      "&:hover": { backgroundColor: "#09234B" },
                    }}
                  >
                    View Details
                  </Button>
                </Paper>
              ))}
            </Box>
          )}
        </Container>
      </Box>

      {/* Footer */}
      <Box sx={{ backgroundColor: "#1976D2", color: "white", textAlign: "center", padding: "20px", marginTop: "auto" }}>
        <Typography variant="body2">© 2025 Healthify. All rights reserved.</Typography>
      </Box>
    </Box>
  );
};

export default Hospitals;
