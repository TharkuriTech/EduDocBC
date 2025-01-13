
import { styled } from "@mui/material/styles";
import Stack from '@mui/material/Stack';
import MuiCard from '@mui/material/Card';
import {
    Box,
    Button,
    TextField,
    TableRow,
  } from "@mui/material";

export const StyledCard = styled(Box)(({ theme }) => ({
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

export const StyledButton = styled(Button)(({ theme }) => ({
  fontSize: "14px",
  height: "40px",
  padding: "0 20px",
  borderRadius: "6px",
}));

export  const StyledTableHead = styled(TableRow)(({ theme }) => ({
    backgroundColor: theme.palette.primary.main,
    "& th": {
      color: theme.palette.common.white,
      fontWeight: "bold",
      textAlign: "center",
      padding: theme.spacing(1.5),
    },
  }));

  export const Card = styled(MuiCard)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignSelf: 'center',
    width: '100%',
    padding: theme.spacing(4),
    gap: theme.spacing(2),
    margin: 'auto',
    [theme.breakpoints.up('sm')]: {
      maxWidth: '450px',
    },
    boxShadow:
      'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
    ...theme.applyStyles('dark', {
      boxShadow:
        'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
    }),
  }));
  
  export const SignInContainer = styled(Stack)(({ theme }) => ({
    height: 'calc((1 - var(--template-frame-height, 0)) * 100dvh)',
    minHeight: '100%',
    padding: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(4),
    },
    '&::before': {
      content: '""',
      display: 'block',
      position: 'absolute',
      zIndex: -1,
      inset: 0,
      backgroundImage:
        'radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))',
      backgroundRepeat: 'no-repeat',
      ...theme.applyStyles('dark', {
        backgroundImage:
          'radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))',
      }),
    },
  }));
  

  export const StyledTextField = styled(TextField)(({ theme }) => ({
    "& .MuiInputBase-root": {
      fontSize: "14px",
      height: "40px",
    },
  }));

  