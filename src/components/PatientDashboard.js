import React, { useEffect, useState } from "react";
import { Box, Container, Typography, Grid, Paper, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { db, auth } from "../firebase";
import { doc, getDoc, collection, getDocs, query, where } from "firebase/firestore";

const PatientDashboard = () => {
  const [patient, setPatient] = useState(null);
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchPatientData = async () => {
      try {
        const user = auth.currentUser;
        if (!user) return;

        // Get user details from Firestore
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists() && docSnap.data().role === "patient") {
          setPatient(docSnap.data());

          // Fetch patient's appointments
          const appointmentsRef = collection(db, "appointments");
          const q = query(appointmentsRef, where("patientId", "==", user.uid));
          const querySnapshot = await getDocs(q);

          const appointmentsData = [];
          querySnapshot.forEach((doc) => {
            appointmentsData.push({ id: doc.id, ...doc.data() });
          });

          setAppointments(appointmentsData);
        }
      } catch (error) {
        console.error("Error fetching patient data:", error);
      }
    };

    fetchPatientData();
  }, []);

  return (
    <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column", backgroundColor: "#f5f5f5" }}>
      
      {/* Header */}
      <Box sx={{ background: "linear-gradient(to right, #2c5364, #0f2027)", padding: "20px 0" }}>
        <Container>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="h5" sx={{ color: "white", fontWeight: "bold" }}>
              Patient Dashboard
            </Typography>
            <Button component={Link} to="/" sx={{ color: "white", fontSize: "18px" }}>Home</Button>
          </Box>
        </Container>
      </Box>

      {/* Patient Information */}
      <Box sx={{ flexGrow: 1, padding: "50px 0" }}>
        <Container>
          {patient ? (
            <>
              <Typography variant="h4" fontWeight="bold" textAlign="center" mb={4} color="#2c5364">
                Welcome, {patient.username}
              </Typography>

              <Paper sx={{ padding: "30px", marginBottom: "40px", borderRadius: "10px" }}>
                <Typography variant="h6" sx={{ marginBottom: "10px" }}><strong>Email:</strong> {patient.email}</Typography>
                <Typography variant="h6" sx={{ marginBottom: "10px" }}><strong>Age:</strong> {patient.age}</Typography>
                <Typography variant="h6" sx={{ marginBottom: "10px" }}><strong>Gender:</strong> {patient.gender}</Typography>
                <Typography variant="h6" sx={{ marginBottom: "10px" }}><strong>Contact Number:</strong> {patient.contactNumber}</Typography>
                <Typography variant="h6" sx={{ marginBottom: "10px" }}><strong>Date of Birth:</strong> {patient.dob}</Typography>
              </Paper>
              
              {/* Appointments Section */}
              <Typography variant="h5" fontWeight="bold" textAlign="center" mb={3} color="#2c5364">
                Your Appointments
              </Typography>

              {appointments.length > 0 ? (
                <Grid container spacing={4} justifyContent="center">
                  {appointments.map((appointment) => (
                    <Grid item xs={12} sm={6} md={4} key={appointment.id}>
                      <Paper sx={{ padding: "20px", textAlign: "center", borderRadius: "10px", backgroundColor: "#ffffff", transition: "0.3s", "&:hover": { boxShadow: "0px 4px 30px rgba(0,0,0,0.2)", transform: "translateY(-5px)" } }}>
                        <Typography variant="h6" sx={{ marginBottom: "10px" }}><strong>Doctor:</strong> {appointment.doctorName}</Typography>
                        <Typography variant="body1" sx={{ marginBottom: "10px" }}><strong>Date:</strong> {appointment.date}</Typography>
                        <Typography variant="body1" sx={{ marginBottom: "10px" }}><strong>Time:</strong> {appointment.time}</Typography>
                        <Typography variant="body1"><strong>Reason:</strong> {appointment.reason}</Typography>
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
              Loading patient information...
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

export default PatientDashboard;
