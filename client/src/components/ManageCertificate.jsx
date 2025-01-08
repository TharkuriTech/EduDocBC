import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Grid,
  TextField,
  Typography,
  CircularProgress,
  MenuItem,
  Select,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import database from "../firebase";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const StyledCard = styled(Box)(({ theme }) => ({
  backgroundColor: "#fff",
  padding: theme.spacing(4),
  borderRadius: "8px",
  boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
  maxWidth: "90%",
  margin: "auto",
  [theme.breakpoints.down("sm")]: {
    width: "95%",
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  fontSize: "14px",
  height: "40px",
  padding: "0 20px",
  borderRadius: "6px",
}));

  const StyledTableHead = styled(TableRow)(({ theme }) => ({
    backgroundColor: theme.palette.primary.main,
    "& th": {
      color: theme.palette.common.white,
      fontWeight: "bold",
      textAlign: "center",
      padding: theme.spacing(1.5),
    },
  }));
export default function CertificateRegistration() {
  const [formData, setFormData] = useState({
    studentName: "",
    DOB: null,
    fatherName: "",
    universityName: "",
    collegeCode: "",
    degree: "",
    stream: "",
    grade: "",
    year: "",
    studentNumber: "",
    certificateNumber: "",
    certificateAuthorizedPerson: "",
    issuedDate: null,
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [certificatesList, setcertificatesList] = useState([]);
    const [editMode, setEditMode] = useState(false);
    const [editId, setEditId] = useState(null);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [deleteId, setDeleteId] = useState(null);
  

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

  const handleDateChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    Object.entries(formData).forEach(([key, value]) => {
      if (!value && key !== "stream" && key !== "grade") {
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
      setLoading(true);
      try {
        const newRef = database.ref("certificates").push();
        await newRef.set(formData);
        handleClear();
      } catch (error) {
        console.error("Error submitting form:", error);
      }
      setLoading(false);
    }
  };
  const handleEdit = (id) => {
    const certificates = certificatesList.find((item) => item.id === id);
    if (certificates) {
      setFormData(certificates);
      setEditMode(true);
      setEditId(id);
    }
  };

  const openDeleteDialog = (id) => {
    setDeleteDialogOpen(true);
    setDeleteId(id);
  };

  const closeDeleteDialog = () => {
    setDeleteDialogOpen(false);
    setDeleteId(null);
  };
   useEffect(() => {
      refreshData();
    }, []);
  
  const refreshData = async () => {
    const snapshot = await database.ref("certificates").once("value");
    if (snapshot.exists()) {
      const data = snapshot.val();
      setcertificatesList(Object.entries(data).map(([id, details]) => ({ id, ...details })));
    }
  };
  const handleDelete = async () => {
    setLoading(true);
    try {
      await database.ref(`certificates/${deleteId}`).remove();
      refreshData();
      closeDeleteDialog();
    } catch (error) {
      console.error("Error deleting record:", error);
    }
    setLoading(false);
  };
  const handleClear = () => {
    setFormData({
      studentName: "",
      DOB: null,
      fatherName: "",
      universityName: "",
      collegeCode: "",
      degree: "",
      stream: "",
      grade: "",
      year: "",
      studentNumber: "",
      certificateNumber: "",
      certificateAuthorizedPerson: "",
      issuedDate: null,
    });
    setErrors({});
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box
        sx={{
          backgroundColor: "#f9f9f9",
          minHeight: "100vh",
          padding: 2,
        }}
      >
        <StyledCard>
          <Typography
            component="h1"
            variant="h5"
            sx={{ fontWeight: "bold", textAlign: "center", marginBottom: 3 }}
          >
            Certificate Registration
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <FormLabel>Student Name</FormLabel>
                  <TextField
                    size="small"
                    name="studentName"
                    value={formData.studentName}
                    onChange={handleChange}
                    error={!!errors.studentName}
                    helperText={errors.studentName ? "Required" : ""}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <FormLabel>Date of Birth</FormLabel>
                  <DatePicker
                    value={formData.DOB}
                    onChange={(value) => handleDateChange("DOB", value)}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        size="small"
                        error={!!errors.DOB}
                        helperText={errors.DOB ? "Required" : ""}
                      />
                    )}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <FormLabel>Father's Name</FormLabel>
                  <TextField
                    size="small"
                    name="fatherName"
                    value={formData.fatherName}
                    onChange={handleChange}
                    error={!!errors.fatherName}
                    helperText={errors.fatherName ? "Required" : ""}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <FormLabel>University Name</FormLabel>
                  <TextField
                    size="small"
                    name="universityName"
                    value={formData.universityName}
                    onChange={handleChange}
                    error={!!errors.universityName}
                    helperText={errors.universityName ? "Required" : ""}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <FormLabel>College Code</FormLabel>
                  <TextField
                    size="small"
                    name="collegeCode"
                    value={formData.collegeCode}
                    onChange={handleChange}
                    error={!!errors.collegeCode}
                    helperText={errors.collegeCode ? "Required" : ""}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <FormLabel>Degree</FormLabel>
                  <TextField
                    size="small"
                    name="degree"
                    value={formData.degree}
                    onChange={handleChange}
                    error={!!errors.degree}
                    helperText={errors.degree ? "Required" : ""}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <FormLabel>Stream</FormLabel>
                  <TextField
                    size="small"
                    name="stream"
                    value={formData.stream}
                    onChange={handleChange}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <FormLabel>Grade</FormLabel>
                  <TextField
                    size="small"
                    name="grade"
                    value={formData.grade}
                    onChange={handleChange}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <FormLabel>Year</FormLabel>
                  <Select
                    size="small"
                    name="year"
                    value={formData.year}
                    onChange={handleChange}
                    error={!!errors.year}
                  >
                    <MenuItem value="">Select Year</MenuItem>
                    <MenuItem value="2020">2020</MenuItem>
                    <MenuItem value="2021">2021</MenuItem>
                    <MenuItem value="2022">2022</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <FormLabel>Student Number</FormLabel>
                  <TextField
                    size="small"
                    name="studentNumber"
                    value={formData.studentNumber}
                    onChange={handleChange}
                    error={!!errors.studentNumber}
                    helperText={errors.studentNumber ? "Required" : ""}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <FormLabel>Certificate Number</FormLabel>
                  <TextField
                    size="small"
                    name="certificateNumber"
                    value={formData.certificateNumber}
                    onChange={handleChange}
                    error={!!errors.certificateNumber}
                    helperText={errors.certificateNumber ? "Required" : ""}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <FormLabel>Certificate Authorized Person</FormLabel>
                  <TextField
                    size="small"
                    name="certificateAuthorizedPerson"
                    value={formData.certificateAuthorizedPerson}
                    onChange={handleChange}
                    error={!!errors.certificateAuthorizedPerson}
                    helperText={errors.certificateAuthorizedPerson ? "Required" : ""}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <FormLabel>Issued Date</FormLabel>
                  <DatePicker
                    value={formData.issuedDate}
                    onChange={(value) => handleDateChange("issuedDate", value)}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        size="small"
                        error={!!errors.issuedDate}
                        helperText={errors.issuedDate ? "Required" : ""}
                      />
                    )}
                  />
                </FormControl>
              </Grid>
            </Grid>
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                gap: 2,
                marginTop: 2,
              }}
            >
              <StyledButton
                variant="contained"
                color="primary"
                type="submit"
              >
                {loading ? <CircularProgress size={24} /> : "Submit"}
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
          <Box sx={{ marginTop: 4 }}>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
              <StyledTableHead>
                  <TableCell>Name</TableCell>
                  <TableCell>Roll No</TableCell>
                <TableCell>University Name</TableCell>
                <TableCell>College</TableCell>
                <TableCell>Degree</TableCell>
                <TableCell>Grade</TableCell>
                <TableCell>Passedout Year</TableCell>
                <TableCell>Authorized Person</TableCell>
                <TableCell>Actions</TableCell>
                </StyledTableHead>
              </TableHead>
              <TableBody>
                {certificatesList.map((certificates) => (
                  <TableRow key={certificates.id}>
                    <TableCell>{certificates.studentName}</TableCell>
                     <TableCell>{certificates.studentNumber}</TableCell>
                  <TableCell>{certificates.universityName}</TableCell>
                  <TableCell>{certificates.collegeCode }</TableCell>
                  <TableCell>{certificates.degree + " - " + certificates.stream}</TableCell>
                  <TableCell>{certificates.grade}</TableCell>
                  <TableCell>{certificates.year}</TableCell>
                  <TableCell>{certificates.certificateAuthorizedPerson}</TableCell>
                    <TableCell>
                      <IconButton color="primary" onClick={() => handleEdit(certificates.id)}>
                        <EditIcon />
                      </IconButton>
                      <IconButton color="error" onClick={() => openDeleteDialog(certificates.id)}>
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
        </StyledCard>
      </Box>
    </LocalizationProvider>
  );
}
