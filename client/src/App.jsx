import { EthProvider } from "./contexts/EthContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from "./components/signin";
import UniversityManagement from "./components/UniversityManagement";
import ForgotPassword from "./components/ForgotPassword";
import CertificateRegistration from "./components/ManageCertificate";

function App() {
  return (
    <EthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="login" element={<SignIn />} />
          <Route path="forgor-password" element={<ForgotPassword />} />
          <Route index element={<UniversityManagement />} />
          <Route path="certReg" element={<CertificateRegistration />} />
        </Routes>
      </BrowserRouter>
    </EthProvider>
  );
}

export default App;
