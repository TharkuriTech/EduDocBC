import React, { useState, useEffect, useContext } from "react";
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
  TablePagination,
} from "@mui/material";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import database from "../firebase";
import EthContext from "../contexts/EthContext/EthContext";
import {
  StyledCard,
  StyledButton,
  StyledTableHead,
  StyledTextField,
} from "../content/js/style";
import {fireAlert} from "../content/js/app";
import { useAuth } from "../contexts/EthContext/AuthContext"; 


export default function UniversityRegistrationForm() {
  debugger
  const { state } = useContext(EthContext);
  const [formData, setFormData] = useState({
    universityName: "",
    UniversityCode: "",
    userName: "",
    password: "",
    IsActive: "no",
  });
 const { isLoggedIn } = useAuth();
  const [errors, setErrors] = useState({});
  const [UniversityList, setUniversityList] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [Unversitydata, setUnversitydata] = useState([]);
  let GetInitiated = 0;

  useEffect(() => {
    refreshData(true);
  }, []);

  const refreshData = async (flag) => {
    const snapshot = await database.ref("University").once("value");
    if (snapshot.exists()) {
      const data = snapshot.val();
      setUniversityList(
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
          const param = {
            UCode: formData.UniversityCode,
            UName: formData.userName,
            Password: formData.password,
            isremove: formData.IsActive !== "yes",
          };
            await database.ref(`University/${editId}`).update(formData);
        } else {
          // validation
          const snapshot = await database.ref("University").once("value");
          if (snapshot.exists()) {
            const universities = Object.values(snapshot.val());
            const isDuplicate = universities.some(
              (university) =>
                university.UniversityCode === formData.UniversityCode 
            );

            if (isDuplicate) {
              setLoading(false);
              fireAlert(
                "Duplicate entry: University code or address already exists.",
                "error"
              );
              return;
            }
          }
          //var result = false;
          if (formData.IsActive == "yes") {
            const param = {
              UCode: formData.UniversityCode,
              UName: formData.userName,
              Password: formData.password
            };
          }
            const newRef = database.ref("University").push();
            await newRef.set(formData);
        }
        handleClear();
        setEditMode(false);
        setEditId(null);
        refreshData(false);
      } catch (error) {
        console.error("Error submitting form:", error);
      }
      setLoading(false);
    }
  };

  const handleClear = () => {
    setFormData({
      universityName: "",
      UniversityCode: "",
      userName: "",
      password: "",
      IsActive: "no",
    });
    setErrors({});
  };

  const handleEdit = (id) => {
    const University = UniversityList.find((item) => item.id === id);
    if (University) {
      setFormData(University);
      setEditMode(true);
      setEditId(id);
    }
  };

  const openDeleteDialog = (id) => {
    const University = UniversityList.find((item) => item.id === id);
    formData.IsActive = false;
    formData.UniversityCode = University.UniversityCode;
    formData.userName = University.userName;
    formData.password = University.password;
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
      const param = {
        UCode: formData.UniversityCode,
        UName: formData.userName,
        Password: formData.password,
        isremove: true,
      };
        await database.ref(`University/${deleteId}`).remove();
        refreshData();
        closeDeleteDialog();
    } catch (error) {
      console.error("Error deleting record:", error);
    }
    setLoading(false);
  };

  // Handle pagination
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const displayedRows = UniversityList.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

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
          {editMode ? "Edit University" : "University Registration"}
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <FormControl fullWidth>
                <FormLabel>University Name</FormLabel>
                <TextField
                  size="small"
                  name="universityName"
                  value={formData.universityName}
                  onChange={handleChange}
                  error={!!errors.universityName}
                  helperText={errors.universityName ? "Required" : ""}
                  placeholder="Enter University Name"
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={4}>
              <FormControl fullWidth>
                <FormLabel>University Code</FormLabel>
                <StyledTextField
                  size="small"
                  name="UniversityCode"
                  value={formData.UniversityCode}
                  onChange={handleChange}
                  error={!!errors.UniversityCode}
                  helperText={errors.UniversityCode ? "Required" : ""}
                  placeholder="Enter University Code"
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
              <FormLabel>Active</FormLabel>
              <RadioGroup
                row
                name="IsActive"
                value={formData.IsActive}
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
          <TableContainer component={Paper} style={{ maxHeight: "300px" }}>
            <Table stickyHeader>
              <TableHead stickyHeader>
                <StyledTableHead>
                  <TableCell style={{ background: "#1976d2" }}>
                    University Name
                  </TableCell>
                  <TableCell style={{ background: "#1976d2" }}>
                    University Code
                  </TableCell>
                  <TableCell style={{ background: "#1976d2" }}>
                    Username
                  </TableCell>
                  <TableCell style={{ background: "#1976d2" }}>
                    Active
                  </TableCell>
                  <TableCell style={{ background: "#1976d2" }}>
                    Actions
                  </TableCell>
                </StyledTableHead>
              </TableHead>
              <TableBody>
                {displayedRows.map((University) => (
                  <TableRow key={University.id}>
                    <TableCell>{University.universityName}</TableCell>
                    <TableCell>{University.UniversityCode}</TableCell>
                    <TableCell>{University.userName}</TableCell>
                    <TableCell>{University.IsActive}</TableCell>
                    <TableCell>
                      <IconButton
                        color="primary"
                        onClick={() => handleEdit(University.id)}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        color="error"
                        onClick={() => openDeleteDialog(University.id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <TablePagination
            rowsPerPageOptions={[5, 10, 15]}
            component="div"
            count={UniversityList.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Box>
      </StyledCard>

      <Dialog open={deleteDialogOpen} onClose={closeDeleteDialog}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this University record? This action
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
