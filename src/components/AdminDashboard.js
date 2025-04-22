import React, { useEffect, useState } from "react";
import { Box, Container, Typography, Paper, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { db, auth } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

const AdminDashboard = () => {
  const [admin, setAdmin] = useState(null);
  const [hospital, setHospital] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const user = auth.currentUser;
        if (!user) {
          console.log("User not logged in!");
          return;
        }

        // ✅ Fetch admin data from Firestore
        const adminRef = doc(db, "users", user.uid);
        const adminSnap = await getDoc(adminRef);

        if (adminSnap.exists()) {
          const adminData = adminSnap.data();
          setAdmin(adminData);

          // ✅ Fetch hospital details using hospitalId
          if (adminData.hospitalId) {
            const hospitalRef = doc(db, "hospitals", adminData.hospitalId);
            const hospitalSnap = await getDoc(hospitalRef);

            if (hospitalSnap.exists()) {
              setHospital(hospitalSnap.data()); // ✅ Set hospital data
            } else {
              console.log("Hospital details not found!");
            }
          }
        } else {
          console.log("Admin data not found!");
        }
      } catch (error) {
        console.error("Error fetching admin data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAdminData();
  }, []);

  return (
    <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column", backgroundColor: "#f5f5f5" }}>
      {/* Header */}
      <Box sx={{ background: "linear-gradient(to right, #2c5364, #0f2027)", padding: "20px 0" }}>
        <Container>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="h5" sx={{ color: "white", fontWeight: "bold" }}>
              Hospital Admin Dashboard
            </Typography>
            <Button component={Link} to="/" sx={{ color: "white", fontSize: "18px" }}>Logout</Button>
          </Box>
        </Container>
      </Box>

      {/* Main Content */}
      <Container sx={{ padding: "50px 0", flexGrow: 1 }}>
        {loading ? (
          <Typography variant="h5" textAlign="center" color="gray">
            Loading admin information...
          </Typography>
        ) : (
          <>
            {admin ? (
              <>
                {/* Admin Info */}
                <Typography variant="h4" fontWeight="bold" textAlign="center" mb={4} color="#2c5364">
                  Welcome, {admin.username}
                </Typography>

                <Paper sx={{ padding: "30px", marginBottom: "40px", borderRadius: "10px" }}>
                  <Typography variant="h6"><strong>Email:</strong> {admin.email}</Typography>
                  <Typography variant="h6"><strong>Role:</strong> {admin.role}</Typography>
                </Paper>

                {/* Hospital Info */}
                {admin ? (
                  <>
                    <Typography variant="h5" fontWeight="bold" textAlign="center" mb={3} color="#2c5364">
                      Hospital Information
                    </Typography>

                    <Paper sx={{ padding: "30px", borderRadius: "10px" }}>
                      <Typography variant="h6"><strong>Hospital Name:</strong> {admin.hospitalName}</Typography>
                      <Typography variant="h6"><strong>Address:</strong> {admin.hospitalAddress}</Typography>
                      <Typography variant="h6"><strong>Sector:</strong> {admin.hospitalSector}</Typography>
                      <Typography variant="h6"><strong>Contact: +91</strong> {admin.hospitalContact}</Typography>
                    </Paper>
                  </>
                ) : (
                  <Typography variant="body1" textAlign="center" color="gray">
                    No hospital details found.
                  </Typography>
                )}
              </>
            ) : (
              <Typography variant="h5" textAlign="center" color="gray">
                Admin details not found.
              </Typography>
            )}
          </>
        )}
      </Container>

      {/* Footer */}
      <Box sx={{ backgroundColor: "#0f2027", color: "white", textAlign: "center", padding: "20px", marginTop: "auto" }}>
        <Typography variant="body2">© 2025 Healthify. All rights reserved.</Typography>
      </Box>
    </Box>
  );
};

export default AdminDashboard;
