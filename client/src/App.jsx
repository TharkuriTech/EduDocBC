import { EthProvider } from "./contexts/EthContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from "./components/signin";
import UniversityManagement from "./components/UniversityManagement";
import ForgotPassword from "./components/ForgotPassword";
import CertificateRegistration from "./components/ManageCertificate";
import { AuthProvider } from "./contexts/EthContext/AuthContext";
import ProtectedRoute from "./contexts/ProtectedRoute";


function App() {
  
  return (
    <EthProvider>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<SignIn />} />
            <Route path="forgot-password" element={<ProtectedRoute><ForgotPassword /></ProtectedRoute>} />
            <Route path="Home" element={<ProtectedRoute><UniversityManagement /></ProtectedRoute>} />
            <Route path="certReg" element={<ProtectedRoute><CertificateRegistration /></ProtectedRoute>} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </EthProvider>
  );
}

export default App;
