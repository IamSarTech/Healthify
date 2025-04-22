import React, { useState } from "react";
import { Container, TextField, Button, Typography, Paper } from "@mui/material";

const Appointment = () => {
  const [appointment, setAppointment] = useState({
    doctor: "",
    date: "",
    time: "",
  });

  const handleChange = (e) => {
    setAppointment({ ...appointment, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Appointment Scheduled!");
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: "30px", marginTop: "50px" }}>
        <Typography variant="h5" gutterBottom>Schedule an Appointment</Typography>
        <TextField label="Doctor's Name" name="doctor" variant="outlined" fullWidth value={appointment.doctor} onChange={handleChange} sx={{ marginBottom: "15px" }} />
        <TextField label="Date" name="date" type="date" variant="outlined" fullWidth value={appointment.date} onChange={handleChange} sx={{ marginBottom: "15px" }} />
        <TextField label="Time" name="time" type="time" variant="outlined" fullWidth value={appointment.time} onChange={handleChange} sx={{ marginBottom: "15px" }} />
        <Button variant="contained" color="primary" fullWidth onClick={handleSubmit}>Book Appointment</Button>
      </Paper>
    </Container>
  );
};

export default Appointment;
