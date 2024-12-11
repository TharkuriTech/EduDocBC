import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";

const StyledCard = styled(Box)(({ theme }) => ({
    backgroundColor: "#fff",
    padding: theme.spacing(4),
    borderRadius: "8px",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
    maxWidth: "70%", // Increased from 600px
    margin: "auto",
    [theme.breakpoints.down("sm")]: {
      width: "95%",
    },
  }));
  const StyledTextField = styled(TextField)(({ theme }) => ({
    "& .MuiInputBase-root": {
      fontSize: "14px", // Slightly larger for better readability
      height: "40px",
    },
  }));
  
  const StyledButton = styled(Button)(({ theme }) => ({
    fontSize: "14px", // Match text box font
    height: "40px",
    padding: "0 20px",
    borderRadius: "6px",
  }));
  

export default function StaffRegistrationForm() {
  const db = require("../firebase");

  const [formData, setFormData] = React.useState({
    university: "",
    staffName: "",
    userName: "",
    password: "",
    email: "",
    phoneNumber: "",
    certificateAccess: "no",
  });

  const [errors, setErrors] = React.useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: value.trim() === "",
    });
  };

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    Object.entries(formData).forEach(([key, value]) => {
      if (value.trim() === "" && key !== "certificateAccess") {
        newErrors[key] = true;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        await db.collection("staff").add(formData);
        console.log("Data inserted successfully!");
        handleClear(); // Clear the form after successful submission
      } catch (error) {
        console.error("Error adding document: ", error);
      }
    }
  };

  const handleClear = () => {
    setFormData({
      university: "",
      staffName: "",
      userName: "",
      password: "",
      email: "",
      phoneNumber: "",
      certificateAccess: "no",
    });
    setErrors({});
  };

  return (
    <Box
      sx={{
        backgroundColor: "#f9f9f9",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 2,
      }}
    >
      <StyledCard>
        <Typography
          component="h1"
          variant="h5"
          sx={{ fontWeight: "bold", textAlign: "center", marginBottom: 3 }}
        >
          Staff Registration
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <FormControl fullWidth>
                <FormLabel>University</FormLabel>
                <StyledTextField
                  size="small"
                  name="university"
                  value={formData.university}
                  onChange={handleChange}
                  error={!!errors.university}
                  helperText={errors.university ? "Required" : ""}
                  placeholder="Enter university"
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={4}>
              <FormControl fullWidth>
                <FormLabel>Staff Name</FormLabel>
                <StyledTextField
                  size="small"
                  name="staffName"
                  value={formData.staffName}
                  onChange={handleChange}
                  error={!!errors.staffName}
                  helperText={errors.staffName ? "Required" : ""}
                  placeholder="Enter staff name"
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={4}>
              <FormControl fullWidth>
                <FormLabel>Username</FormLabel>
                <StyledTextField
                  size="small"
                  name="userName"
                  value={formData.userName}
                  onChange={handleChange}
                  error={!!errors.userName}
                  helperText={errors.userName ? "Required" : ""}
                  placeholder="Enter username"
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={4}>
              <FormControl fullWidth>
                <FormLabel>Password</FormLabel>
                <StyledTextField
                  size="small"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  error={!!errors.password}
                  helperText={errors.password ? "Required" : ""}
                  placeholder="Enter password"
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={4}>
              <FormControl fullWidth>
                <FormLabel>Email</FormLabel>
                <StyledTextField
                  size="small"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  error={!!errors.email}
                  helperText={errors.email ? "Required" : ""}
                  placeholder="Enter email"
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={4}>
              <FormControl fullWidth>
                <FormLabel>Phone Number</FormLabel>
                <StyledTextField
                  size="small"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  error={!!errors.phoneNumber}
                  helperText={errors.phoneNumber ? "Required" : ""}
                  placeholder="Enter phone number"
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormLabel>Certificate Access</FormLabel>
              <RadioGroup
                row
                name="certificateAccess"
                value={formData.certificateAccess}
                onChange={handleChange}
              >
                <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="no" control={<Radio />} label="No" />
              </RadioGroup>
            </Grid>
          </Grid>
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              gap:2,
              marginTop: 2,
            }}
          >
            <StyledButton variant="contained" color="primary" type="submit">
              Submit
            </StyledButton>
            <StyledButton
              variant="outlined"
              color="secondary"
              onClick={handleClear}
            >
              Clear
            </StyledButton>
          </Box>
        </form>
      </StyledCard>
    </Box>
  );
}
