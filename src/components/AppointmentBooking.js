import React, { useState, useEffect } from "react";
import { 
  Box, Container, Typography, TextField, Button, MenuItem, Grid, Paper 
} from "@mui/material";
import { Link } from "react-router-dom";
import { db, auth } from "../firebase"; 
import { collection, addDoc, getDocs, query, where, doc, getDoc } from "firebase/firestore";
import backgroundImage from "../aboutusback.png";

const AppointmentBooking = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    date: "",
    time: "",
    doctor: "",
    doctorId: "",
    patientId: "",
  });

  const [doctors, setDoctors] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState("");

  // Fetch patient details from Firestore
  useEffect(() => {
    const fetchPatientDetails = async () => {
      const user = auth.currentUser;
      if (!user) return;

      try {
        const userDocRef = doc(db, "users", user.uid);
        const userDocSnap = await getDoc(userDocRef);

        if (userDocSnap.exists() && userDocSnap.data().role === "patient") {
          setFormData((prevData) => ({
            ...prevData,
            name: userDocSnap.data().username || "",
            email: userDocSnap.data().email || "",
            patientId: user.uid,
          }));
        }
      } catch (err) {
        console.error("❌ Error fetching patient data:", err);
        setError("Failed to fetch patient details. Please try again.");
      }
    };

    fetchPatientDetails();
  }, []);

  // Fetch doctors from Firestore
  useEffect(() => {
    const fetchDoctors = async () => {
      setLoading(true);
      try {
        const q = query(collection(db, "users"), where("role", "==", "doctor"));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
          setError("No doctors available at the moment.");
          setDoctors([]);
        } else {
          const doctorList = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            name: doc.data().username || "Unknown Doctor",
            specialization: doc.data().specialization || "General",
          }));
          setDoctors(doctorList);
          setError(""); // Clear any previous errors
        }
      } catch (error) {
        console.error("❌ Error fetching doctors:", error);
        setError("Failed to fetch doctors. Please try again.");
      }
      setLoading(false);
    };

    fetchDoctors();
  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const selectedDoctor = doctors.find((doc) => doc.name === formData.doctor);
  
      if (!selectedDoctor) {
        alert("Please select a valid doctor.");
        return;
      }
  
      const newAppointment = {
        patientId: formData.patientId,
        patientName: formData.name,
        patientEmail: formData.email,
        doctorName: formData.doctor,
        doctorId: selectedDoctor.id,
        date: formData.date,
        time: formData.time,
        status: "Scheduled",
        createdAt: new Date(),
      };
  
      // Write to Firestore
      await addDoc(collection(db, "appointments"), newAppointment);
  
      alert(`✅ Appointment booked successfully!`);
  
      setFormData((prevData) => ({
        ...prevData,
        date: "",
        time: "",
        doctor: "",
        doctorId: "",
      }));
    } catch (error) {
      console.error("❌ Error booking appointment:", error);
      alert(`❌ Failed to book appointment. Error: ${error.message}`);
    }
  };

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#f5f5f5", margin: 0 }}>
      {/* Navigation */}
      <Box sx={{ background: "linear-gradient(to right, #2c5364, #0f2027)", padding: "10px 0" }}>
        <Container>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Box display="flex" gap="40px">
              <Button component={Link} to="/" sx={{ color: "white", fontWeight: "bold", fontSize: "18px" }}>Home</Button>
              <Button component={Link} to="/services" sx={{ color: "white", fontSize: "18px" }}>Services</Button>
              <Button component={Link} to="/contact" variant="contained" sx={{ backgroundColor: "#0d3b66", color: "white", borderRadius: "25px", padding: "10px 25px", fontSize: "16px" }}>Contact</Button>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Appointment Booking Section */}
      <Box
        sx={{
          minHeight: "80vh",
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "50px 0",
        }}
      >
        <Container>
          <Grid container justifyContent="center">
            <Grid item xs={12} sm={8} md={6}>
              <Paper elevation={3} sx={{ padding: "40px", borderRadius: "12px", backgroundColor: "rgba(255, 255, 255, 0.9)" }}>
                <Typography variant="h4" fontWeight="bold" gutterBottom>Book an Appointment</Typography>

                {error && <Typography color="error" textAlign="center">{error}</Typography>}
                
                <form onSubmit={handleSubmit}>
                  <TextField fullWidth label="Full Name" name="name" value={formData.name} disabled sx={{ marginBottom: "15px" }} />
                  <TextField fullWidth label="Email" type="email" name="email" value={formData.email} disabled sx={{ marginBottom: "15px" }} />
                  <TextField fullWidth label="Appointment Date" type="date" name="date" InputLabelProps={{ shrink: true }} value={formData.date} onChange={handleChange} required sx={{ marginBottom: "15px" }} />
                  <TextField fullWidth label="Appointment Time" type="time" name="time" InputLabelProps={{ shrink: true }} value={formData.time} onChange={handleChange} required sx={{ marginBottom: "15px" }} />
                  
                  {/* Doctor Selection Dropdown */}
                  <TextField select fullWidth label="Select Doctor" name="doctor" value={formData.doctor} onChange={handleChange} required sx={{ marginBottom: "20px" }}>
                    {loading ? (
                      <MenuItem disabled>Loading doctors...</MenuItem>
                    ) : doctors.length > 0 ? (
                      doctors.map((doc) => (
                        <MenuItem key={doc.id} value={doc.name}>
                          {doc.name} - {doc.specialization}
                        </MenuItem>
                      ))
                    ) : (
                      <MenuItem disabled>No available doctors</MenuItem>
                    )}
                  </TextField>

                  <Button type="submit" variant="contained" color="primary" fullWidth sx={{ padding: "12px", fontSize: "16px", fontWeight: "bold", borderRadius: "25px", backgroundColor: "#1976D2" }}>
                    Book Appointment
                  </Button>
                </form>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default AppointmentBooking;
