import React, { useEffect, useState } from "react";
import { Box, Container, Typography, Grid, Paper, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { db, auth } from "../firebase";
import { doc, getDoc, collection, getDocs, query, where } from "firebase/firestore";

const DoctorDashboard = () => {
  const [doctor, setDoctor] = useState(null);
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchDoctorData = async () => {
      try {
        const user = auth.currentUser;
        if (!user) return;

        // ✅ Get doctor details from Firestore
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists() && docSnap.data().role === "doctor") {
          setDoctor(docSnap.data());

          // ✅ Fetch appointments that match this doctor
          const appointmentsRef = collection(db, "appointments");
          const q = query(appointmentsRef, where("doctorName", "==", docSnap.data().username)); // Match doctor name
          const querySnapshot = await getDocs(q);

          const appointmentsData = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));

          setAppointments(appointmentsData);
        }
      } catch (error) {
        console.error("Error fetching doctor data:", error);
      }
    };

    fetchDoctorData();
  }, []);

  return (
    <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column", backgroundColor: "#f5f5f5" }}>
      
      {/* Header */}
      <Box sx={{ background: "linear-gradient(to right, #2c5364, #0f2027)", padding: "20px 0" }}>
        <Container>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="h5" sx={{ color: "white", fontWeight: "bold" }}>
              Doctor Dashboard
            </Typography>
            <Button component={Link} to="/" sx={{ color: "white", fontSize: "18px" }}>Home</Button>
          </Box>
        </Container>
      </Box>

      {/* Doctor Information */}
      <Box sx={{ flexGrow: 1, padding: "50px 0" }}>
        <Container>
          {doctor ? (
            <>
              <Typography variant="h4" fontWeight="bold" textAlign="center" mb={4} color="#2c5364">
                Welcome, Dr. {doctor.username}
              </Typography>

              <Paper sx={{ padding: "30px", marginBottom: "40px", borderRadius: "10px" }}>
                <Typography variant="h6"><strong>Specialization:</strong> {doctor.specialization}</Typography>
                <Typography variant="h6"><strong>License Number:</strong> {doctor.licenseNumber}</Typography>
                <Typography variant="h6"><strong>Email:</strong> {doctor.email}</Typography>
              </Paper>
              
              {/* Appointments Section */}
              <Typography variant="h5" fontWeight="bold" textAlign="center" mb={3} color="#2c5364">
                Your Appointments
              </Typography>

              {appointments.length > 0 ? (
                <Grid container spacing={2} justifyContent="center">
                  {appointments.map((appointment) => (
                    <Grid item xs={12} sm={6} md={4} key={appointment.id}>
                      <Paper
                        sx={{
                          padding: "20px",
                          borderRadius: "10px",
                          backgroundColor: "#ffffff",
                          boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "space-between",
                          height: "100%", // Ensure equal height for justified layout
                          textAlign: "center",
                          transition: "0.3s",
                          "&:hover": {
                            boxShadow: "0px 4px 20px rgba(0,0,0,0.2)",
                            transform: "translateY(-5px)",
                          },
                        }}
                      >
                        <Typography variant="h6" sx={{ fontWeight: "bold", color: "#2c5364" }}>
                          {appointment.patientName}
                        </Typography>
                        <Typography variant="body1" sx={{ color: "#555" }}>
                          <strong>Email:</strong> {appointment.patientEmail}
                        </Typography>
                        <Typography variant="body1" sx={{ color: "#555" }}>
                          <strong>Date:</strong> {appointment.date}
                        </Typography>
                        <Typography variant="body1" sx={{ color: "#555" }}>
                          <strong>Time:</strong> {appointment.time}
                        </Typography>
                        <Typography
                          variant="body1"
                          sx={{
                            fontWeight: "bold",
                            marginTop: "10px",
                            color: appointment.status === "Pending" ? "orange" : "green",
                          }}
                        >
                          {appointment.status}
                        </Typography>
                      </Paper>
                    </Grid>
                  ))}
                </Grid>
              ) : (
                <Typography variant="body1" textAlign="center" mt={2} color="gray">
                  No appointments scheduled.
                </Typography>
              )}
            </>
          ) : (
            <Typography variant="h5" textAlign="center" color="gray">
              Loading doctor information...
            </Typography>
          )}
        </Container>
      </Box>

      {/* Footer */}
      <Box sx={{ backgroundColor: "#0f2027", color: "white", textAlign: "center", padding: "20px", marginTop: "auto" }}>
        <Typography variant="body2">© 2025 Healthify. All rights reserved.</Typography>
      </Box>
    </Box>
  );
};

export default DoctorDashboard;
