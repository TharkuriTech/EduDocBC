import React, { useState, useEffect,  useContext } from "react";
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
} from "@mui/material";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import { styled } from "@mui/material/styles";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import database from "../firebase";
import EthContext from "../contexts/EthContext/EthContext";
import { CreateUniversity } from "../content/js/BlockchainIntraction";

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
const StyledTextField = styled(TextField)(({ theme }) => ({
  "& .MuiInputBase-root": {
    fontSize: "14px",
    height: "40px",
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
export default function UniversityRegistrationForm() {
  const { state } = useContext(EthContext);
  const { web3, accounts, networkID, contract } = state;

  const [formData, setFormData] = useState({
    universityName: "",
    UniversityCode: "",
    userName: "",
    password: "",
    Address: "",
    IsActive: "no",
  });

  const [Uweb3, setweb3] = useState(web3);
  const [Uaccounts, setaccounts] = useState(accounts);
  const [UnetworkID, setnetworkID] = useState(networkID);
  const [Ucontract, setcontract] = useState(contract);
  const [errors, setErrors] = useState({});
  const [UniversityList, setUniversityList] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    refreshData();
  }, []);

  const refreshData = async () => {
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
          await database.ref(`University/${editId}`).update(formData);
          if(formData.IsActive)
          {
            var param = {
              UCode : formData.UniversityCode,
              UName : formData.userName,
              Password : formData.password,
              Address : formData.Address,
            }
            CreateUniversity(param,contract,accounts);
          }
         
        } else {
          const newRef = database.ref("University").push();
          await newRef.set(formData);
          if(formData.IsActive)
            {
              var param = {
                UCode : formData.UniversityCode,
                UName : formData.userName,
                Password : formData.password,
                Address : formData.Address,
              }
              CreateUniversity(param,contract,accounts);
            }
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
      UniversityName: "",
      userName: "",
      password: "",
      phoneNumber: "",
      certificateAccess: "no",
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
      await database.ref(`University/${deleteId}`).remove();
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
              <FormControl fullWidth>
                <FormLabel>Address</FormLabel>
                <StyledTextField
                  size="small"
                  name="Address"
                  value={formData.Address}
                  onChange={handleChange}
                  error={!!errors.Address}
                  helperText={errors.Address ? "Required" : ""}
                  placeholder="Enter Address"
                />
              </FormControl>
            </Grid>

            <Grid item xs={12}>
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
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <StyledTableHead>
                  <TableCell>University Name</TableCell>
                  <TableCell>University Code</TableCell>
                  <TableCell>Username</TableCell>
                  <TableCell>Address</TableCell>
                  <TableCell>Active</TableCell>
                  <TableCell>Actions</TableCell>
                </StyledTableHead>
              </TableHead>
              <TableBody>
                {UniversityList.map((University) => (
                  <TableRow key={University.id}>
                    <TableCell>{University.universityName}</TableCell>
                    <TableCell>{University.UniversityCode}</TableCell>
                    <TableCell>{University.userName}</TableCell>
                    <TableCell>{University.Address}</TableCell>
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
