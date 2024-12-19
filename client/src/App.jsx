import { EthProvider } from "./contexts/EthContext";
import Home from "./components/Home";
import SignIn from "./components/signin";
import UniversityManagement from "./components/UniversityManagement";
import StaffManagement from "./components/StaffManagement";
import CertificateRegistration from "./components/ManageCertificate";

import { createTheme, ThemeProvider } from "@mui/material/styles";
function App() {
  const theme = createTheme({
    typography: {
      fontFamily: "'Roboto', sans-serif",
      h1: {
        fontWeight: 600,
        fontSize: "2rem",
      },
      h2: {
        fontWeight: 600,
        fontSize: "1.8rem",
      },
      h3: {
        fontWeight: 500,
        fontSize: "1.6rem",
      },
      h4: {
        fontWeight: 500,
        fontSize: "1.4rem",
      },
      h5: {
        fontWeight: 500,
        fontSize: "1.2rem",
      },
      h6: {
        fontWeight: 500,
        fontSize: "1rem",
      },
      body1: {
        fontWeight: 400,
        fontSize: "1rem",
      },
      body2: {
        fontWeight: 400,
        fontSize: "0.875rem",
      },
    },
  });
  console.log(process.env.REACT_APP_FIREBASE_API_KEY);
  debugger;
  return (
    <EthProvider>
      <ThemeProvider theme={theme}>
        {/* <Home /> */}
        {/* <SignIn /> */}
        <CertificateRegistration />
      </ThemeProvider>
    </EthProvider>
    
  );
}

export default App;
