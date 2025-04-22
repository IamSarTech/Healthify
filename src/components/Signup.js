import React, { useState } from "react";
import { 
  Container, Box, TextField, Button, Typography, Paper, MenuItem, Select, FormControl, InputLabel 
} from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase"; // Firebase authentication & Firestore
import { doc, setDoc } from "firebase/firestore";
import backgroundImage from "../aboutusback.png";
import "../style.css"; 

const SignUp = () => {
  const [role, setRole] = useState(""); 
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Patient Fields
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [dob, setDob] = useState("");

  // Hospital Fields
  const [hospitalName, setHospitalName] = useState("");
  const [hospitalAddress, setHospitalAddress] = useState("");
  const [hospitalSector, setHospitalSector] = useState(""); // Private/Govt
  const [hospitalContact, setHospitalContact] = useState("");

  // Doctor Fields
  const [specialization, setSpecialization] = useState("");
  const [licenseNumber, setLicenseNumber] = useState("");

  const navigate = useNavigate();

  const handleSignUp = async () => {
    if (!role) {
      alert("Please select a role before signing up.");
      return;
    }
    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      const userData = {
        username,
        email,
        role,
      };

      // Store Patient Data
      if (role === "patient") {
        userData.age = age;
        userData.gender = gender;
        userData.contactNumber = contactNumber;
        userData.dob = dob;
      }

      // Store Hospital Data
      if (role === "hospital") {
        userData.hospitalName = hospitalName;
        userData.hospitalAddress = hospitalAddress;
        userData.hospitalSector = hospitalSector;
        userData.hospitalContact = hospitalContact;
      }

      // Store Doctor Data
      if (role === "doctor") {
        userData.specialization = specialization;
        userData.licenseNumber = licenseNumber;
      }

      // Store Data in Firestore
      await setDoc(doc(db, "users", user.uid), userData);

      alert("✅ Account created successfully!");

      // Navigate to respective dashboard
      if (role === "hospital") navigate("/admin-dashboard");
      else if (role === "doctor") navigate("/doctor-dashboard");
      else navigate("/patient-dashboard");

    } catch (error) {
      alert(`❌ ${error.message}`);
    }
  };

  return (
    <Box sx={{ 
      minHeight: "100vh", 
      display: "flex", 
      flexDirection: "column", 
      backgroundImage: `url(${backgroundImage})`, 
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
    }}>
      
      {/* Navigation Header */}
      <Box sx={{ background: "linear-gradient(to right, #2c5364, #0f2027)", padding: "10px 0" }}>
        <Container>
          <Box display="flex" justifyContent="center" gap="40px">
            <Button component={Link} to="/" sx={{ color: "white", fontWeight: "bold", fontSize: "18px" }}>Home</Button>
            <Button component={Link} to="/services" sx={{ color: "white", fontSize: "18px" }}>Services</Button>
            <Button component={Link} to="/contact" variant="contained" sx={{ backgroundColor: "#0d3b66", color: "white", borderRadius: "25px", padding: "10px 25px", fontSize: "16px", fontWeight: "bold", "&:hover": { backgroundColor: "#09234B" } }}>
              Contact
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Sign Up Form */}
      <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "center", alignItems: "center", padding: "50px 0", boxShadow: "inset 0 0 0 2000px rgba(0, 0, 0, 0.3)" }}>
        <Container maxWidth="sm">
          <Paper elevation={5} sx={{ padding: "30px", borderRadius: "10px" }}>
            <Box textAlign="center" mb={3}>
              <LockIcon sx={{ fontSize: 40, color: "#1976D2" }} />
              <Typography variant="h5" fontWeight="bold">Create an Account</Typography>
              <Typography variant="body2" color="textSecondary">Join Healthify to manage your healthcare data</Typography>
            </Box>

            {/* Role Selection */}
            <FormControl fullWidth sx={{ marginBottom: "16px" }}>
              <InputLabel>Select Role</InputLabel>
              <Select value={role} onChange={(e) => setRole(e.target.value)} label="Select Role">
                <MenuItem value="hospital">Hospital Management</MenuItem>
                <MenuItem value="doctor">Doctor</MenuItem>
                <MenuItem value="patient">Patient</MenuItem>
              </Select>
            </FormControl>

            {/* Common Fields */}
            <TextField fullWidth label="Username" variant="outlined" margin="normal" value={username} onChange={(e) => setUsername(e.target.value)} sx={{ marginBottom: "16px" }} />
            <TextField fullWidth label="Email" type="email" variant="outlined" margin="normal" value={email} onChange={(e) => setEmail(e.target.value)} sx={{ marginBottom: "16px" }} />
            <TextField fullWidth label="Password" type="password" variant="outlined" margin="normal" value={password} onChange={(e) => setPassword(e.target.value)} sx={{ marginBottom: "16px" }} />
            <TextField fullWidth label="Confirm Password" type="password" variant="outlined" margin="normal" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} sx={{ marginBottom: "16px" }} />

            {/* Doctor Fields */}
            {role === "doctor" && (
              <>
                <TextField fullWidth label="Specialization" variant="outlined" margin="normal" value={specialization} onChange={(e) => setSpecialization(e.target.value)} sx={{ marginBottom: "16px" }} />
                <TextField fullWidth label="License Number" variant="outlined" margin="normal" value={licenseNumber} onChange={(e) => setLicenseNumber(e.target.value)} sx={{ marginBottom: "16px" }} />
              </>
            )}

            {/* Patient Fields */}
            {role === "patient" && (
              <>
                <TextField fullWidth label="Age" variant="outlined" margin="normal" value={age} onChange={(e) => setAge(e.target.value)} sx={{ marginBottom: "16px" }} />
                <TextField fullWidth label="Gender" variant="outlined" margin="normal" value={gender} onChange={(e) => setGender(e.target.value)} sx={{ marginBottom: "16px" }} />
                <TextField fullWidth label="DOB" type="date" variant="outlined" margin="normal" value={dob} onChange={(e) => setDob(e.target.value)} sx={{ marginBottom: "16px" }} InputLabelProps={{ shrink: true }} />
                <TextField fullWidth label="Contact Number" variant="outlined" margin="normal" value={contactNumber} onChange={(e) => setContactNumber(e.target.value)} sx={{ marginBottom: "16px" }} />
              </>
            )}

            {/* Hospital Fields */}
            {role === "hospital" && (
              <>
                <TextField fullWidth label="Hospital Name" variant="outlined" margin="normal" value={hospitalName} onChange={(e) => setHospitalName(e.target.value)} sx={{ marginBottom: "16px" }} />
                <TextField fullWidth label="Hospital Address" variant="outlined" margin="normal" value={hospitalAddress} onChange={(e) => setHospitalAddress(e.target.value)} sx={{ marginBottom: "16px" }} />
                <FormControl fullWidth sx={{ marginBottom: "16px" }}>
                  <InputLabel>Hospital Sector</InputLabel>
                  <Select value={hospitalSector} onChange={(e) => setHospitalSector(e.target.value)}>
                    <MenuItem value="private">Private</MenuItem>
                    <MenuItem value="government">Government</MenuItem>
                  </Select>
                </FormControl>
                <TextField fullWidth label="Hospital Contact" variant="outlined" margin="normal" value={hospitalContact} onChange={(e) => setHospitalContact(e.target.value)} sx={{ marginBottom: "16px" }} />
              </>
            )}

            <Button fullWidth variant="contained" color="primary" sx={{ borderRadius: "25px", padding: "12px" }} onClick={handleSignUp}>
              Sign Up
            </Button>
          </Paper>
        </Container>
      </Box>
    </Box>
  );
};

export default SignUp;
