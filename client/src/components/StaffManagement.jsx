import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Grid,
  IconButton,
  TextField,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Select,MenuItem,
} from "@mui/material";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import database from "../firebase";
import {
  StyledCard,
  StyledButton,
  StyledTableHead,
  StyledTextField,
} from "../content/js/style";
import { GetUniversityData, fireAlert } from "../content/js/app";

export default function StaffRegistrationForm(Ethdata) {
  const [formData, setFormData] = useState({
    university: "",
    staffName: "",
    userName: "",
    password: "",
    email: "",
    phoneNumber: "",
    certificateAccess: "no",
  });

  const [errors, setErrors] = useState({});
  const [staffList, setStaffList] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [UniverstiyData, setUniverstiyData] = useState([]);

  useEffect(() => {
    refreshData();
    var data  = GetUniversityData(database);
    setUniverstiyData(data);
  }, []);

  const refreshData = async () => {
    const snapshot = await database.ref("staff").once("value");
    if (snapshot.exists()) {
      const data = snapshot.val();
      setStaffList(
        Object.entries(data).map(([id, details]) => ({ id, ...details }))
      );
    }
  };

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
      setLoading(true);
      try {
        if (editMode) {
          await database.ref(`staff/${editId}`).update(formData);
        } else {
          const newRef = database.ref("staff").push();
          await newRef.set(formData);
        }
        handleClear();
        setEditMode(false);
        setEditId(null);
        refreshData();
      } catch (error) {
        console.error("Error submitting form:", error);
      }
      setLoading(false);
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

  const handleEdit = (id) => {
    const staff = staffList.find((item) => item.id === id);
    if (staff) {
      setFormData(staff);
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

  const handleDelete = async () => {
    setLoading(true);
    try {
      await database.ref(`staff/${deleteId}`).remove();
      refreshData();
      closeDeleteDialog();
    } catch (error) {
      console.error("Error deleting record:", error);
    }
    setLoading(false);
  };

  return (
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
          {editMode ? "Edit Staff" : "Staff Registration"}
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <FormControl fullWidth>
                <FormLabel>University</FormLabel>
                <Select
                  size="small"
                  name="university"
                  value={formData.university}
                  onChange={handleChange}
                  error={!!errors.university}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {
                   UniverstiyData.map((University) => (
                  <MenuItem value={University.UniversityCode}>{University.universityName}</MenuItem>
                   ))
                  }
                </Select>
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
              gap: 2,
              marginTop: 2,
            }}
          >
            <StyledButton variant="contained" color="primary" type="submit">
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
                  <TableCell>University</TableCell>
                  <TableCell>Staff Name</TableCell>
                  <TableCell>Username</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Phone Number</TableCell>
                  <TableCell>Certificate Access</TableCell>
                  <TableCell>Actions</TableCell>
                </StyledTableHead>
              </TableHead>
              <TableBody>
                {staffList.map((staff) => (
                  <TableRow key={staff.id}>
                    <TableCell>{staff.university}</TableCell>
                    <TableCell>{staff.staffName}</TableCell>
                    <TableCell>{staff.userName}</TableCell>
                    <TableCell>{staff.email}</TableCell>
                    <TableCell>{staff.phoneNumber}</TableCell>
                    <TableCell>{staff.certificateAccess}</TableCell>
                    <TableCell>
                      <IconButton
                        color="primary"
                        onClick={() => handleEdit(staff.id)}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        color="error"
                        onClick={() => openDeleteDialog(staff.id)}
                      >
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

      <Dialog open={deleteDialogOpen} onClose={closeDeleteDialog}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this staff record? This action
            cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDeleteDialog} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="error">
            {loading ? <CircularProgress size={24} /> : "Delete"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
