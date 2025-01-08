import { EthProvider } from "./contexts/EthContext";
import Home from "./components/Home";
import SignIn from "./components/signin";
import UniversityManagement from "./components/UniversityManagement";
import StaffManagement from "./components/StaffManagement";
import CertificateRegistration from "./components/ManageCertificate";

import { createTheme, ThemeProvider } from "@mui/material/styles";
function App() {
  return (
    <EthProvider>
        {/* <Home /> */}
        {/* <SignIn /> */}
        <UniversityManagement />
    </EthProvider>
    
  );
}

export default App;
